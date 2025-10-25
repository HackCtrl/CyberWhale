import { eq, and, gt } from "drizzle-orm";
import { db } from "./db";
import { users, challenges, type User, type InsertUser, type Challenge, type InsertChallenge } from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  verifyUserEmail(userId: number): Promise<void>;
  setVerificationCode(userId: number, code: string): Promise<void>;
  getUserByVerificationCode(code: string): Promise<User | undefined>;
  setResetPasswordCode(email: string, code: string, expires: Date): Promise<void>;
  getUserByResetCode(code: string): Promise<User | undefined>;
  
  // Challenge management
  getAllChallenges(): Promise<Challenge[]>;
  getChallenge(id: number): Promise<Challenge | undefined>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  updateChallenge(id: number, updates: Partial<Challenge>): Promise<Challenge | undefined>;
  deleteChallenge(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User management methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async verifyUserEmail(userId: number): Promise<void> {
    await db.update(users)
      .set({ emailVerified: true, verificationCode: null })
      .where(eq(users.id, userId));
  }

  async setVerificationCode(userId: number, code: string): Promise<void> {
    await db.update(users)
      .set({ verificationCode: code })
      .where(eq(users.id, userId));
  }

  async getUserByVerificationCode(code: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.verificationCode, code));
    return result[0];
  }

  async setResetPasswordCode(email: string, code: string, expires: Date): Promise<void> {
    await db.update(users)
      .set({ resetPasswordCode: code, resetPasswordExpires: expires })
      .where(eq(users.email, email));
  }

  async getUserByResetCode(code: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(
      and(
        eq(users.resetPasswordCode, code),
        gt(users.resetPasswordExpires, new Date())
      )
    );
    return result[0];
  }

  // Challenge management methods
  async getAllChallenges(): Promise<Challenge[]> {
    const result = await db.select().from(challenges).where(eq(challenges.isActive, true));
    return result;
  }

  async getChallenge(id: number): Promise<Challenge | undefined> {
    const result = await db.select().from(challenges).where(eq(challenges.id, id));
    return result[0];
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const result = await db.insert(challenges).values(challenge).returning();
    return result[0];
  }

  async updateChallenge(id: number, updates: Partial<Challenge>): Promise<Challenge | undefined> {
    const result = await db.update(challenges).set(updates).where(eq(challenges.id, id)).returning();
    return result[0];
  }

  async deleteChallenge(id: number): Promise<void> {
    await db.update(challenges).set({ isActive: false }).where(eq(challenges.id, id));
  }
}

export const storage = new DatabaseStorage();
