import * as React from "react";
import { X } from "lucide-react";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => onOpenChange(false)}
            />

            {/* Dialog Content */}
            <div className="relative z-50">{children}</div>
        </div>
    );
}

interface DialogContentProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
    return (
        <div
            className={`relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
}

interface DialogHeaderProps {
    children: React.ReactNode;
}

export function DialogHeader({ children }: DialogHeaderProps) {
    return <div className="px-6 pt-6 pb-4 space-y-2">{children}</div>;
}

interface DialogTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogTitle({ children, className = "" }: DialogTitleProps) {
    return (
        <h2 className={`text-lg font-semibold text-gray-900 dark:text-gray-100 ${className}`}>
            {children}
        </h2>
    );
}

interface DialogDescriptionProps {
    children: React.ReactNode;
}

export function DialogDescription({ children }: DialogDescriptionProps) {
    return (
        <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
    );
}
