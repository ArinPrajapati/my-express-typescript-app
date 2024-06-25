import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export class User {
  public static async signup(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "User with this email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      // Generate JWT token

      const secret = process.env.JWT_SECRET as string;
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1d" });

      return res.status(200).json({ token });
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  }

  public static async currentUser(req: Request, res: Response) {
    try {
      const { userId } = req.data as { [key: string]: string | number };
      const parsedUserId = parseInt(userId as string); // Parse userId to integer
      const user = await prisma.user.findUnique({
        where: { id: parsedUserId },
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    } finally {
      await prisma.$disconnect();
    }
  }

  public static async updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.data as { [key: string]: string | number };
      const { ...data } = req.body;
      const parsedUserId = parseInt(userId as string); // Parse userId to integer
      const user = await prisma.user.findUnique({
        where: { id: parsedUserId },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const updatedUser = await prisma.user.update({
        where: { id: parsedUserId },
        data,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      prisma.$disconnect();
    }
  }

  public static async getAllUsers(req: Request, res: Response) {
    try {
      if (!req.data) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { userId } = req.data as { [key: string]: string | number };
      const parsedUserId = parseInt(userId as string); // Parse userId to integer
      const user = await prisma.user.findUnique({
        where: { id: parsedUserId },
      });

      if (user?.role !== "ADMIN") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    } finally {
      prisma.$disconnect();
    }
  }
}
