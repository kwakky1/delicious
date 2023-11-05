import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, staff } = body;

    const client = await clientPromise;
    const data = await client
      .db("breezm")
      .collection("staff")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            staff,
          },
        }
      );

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.error();
  }
}
