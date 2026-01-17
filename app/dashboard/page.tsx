"use client";

import { useEffect, useState } from "react";
import LeadsTable from "./components/LeadsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, PhoneCall, CheckCircle, XCircle } from "lucide-react";
import { StatCard } from "./statcard";

type Analytics = {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  lostLeads: number;
};

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(() => setAnalytics(null));
  }, []);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Lead Management Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track, filter, and manage customer leads efficiently
          </p>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            title="Total Leads"
            value={analytics.totalLeads}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            accent="border-blue-500"
          />
          <StatCard
            title="New Leads"
            value={analytics.newLeads}
            icon={<UserPlus className="h-5 w-5 text-green-600" />}
            accent="border-green-500"
          />
          <StatCard
            title="Contacted"
            value={analytics.contactedLeads}
            icon={<PhoneCall className="h-5 w-5 text-yellow-600" />}
            accent="border-yellow-500"
          />
          <StatCard
            title="Converted"
            value={analytics.convertedLeads}
            icon={<CheckCircle className="h-5 w-5 text-purple-600" />}
            accent="border-purple-500"
          />
          <StatCard
            title="Lost"
            value={analytics.lostLeads}
            icon={<XCircle className="h-5 w-5 text-red-600" />}
            accent="border-red-500"
          />
        </div>

        {/* Leads Table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Leads</CardTitle>
            <p className="text-sm text-muted-foreground">
              View and filter all customer leads
            </p>
          </CardHeader>
          <CardContent>
            <LeadsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
