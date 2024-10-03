import { NextRequest, NextResponse } from "next/server";
import { POST as originalPost } from "next-s3-upload/route";

export async function POST(request: NextRequest) {
  console.log(
    "------------------------------------- S3 UPLOAD -------------------------------------"
  );
  return originalPost(request);
}
