import type { NextApiRequest, NextApiResponse } from "next";
const axios = require("axios");
const url: string = "http://localhost:3001/comments";
axios.defaults.headers.common["Accept"] = "application/json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios({
      method: "DELETE",
      url: url + "/" + req.body,
    });
    res.send({ response: response?.data });
  } catch (error: any) {
    res.send({
      response: error?.response.data,
    });
  }
}
