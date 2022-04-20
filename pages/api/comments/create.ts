// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");
const url: string = "http://localhost:3001/comments";
axios.defaults.headers.common["Accept"] = "application/json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.body.id) {
      const response = await axios.put(url, req.body);
      res.send({ response: response?.data });
    } else {
      const response = await axios.post(url, req.body);
      res.send({ response: response?.data });
    }
  } catch (error: any) {
    res.send({
      response: error?.response.data,
    });
  }
}
