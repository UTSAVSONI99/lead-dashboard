"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StautsBadge";
type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: "New" | "Contacted" | "Converted" | "Lost";
};

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  /* Fetch function*/
  const fetchLeads = (
    rawQuery = search,
    currentPage = page,
    currentStatus = status,
  ) => {
    const query = rawQuery.trim();

    setLoading(true);

    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "10",
      ...(query.length >= 2 && { search: query }),
      ...(currentStatus !== "ALL" && { status: currentStatus }),
    });

    fetch(`/api/leads?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setLeads(data?.data || []);
        setTotalPages(data?.pagination?.totalPages || 1);
      })
      .finally(() => setLoading(false));
  };

  /* Initial load */
  useEffect(() => {
    fetchLeads("", 1, "ALL");
  }, []);

  /* Search  */
  const handleSearchChange = (value: string) => {
    const cleaned = value.replace(/^\s+/, "");
    setSearch(cleaned);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchLeads(cleaned, 1, status);
    }, 500);
  };

  /* Status change */
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
    fetchLeads(search, 1, value);
  };

  /* Pagination */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchLeads(search, newPage, status);
  };

  return (
    <div className="rounded-xl border bg-background p-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
            <SelectItem value="Lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                No leads found
              </TableCell>
            </TableRow>
          )}

          {leads.map((lead) => (
            <TableRow key={lead._id}>
              <TableCell>{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.phone}</TableCell>
              <TableCell>
                <StatusBadge status={lead.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
