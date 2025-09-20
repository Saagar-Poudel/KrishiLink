import fetch from "node-fetch";

const NEWS_API_KEY = process.env.NEWSDATA_API_KEY;
// const BASE_URL = "https://newsdata.io/api/1";

export const getNepalAgriNews = async (req, res) => {
  try {
   // const url = `${BASE_URL}/latest?country=np&category=food&apiKey=${NEWS_API_KEY}`;
    const url = `https://newsdata.io/api/1/news?apiKey=${NEWS_API_KEY}&country=np&language=ne`
    
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

// export const getNepalAgriNews = async (req, res) => {
//   try {
//     const results = [];

//     for (let page = 1; page <= 3; page++) {
//       const response = await fetch(
//         `${BASE_URL}/latest?country=np&category=food&apiKey=${NEWS_API_KEY}&language=ne&page=${page}`
//       );

//       if (!response.ok) continue;

//       const data = await response.json();

//       // filter Nepali news only
//       const nepaliNews = (data.results || []).filter(
//         item => item.language === "ne" || item.title.match(/[ऀ-ॿ]/)
//       );

//       results.push(...nepaliNews);
//     }

//     res.json({ results });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error retrieving news" });
//   }
// };
