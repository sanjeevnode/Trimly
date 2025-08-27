import { redirect, notFound } from "next/navigation";
import { ShortUserService } from "@/service/shortUrlService";

interface PageProps {
    params: Promise<{
        shortUrl: string;
    }>;
}

export default async function ShortUrlRedirect({ params }: PageProps) {
    const { shortUrl } = await params;

    // Basic validation for short URL format
    if (!shortUrl || shortUrl.length !== 6) {
        notFound();
    }

    let originalUrl: string | null = null;

    try {
        // Only wrap the database operation in try-catch
        originalUrl = await ShortUserService.getOriginalUrl(shortUrl);
    } catch (error) {
        // If it's a database/service error, log it and show not found
        console.error("Error finding short URL:", error);
        notFound();
    }

    if (originalUrl) {
        // Redirect to the original URL - let NEXT_REDIRECT bubble up naturally
        redirect(originalUrl);
    } else {
        // Short URL not found
        notFound();
    }

    // This return should never be reached, but TypeScript requires it
    return null;
}

// Optional: Add metadata for the page
export async function generateMetadata() {
    return {
        title: "Redirecting...",
        description: "Redirecting to the original URL",
    };
}
