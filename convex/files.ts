import { v } from "convex/values";
import { action } from "./_generated/server";

export const saveImage = action({
  args: {
    filename: v.string(),
    filetype: v.string(),
  },
  handler: async (ctx, { filename, filetype }) => {
    const data = await fetch("http://localhost:3000/api/s3-upload", {
      body: JSON.stringify({
        filename: filename,
        filetype: filetype,
        _nextS3: { strategy: "aws-sdk" },
      }),
      method: "POST",
    });

    return data;
  },
});
