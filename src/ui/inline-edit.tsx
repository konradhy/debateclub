import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Pencil, Trash2, Plus } from "lucide-react";

interface InlineEditProps {
    isEditing: boolean;
    isAdding?: boolean;
    onEdit: () => void;
    onDelete?: () => void;
    onSave: (data: any) => void;
    onCancel: () => void;
    children: React.ReactNode;
    formFields: {
        name: string;
        label: string;
        type: "text" | "textarea" | "select";
        options?: string[];
        required?: boolean;
        rows?: number;
        placeholder?: string;
    }[];
    initialData?: any;
}

export function InlineEdit({
    isEditing,
    isAdding,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    children,
    formFields,
    initialData,
}: InlineEditProps) {
    const [formData, setFormData] = useState(() => {
        const defaults: any = { ...initialData };
        formFields.forEach(field => {
            if (defaults[field.name] === undefined) {
                if (field.type === "select" && field.options && field.options.length > 0) {
                    defaults[field.name] = field.options[0];
                }
            }
        });
        return defaults;
    });

    const handleSave = () => {
        onSave(formData);
        // Reset form data for "Add" mode, but keep defaults
        if (isAdding) {
            const defaults: any = {};
            formFields.forEach(field => {
                if (field.type === "select" && field.options && field.options.length > 0) {
                    defaults[field.name] = field.options[0];
                }
            });
            setFormData(defaults);
        }
    };

    const handleCancel = () => {
        onCancel();
        setFormData(initialData || {});
    };

    if (isEditing || isAdding) {
        return (
            <div className="space-y-3 p-4 border border-primary/30 rounded-lg bg-primary/5">
                {formFields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        <Label htmlFor={field.name} className="text-xs font-medium">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                        </Label>
                        {field.type === "text" && (
                            <Input
                                id={field.name}
                                value={formData[field.name] || ""}
                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                className="text-sm"
                                placeholder={field.placeholder}
                            />
                        )}
                        {field.type === "textarea" && (
                            <Textarea
                                id={field.name}
                                value={formData[field.name] || ""}
                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                rows={field.rows || 3}
                                className="text-sm"
                                placeholder={field.placeholder}
                            />
                        )}
                        {field.type === "select" && field.options && (
                            <select
                                id={field.name}
                                value={formData[field.name] || field.options[0]}
                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                            >
                                {field.options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <div className="flex gap-2 justify-end pt-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                        {isAdding ? "Add" : "Save"}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            {children}
            <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background/80 backdrop-blur-sm rounded-md border border-border shadow-sm p-0.5">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEdit}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                >
                    <Pencil className="h-3.5 w-3.5 text-primary" />
                </Button>
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onDelete}
                        className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                )}
            </div>
        </div>
    );
}

interface AddButtonProps {
    onClick: () => void;
    label: string;
}

export function AddButton({ onClick, label }: AddButtonProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className="w-full border-dashed"
        >
            <Plus className="h-4 w-4 mr-2" />
            {label}
        </Button>
    );
}
