// src/Component/chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { Maximize, X } from "lucide-react";
import ChatData from "./Chat.js"; // [{ question, answer }, ...]
import { getBotResponse } from "./BotLogic.js";


// --- Chatbot component
const Chatbot = () => {
  // --- States
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // full history
  const [savedChats, setSavedChats] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // clickable suggestions
  const [isThinking, setIsThinking] = useState(false);
  const [lastUserTopic, setLastUserTopic] = useState(null); // context
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);

  // load saved chats once
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(saved);
  }, []);

  // auto-scroll when messages change (but we show only last 3)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, suggestions, isThinking]);

  // close maximized on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (isMaximized && chatbotRef.current && !chatbotRef.current.contains(e.target)) {
        setIsMaximized(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMaximized]);

  // --- Utilities: normalize, levenshtein, jaccard
  const normalize = (s = "") =>
    s
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const levenshtein = (a = "", b = "") => {
    if (!a) return b.length;
    if (!b) return a.length;
    const al = a.length, bl = b.length;
    const dp = Array.from({ length: al + 1 }, (_, i) => new Array(bl + 1).fill(0));
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
  };

  const jaccard = (a = "", b = "") => {
    const A = new Set(a.split(" ").filter(Boolean));
    const B = new Set(b.split(" ").filter(Boolean));
    if (A.size === 0 && B.size === 0) return 1;
    const inter = [...A].filter(x => B.has(x)).length;
    const union = new Set([...A, ...B]).size;
    return union === 0 ? 0 : inter / union;
  };

  const similarityScore = (a, b) => {
    const na = normalize(a), nb = normalize(b);
    if (!na || !nb) return 0;
    const jac = jaccard(na, nb); // 0..1
    const lev = levenshtein(na, nb);
    const levNorm = 1 - lev / Math.max(na.length, nb.length, 1);
    return 0.6 * jac + 0.4 * levNorm; // weighted
  };

  // --- Synonyms map (expandable)
  const synonyms = {
    farming: "agriculture",
    agronomy: "agriculture",
    "crop": "crop",
    "crops": "crop",
    "soil fertility": "soil",
    irrigation: "irrigation",
  };

  const expandSynonyms = (text) => {
    // replace synonyms (word boundaries)
    let out = text;
    Object.keys(synonyms).forEach((k) => {
      const re = new RegExp(`\\b${k}\\b`, "gi");
      out = out.replace(re, synonyms[k]);
    });
    return out;
  };

  // --- Context helper: if user writes "in Nepal" or "and in Nepal" or "in <place>" and the query lacks subject, prepend lastUserTopic
  const applyContextIfNeeded = (rawInput) => {
    const low = rawInput.trim().toLowerCase();
    // detect patterns like "in nepal", "and in nepal", "nepal", or "in kathmandu"
    const placePattern = /\b(in|inside|at|of|about)?\s*(nepal|kathmandu|pokhara|district|region)\b/; // extend as needed
    const startsWithIn = /^\s*(in|inside|at|about)\s+\w+/i;
    const hasPlace = placePattern.test(low);
    if (hasPlace && lastUserTopic && lastUserTopic.length > 2) {
      // If the user's input is short (no subject), combine
      const words = low.split(" ").filter(Boolean);
      if (words.length <= 4) {
        // form new query combining last topic and this input
        return `${lastUserTopic} ${rawInput}`.trim();
      }
    }
    // Common shorthand like "and in nepal" or "also in nepal" handled above.
    return rawInput;
  };

  // --- computeResponse returns { answerText, suggestionsArray, reason }
  const computeResponse = (query) => {
    const qnorm = normalize(expandSynonyms(query));

    // If query is very short and exactly matches a known broad topic, return suggestions for clarifications
    // Example: "agriculture" -> show clarifications (definition, in Nepal, modern methods)
    const broadTopics = ["agriculture", "farming", "crop", "soil", "irrigation"];
    if (broadTopics.includes(qnorm)) {
      // find exact topic matches in dataset to offer suggestions
      const topicMatches = ChatData.filter(item => normalize(item.question).includes(qnorm)).slice(0, 6);
      const clarifs = [
        `What is ${qnorm}?`,
        `${qnorm} in Nepal`,
        `Modern ${qnorm} methods`,
        `Common problems in ${qnorm}`,
      ].filter(Boolean);
      // If we have dataset items that directly match, include them as clickable suggestions
      const datasetSuggestions = topicMatches.map(t => ({ question: t.question, answer: t.answer }));
      const suggestions = [...datasetSuggestions, ...clarifs.map(s => ({ question: s, answer: null }))].slice(0, 6);
      return {
        answerText: `I can help with several ${qnorm}-related topics. Please pick one:`,
        suggestions,
        reason: "broad-topic",
      };
    }

    // 1) Exact normalized matches first
    const exact = ChatData.find(item => normalize(item.question) === qnorm && item.answer);
    if (exact) return { answerText: exact.answer, suggestions: [], reason: "exact" };

    // 2) Score everything
    const scored = ChatData.map(item => ({ ...item, score: similarityScore(query, item.question) }))
      .sort((a, b) => b.score - a.score);

    const top = scored[0];
    const topScore = top ? top.score : 0;

    // If many good matches (ambiguity), produce suggestions instead of auto-answer
    const ambiguousCandidates = scored.filter(s => s.score >= Math.max(0.42, topScore - 0.12));
    if (ambiguousCandidates.length > 1 && ambiguousCandidates[0].score > 0.44) {
      // If there are > 3 ambiguous results, we treat it as "many" and ask for clarification
      const candidateList = ambiguousCandidates.slice(0, 6).map(c => ({ question: c.question, answer: c.answer }));
      return {
        answerText: `I found multiple related topics. Please select one so I answer correctly:`,
        suggestions: candidateList,
        reason: "ambiguous",
      };
    }

    // If top is confident enough, return it
    if (topScore > 0.62) {
      return { answerText: top.answer, suggestions: [], reason: "top-confident" };
    }

    // Partial substring match fallback
    const partialMatches = ChatData.filter(item => normalize(item.question).includes(qnorm));
    if (partialMatches.length === 1) {
      return { answerText: partialMatches[0].answer, suggestions: [], reason: "partial-1" };
    } else if (partialMatches.length > 1) {
      return {
        answerText: `I found several matches. Please choose the one you want:`,
        suggestions: partialMatches.slice(0, 6).map(p => ({ question: p.question, answer: p.answer })),
        reason: "partial-many"
      };
    }

    // Word-overlap fallback
    const words = qnorm.split(" ").filter(Boolean);
    const wordMatches = ChatData
      .map(item => ({ ...item, common: normalize(item.question).split(" ").filter(Boolean).filter(w => words.includes(w)).length }))
      .filter(i => i.common > 0)
      .sort((a, b) => b.common - a.common);

    if (wordMatches.length > 0) {
      return {
        answerText: `Did you mean "${wordMatches[0].question}"? Click it to see the answer.`,
        suggestions: wordMatches.slice(0, 6).map(c => ({ question: c.question, answer: c.answer })),
        reason: "word-overlap"
      };
    }

    // No idea fallback
    return { answerText: "Sorry, I don't have information on that. Try rephrasing or pick a suggestion.", suggestions: [], reason: "none" };
  };

  // --- handleSend (user typed or suggestion clicked)
  const handleSend = (raw = input) => {
    if (!raw || !raw.trim()) return;
    // Apply context if needed
    const armed = applyContextIfNeeded(raw.trim());
    // store user message
    const userMsg = { sender: "user", text: armed };
    setMessages(prev => [...prev, userMsg]);

    // Keep last user topic for context (simple heuristic: keep the question text itself)
    setLastUserTopic(armed);

    // Reset input & suggestions, show thinking
    setInput("");
    setSuggestions([]);
    setIsThinking(true);

    // Add a bot "thinking..." placeholder
    setMessages(prev => [...prev, { sender: "bot", text: "thinking...", thinking: true }]);

    // After 2 seconds produce answer
    setTimeout(() => {
      const { answerText, suggestions: sug, reason } = computeResponse(armed);

      // Replace last "thinking..." message with final answer (or a prompt)
      setMessages(prev => {
        const copy = [...prev];
        // find last bot thinking placeholder
        let idx = -1;
        for (let i = copy.length - 1; i >= 0; i--) {
          if (copy[i].sender === "bot" && copy[i].thinking) {
            idx = i;
            break;
          }
        }
        const botMessage = { sender: "bot", text: answerText };
        if (idx >= 0) {
          copy[idx] = botMessage;
        } else {
          copy.push(botMessage);
        }
        return copy;
      });

      // suggestions: map to objects with question + answer (answer may be null for clarifications)
      setSuggestions((sug || []).slice(0, 6));
      setIsThinking(false);
    }, 2000);
  };

  // --- save last interaction (last user+bot) permanently
  const saveChat = () => {
    const lastIndex = messages.length - 1;
    if (lastIndex <= 0) return;
    const lastBot = messages[lastIndex];
    const lastUser = messages[lastIndex - 1];
    if (!lastUser || !lastBot || lastUser.sender !== "user" || lastBot.sender !== "bot") return;
    const newChat = { id: Date.now(), question: lastUser.text, answer: lastBot.text };
    const updated = [newChat, ...savedChats];
    setSavedChats(updated);
    localStorage.setItem("savedChats", JSON.stringify(updated));
  };

  // --- when user clicks a suggestion
  const handleSuggestionClick = (item) => {
    // If the suggestion has an answer in dataset, send that exact dataset question (so it matches)
    const q = item.question;
    handleSend(q);
    // clear suggestions (handleSend will reset)
    setSuggestions([]);
  };

  // --- helper: clear all saved chats (optional)
  const clearSavedChats = () => {
    localStorage.removeItem("savedChats");
    setSavedChats([]);
  };

  // --- UI: only render last 3 messages in chat window
  const visibleMessages = messages.slice(-3);

  // --- small CSS-in-JS for typing dots (you can move this to your CSS file)
  const typingDots = (
    <span style={{ display: "inline-block", marginLeft: 6 }}>
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <style>{`
        .dot { display:inline-block; width:6px; height:6px; margin:0 2px; border-radius:50%; background:#4b5563; opacity:0.3; animation:dots 1s infinite; }
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.30s; }
        @keyframes dots {
          0% { opacity:0.2; transform: translateY(0px); }
          50% { opacity:1; transform: translateY(-4px); }
          100% { opacity:0.2; transform: translateY(0px); }
        }
      `}</style>
    </span>
  );

  return (
    <div ref={chatbotRef} className="fixed bottom-4 right-4 z-50">
      {/* Floating Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
          title="Ask with AI"
        >
          <span role="img" aria-label="robot" className="text-xl">🤖</span>
        </button>
      )}

      {/* Minimized */}
      {isOpen && !isMaximized && (
        <div className="w-80 h-96 bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="font-semibold">Ask with AI</div>
                <div className="text-xs text-gray-500">type a question or pick a suggestion</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsMaximized(true)} className="p-1">
                <Maximize className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages area (only last 3 visible) */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {visibleMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg p-2 max-w-[85%] ${msg.sender === "user" ? "bg-green-100 text-green-800" : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB]"}`}>
                  <div className="flex items-center space-x-2">
                    {msg.sender === "bot" && <span className="text-sm mr-1">🤖</span>}
                    {msg.sender === "user" && <span className="text-sm mr-1">🧑</span>}
                    <div className="text-sm">
                      {msg.text}
                      {msg.thinking && isThinking ? typingDots : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-t space-y-1 max-h-28 overflow-y-auto">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
                >
                  {s.question}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question..."
                className="flex-1 p-2 rounded border"
              />
              <button onClick={() => handleSend()} className="px-3 bg-green-600 text-white rounded">Send</button>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <div>Showing last 3 messages</div>
              <div>
                <button onClick={saveChat} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">Save Chat</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maximized */}
      {isMaximized && (
        <div className="w-[680px] h-[520px] bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🤖</span>
              <div>
                <div className="font-bold text-lg">Ask with AI</div>
                <div className="text-sm text-gray-500">Type clearly or pick from suggestions</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsMaximized(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main area: left messages + right saved chats */}
          <div className="flex-1 flex overflow-hidden">
            {/* Messages column */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {visibleMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === "user" ? "bg-green-100 text-green-800" : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB]"}`}>
                      <div className="flex items-start space-x-2">
                        {msg.sender === "bot" ? <span>🤖</span> : <span>🧑</span>}
                        <div className="whitespace-pre-wrap">{msg.text}{msg.thinking && isThinking ? typingDots : null}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Suggestions (below messages) */}
                {suggestions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="text-sm text-gray-600">I found multiple related items — pick one:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {suggestions.map((s, i) => (
                        <button key={i} onClick={() => handleSuggestionClick(s)} className="text-left p-2 rounded bg-white-100 hover:bg-yellow-200">
                          {s.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Saved chats column */}
            <div className="w-80 border-l p-3 overflow-y-auto bg-gray-50 dark:bg-[#08120E]">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Saved Chats</div>
                <div className="text-xs text-gray-500">{savedChats.length}</div>
              </div>

              <div className="space-y-2">
                {savedChats.length === 0 && <div className="text-sm text-gray-500">No saved chats yet — save helpful Q&A here.</div>}
                {savedChats.map(chat => (
                  <div key={chat.id} className="p-2 rounded bg-white dark:bg-[#0A1E15] shadow-sm">
                    <div className="text-xs font-semibold">Q:</div>
                    <div className="text-sm mb-1">{chat.question}</div>
                    <div className="text-xs font-semibold">A:</div>
                    <div className="text-sm mb-2">{chat.answer}</div>
                    <div className="flex space-x-2">
                      <button onClick={() => { setInput(chat.question); setIsMaximized(true); }} className="text-xs px-2 py-1 rounded bg-green-600 text-white">Ask again</button>
                      <button onClick={() => {
                        // remove single
                        const filtered = savedChats.filter(s => s.id !== chat.id);
                        setSavedChats(filtered);
                        localStorage.setItem("savedChats", JSON.stringify(filtered));
                      }} className="text-xs px-2 py-1 rounded bg-red-500 text-white">Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <button onClick={clearSavedChats} className="w-full px-3 py-2 rounded bg-red-600 text-white">Clear all saved</button>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div className="p-4 border-t">
            <div className="flex space-x-3 border border-2-gray-300 text-black-700">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question... (e.g., 'What is agriculture' or 'agriculture in Nepal')"
                className="flex-1 p-3 rounded border border-black-300 focus:outline-none focus:ring-2 focus:ring-green-500 "
              />
              <button onClick={() => handleSend()} className="px-4 bg-green-600 text-white rounded">Send</button>
              <button onClick={saveChat} className="px-4 bg-blue-600 text-white rounded">Save</button>
            </div>
            <div className="text-xs text-gray-500 mt-2">Showing only last 3 messages in chat view. Full history kept in session & saved chats.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
// --- End of Chatbot component