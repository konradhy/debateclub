Take Control of Pagination
a page 1 icon and some brackets with ellipsis to represent pagination
Note: If you're looking for our post on CRUD APIs, you can find that here.

When you store a lot of data in Convex, you usually want to display it incrementally, using pagination to show one page at a time.

The Convex framework offers .paginate(opts) and usePaginatedQuery() to implement infinite-scroll pagination. These functions are powerful and handle the complex edge cases of stitching the pages together seamlessly. However, there are several scenarios they do not support, or at least don't support out-of-the-box:

Joins like “list all (paginated) messages for each of my (paginated) contacts”
Unions like “list all (paginated) messages for each of my 3 email accounts.”
Virtual infinite scroll view where you jump to a point and then scroll up or down. Think “show me the photos from June 2020 and photos before and after”
Unloading and unsubscribing from unnecessary pages. If you load 100 pages, those 100 pages of documents stick around in the browser’s memory and keep updating when the data changes, even if the documents are far off-screen.
Keeping pages bounded in size. If documents are inserted quickly — e.g. if there are hundreds of inserts per mutation — pages can grow beyond the limits of a Convex function, and throw an error.
These are difficult problems to solve, and a complete solution would require complicating the base interface. For example, if you call .paginate twice in a query function, are you aiming for a join pattern or a union? It becomes unclear whether loadMore should load more of the first or the last db.query. As another example, do you want pagination cursors to be opaque — which is the default with .paginate and useful for security in some cases — or do you want to be able to parse them to allow “jump to June 2020, which may already be a loaded page.”

Convex may eventually solve all of these problems with the built-in interface, but for now we give you the power to solve them yourselves, leveraging the versatility of the Convex runtime running arbitrary TypeScript. Introducing getPage:

import { getPage } from "convex-helpers/server/pagination";

What is getPage?
This function is a new helper, built on top of existing Convex primitives. It supports many arguments, most of them optional with sensible defaults:

a start position: ”give me photos starting at June 2020”
an end position: “give all photos up until August 2020”
an index: “paginate in order of user surname, instead of creation time”
an order for the index: “give me messages from newest to oldest”
a soft limit: “give me 100 messages, but allow more if the page grows”
a hard limit: “give me at most 500 messages, even if the page grows”
See the source code for the full interface and docstrings.

The return value includes a page of documents, whether there are more documents to request, and the index key for each document in the page.

What’s an index key?
The getPage function returns an object:

const { page, indexKeys, hasMore } = await getPage(...);

Each document in page has a corresponding index key, so the document page[3] has index key indexKeys[3]. But what is an index key?

Index keys are locations in the index. For a table like

contacts: defineTable({
	surname: v.string(),
	givenName: v.string()
}).index("name", ["surname", "givenName"])

an index key would be something like ["Smith", "John", 1719412234000, "jh7evzh9wejnwjv88y1a1g9c7h6vpabd"]. Documents in the returned page are sorted by the index key. To avoid duplicates, every index key ends with the creation time and ID of the document.

Usually you don’t need to pay attention to what’s in an index key, because you can pass getPage's response indexKeys directly to its request startIndexKey or endIndexKey fields. However, it can be useful to say “start the page at June 2020” by passing startIndexKey: [Date.parse("2020-06-01")]: the sort order puts this before all dates in June 2020.

When you fetch a page of documents with getPage, you get an index key corresponding to each document, and you can use these to fetch more documents. The last index key indexKeys[indexKeys.length - 1] is particularly useful, because it corresponds to the index location at the end of the fetched page.

Patterns
With getPage giving you complete control of your pagination, you can now solve any of the above problems. Let's look at implementing some common patterns with concrete examples.

All of the following examples will use and build off of this data model:

contacts: defineTable({
	surname: v.string(),
	givenName: v.string(),
	emailAddress: v.string(),
}).index("name", ["surname", "givenName"]),
emails: defineTable({
	address: v.string(),
	body: v.string(),
}).index("address", ["address"]),

Basic Pagination
Let’s start with the most basic query. We list a page of 100 contacts in _creationTime order, starting at the beginning of time:

// In the convex/contacts.ts file
export const firstPageOfContacts = query((ctx) => {
	return getPage(ctx, { table: "contacts" });
});
// Then in React, call the query
const { page } = useQuery(api.contacts.firstPageOfContacts);

To get the next page of contacts, we ask for the page starting at the index key at the end of the first page.

// In convex/contacts.ts
export const pageOfContacts = query((ctx, args) => {
	return getPage(ctx, { table: "contacts", ...args });
});
// In React
const firstPage = useQuery(api.contacts.pageOfContacts);
const secondPage = useQuery(api.contacts.pageOfContacts, firstPage ? {
	startIndexKey: firstPage.indexKeys[firstPage.indexKeys.length - 1],
} : "skip");

Now you have two pages. If you want a dynamic number of pages, instead of useQuery you will want useQueries. At some point you’ll want to wrap all this in a hook, similar to the built-in usePaginatedQuery.

The return value of getPage includes three things:

The page of documents
The index key for each document, allowing you to fetch related pages
A boolean hasMore to tell you if there are more pages to fetch
Use any index
By default, getPage uses the index on _creationTime, but it can use any database index (text-search and vector indexes are not supported). The index determines the format for index keys, and also the order of returned documents. When specifying an index, you have to tell getPage your schema too, so it knows which fields are in the index.

The following query will get the first page of contacts in order of surname, then givenName, because the "name" index is defined as .index("name", ["surname", "givenName"]).

import schema from "./schema";
const { page, indexKeys } = await getPage(ctx, {
	table: "contacts",
	index: "name",
	schema,
});

Pagination with a join
Built-in pagination supports simple joins: if I’m paginating over contacts and each contact has a profilePicId, I can fetch the profile picture for each contact with the pattern described here. However, you can’t do pagination within this join, because the built-in Convex query currently can’t keep track of multiple pagination cursors in one query.

Suppose I want to fetch the first page of contacts, and the first page of emails for each contact. With getPage I can do this:

const {
	page: pageOfContacts,
	indexKeys: contactIndexKeys,
} = await getPage(ctx, { table: "contacts" });
const emails = {};
for (const contact of pageOfContacts) {
	emails[contact.email] = await getPage(ctx, {
		table: "emails",
		index: "address",
		schema,
		startIndexKey: [contact.emailAddress],
		endIndexKey: [contact.emailAddress],
		endInclusive: true,
		absoluteMaxRows: 10,
	});
}
return { pageOfContacts, contactIndexKeys, emails };

You can now fetch subsequent pages of contacts, each with their first page of emails. Or you can fetch subsequent pages of emails for any contact. And this all works because you are tracking the cursors directly.

Jump to a location and scroll up
Infinite scroll is a common interface, but sometimes you want to jump to a later page. If you’re scrolling through your contacts you may want to jump to those with last name starting with “S”. If you’re scrolling through your photos you may want to jump to those from your vacation last year.

Jumping to a location is easy — it’s even supported by built-in Convex pagination via

await ctx.db.query("contacts")
	.withIndex("name", (q)=>q.gte("surname", "S"))
	.paginate(opts);

However, you’re now looking at pages of contacts starting with “S”, and you can’t “scroll up” to see those starting with “R”.

When scrolling up, your query becomes inverted, so it looks like this:

await ctx.db.query("contacts")
	.withIndex("name", (q)=>q.lt("surname", "S"))
	.order("desc")
	.paginate(opts);

You can run this as a separate query, or you can use a single getPage to go in either direction:

const contacts = await getPage(ctx, {
	table: "contacts",
	index: "name",
	schema,
	startIndexKey: ["S"],
	startInclusive: !isScrollingUp,
	order: isScrollingUp ? "asc" : "desc",
});

Stitching the pages together
If you’re fetching multiple pages of data into a reactive client, like a React web page, you’ll want the data to update reactively.

Like any Convex query, pages fetched with getPage and useQueries will automatically re-render when the data updates. However, since pages are initially defined as “the first 100 items” and “the next 100 items after item X”, this can result in gaps or overlaps between pages. This problem is fully described here.

The built-in .paginate() and usePaginatedQuery solve this problem automatically, but getPage does not. Instead, you need to replace the queries after they first load, so “the first 100 items” becomes “the items up to item X”, which then seamlessly joins up with “the next 100 items after item X”. This is the primary purpose of the endIndexKey field passed to getPage.

// Fetch the first page like this:
const {
	indexKeys: indexKeys0,
} = await getPage(ctx, {
	table: "contacts",
});
// Fetch the second page like this:
const {
	page: page1,
	indexKeys: indexKeys1,
} = await getPage(ctx, {
	table: "contacts",
	startIndexKey: indexKeys0[indexKeys0.length - 1],
});
// Re-fetch the first page like this:
const { page: page0 } = await getPage(ctx, {
	table: "contacts",
	endIndexKey: indexKeys0[indexKeys0.length - 1],
});

Suppose initially the 100th contact is John Smith. page1 is defined as the 100 contacts after John Smith. Meanwhile page0 is defined as all contacts up to John Smith, which might grow or shrink as the table changes.

This all sounds complicated to implement, which is why Convex’s built-in pagination handles it for you. This pattern of replacing page queries can also double your function calls and bandwidth usage, which the built-in pagination avoids.

More flexible pagination
With getPage, you take control of your pagination. It’s your data, and your access patterns, so you are best equipped to write optimal queries and hooks for fetching pages.

As you scroll down, you can unsubscribe from pages that are no longer visible.
If you have subscribed to a page and it grows too large, getPage has returned all index keys, so you can use a middle index key to split the page into two.
You can more flexibly filter out a page’s documents, or filter out fields, or join with another table to add fields.
You can choose to either store all index keys, which would tell you if an item at an index position was already loaded, or you can encrypt index keys to hide page boundaries.
Give me the code
Get started writing queries with getPage today, by installing convex-helpers and importing

import { getPage } from "convex-helpers/server/pagination";

If you want a reference implementation for stitching pages together, jumping to a location, and scrolling up, check out the code here for an example app featuring a list of contacts.