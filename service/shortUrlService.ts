import connectDB from "@/config/database";
import ShortUrl from "@/models/ShortUrl";
import { TShortUrl } from "@/types/shortUrl";

export class ShortUserService {
  static async createShortUrl(
    originalUrl: string,
    userId: string
  ): Promise<TShortUrl> {
    await connectDB();
    while (true) {
      const shortUrl = this.generateBase62Id(6);
      try {
        const url = await ShortUrl.create({ originalUrl, shortUrl, userId });
        return {
          originalUrl: originalUrl,
          shortUrl: url.shortUrl,
          userId: userId,
          clicked: url.clicked,
        };
      } catch (err: unknown) {
        if (err && typeof err === "object" && "code" in err) {
          const code = (err as { code?: number }).code;
          if (code === 11000) {
            continue;
          }
        }
        throw err;
      }
    }
  }

  static generateBase62Id(length = 6): string {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
