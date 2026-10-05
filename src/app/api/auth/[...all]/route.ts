import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Route all /api/auth/* requests through Better Auth handler
export const { GET, POST } = toNextJsHandler(auth);
