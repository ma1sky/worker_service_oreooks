import type { Request, Response } from "express";
import { getToken } from '../services/orioks.auth.service.js';
import { createUser } from '../utils/user.db.js';

export const createUser = async (req:Request, res:Response) => {
  try {
    const { tgId, login, password } = req.body;

    const token = await getToken(login, password);
    await createUser(tgId, token);

    return res.status(201).json({
      message: "User created"
    });

  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error creating user"
    });
  }
};