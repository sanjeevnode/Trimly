import { NextRequest, NextResponse } from "next/server";
import { ShortUserService } from "@/service/shortUrlService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortUrl: string }> }
) {
  const { shortUrl } = await params;

  try {
    const originalUrl = await ShortUserService.getOriginalUrl(shortUrl);

    if (originalUrl) {
      // Return a permanent redirect (301) to the original URL
      return NextResponse.redirect(originalUrl, 301);
    } else {
      // Short URL not found, return 404
      return NextResponse.redirect(new URL("/not-found", request.url), 302);
    }
  } catch (error) {
    console.error("Error redirecting short URL:", error);
    return NextResponse.redirect(new URL("/not-found", request.url), 302);
  }
}
