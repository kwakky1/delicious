import clientPromise from "@/lib/database";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const data = await client
      .db("breezm")
      .collection("staff")
      .findOne({ _id: new ObjectId("64c5ee7adf1fa3a578cbabf3") }); // 데이터베이스 쿼리의 결과를 기다립니다.
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.error();
  }
}
