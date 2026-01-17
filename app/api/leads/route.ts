import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET(request: Request) {
  await connectDB();

  const {
    search,
    status,
    page = "1",
    limit = "10",
    sortField,
    sortOrder,
  } = Object.fromEntries(new URL(request.url).searchParams.entries());

  const pageNumber = parseInt(page as string) || 1;
  const limitNumber = parseInt(limit as string) || 10;

  //  filter
  const filter: any = {};
  if (search && search.trim().length >= 2) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [{ name: regex }, { email: regex }];
  }

  if (status && status !== "ALL") {
    filter.status = status;
  }

  // Sorting
  const sort: any = {};
  if (sortField) {
    sort[sortField] = sortOrder === "desc" ? -1 : 1;
  } else {
    sort.name = 1; // default sort by name asc
  }

  const total = await Lead.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNumber);

  const leads = await Lead.find(filter)
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  return NextResponse.json({
    data: leads,
    pagination: { total, totalPages, page: pageNumber },
  });
}
