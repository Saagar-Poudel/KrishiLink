//Controllers to use the usermodel to handle login and registration database work
import { Request, Response } from 'express';
import { users } from '../models/schema';
import { db } from '../dbConnection/dbConnection';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { generateToken } from './authController';

export class UserController {
  // Register a new user
  static async register(req: Request, res: Response) {
    const { username, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.insert(users).values({
        username,
        email,
        password: hashedPassword,
        role: role || 'buyer', //default to "buyer"
      }).returning();

      // res.status(201).json({ message: 'User registered successfully', user: newUser });
       res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email,
        role: newUser[0].role,
      }
    });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }

  // Login a user
  static async login(req: Request, res: Response) {
    const { email, password, role } = req.body;

    try {
      const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (user.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = generateToken({ id: user[0].id, username: user[0].username, role: user[0].role ?? '' });

      // res.status(200).json({ message: 'Login successful', user: user[0], token: token });
      res.status(200).json({
  message: 'Login successful',
  user: {
    id: user[0].id,
    username: user[0].username,
    email: user[0].email,
    role: user[0].role || 'buyer',  // ensure singular
  },
  token: token
});
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  }
}