//imported in leads-table.tsx
import { Badge } from "@/components/ui/badge";

type LeadStatus = "New" | "Contacted" | "Converted" | "Lost";

export function StatusBadge({ status }: { status: LeadStatus }) {
  if (status === "Converted")
    return <Badge className="bg-green-600">Converted</Badge>;

  if (status === "Lost") return <Badge variant="destructive">Lost</Badge>;

  if (status === "Contacted")
    return <Badge className="bg-yellow-500">Contacted</Badge>;

  return <Badge className="bg-blue-600">New</Badge>;
}
