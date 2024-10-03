import { NextRequest } from "next/server";
import { POST as originalPost } from "next-s3-upload/route";

export async function POST(request: NextRequest) {
  console.log(
    "------------------------------------- S3 UPLOAD -------------------------------------"
  );
  console.log("bucket:", process.env.S3_UPLOAD_BUCKET);
  console.log("region:", process.env.S3_UPLOAD_REGION);
  return originalPost(request);
}
