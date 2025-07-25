"use server"

import { RegisterUserData } from "@/types/registerUserType";
import bcrypt from "bcryptjs";


export async function registerUser(data: RegisterUserData) {
    try {

        const { email, password, name } = data;

        if (!email || !password || !name) {
            throw new Error("Missing Info");
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = {
            email,
            name,
            hashedPassword,
        };
        console.log("User registered:", user);

        return user;
    } catch (error: unknown) {
        console.error("Registration error:", error);
        throw new Error("Failed to register user");
    }
}