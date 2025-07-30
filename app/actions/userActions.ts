"use server";

import { RegisterUserData } from "@/types/registerUserType";
import connectToDB from "../../config/database";
import { UserService } from "@/service/userService";
import { UserAlreadyExistsException } from "@/exceptions";

export async function registerUser(data: RegisterUserData) {
  try {
    const { email, password, name, authType } = data;

    if (!email || !password || !name || !authType) {
      throw new Error("Missing Info");
    }
    await connectToDB();
    const user = await UserService.createUser({
      name,
      email,
      password,
      authType,
    });

    return user;
  } catch (error: unknown) {
    console.error("Registration error:", error);
    if (error instanceof UserAlreadyExistsException) {
      throw new Error("User already exists");
    }
    throw new Error("Failed to register user");
  }
}

export async function findUserByEmail(email: string) {
  try {
    await connectToDB();
    const user = await UserService.findUserByEmail(email);
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Failed to find user");
  }
}
