import ChatData from "./Chat.js";
import preprocess from "./Preprocessor.js";

// --- Synonyms map
const synonyms = {
  farming: "agriculture",
  agronomy: "agriculture",
  crop: "crop",
  crops: "crop",
  "soil fertility": "soil",
  irrigation: "irrigation",
};

// normalize + synonym expansion
function normalize(text = "") {
  let t = preprocess(text.toLowerCase().trim());
  Object.keys(synonyms).forEach((k) => {
    const re = new RegExp(`\\b${k}\\b`, "gi");
    t = t.replace(re, synonyms[k]);
  });
  return t;
}

// --- Levenshtein distance
function levenshtein(a = "", b = "") {
  if (!a) return b.length;
  if (!b) return a.length;
  const al = a.length, bl = b.length;
  const dp = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) dp[i][0] = i;
  for (let j = 0; j <= bl; j++) dp[0][j] = j;
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[al][bl];
}

// --- Jaccard similarity
function jaccard(a = "", b = "") {
  const A = new Set(a.split(" ").filter(Boolean));
  const B = new Set(b.split(" ").filter(Boolean));
  if (A.size === 0 && B.size === 0) return 1;
  const inter = [...A].filter(x => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : inter / union;
}

// --- Weighted similarity
function similarityScore(input, question) {
  const ni = normalize(input);
  const nq = normalize(question);
  if (!ni || !nq) return 0;

  const jac = jaccard(ni, nq); // 0..1
  const lev = levenshtein(ni, nq);
  const levNorm = 1 - lev / Math.max(ni.length, nq.length, 1);
  
  // Keyword overlap
  const inputWords = ni.split(" ");
  const questionWords = nq.split(" ");
  const common = questionWords.filter((w) => inputWords.includes(w)).length;
  const keywordScore = common / Math.max(questionWords.length, 1);

  return 0.4 * jac + 0.4 * levNorm + 0.2 * keywordScore; // weighted
}

// --- Get bot response
export function getBotResponse(query, lastTopic = null) {
  const cleanQuery = normalize(query);

  // --- Exact match
  const exact = ChatData.find((item) => normalize(item.question) === cleanQuery);
  if (exact) return { answer: exact.answer, suggestions: [] };

  // --- Partial / substring matches
  const partials = ChatData.filter((item) => normalize(item.question).includes(cleanQuery));
  if (partials.length === 1) return { answer: partials[0].answer, suggestions: [] };
  if (partials.length > 1) return { answer: "I found multiple matches, please choose:", suggestions: partials };

  // --- Similarity scoring
  const scored = ChatData.map(item => ({ ...item, score: similarityScore(query, item.question) }))
                         .sort((a, b) => b.score - a.score);

  const top = scored[0];
  if (!top || top.score < 0.35) {
    return { answer: "Sorry, I don't know that. Try rephrasing.", suggestions: [] };
  }

  // --- Multiple high similarity candidates
  const candidates = scored.filter(s => s.score >= Math.max(0.4, top.score - 0.1));
  if (candidates.length > 1) {
    return { answer: "I found several related topics. Please pick one:", suggestions: candidates.slice(0, 6) };
  }

  // --- Single confident match
  return { answer: top.answer, suggestions: [] };
}
