import mongoose, { Document, Schema } from "mongoose";

export interface IShortUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  userId: Schema.Types.ObjectId;
  clicked: number;
}

const ShortUrlSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clicked: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShortUrl = mongoose.model<Document & IShortUrl>(
  "ShortUrl",
  ShortUrlSchema
);

export default ShortUrl;
