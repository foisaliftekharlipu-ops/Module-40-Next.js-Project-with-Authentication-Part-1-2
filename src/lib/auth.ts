import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// MongoDB connection instance (dedicated database: bangla-news-24)
const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("bangla-news-24");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  // 41-3: Credential (Email + Password) Authentication
  emailAndPassword: {
    enabled: true,
  },

  // 41-6 & 41-7: Social (OAuth) Authentication
  socialProviders: {
    google: {
      clientId: (
        process.env.BETTER_AUTH_GOOGLE_CLIENT_ID ||
        process.env.GOOGLE_CLIENT_ID ||
        ""
      ).trim(),
      clientSecret: (
        process.env.BETTER_AUTH_GOOGLE_SECRET ||
        process.env.GOOGLE_CLIENT_SECRET ||
        ""
      ).trim(),
    },
    github: {
      clientId: (
        process.env.BETTER_AUTH_GITHUB_CLIENT_ID ||
        process.env.GITHUB_CLIENT_ID ||
        ""
      ).trim(),
      clientSecret: (
        process.env.BETTER_AUTH_GITHUB_SECRET ||
        process.env.GITHUB_CLIENT_SECRET ||
        ""
      ).trim(),
    },
  },
});
