import { Request, Response } from "express";
import * as testService from "../services/testService";

export async function test(req: Request, res: Response) {
  const test = await testService.test("TESTE");
  res.status(200).send({ test });
}
