import { Request, Response } from "express";
const fetch = (...args: any) =>
    import("node-fetch").then(({ default: fetch }) => fetch(args));

const NEWS_API_KEY = process.env.NEWSDATA_API_KEY;
const BASE_URL = "https://newsdata.io/api/1";

export const getNepalAgriNews = async (req: Request, res: Response):Promise<any> => {
  try {
    const url = `${BASE_URL}/latest?country=np&category=food&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(502).json({ error: "Failed to fetch news" });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving news" });
  }
};
