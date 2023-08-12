// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const request = await fetch("https://restcountries.com/v3.1/all");
  const response = await request.json();

  res.status(200).json(response);
}
