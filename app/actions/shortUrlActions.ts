"use server";
import { ShortUserService } from "@/service/shortUrlService";

export async function createShortUrl(originalUrl: string, userId: string) {
  if (!originalUrl || !userId) {
    throw new Error("Invalid input");
  }
  return await ShortUserService.createShortUrl(originalUrl, userId);
}
