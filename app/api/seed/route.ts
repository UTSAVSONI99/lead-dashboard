import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

//  Generate random status based on given distribution

function getRandomStatus(): "New" | "Contacted" | "Converted" | "Lost" {
  const rand = Math.random();

  if (rand < 0.45) return "New";
  if (rand < 0.7) return "Contacted";
  if (rand < 0.9) return "Converted";
  return "Lost";
}

function generatePhone(): string {
  let number = "9";
  for (let i = 0; i < 9; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return `+91 ${number}`;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    // Clear existing leads
    await Lead.deleteMany();

    const leads = [];

    for (let i = 1; i <= 1000; i++) {
      leads.push({
        name: `Lead User ${i}`,
        email: `lead${i}@example.com`,
        phone: generatePhone(),
        status: getRandomStatus(),
      });
    }

    await Lead.insertMany(leads);

    return NextResponse.json({
      success: true,
      message: "Leads seeded successfully",
      total: leads.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed leads" },
      { status: 500 },
    );
  }
}
