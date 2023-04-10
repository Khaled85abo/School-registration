// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { primsaClient } from "../../../prisma/prismaClient";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // primsaClient.sigleVisit.create(req.body)
  res.status(200).json({ name: "John Doe" });
}
