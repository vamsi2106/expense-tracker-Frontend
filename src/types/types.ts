// src/types/types.ts
import { ReactNode } from "react";

export interface User {
  role: string;
  username: string;
  userId: string | null;
  id: string;
  email: string;
}
