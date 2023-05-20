// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prismaClient";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("req body: ", req.body);

      const museum = await prisma.museum.findFirst({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (museum) {
        res.status(200).json({
          message: "Login successful",
          museum,
        });
      } else {
        res.status(401).json({ error: "wrong credentials" });
      }
    } catch (error) {
      res.status(401).json({ error: "wrong credentials" });
    }
  }
}
