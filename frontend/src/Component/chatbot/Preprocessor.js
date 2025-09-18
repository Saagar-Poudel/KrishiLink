// Basic preprocessing: lowercase, remove stopwords, simple stemming
const stopwords = ["the","is","in","of","and","to","a","for","on","with","as","by"];

export default function preprocess(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(" ")
    .filter((word) => word && !stopwords.includes(word))
    .map((word) => {
      // simple stemming
      if (word.endsWith("ing")) return word.slice(0, -3);
      if (word.endsWith("ed")) return word.slice(0, -2);
      if (word.endsWith("s")) return word.slice(0, -1); // plurals
      return word;
    })
    .join(" ");
}
