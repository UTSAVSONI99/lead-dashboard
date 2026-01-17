import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  await connectDB();

  // Count total leads
  const totalLeads = await Lead.countDocuments();

  // Count by status
  const newLeads = await Lead.countDocuments({ status: "New" });
  const contactedLeads = await Lead.countDocuments({ status: "Contacted" });
  const convertedLeads = await Lead.countDocuments({ status: "Converted" });
  const lostLeads = await Lead.countDocuments({ status: "Lost" });

  return NextResponse.json({
    totalLeads,
    newLeads,
    contactedLeads,
    convertedLeads,
    lostLeads,
  });
}
