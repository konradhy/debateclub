import { Link, useMatchRoute } from "@tanstack/react-router";
import { LogOut, Menu } from "lucide-react";
import { cn, useSignOut } from "@/utils/misc";
import { useState } from "react";

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Route matching helpers
    const isDashboardPath = matchRoute({ to: DashboardRoute.fullPath });
    const isSettingsPath = matchRoute({ to: SettingsRoute.fullPath });
    const isAdminPath = matchRoute({ to: "/dashboard/admin" });

    if (!user) return null;

    return (
        <>
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
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex items-center justify-center h-11 w-11 rounded-lg hover:bg-primary/5 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" style={{ color: colors.primary }} />
                    </button>

                    {/* Log Out Button */}
                    <Button
                        variant="ghost"
                        onClick={() => signOut()}
                        className="gap-2 text-sm font-medium"
                    >
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>
        </header>

        {/* Mobile Navigation Menu - Bottom Sheet */}
        {isMobileMenuOpen && (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Bottom Sheet */}
                <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t rounded-t-xl shadow-2xl animate-slide-up">
                    <div className="flex flex-col p-4 gap-2">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center h-11 px-4 rounded-lg text-base font-medium transition-colors",
                                isDashboardPath
                                    ? "bg-black/5 text-primary"
                                    : "text-primary/70 hover:text-primary hover:bg-black/5"
                            )}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/dashboard/settings"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center h-11 px-4 rounded-lg text-base font-medium transition-colors",
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
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    "flex items-center h-11 px-4 rounded-lg text-base font-medium transition-colors",
                                    isAdminPath
                                        ? "bg-black/5 text-primary"
                                        : "text-primary/70 hover:text-primary hover:bg-black/5"
                                )}
                            >
                                Admin
                            </Link>
                        )}
                    </div>
                </div>
            </>
        )}
        </>
    );
}
