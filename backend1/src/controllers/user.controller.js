//Controllers to use the usermodel to handle login and registration database work
import { users } from "../models/schema.js";
import { db } from "../dbConnection/dbConnection.js";
import { eq, and, ne } from "drizzle-orm";
import bcrypt from "bcrypt";
import { generateToken } from "./auth.controller.js";

export class UserController {
  // Register a new user
  static async register(req, res) {
    const { username, email, password, role, address } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db
        .insert(users)
        .values({
          username,
          email,
          password: hashedPassword,
          role: role || "buyer",
          address: address,
        })
        .returning();

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error registering user" });
    }
  }

  // Login a user
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (user.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = generateToken({
        id: user[0].id,
        username: user[0].username,
        role: user[0].role ?? "",
      });

      res
        .status(200)
        .json({ message: "Login successful", user: user[0], token: token });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  }

  // Get user by username
  static async getUserByUsername(req, res) {
    const { username } = req.params;

    try {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1);

      if (user.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching user" });
    }
  }
  static async updateProfile(req, res) {
    const { id } = req.params; // userId from route
    const { username, address, image } = req.body;

    try {
      // ✅ Check if username exists for another user
      if (username) {
        const existingUser = await db
          .select()
          .from(users)
          .where(and(eq(users.username, username), ne(users.id, id)));

        if (existingUser.length > 0) {
          return res
            .status(400)
            .json({ error: "Username already taken. Please choose another." });
        }
      }

      // ✅ Update user
      const updatedUser = await db
        .update(users)
        .set({
          ...(username && { username }),
          ...(address && { address }),
          ...(image && { image }),
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      res.status(200).json({
        message: "Profile updated successfully",
        user: updatedUser[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating profile" });
    }
  }
}
