import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const visits = await prisma.sigleVisit.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send({ visits });
  } catch (error) {
    return res.status(401).send(error);
  }
}
