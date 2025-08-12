import connectDB from "@/config/database";
import { UserAlreadyExistsException } from "@/exceptions";
import User from "@/models/User";
import { TUser, UserAuthType } from "@/types/user";
import bcrypt from "bcryptjs";

export class UserService {
  // Create a new user
  static async createUser(userData: {
    name: string;
    email: string;
    password?: string;
    authType: UserAuthType;
  }): Promise<TUser> {
    await connectDB();

    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new UserAlreadyExistsException(userData.email);
      }

      if (
        userData.authType === UserAuthType.CREDENTIALS &&
        !userData.password
      ) {
        throw new Error("Password is required for credentials authentication");
      }

      const user = new User({
        name: userData.name,
        email: userData.email,
        authType: userData.authType,
        password: userData.password,
      });
      await user.save();

      // Return plain object without password
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findUserByEmail(email: string): Promise<TUser | null> {
    await connectDB();

    try {
      const user = await User.findOne({ email });
      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findUserById(id: string): Promise<TUser | null> {
    await connectDB();

    try {
      const user = await User.findById(id);
      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async updateUser(
    id: string,
    updateData: Partial<{ name: string; email: string; password: string }>
  ): Promise<TUser | null> {
    await connectDB();

    try {
      let user = null;
      if (updateData.password && updateData.password.length >= 6) {
        user = await User.findByIdAndUpdate(
          id,
          {
            name: updateData.name,
            password: await this.getHash(updateData.password),
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        user = await User.findByIdAndUpdate(
          id,
          {
            name: updateData.name,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    await connectDB();

    try {
      const result = await User.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      throw error;
    }
  }

  // Authenticate user
  static async authenticateUser(
    email: string,
    password: string
  ): Promise<TUser | null> {
    await connectDB();

    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return null;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return null;
      }

      // Return plain object without password
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get all users (for admin purposes)
  static async getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<{ users: TUser[]; total: number }> {
    await connectDB();

    try {
      const skip = (page - 1) * limit;
      const users = await User.find({})
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await User.countDocuments();

      // Convert to plain objects
      const plainUsers: TUser[] = users.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        authType: user.authType,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      return { users: plainUsers, total };
    } catch (error) {
      throw error;
    }
  }

  static async getHash(text: string): Promise<string> {
    return await bcrypt.hash(text, 12);
  }
}
