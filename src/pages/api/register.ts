// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prismaClient";
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //  console.log("register endpoint: ", req.body);
  await prisma.sigleVisit.create({
    data: req.body,
  });

  res.status(200).json({ name: "John Doe" });
}
