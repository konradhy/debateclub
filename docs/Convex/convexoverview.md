# Convex Overview

Convex is the open source, reactive database where queries are TypeScript code running right in the database. Just like React components react to state changes, Convex queries react to database changes.

Convex provides a database, a place to write your server functions, and client libraries. It makes it easy to build and scale dynamic live-updating apps.

The following diagram shows the standard three-tier app architecture that Convex enables. We'll start at the bottom and work our way up to the top of this diagram.

![Convex in your app](/assets/images/basic-diagram-8ad312f058c3cf7e15c3396e46eedb48.png)

## Database[​](#database "Direct link to Database")

The [database](/database.md) is at the core of Convex. The Convex database is automatically provisioned when you create your project. There is no connection setup or cluster management.

info

In Convex, your database queries are just [TypeScript code](/database/reading-data/.md) written in your [server functions](/functions.md). There is no SQL to write. There are no ORMs needed.

The Convex database is reactive. Whenever any data on which a query depends changes, the query is rerun, and client subscriptions are updated.

Convex is a "document-relational" database. "Document" means you put JSON-like nested objects into your database. "Relational" means you have tables with relations, like `tasks` assigned to a `user` using IDs to reference documents in other tables.

The Convex cloud offering runs on top of Amazon RDS using MySQL as its persistence layer. The Open Source version uses SQLite, Postgres and MySQL. The database is ACID-compliant and uses [serializable isolation and optimistic concurrency control](/database/advanced/occ.md). All that to say, Convex provides the strictest possible transactional guarantees, and you never see inconsistent data.

## Server functions[​](#server-functions "Direct link to Server functions")

When you create a new Convex project, you automatically get a `convex/` folder where you write your [server functions](/functions.md). This is where all your backend application logic and database query code live.

Example TypeScript server functions that read (query) and write (mutation) to the database.

convex/tasks.ts

```
// A Convex query function
export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
    return tasks;
  },
});

// A Convex mutation function
export const setTaskCompleted = mutation({
  args: { taskId: v.id("tasks"), completed: v.boolean() },
  handler: async (ctx, { taskId, completed }) => {
    // Update the database using TypeScript
    await ctx.db.patch("tasks", taskId, { completed });
  },
});
```

You read and write to your database through query or mutation functions. [Query functions](/functions/query-functions.md) are pure functions that can only read from the database. [Mutation functions](/functions/mutation-functions.md) are transactions that can read or write from the database. These two database functions are [not allowed to take any non-deterministic](/functions/runtimes.md#restrictions-on-queries-and-mutations) actions like network requests to ensure transactional guarantees.

info

The entire Convex mutation function is a transaction. There are no `begin` or `end` transaction statements to write. Convex automatically retries the function on conflicts, and you don't have to manage anything.

Convex also provides standard general-purpose serverless functions called actions. [Action functions](/functions/actions.md) can make network requests. They have to call query or mutation functions to read and write to the database. You use actions to call LLMs or send emails.

You can also durably schedule Convex functions via the [scheduler](/scheduling/scheduled-functions.md) or [cron jobs](/scheduling/cron-jobs.md). Scheduling lets you build workflows like emailing a new user a day later if they haven't performed an onboarding task.

You call your Convex functions via [client libraries](/client/react.md) or directly via [HTTP](/http-api/.md#functions-api).

## Client libraries[​](#client-libraries "Direct link to Client libraries")

Convex client libraries keep your frontend synced with the results of your server functions.

```
// In your React component
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function TaskList() {
  const data = useQuery(api.tasks.getAllOpenTasks);
  return data ?? "Loading...";
}
```

Like the `useState` hook that updates your React component when local state changes, the Convex `useQuery` hook automatically updates your component whenever the result of your query changes. There's no manual subscription management or state synchronization needed.

When calling query functions, the client library subscribes to the results of the function. Convex tracks the dependencies of your query functions, including what data was read from the database. Whenever relevant data in the database changes, the Convex automatically reruns the query and sends the result to the client.

The client library also queues up mutations in memory to send to the server. As mutations execute and cause query results to update, the client library keeps your app state consistent. It updates all subscriptions to the same logical moment in time in the database.

Convex provides client libraries for nearly all popular web and native app frameworks. Client libraries connect to your Convex deployment via WebSockets. You can then call your public Convex functions [through the library](/client/react.md#fetching-data). You can also use Convex with [HTTP directly](/http-api/.md#functions-api), you just won't get the automatic subscriptions.

## Putting it all together[​](#putting-it-all-together "Direct link to Putting it all together")

Let's return to the `getAllOpenTasks` Convex query function from earlier that gets all tasks that are not marked as `completed`:

convex/tasks.ts

```
export const getAllOpenTasks = query({
  args: {},
  handler: async (ctx, args) => {
    // Query the database to get all items that are not completed
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_completed", (q) => q.eq("completed", false))
      .collect();
    return tasks;
  },
});
```

Let's follow along what happens when you subscribe to this query:

![Convex data flow](/assets/images/convex-query-subscription-945e7990515e438ab4385f9b4803bbd4.png)

The web app uses the `useQuery` hook to subscribe to this query, and the following happens to get an initial value:

* The Convex client sends a message to the Convex server to subscribe to the query
* The Convex server runs the function, which reads data from the database
* The Convex server sends a message to the client with the function's result

In this case the initial result looks like this (1):

```
[
  { _id: "e4g", title: "Grocery shopping", complete: false },
  { _id: "u9v", title: "Plant new flowers", complete: false },
];
```

Then you use a mutation to mark an item as completed (2). Convex then reruns the query (3) to get an updated result. And pushes the result to the web app via the WebSocket connection (4):

```
[
  { _id: "e4g", title: "Grocery shopping", complete: false },
];
```

## Beyond reactivity[​](#beyond-reactivity "Direct link to Beyond reactivity")

Beyond reactivity, Convex's architecture is crucial for a deeper reason. Convex does not let your app have inconsistent state at any layer of the stack.

To illustrate this, let's imagine you're building a shopping cart for an e-commerce store.

![Convex in your app](/assets/images/convex-swaghaus-dcc9919685db6a7f34378afc500f68cd.png)

On the product listing page, you have two numbers, one showing the number of items remaining in stock and another showing the number of items in your shopping cart. Each number is a result of a different query function.

Every time you press the "Add to Cart" button, a mutation is called to remove one item from the stock and add it to the shopping cart.

The mutation to change the cart runs in a transaction, so your database is always in a consistent state. The reactive database knows that the queries showing the number of items in stock and the number of items in the shopping cart both need to be updated. The queries are invalidated and rerun. The results are pushed to the web app via the WebSocket connection.

The client library makes sure that both queries update at the same time in the web app since they reflect a singular moment in time in your database. You never have a moment where those numbers don't add up. Your app always shows consistent data.

You can see this example in action in the [Swaghaus sample app](https://swaghaus.biz/).

## For human and AI generated code[​](#for-human-and-ai-generated-code "Direct link to For human and AI generated code")

Convex is designed around a small set of composable abstractions with strong guarantees that result in code that is not only faster to write, it’s easier to read and maintain, whether written by a team member or an LLM. Key features make sure you get bug-free AI generated code:

1. **Queries are Just TypeScript** Your database queries are pure TypeScript functions with end-to-end type safety and IDE support. This means AI can generate database code using the large training set of TypeScript code without switching to SQL.
2. **Less Code for the Same Work** Since so much infrastructure and boiler plate is automatically managed by Convex there is less code to write, and thus less code to get wrong.
3. **Automatic Reactivity** The reactive system automatically tracks data dependencies and updates your UI. AI doesn't need to manually manage subscriptions, WebSocket connections, or complex state synchronization—Convex handles all of this automatically.
4. **Transactional Guarantees** Queries are read-only and mutations run in transactions. These constraints make it nearly impossible for AI to write code that could corrupt your data or leave your app in an inconsistent state.

Together, these features mean AI can focus on your business logic while Convex's guarantees prevent common failure modes.

## Learn more[​](#learn-more "Direct link to Learn more")

If you are intrigued about the details of how Convex pulls this all off, you can read Convex co-founder Sujay's excellent [How Convex Works](https://stack.convex.dev/how-convex-works) blog post.

Now that you have a good sense of how Convex fits in your app. Let's walk through the overall workflow of setting up and launching a Convex app.


# Best Practices

This is a list of best practices and common anti-patterns around using Convex. We recommend going through this list before broadly releasing your app to production. You may choose to try using all of these best practices from the start, or you may wait until you've gotten major parts of your app working before going through and adopting the best practices here.

## Await all Promises[​](#await-all-promises "Direct link to Await all Promises")

### Why?[​](#why "Direct link to Why?")

Convex functions use async / await. If you don't await all your promises (e.g. `await ctx.scheduler.runAfter`, `await ctx.db.patch`), you may run into unexpected behavior (e.g. failing to schedule a function) or miss handling errors.

### How?[​](#how "Direct link to How?")

We recommend the [no-floating-promises](https://typescript-eslint.io/rules/no-floating-promises/) eslint rule with TypeScript.

## Avoid `.filter` on database queries[​](#avoid-filter-on-database-queries "Direct link to avoid-filter-on-database-queries")

### Why?[​](#why-1 "Direct link to Why?")

Filtering in code instead of using the `.filter` syntax has the same performance, and is generally easier code to write. Conditions in `.withIndex` or `.withSearchIndex` are more efficient than `.filter` or filtering in code, so almost all uses of `.filter` should either be replaced with a `.withIndex` or `.withSearchIndex` condition, or written as TypeScript code.

Read through the [indexes documentation](/database/reading-data/indexes/indexes-and-query-perf.md) for an overview of how to define indexes and how they work.

### Examples[​](#examples "Direct link to Examples")

convex/messages.ts

TS

```
// ❌
const tomsMessages = ctx.db
  .query("messages")
  .filter((q) => q.eq(q.field("author"), "Tom"))
  .collect();

// ✅
// Option 1: Use an index
const tomsMessages = await ctx.db
  .query("messages")
  .withIndex("by_author", (q) => q.eq("author", "Tom"))
  .collect();

// Option 2: Filter in code
const allMessages = await ctx.db.query("messages").collect();
const tomsMessages = allMessages.filter((m) => m.author === "Tom");
```

### How?[​](#how-1 "Direct link to How?")

Search for `.filter` in your Convex codebase — a regex like `\.filter\(\(?q` will probably find all the ones on database queries.

Decide whether they should be replaced with a `.withIndex` condition — per [this section](/understanding/best-practices/.md#only-use-collect-with-a-small-number-of-results), if you are filtering over a large (1000+) or potentially unbounded number of documents, you should use an index. If not using a `.withIndex` / `.withSearchIndex` condition, consider replacing them with a filter in code for more readability and flexibility.

See [this article](https://stack.convex.dev/complex-filters-in-convex) for more strategies for filtering.

### Exceptions[​](#exceptions "Direct link to Exceptions")

Using `.filter` on a paginated query (`.paginate`) has advantages over filtering in code. The paginated query will return the number of documents requested, including the `.filter` condition, so filtering in code afterwards can result in a smaller page or even an empty page. Using `.withIndex` on a paginated query will still be more efficient than a `.filter`.

## Only use `.collect` with a small number of results[​](#only-use-collect-with-a-small-number-of-results "Direct link to only-use-collect-with-a-small-number-of-results")

### Why?[​](#why-2 "Direct link to Why?")

All results returned from `.collect` count towards database bandwidth (even ones filtered out by `.filter`). It also means that if any document in the result changes, the query will re-run or the mutation will hit a conflict.

If there's a chance the number of results is large (say 1000+ documents), you should use an index to filter the results further before calling `.collect`, or find some other way to avoid loading all the documents such as using pagination, denormalizing data, or changing the product feature.

### Example[​](#example "Direct link to Example")

**Using an index:**

convex/movies.ts

TS

```
// ❌ -- potentially unbounded
const allMovies = await ctx.db.query("movies").collect();
const moviesByDirector = allMovies.filter(
  (m) => m.director === "Steven Spielberg",
);

// ✅ -- small number of results, so `collect` is fine
const moviesByDirector = await ctx.db
  .query("movies")
  .withIndex("by_director", (q) => q.eq("director", "Steven Spielberg"))
  .collect();
```

**Using pagination:**

convex/movies.ts

TS

```
// ❌ -- potentially unbounded
const watchedMovies = await ctx.db
  .query("watchedMovies")
  .withIndex("by_user", (q) => q.eq("user", "Tom"))
  .collect();

// ✅ -- using pagination, showing recently watched movies first
const watchedMovies = await ctx.db
  .query("watchedMovies")
  .withIndex("by_user", (q) => q.eq("user", "Tom"))
  .order("desc")
  .paginate(paginationOptions);
```

**Using a limit or denormalizing:**

convex/movies.ts

TS

```
// ❌ -- potentially unbounded
const watchedMovies = await ctx.db
  .query("watchedMovies")
  .withIndex("by_user", (q) => q.eq("user", "Tom"))
  .collect();
const numberOfWatchedMovies = watchedMovies.length;

// ✅ -- Show "99+" instead of needing to load all documents
const watchedMovies = await ctx.db
  .query("watchedMovies")
  .withIndex("by_user", (q) => q.eq("user", "Tom"))
  .take(100);
const numberOfWatchedMovies =
  watchedMovies.length === 100 ? "99+" : watchedMovies.length.toString();

// ✅ -- Denormalize the number of watched movies in a separate table
const watchedMoviesCount = await ctx.db
  .query("watchedMoviesCount")
  .withIndex("by_user", (q) => q.eq("user", "Tom"))
  .unique();
```

### How?[​](#how-2 "Direct link to How?")

Search for `.collect` in your Convex codebase (a regex like `\.collect\(` will probably find these). And think through whether the number of results is small. This function health page in the dashboard can also help surface these.

The [aggregate component](https://www.npmjs.com/package/@convex-dev/aggregate) or [database triggers](https://stack.convex.dev/triggers) can be helpful patterns for denormalizing data.

### Exceptions[​](#exceptions-1 "Direct link to Exceptions")

If you're doing something that requires loading a large number of documents (e.g. performing a migration, making a summary), you may want to use an action to load them in batches via separate queries / mutations.

## Check for redundant indexes[​](#check-for-redundant-indexes "Direct link to Check for redundant indexes")

### Why?[​](#why-3 "Direct link to Why?")

Indexes like `by_foo` and `by_foo_and_bar` are usually redundant (you only need `by_foo_and_bar`). Reducing the number of indexes saves on database storage and reduces the overhead of writing to the table.

convex/teams.ts

TS

```
// ❌
const allTeamMembers = await ctx.db
  .query("teamMembers")
  .withIndex("by_team", (q) => q.eq("team", teamId))
  .collect();
const currentUserId = /* get current user id from `ctx.auth` */
const currentTeamMember = await ctx.db
  .query("teamMembers")
  .withIndex("by_team_and_user", (q) =>
    q.eq("team", teamId).eq("user", currentUserId),
  )
  .unique();

// ✅
// Just don't include a condition on `user` when querying for results on `team`
const allTeamMembers = await ctx.db
  .query("teamMembers")
  .withIndex("by_team_and_user", (q) => q.eq("team", teamId))
  .collect();
const currentUserId = /* get current user id from `ctx.auth` */
const currentTeamMember = await ctx.db
  .query("teamMembers")
  .withIndex("by_team_and_user", (q) =>
    q.eq("team", teamId).eq("user", currentUserId),
  )
  .unique();
```

### How?[​](#how-3 "Direct link to How?")

Look through your indexes, either in your `schema.ts` file or in the dashboard, and look for any indexes where one is a prefix of another.

### Exceptions[​](#exceptions-2 "Direct link to Exceptions")

`.index("by_foo", ["foo"])` is really an index on the properties `foo` and `_creationTime`, while `.index("by_foo_and_bar", ["foo", "bar"])` is an index on the properties `foo`, `bar`, and `_creationTime`. If you have queries that need to be sorted by `foo` and then `_creationTime`, then you need both indexes.

For example, `.index("by_channel", ["channel"])` on a table of messages can be used to query for the most recent messages in a channel, but `.index("by_channel_and_author", ["channel", "author"])` could not be used for this since it would first sort the messages by `author`.

## Use argument validators for all public functions[​](#use-argument-validators-for-all-public-functions "Direct link to Use argument validators for all public functions")

### Why?[​](#why-4 "Direct link to Why?")

Public functions can be called by anyone, including potentially malicious attackers trying to break your app. [Argument validators](/functions/validation.md) (as well as return value validators) help ensure you're getting the traffic you expect.

### Example[​](#example-1 "Direct link to Example")

convex/messages.ts

TS

```
// ❌ -- could be used to update any document (not just `messages`)
export const updateMessage = mutation({
  handler: async (ctx, { id, update }) => {
    await ctx.db.patch(id, update);
  },
});

// ✅ -- can only be called with an ID from the messages table, and can only update
// the `body` and `author` fields
export const updateMessage = mutation({
  args: {
    id: v.id("messages"),
    update: v.object({
      body: v.optional(v.string()),
      author: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { id, update }) => {
    await ctx.db.patch(id, update);
  },
});
```

### How?[​](#how-4 "Direct link to How?")

Search for `query`, `mutation`, and `action` in your Convex codebase, and ensure that all of them have argument validators (and optionally return value validators). If you have `httpAction`s, you may want to use something like `zod` to validate that the HTTP request is the shape you expect.

## Use some form of access control for all public functions[​](#use-some-form-of-access-control-for-all-public-functions "Direct link to Use some form of access control for all public functions")

### Why?[​](#why-5 "Direct link to Why?")

Public functions can be called by anyone, including potentially malicious attackers trying to break your app. If portions of your app should only be accessible when the user is signed in, make sure all these Convex functions check that `ctx.auth.getUserIdentity()` is set.

You may also have specific checks, like only loading messages that were sent to or from the current user, which you'll want to apply in every relevant public function.

Favoring more granular functions like `setTeamOwner` over `updateTeam` allows more granular checks for which users can do what.

Access control checks should either use `ctx.auth.getUserIdentity()` or a function argument that is unguessable (e.g. a UUID, or a Convex ID, provided that this ID is never exposed to any client but the one user). In particular, don't use a function argument which could be spoofed (e.g. email) for access control checks.

### Example[​](#example-2 "Direct link to Example")

convex/teams.ts

TS

```
// ❌ -- no checks! anyone can update any team if they get the ID
export const updateTeam = mutation({
  args: {
    id: v.id("teams"),
    update: v.object({
      name: v.optional(v.string()),
      owner: v.optional(v.id("users")),
    }),
  },
  handler: async (ctx, { id, update }) => {
    await ctx.db.patch("teams", id, update);
  },
});

// ❌ -- checks access, but uses `email` which could be spoofed
export const updateTeam = mutation({
  args: {
    id: v.id("teams"),
    update: v.object({
      name: v.optional(v.string()),
      owner: v.optional(v.id("users")),
    }),
    email: v.string(),
  },
  handler: async (ctx, { id, update, email }) => {
    const teamMembers = /* load team members */
    if (!teamMembers.some((m) => m.email === email)) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch("teams", id, update);
  },
});

// ✅ -- checks access, and uses `ctx.auth`, which cannot be spoofed
export const updateTeam = mutation({
  args: {
    id: v.id("teams"),
    update: v.object({
      name: v.optional(v.string()),
      owner: v.optional(v.id("users")),
    }),
  },
  handler: async (ctx, { id, update }) => {
    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new Error("Unauthorized");
    }
    const isTeamMember = /* check if user is a member of the team */
    if (!isTeamMember) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch("teams", id, update);
  },
});

// ✅ -- separate functions which have different access control
export const setTeamOwner = mutation({
  args: {
    id: v.id("teams"),
    owner: v.id("users"),
  },
  handler: async (ctx, { id, owner }) => {
    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new Error("Unauthorized");
    }
    const isTeamOwner = /* check if user is the owner of the team */
    if (!isTeamOwner) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch("teams", id, { owner: owner });
  },
});

export const setTeamName = mutation({
  args: {
    id: v.id("teams"),
    name: v.string(),
  },
  handler: async (ctx, { id, name }) => {
    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new Error("Unauthorized");
    }
    const isTeamMember = /* check if user is a member of the team */
    if (!isTeamMember) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch("teams", id, { name: name });
  },
});
```

### How?[​](#how-5 "Direct link to How?")

Search for `query`, `mutation`, `action`, and `httpAction` in your Convex codebase, and ensure that all of them have some form of access control. [Custom functions](https://github.com/get-convex/convex-helpers/blob/main/packages/convex-helpers/README.md#custom-functions) like [`authenticatedQuery`](https://stack.convex.dev/custom-functions#modifying-the-ctx-argument-to-a-server-function-for-user-auth) can be helpful.

Some apps use Row Level Security (RLS) to check access to each document automatically whenever it's loaded, as described in [this article](https://stack.convex.dev/row-level-security). Alternatively, you can check access in each Convex function instead of checking access for each document.

Helper functions for common checks and common operations can also be useful -- e.g. `isTeamMember`, `isTeamAdmin`, `loadTeam` (which throws if the current user does not have access to the team).

## Only schedule and `ctx.run*` internal functions[​](#only-schedule-and-ctxrun-internal-functions "Direct link to only-schedule-and-ctxrun-internal-functions")

### Why?[​](#why-6 "Direct link to Why?")

Public functions can be called by anyone, including potentially malicious attackers trying to break your app, and should be carefully audited to ensure they can't be used maliciously. Functions that are only called within Convex can be marked as internal, and relax these checks since Convex will ensure that internal functions can only be called within Convex.

### How?[​](#how-6 "Direct link to How?")

Search for `ctx.runQuery`, `ctx.runMutation`, and `ctx.runAction` in your Convex codebase. Also search for `ctx.scheduler` and check the `crons.ts` file. Ensure all of these use `internal.foo.bar` functions instead of `api.foo.bar` functions.

If you have code you want to share between a public Convex function and an internal Convex function, create a helper function that can be called from both. The public function will likely have additional access control checks.

Alternatively, make sure that `api` from `_generated/api.ts` is never used in your Convex functions directory.

### Examples[​](#examples-1 "Direct link to Examples")

convex/teams.ts

TS

```
// ❌ -- using `api`
export const sendMessage = mutation({
  args: {
    body: v.string(),
    author: v.string(),
  },
  handler: async (ctx, { body, author }) => {
    // add message to the database
  },
});

// crons.ts
crons.daily(
  "send daily reminder",
  { hourUTC: 17, minuteUTC: 30 },
  api.messages.sendMessage,
  { author: "System", body: "Share your daily update!" },
);

// ✅ Using `internal`
import { MutationCtx } from './_generated/server';
async function sendMessageHelper(
  ctx: MutationCtx,
  args: { body: string; author: string },
) {
  // add message to the database
}

export const sendMessage = mutation({
  args: {
    body: v.string(),
  },
  handler: async (ctx, { body }) => {
    const user = await ctx.auth.getUserIdentity();
    if (user === null) {
      throw new Error("Unauthorized");
    }
    await sendMessageHelper(ctx, { body, author: user.name ?? "Anonymous" });
  },
});

export const sendInternalMessage = internalMutation({
  args: {
    body: v.string(),
    // don't need to worry about `author` being spoofed since this is an internal function
    author: v.string(),
  },
  handler: async (ctx, { body, author }) => {
    await sendMessageHelper(ctx, { body, author });
  },
});

// crons.ts
crons.daily(
  "send daily reminder",
  { hourUTC: 17, minuteUTC: 30 },
  internal.messages.sendInternalMessage,
  { author: "System", body: "Share your daily update!" },
);
```

## Use helper functions to write shared code[​](#use-helper-functions-to-write-shared-code "Direct link to Use helper functions to write shared code")

### Why?[​](#why-7 "Direct link to Why?")

Most logic should be written as plain TypeScript functions, with the `query`, `mutation`, and `action` wrapper functions being a thin wrapper around one or more helper function.

Concretely, most of your code should live in a directory like `convex/model`, and your public API, which is defined with `query`, `mutation`, and `action`, should have very short functions that mostly just call into `convex/model`.

Organizing your code this way makes several of the refactors mentioned in this list easier to do.

See the [TypeScript page](/understanding/best-practices/typescript.md) for useful types.

### Example[​](#example-3 "Direct link to Example")

**❌** This example overuses `ctx.runQuery` and `ctx.runMutation`, which is discussed more in the [Avoid sequential `ctx.runMutation` / `ctx.runQuery` from actions](/understanding/best-practices/.md#avoid-sequential-ctxrunmutation--ctxrunquery-calls-from-actions) section.

convex/users.ts

TS

```
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (userIdentity === null) {
      throw new Error("Unauthorized");
    }
    const user = /* query ctx.db to load the user */
    const userSettings = /* load other documents related to the user */
    return { user, settings: userSettings };
  },
});
```

convex/conversations.ts

TS

```
export const listMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const user = await ctx.runQuery(api.users.getCurrentUser);
    const conversation = await ctx.db.get("conversations", conversationId);
    if (conversation === null || !conversation.members.includes(user._id)) {
      throw new Error("Unauthorized");
    }
    const messages = /* query ctx.db to load the messages */
    return messages;
  },
});

export const summarizeConversation = action({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const messages = await ctx.runQuery(api.conversations.listMessages, {
      conversationId,
    });
    const summary = /* call some external service to summarize the conversation */
    await ctx.runMutation(api.conversations.addSummary, {
      conversationId,
      summary,
    });
  },
});
```

**✅** Most of the code here is now in the `convex/model` directory. The API for this application is in `convex/conversations.ts`, which contains very little code itself.

convex/model/users.ts

TS

```
import { QueryCtx } from '../_generated/server';

export async function getCurrentUser(ctx: QueryCtx) {
  const userIdentity = await ctx.auth.getUserIdentity();
  if (userIdentity === null) {
    throw new Error("Unauthorized");
  }
  const user = /* query ctx.db to load the user */
  const userSettings = /* load other documents related to the user */
  return { user, settings: userSettings };
}
```

convex/model/conversations.ts

TS

```
import { QueryCtx, MutationCtx } from '../_generated/server';
import * as Users from './users';

export async function ensureHasAccess(
  ctx: QueryCtx,
  { conversationId }: { conversationId: Id<"conversations"> },
) {
  const user = await Users.getCurrentUser(ctx);
  const conversation = await ctx.db.get("conversations", conversationId);
  if (conversation === null || !conversation.members.includes(user._id)) {
    throw new Error("Unauthorized");
  }
  return conversation;
}

export async function listMessages(
  ctx: QueryCtx,
  { conversationId }: { conversationId: Id<"conversations"> },
) {
  await ensureHasAccess(ctx, { conversationId });
  const messages = /* query ctx.db to load the messages */
  return messages;
}

export async function addSummary(
  ctx: MutationCtx,
  {
    conversationId,
    summary,
  }: { conversationId: Id<"conversations">; summary: string },
) {
  await ensureHasAccess(ctx, { conversationId });
  await ctx.db.patch("conversations", conversationId, { summary });
}

export async function generateSummary(
  messages: Doc<"messages">[],
  conversationId: Id<"conversations">,
) {
  const summary = /* call some external service to summarize the conversation */
  return summary;
}
```

convex/conversations.ts

TS

```
import * as Conversations from './model/conversations';

export const addSummary = internalMutation({
  args: {
    conversationId: v.id("conversations"),
    summary: v.string(),
  },
  handler: async (ctx, { conversationId, summary }) => {
    await Conversations.addSummary(ctx, { conversationId, summary });
  },
});

export const listMessages = internalQuery({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    return Conversations.listMessages(ctx, { conversationId });
  },
});

export const summarizeConversation = action({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, { conversationId }) => {
    const messages = await ctx.runQuery(internal.conversations.listMessages, {
      conversationId,
    });
    const summary = await Conversations.generateSummary(
      messages,
      conversationId,
    );
    await ctx.runMutation(internal.conversations.addSummary, {
      conversationId,
      summary,
    });
  },
});
```

## Use `runAction` only when using a different runtime[​](#use-runaction-only-when-using-a-different-runtime "Direct link to use-runaction-only-when-using-a-different-runtime")

### Why?[​](#why-8 "Direct link to Why?")

Calling `runAction` has more overhead than calling a plain TypeScript function. It counts as an extra function call with its own memory and CPU usage, while the parent action is doing nothing except waiting for the result. Therefore, `runAction` should almost always be replaced with calling a plain TypeScript function. However, if you want to call code that requires Node.js from a function in the Convex runtime (e.g. using a library that requires Node.js), then you can use `runAction` to call the Node.js code.

### Example[​](#example-4 "Direct link to Example")

convex/scrape.ts

TS

```
// ❌ -- using `runAction`
export const scrapeWebsite = action({
  args: {
    siteMapUrl: v.string(),
  },
  handler: async (ctx, { siteMapUrl }) => {
    const siteMap = await fetch(siteMapUrl);
    const pages = /* parse the site map */
    await Promise.all(
      pages.map((page) =>
        ctx.runAction(internal.scrape.scrapeSinglePage, { url: page }),
      ),
    );
  },
});
```

convex/model/scrape.ts

TS

```
import { ActionCtx } from '../_generated/server';

// ✅ -- using a plain TypeScript function
export async function scrapeSinglePage(
  ctx: ActionCtx,
  { url }: { url: string },
) {
  const page = await fetch(url);
  const text = /* parse the page */
  await ctx.runMutation(internal.scrape.addPage, { url, text });
}
```

convex/scrape.ts

TS

```
import * as Scrape from './model/scrape';

export const scrapeWebsite = action({
  args: {
    siteMapUrl: v.string(),
  },
  handler: async (ctx, { siteMapUrl }) => {
    const siteMap = await fetch(siteMapUrl);
    const pages = /* parse the site map */
    await Promise.all(
      pages.map((page) => Scrape.scrapeSinglePage(ctx, { url: page })),
    );
  },
});
```

### How?[​](#how-7 "Direct link to How?")

Search for `runAction` in your Convex codebase, and see if the function it calls uses the same runtime as the parent function. If so, replace the `runAction` with a plain TypeScript function. You may want to structure your functions so the Node.js functions are in a separate directory so it's easier to spot these.

## Avoid sequential `ctx.runMutation` / `ctx.runQuery` calls from actions[​](#avoid-sequential-ctxrunmutation--ctxrunquery-calls-from-actions "Direct link to avoid-sequential-ctxrunmutation--ctxrunquery-calls-from-actions")

### Why?[​](#why-9 "Direct link to Why?")

Each `ctx.runMutation` or `ctx.runQuery` runs in its own transaction, which means if they're called separately, they may not be consistent with each other. If instead we call a single `ctx.runQuery` or `ctx.runMutation`, we're guaranteed that the results we get are consistent.

### How?[​](#how-8 "Direct link to How?")

Audit your calls to `ctx.runQuery` and `ctx.runMutation` in actions. If you see multiple in a row with no other code between them, replace them with a single `ctx.runQuery` or `ctx.runMutation` that handles both things. Refactoring your code to use helper functions will make this easier.

### Example: Queries[​](#example-queries "Direct link to Example: Queries")

convex/teams.ts

TS

```
// ❌ -- this assertion could fail if the team changed between running the two queries
const team = await ctx.runQuery(internal.teams.getTeam, { teamId });
const teamOwner = await ctx.runQuery(internal.teams.getTeamOwner, { teamId });
assert(team.owner === teamOwner._id);
```

convex/teams.ts

TS

```
import * as Teams from './model/teams';
import * as Users from './model/users';

export const sendBillingReminder = action({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    // ✅ -- this will always pass
    const teamAndOwner = await ctx.runQuery(internal.teams.getTeamAndOwner, {
      teamId,
    });
    assert(teamAndOwner.team.owner === teamAndOwner.owner._id);
    // send a billing reminder email to the owner
  },
});

export const getTeamAndOwner = internalQuery({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    const team = await Teams.load(ctx, { teamId });
    const owner = await Users.load(ctx, { userId: team.owner });
    return { team, owner };
  },
});
```

### Example: Loops[​](#example-loops "Direct link to Example: Loops")

convex/teams.ts

TS

```
import * as Users from './model/users';

export const importTeams = action({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    // Fetch team members from an external API
    const teamMembers = await fetchTeamMemberData(teamId);

    // ❌ This will run a separate mutation for inserting each user,
    // which means you lose transaction guarantees like atomicity.
    for (const member of teamMembers) {
      await ctx.runMutation(internal.teams.insertUser, member);
    }
  },
});
export const insertUser = internalMutation({
  args: { name: v.string(), email: v.string() },
  handler: async (ctx, { name, email }) => {
    await Users.insert(ctx, { name, email });
  },
});
```

convex/teams.ts

TS

```
import * as Users from './model/users';

export const importTeams = action({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, { teamId }) => {
    // Fetch team members from an external API
    const teamMembers = await fetchTeamMemberData(teamId);

    // ✅ This action runs a single mutation that inserts all users in the same transaction.
    await ctx.runMutation(internal.teams.insertUsers, teamMembers);
  },
});
export const insertUsers = internalMutation({
  args: { users: v.array(v.object({ name: v.string(), email: v.string() })) },
  handler: async (ctx, { users }) => {
    for (const { name, email } of users) {
      await Users.insert(ctx, { name, email });
    }
  },
});
```

### Exceptions[​](#exceptions-3 "Direct link to Exceptions")

If you're intentionally trying to process more data than fits in a single transaction, like running a migration or aggregating data, then it makes sense to have multiple sequential `ctx.runMutation` / `ctx.runQuery` calls.

Multiple `ctx.runQuery` / `ctx.runMutation` calls are often necessary because the action does a side effect in between them. For example, reading some data, feeding it to an external service, and then writing the result back to the database.

## Use `ctx.runQuery` and `ctx.runMutation` sparingly in queries and mutations[​](#use-ctxrunquery-and-ctxrunmutation-sparingly-in-queries-and-mutations "Direct link to use-ctxrunquery-and-ctxrunmutation-sparingly-in-queries-and-mutations")

### Why?[​](#why-10 "Direct link to Why?")

While these queries and mutations run in the same transaction, and will give consistent results, they have extra overhead compared to plain TypeScript functions. Wanting a TypeScript helper function is much more common than needing `ctx.runQuery` or `ctx.runMutation`.

### How?[​](#how-9 "Direct link to How?")

Audit your calls to `ctx.runQuery` and `ctx.runMutation` in queries and mutations. Unless one of the exceptions below applies, replace them with a plain TypeScript function.

### Exceptions[​](#exceptions-4 "Direct link to Exceptions")

* If you're using components, these require `ctx.runQuery` or `ctx.runMutation`.
* If you want partial rollback on an error, you will want `ctx.runMutation` instead of a plain TypeScript function.

convex/messages.ts

TS

```
export const trySendMessage = mutation({
  args: {
    body: v.string(),
    author: v.string(),
  },
  handler: async (ctx, { body, author }) => {
    try {
      await ctx.runMutation(internal.messages.sendMessage, { body, author });
    } catch (e) {
      // Record the failure, but rollback any writes from `sendMessage`
      await ctx.db.insert("failures", {
        kind: "MessageFailed",
        body,
        author,
        error: `Error: ${e}`,
      });
    }
  },
});
```

# TypeScript

Convex provides end-to-end type support when Convex functions are written in [TypeScript](https://www.typescriptlang.org/).

You can gradually add TypeScript to a Convex project: the following steps provide progressively better type support. For the best support you'll want to complete them all.

**Example:** [TypeScript and Schema](https://github.com/get-convex/convex-demos/tree/main/typescript)

## Writing Convex functions in TypeScript[​](#writing-convex-functions-in-typescript "Direct link to Writing Convex functions in TypeScript")

The first step to improving type support in a Convex project is to writing your Convex functions in TypeScript by using the `.ts` extension.

If you are using [argument validation](/functions/validation.md), Convex will infer the types of your functions arguments automatically:

convex/sendMessage.ts

```
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    body: v.string(),
    author: v.string(),
  },
  // Convex knows that the argument type is `{body: string, author: string}`.
  handler: async (ctx, args) => {
    const { body, author } = args;
    await ctx.db.insert("messages", { body, author });
  },
});
```

Otherwise you can annotate the arguments type manually:

convex/sendMessage.ts

```
import { internalMutation } from "./_generated/server";

export default internalMutation({
  // To convert this function from JavaScript to
  // TypeScript you annotate the type of the arguments object.
  handler: async (ctx, args: { body: string; author: string }) => {
    const { body, author } = args;
    await ctx.db.insert("messages", { body, author });
  },
});
```

This can be useful for [internal functions](/functions/internal-functions.md) accepting complicated types.

If TypeScript is installed in your project `npx convex dev` and `npx convex deploy` will typecheck Convex functions before sending code to the Convex backend.

Convex functions are typechecked with the `tsconfig.json` in the Convex folder: you can modify some parts of this file to change typechecking settings, or delete this file to disable this typecheck.

You'll find most database methods have a return type of `Promise<any>` until you add a schema.

## Adding a schema[​](#adding-a-schema "Direct link to Adding a schema")

Once you [define a schema](/database/schemas.md) the type signature of database methods will be known. You'll also be able to use types imported from `convex/_generated/dataModel` in both Convex functions and clients written in TypeScript (React, React Native, Node.js etc.).

The types of documents in tables can be described using the [`Doc`](/generated-api/data-model.md#doc) type from the generated data model and references to documents can be described with parametrized [Document IDs](/database/document-ids.md).

convex/messages.ts

```
import { query } from "./_generated/server";

export const list = query({
  args: {},
  // The inferred return type of `handler` is now `Promise<Doc<"messages">[]>`
  handler: (ctx) => {
    return ctx.db.query("messages").collect();
  },
});
```

## Type annotating server-side helpers[​](#type-annotating-server-side-helpers "Direct link to Type annotating server-side helpers")

When you want to reuse logic across Convex functions you'll want to define helper TypeScript functions, and these might need some of the provided context, to access the database, authentication and any other Convex feature.

Convex generates types corresponding to documents and IDs in your database, `Doc` and `Id`, as well as `QueryCtx`, `MutationCtx` and `ActionCtx` types based on your schema and declared Convex functions:

convex/helpers.ts

```
// Types based on your schema
import { Doc, Id } from "./_generated/dataModel";
// Types based on your schema and declared functions
import {
  QueryCtx,
  MutationCtx,
  ActionCtx,
  DatabaseReader,
  DatabaseWriter,
} from "./_generated/server";
// Types that don't depend on schema or function
import {
  Auth,
  StorageReader,
  StorageWriter,
  StorageActionWriter,
} from "convex/server";

// Note that a `MutationCtx` also satisfies the `QueryCtx` interface
export function myReadHelper(ctx: QueryCtx, id: Id<"channels">) {
  /* ... */
}

export function myActionHelper(ctx: ActionCtx, doc: Doc<"messages">) {
  /* ... */
}
```

### Inferring types from validators[​](#inferring-types-from-validators "Direct link to Inferring types from validators")

Validators can be reused between [argument validation](/functions/validation.md) and [schema validation](/database/schemas.md). You can use the provided [`Infer`](/api/modules/values.md#infer) type to get a TypeScript type corresponding to a validator:

convex/helpers.ts

```
import { Infer, v } from "convex/values";

export const courseValidator = v.union(
  v.literal("appetizer"),
  v.literal("main"),
  v.literal("dessert"),
);

// The corresponding type can be used in server or client-side helpers:
export type Course = Infer<typeof courseValidator>;
// is inferred as `'appetizer' | 'main' | 'dessert'`
```

### Document types without system fields[​](#document-types-without-system-fields "Direct link to Document types without system fields")

All documents in Convex include the built-in `_id` and `_creationTime` fields, and so does the generated `Doc` type. When creating or updating a document you might want use the type without the system fields. Convex provides [`WithoutSystemFields`](/api/modules/server.md#withoutsystemfields) for this purpose:

convex/helpers.ts

```
import { MutationCtx } from "./_generated/server";
import { WithoutSystemFields } from "convex/server";
import { Doc } from "./_generated/dataModel";

export async function insertMessageHelper(
  ctx: MutationCtx,
  values: WithoutSystemFields<Doc<"messages">>,
) {
  // ...
  await ctx.db.insert("messages", values);
  // ...
}
```

## Writing frontend code in TypeScript[​](#writing-frontend-code-in-typescript "Direct link to Writing frontend code in TypeScript")

All Convex JavaScript clients, including React hooks like [`useQuery`](/api/modules/react.md#usequery) and [`useMutation`](/api/modules/react.md#usemutation) provide end to end type safety by ensuring that arguments and return values match the corresponding Convex functions declarations. For React, install and configure TypeScript so you can write your React components in `.tsx` files instead of `.jsx` files.

Follow our [React](/quickstart/react.md) or [Next.js](/quickstart/nextjs.md) quickstart to get started with Convex and TypeScript.

### Type annotating client-side code[​](#type-annotating-client-side-code "Direct link to Type annotating client-side code")

When you want to pass the result of calling a function around your client codebase, you can use the generated types `Doc` and `Id`, just like on the backend:

src/App.tsx

```
import { Doc, Id } from "../convex/_generated/dataModel";

function Channel(props: { channelId: Id<"channels"> }) {
  // ...
}

function MessagesView(props: { message: Doc<"messages"> }) {
  // ...
}
```

You can also declare custom types inside your backend codebase which include `Doc`s and `Id`s, and import them in your client-side code.

You can also use `WithoutSystemFields` and any types inferred from validators via `Infer`.

#### Using inferred function return types[​](#using-inferred-function-return-types "Direct link to Using inferred function return types")

Sometimes you might want to annotate a type on the client based on whatever your backend function returns. Beside manually declaring the type (on the backend or on the frontend), you can use the generic `FunctionReturnType` and `UsePaginatedQueryReturnType` types with a function reference:

src/Components.tsx

```
import { FunctionReturnType } from "convex/server";
import { UsePaginatedQueryReturnType } from "convex/react";
import { api } from "../convex/_generated/api";

export function MyHelperComponent(props: {
  data: FunctionReturnType<typeof api.myFunctions.getSomething>;
}) {
  // ...
}

export function MyPaginationHelperComponent(props: {
  paginatedData: UsePaginatedQueryReturnType<
    typeof api.myFunctions.getSomethingPaginated
  >;
}) {
  // ...
}
```

## Turning `string`s into valid document IDs[​](#turning-strings-into-valid-document-ids "Direct link to turning-strings-into-valid-document-ids")

See [Serializing IDs](/database/document-ids.md#serializing-ids).

## Required TypeScript version[​](#required-typescript-version "Direct link to Required TypeScript version")

Convex requires TypeScript version [5.0.3](https://www.npmjs.com/package/typescript/v/5.0.3) or newer.

Related posts from

<!-- -->

[![Stack](/img/stack-logo-dark.svg)![Stack](/img/stack-logo-light.svg)](https://stack.convex.dev/)

