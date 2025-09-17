// src/Component/chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Maximize, X } from "lucide-react";
import ChatData from "./Chat.js"; // dataset file (array of { question, answer })

const Chatbot = () => {
  const user = { id: 1, name: "Demo User" };

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // last queries
  const [savedChats, setSavedChats] = useState([]);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // clickable options
  const [isThinking, setIsThinking] = useState(false);

  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Exit maximized on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMaximized &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target)
      ) {
        setIsMaximized(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMaximized]);

  // Load saved chats from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(saved);
  }, []);

  // --- Utility: normalize text
  const normalize = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  // --- Utility: Levenshtein distance
  const levenshtein = (a, b) => {
    if (!a) return b.length;
    if (!b) return a.length;
    const al = a.length;
    const bl = b.length;
    const dp = Array.from({ length: al + 1 }, (_, i) =>
      new Array(bl + 1).fill(0)
    );
    for (let i = 0; i <= al; i++) dp[i][0] = i;
    for (let j = 0; j <= bl; j++) dp[0][j] = j;
    for (let i = 1; i <= al; i++) {
      for (let j = 1; j <= bl; j++) {
        dp[i][j] =
          a[i - 1] === b[j - 1]
            ? dp[i - 1][j - 1]
            : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
      }
    }
    return dp[al][bl];
  };

  // --- Jaccard similarity on word tokens
  const jaccard = (a, b) => {
    const A = new Set(a.split(" ").filter(Boolean));
    const B = new Set(b.split(" ").filter(Boolean));
    if (A.size === 0 && B.size === 0) return 1;
    const inter = [...A].filter((x) => B.has(x)).length;
    const union = new Set([...A, ...B]).size;
    return union === 0 ? 0 : inter / union;
  };

  // --- Combined similarity score (0..1)
  const similarityScore = (a, b) => {
    const na = normalize(a);
    const nb = normalize(b);
    if (!na || !nb) return 0;
    const jac = jaccard(na, nb); // 0..1
    const lev = levenshtein(na, nb);
    const levNorm = 1 - lev / Math.max(na.length, nb.length, 1); // closer to 1 is better
    // Weighted sum: jaccard more weight (words matter) but keep levenshtein influence
    return 0.6 * jac + 0.4 * levNorm;
  };

  // --- Compute best matches and answer
  const computeResponse = (query) => {
    const qnorm = normalize(query);

    // 1. Exact match (normalized)
    const exact = ChatData.find(
      (item) => normalize(item.question) === qnorm && item.answer
    );
    if (exact) {
      return { text: exact.answer, suggestions: [] };
    }

    // 2. Score everything and sort
    const scored = ChatData.map((item) => ({
      ...item,
      score: similarityScore(query, item.question),
    })).sort((a, b) => b.score - a.score);

    const top = scored[0];
    const topScore = top ? top.score : 0;

    // If several high scores (close to top), show multiple suggestions
    const closeCandidates = scored.filter(
      (s) => s.score >= Math.max(0.45, topScore - 0.15)
    );

    if (closeCandidates.length > 1 && closeCandidates[0].score > 0.45) {
      // return prompt + suggestions (limited to 6)
      return {
        text: `I found multiple possible matches. Click one to get the answer!`,
        suggestions: closeCandidates.slice(0, 6).map((c) => ({
          question: c.question,
          answer: c.answer,
        })),
      };
    }

    // If top is reasonably good, return it
    if (topScore > 0.60) {
      return { text: top.answer, suggestions: [] };
    }

    // Fallback: partial substring matches
    const partialMatches = ChatData.filter((item) =>
      item.question.toLowerCase().includes(qnorm)
    );
    if (partialMatches.length === 1) {
      return { text: partialMatches[0].answer, suggestions: [] };
    }
    if (partialMatches.length > 1) {
      return {
        text: `I found multiple possible matches. Click one to get the answer!`,
        suggestions: partialMatches.slice(0, 6).map((c) => ({
          question: c.question,
          answer: c.answer,
        })),
      };
    }

    // Word-overlap fallback
    const words = qnorm.split(" ").filter(Boolean);
    const wordMatches = ChatData
      .map((item) => {
        const iw = normalize(item.question).split(" ").filter(Boolean);
        const common = iw.filter((w) => words.includes(w)).length;
        return { ...item, common };
      })
      .filter((i) => i.common > 0)
      .sort((a, b) => b.common - a.common);

    if (wordMatches.length > 0) {
      return {
        text: `Did you mean: "${wordMatches[0].question}"? Click it to see the answer.`,
        suggestions: wordMatches.slice(0, 6).map((c) => ({
          question: c.question,
          answer: c.answer,
        })),
      };
    }

    return {
      text: "Sorry, I don't have information on that. Please try another question.",
      suggestions: [],
    };
  };

  // Handle sending messages (user input or clicked suggestion)
  const handleSend = (msg = input) => {
    if (!msg || !msg.trim()) return;

    // Clear input and suggestions immediately
    setInput("");
    setSuggestions([]);
    setIsThinking(true);
    setShowSavePrompt(false);

    const userMsg = { sender: "user", text: msg.trim() };

    // Add user message + thinking placeholder
    setMessages((prev) =>
      [...prev, userMsg, { sender: "bot", text: "thinking...", thinking: true }].slice(-50)
    );

    // Wait 2 seconds (simulate "thinking..."), then compute final response
    setTimeout(() => {
      const res = computeResponse(msg);
      const finalText = res.text;
      // Replace the last bot "thinking..." message with the real answer
      setMessages((prev) => {
        // copy
        const msgs = [...prev];
        // find last index of a bot thinking placeholder
        let idx = -1;
        for (let i = msgs.length - 1; i >= 0; i--) {
          if (msgs[i].sender === "bot" && msgs[i].text === "thinking...") {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          msgs[idx] = { sender: "bot", text: finalText };
        } else {
          // fallback: append
          msgs.push({ sender: "bot", text: finalText });
        }
        return msgs.slice(-50);
      });

      // set suggestions (if any)
      setSuggestions(res.suggestions || []);
      setIsThinking(false);
      setShowSavePrompt(true);
    }, 2000);
  };

  // Save last query to savedChats
  const saveChat = () => {
    // ensure last two messages are user then bot (final)
    const lastIndex = messages.length - 1;
    const lastBot = messages[lastIndex];
    const lastUser = messages[lastIndex - 1];
    if (!lastUser || !lastBot) return;
    if (lastBot.sender !== "bot" || lastUser.sender !== "user") return;
    const newChat = {
      id: Date.now(),
      question: lastUser.text,
      answer: lastBot.text,
    };
    const updatedSaved = [newChat, ...savedChats];
    setSavedChats(updatedSaved);
    localStorage.setItem("savedChats", JSON.stringify(updatedSaved));
    setShowSavePrompt(false);
  };

  // Optional helper: load a saved Q into input (not requested but handy)
  const loadIntoInput = (q) => {
    setInput(q);
    setIsOpen(true);
    setIsMaximized(true);
  };

  return (
    <div
      ref={chatbotRef}
      className="fixed bottom-4 right-4 z-50 shadow-lg transition-all"
    >
      {/* Floating Icon (robot face) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Ask with AI"
          title="Ask with AI"
          className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 text-lg"
        >
          {/* robot emoji as face */}
          <span role="img" aria-label="robot" className="text-xl">
            🤖
          </span>
        </button>
      )}

      {/* Minimized Chat */}
      {isOpen && !isMaximized && (
        <div className="w-72 h-96 bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-[#374151]">
            <span className="font-semibold flex items-center space-x-2">
              <span className="text-lg">🤖</span>
              <span>Ask with AI</span>
            </span>
            <div className="flex space-x-2">
              <button onClick={() => setIsMaximized(true)}>
                <Maximize className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-green-100 text-green-800 self-end ml-auto"
                    : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB] self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-1 max-h-32 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.question)}
                  className="text-left w-full p-1 bg-yellow-100 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800"
                >
                  {item.question}
                </button>
              ))}
            </div>
          )}

          {/* Input + Save */}
          <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-[#374151] dark:bg-[#12241A]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>

            {/* Save prompt only after answer is shown */}
            {showSavePrompt && (
              <button
                onClick={saveChat}
                className="self-end px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Chat
              </button>
            )}
          </div>
        </div>
      )}

      {/* Maximized Chat */}
      {isMaximized && (
        <div className="w-[600px] h-[500px] bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-[#374151]">
            <span className="font-semibold flex items-center space-x-2">
              <span className="text-xl">🤖</span>
              <span>Ask with AI</span>
            </span>
            <button onClick={() => setIsMaximized(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages + Saved Chats */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col">
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-green-100 text-green-800 self-end ml-auto"
                      : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB] self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-1 max-h-32 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.question)}
                    className="text-left w-full p-1 bg-yellow-100 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            )}

            {/* Saved Chats */}
            {savedChats.length > 0 && (
              <div className="mt-3 border-t border-gray-200 dark:border-[#374151] pt-2">
                <span className="font-semibold">Saved Chats</span>
                <div className="space-y-2 mt-2 max-h-36 overflow-y-auto">
                  {savedChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-2 rounded bg-gray-50 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB]"
                    >
                      <strong>Q:</strong> {chat.question}
                      <br />
                      <strong>A:</strong> {chat.answer}
                      <div className="mt-1">
                        <button
                          onClick={() => loadIntoInput(chat.question)}
                          className="text-sm px-2 py-1 rounded bg-green-600 text-white"
                        >
                          Ask again
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input + Save */}
          <div className="p-3 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-[#374151] dark:bg-[#12241A]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                className="px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>

            {/* Save prompt only after answer is shown */}
            {showSavePrompt && (
              <button
                onClick={saveChat}
                className="self-end px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Chat
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
