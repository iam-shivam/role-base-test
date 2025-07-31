// src/auth/interfaces/request-with-user.interface.ts
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    userId: string;
    username: string;
    role: string;
  };
}
// This interface extends the Express Request type to include a user property