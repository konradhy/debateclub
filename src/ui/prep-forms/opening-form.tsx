import { useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { Label } from "../label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";

interface OpeningFormProps {
    initialData?: {
        id?: string;
        type: string;
        hook: string;
        content: string;
        deliveryGuidance: string;
    };
    onSave: (data: any) => void;
    onCancel: () => void;
}

export function OpeningForm({ initialData, onSave, onCancel }: OpeningFormProps) {
    const [type, setType] = useState(initialData?.type || "Personal Story");
    const [hook, setHook] = useState(initialData?.hook || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [deliveryGuidance, setDeliveryGuidance] = useState(initialData?.deliveryGuidance || "");

    const handleSave = () => {
        const wordCount = content.trim().split(/\s+/).length;
        onSave({
            ...(initialData?.id && { id: initialData.id }),
            type,
            hook,
            content,
            wordCount,
            deliveryGuidance,
        });
    };

    return (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-secondary/20">
            <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                    <SelectTrigger id="type">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Personal Story">Personal Story</SelectItem>
                        <SelectItem value="Provocative Question">Provocative Question</SelectItem>
                        <SelectItem value="Bold Statement">Bold Statement</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="hook">Hook</Label>
                <Input
                    id="hook"
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    placeholder="Opening hook..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Full opening statement..."
                    rows={6}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="deliveryGuidance">Delivery Guidance</Label>
                <Textarea
                    id="deliveryGuidance"
                    value={deliveryGuidance}
                    onChange={(e) => setDeliveryGuidance(e.target.value)}
                    placeholder="How to deliver this opening..."
                    rows={2}
                />
            </div>

            <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={!hook || !content}>
                    Save
                </Button>
            </div>
        </div>
    );
}
