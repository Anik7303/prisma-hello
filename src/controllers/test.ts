import { Request, Response } from "express";

export function get(_req: Request, res: Response) {
  res.json({ status: "OK" });
}
