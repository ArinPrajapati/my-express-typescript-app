import { Request, Response } from "express";

export class SampleController {
  public static getSample(req: Request, res: Response): void {
    res.status(200).json({ message: "Hello, TypeScript Express!" });
  }
}
