//Controllers to use the usermodel to handle login and registration database work
import { Request, Response } from 'express';
import { users } from '../models/userModel';
import { db } from '../dbConnection/dbConnection';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export class UserController {
  // Register a new user
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
      }).returning();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  // Login a user
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      res.status(200).json({ message: 'Login successful', user: user[0] });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  }
}