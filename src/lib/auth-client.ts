import { createAuthClient } from "better-auth/react";

// Better Auth client instance for browser authentication operations
export const authClient = createAuthClient();

export const { signUp, signIn, signOut, useSession } = authClient;
