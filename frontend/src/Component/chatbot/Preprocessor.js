// Basic preprocessing: lowercase, remove stopwords, simple stemming
const stopwords = ["the","is","in","of","and","to","a"];

export default function preprocess(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(" ")
    .filter((word) => word && !stopwords.includes(word))
    .map((word) => {
      if (word.endsWith("ing")) return word.slice(0, -3);
      if (word.endsWith("ed")) return word.slice(0, -2);
      return word;
    })
    .join(" ");
}
