import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import {
    ChevronUp,
    ChevronDown,
    LogOut,
    Settings,
} from "lucide-react";
import { cn, useSignOut } from "@/utils/misc";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { buttonVariants } from "@/ui/button-util";
import { User } from "~/types";

// Route imports - using strings for links now to avoid type errors
// but keeping imports if needed for route matching logic logic that accepts Route objects
import { Route as DashboardRoute } from "@/routes/_app/_auth/dashboard/_layout.index";
import { Route as SettingsRoute } from "@/routes/_app/_auth/dashboard/_layout.settings.index";

// Color constants matching marketing pages & dashboard styling
const colors = {
    headerBg: "#FAFAF8",
    border: "#E8E4DA",
    primary: "#3C4A32",
    text: "#2A2A20",
    textMuted: "#5C5C54",
};

interface DashboardHeaderProps {
    user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    const signOut = useSignOut();
    const matchRoute = useMatchRoute();
    const navigate = useNavigate();

    // Route matching helpers
    const isDashboardPath = matchRoute({ to: DashboardRoute.fullPath });
    const isSettingsPath = matchRoute({ to: SettingsRoute.fullPath });
    const isAdminPath = matchRoute({ to: "/dashboard/admin" });

    if (!user) return null;

    return (
        <header
            className="sticky top-0 z-50 flex w-full flex-col border-b"
            style={{
                backgroundColor: colors.headerBg,
                borderColor: colors.border,
            }}
        >
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
                {/* Left Side: Logo & Navigation */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex-shrink-0">
                        <img
                            src="/images/logotext.png"
                            alt="DebateClub"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            to="/dashboard"
                            className={cn(
                                `${buttonVariants({ variant: "ghost", size: "sm" })} text-sm font-medium transition-colors`,
                                isDashboardPath
                                    ? "bg-black/5 text-primary"
                                    : "text-primary/70 hover:text-primary hover:bg-black/5"
                            )}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/dashboard/settings"
                            className={cn(
                                `${buttonVariants({ variant: "ghost", size: "sm" })} text-sm font-medium transition-colors`,
                                isSettingsPath
                                    ? "bg-black/5 text-primary"
                                    : "text-primary/70 hover:text-primary hover:bg-black/5"
                            )}
                        >
                            Settings
                        </Link>

                        {user.isAdmin && (
                            <Link
                                to="/dashboard/admin"
                                className={cn(
                                    `${buttonVariants({ variant: "ghost", size: "sm" })} text-sm font-medium transition-colors`,
                                    isAdminPath
                                        ? "bg-black/5 text-primary"
                                        : "text-primary/70 hover:text-primary hover:bg-black/5"
                                )}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Right Side: User Menu */}
                <div className="flex items-center gap-3">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="gap-2 px-2 data-[state=open]:bg-primary/5 hover:bg-primary/5"
                            >
                                <div className="flex items-center gap-2">
                                    {user.avatarUrl ? (
                                        <img
                                            className="h-8 w-8 rounded-full object-cover border border-border"
                                            alt={user.username ?? user.email}
                                            src={user.avatarUrl}
                                        />
                                    ) : (
                                        <span className="h-8 w-8 rounded-full bg-gradient-to-br from-lime-400 from-10% via-cyan-300 to-blue-500" />
                                    )}

                                    <div className="text-left hidden sm:block">
                                        <p className="text-sm font-medium leading-none" style={{ color: colors.text }}>
                                            {user?.username || "User"}
                                        </p>
                                    </div>
                                </div>
                                <span className="flex flex-col items-center justify-center">
                                    <ChevronUp className="relative top-[3px] h-[10px] w-[10px] stroke-[2px] text-primary/60" />
                                    <ChevronDown className="relative bottom-[3px] h-[10px] w-[10px] stroke-[2px] text-primary/60" />
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            sideOffset={8}
                            align="end"
                            className="min-w-56 bg-white p-2 border-border"
                        >
                            <DropdownMenuLabel className="flex items-center text-xs font-normal text-muted-foreground px-2 py-1.5">
                                {user?.email}
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="mx-0 my-1 bg-border" />

                            <DropdownMenuItem
                                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2 focus:bg-primary/5"
                                onClick={() => navigate({ to: "/dashboard/settings" })}
                            >
                                <span className="text-sm text-primary/80 group-hover:text-primary">
                                    Settings
                                </span>
                                <Settings className="h-4 w-4 text-primary/60 group-hover:text-primary" />
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="mx-0 my-1 bg-border" />

                            <DropdownMenuItem
                                className="group h-9 w-full cursor-pointer justify-between rounded-md px-2 text-red-600 focus:bg-red-50 focus:text-red-700"
                                onClick={() => signOut()}
                            >
                                <span className="text-sm font-medium">
                                    Log Out
                                </span>
                                <LogOut className="h-4 w-4" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
