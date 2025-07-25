import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { UserAuthType } from "@/types/user";

// Simple User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  authType: UserAuthType;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type TUser = {
  name: string;
  email: string;
  authType: UserAuthType;
  createdAt: Date;
  updatedAt: Date;
};

// Simple User schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    authType: {
      type: String,
      enum: UserAuthType,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
