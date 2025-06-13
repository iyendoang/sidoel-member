import { Badge } from "@/components/ui/badge";

type Status = "active" | "in_active" | "suspended";

interface BadgeStatusProps {
    status?: string; // Bisa undefined
}

const statusMap: Record<Status, { label: string; variant: "default" | "destructive" | "secondary" }> = {
    active: { label: "Active", variant: "default" },
    in_active: { label: "Inactive", variant: "destructive" },
    suspended: { label: "Suspended", variant: "secondary" },
};

export function BadgeStatus({ status }: BadgeStatusProps) {
    const { label, variant } = statusMap[status as Status] || {
        label: "Unknown",
        variant: "outline" as const,
    };

    return <Badge variant={variant}>{label}</Badge>;
}
