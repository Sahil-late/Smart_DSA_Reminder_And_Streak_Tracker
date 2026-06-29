// app/api/test/route.js

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_ID: process.env.GOOGLE_ID,
    NODE_ENV: process.env.NODE_ENV,
  });
}