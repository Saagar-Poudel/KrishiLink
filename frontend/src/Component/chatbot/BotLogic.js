import ChatData from "./Chat.js";
import preprocess from "./Preprocessor.js";

// Levenshtein distance for fuzzy matching
function levenshtein(a = "", b = "") {
  if (!a) return b.length;
  if (!b) return a.length;
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[a.length][b.length];
}

// similarity combining keyword & fuzzy
function similarityScore(a, b) {
  const na = preprocess(a);
  const nb = preprocess(b);
  if (!na || !nb) return 0;

  const wordsA = na.split(" ");
  const wordsB = nb.split(" ");
  const common = wordsB.filter((w) => wordsA.includes(w)).length;

  const jac = common / Math.max(wordsA.length + wordsB.length - common, 1);
  const lev = levenshtein(na, nb);
  const levNorm = 1 - lev / Math.max(na.length, nb.length, 1);

  return 0.5 * jac + 0.5 * levNorm;
}

// --- getBotResponse
export function getBotResponse(query) {
  const cleanQuery = preprocess(query);

  // Exact match
  const exact = ChatData.find(
    (item) => preprocess(item.question) === cleanQuery
  );
  if (exact) return { answer: exact.answer, suggestions: [] };

  // Partial matches
  const partials = ChatData.filter((item) =>
    preprocess(item.question).includes(cleanQuery)
  );
  if (partials.length === 1) return { answer: partials[0].answer, suggestions: [] };
  if (partials.length > 1) return { answer: "I found multiple matches. Please choose one:", suggestions: partials };

  // Fuzzy similarity
  let bestMatch = null, maxScore = 0;
  ChatData.forEach((item) => {
    const score = similarityScore(query, item.question);
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  });

  if (bestMatch && maxScore > 0.45) {
    return { answer: `Did you mean: "${bestMatch.question}"?`, suggestions: [bestMatch] };
  }

  // Broad topics suggestions
  const broadTopics = ["agriculture","farming","crop","soil","irrigation"];
  if (broadTopics.includes(cleanQuery)) {
    const topicMatches = ChatData.filter(item => preprocess(item.question).includes(cleanQuery)).slice(0,6);
    const clarifications = [
      `What is ${cleanQuery}?`,
      `${cleanQuery} in Nepal`,
      `Modern ${cleanQuery} methods`,
      `Common problems in ${cleanQuery}`
    ];
    const sug = [...topicMatches.map(t => ({ question: t.question, answer: t.answer })), ...clarifications.map(s => ({ question: s, answer: null }))].slice(0,6);
    return { answer: `I can help with several ${cleanQuery}-related topics. Please pick one:`, suggestions: sug };
  }

  // Fallback
  return { answer: "Sorry, I don't know that. Try rephrasing or pick a suggestion.", suggestions: [] };
}
