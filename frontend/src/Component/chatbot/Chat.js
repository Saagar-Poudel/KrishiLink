// src/Component/chatbot/Chat.js

const ChatData = [
  // 👋 Greetings
  { question: "hello", answer: "Hello! How can I help you with your farming queries today?" },
  { question: "hi", answer: "Hi there! How can I support your farming needs?" },
  { question: "namaste", answer: "Namaste 🙏, how can I assist you with agriculture today?" },
  { question: "good morning", answer: "Good morning! Ready to discuss farming tips?" },
  { question: "good evening", answer: "Good evening! How can I help you with your crops?" },

  // 🌱 General Farming
  { question: "what is farming", answer: "Farming is the practice of cultivating crops and rearing animals for food and livelihood." },
  { question: "how to start farming", answer: "To start farming: choose land, test soil, select suitable crops, arrange irrigation, and use proper tools." },
  { question: "best crop for beginners", answer: "For beginners, crops like maize, beans, potato, and seasonal vegetables are easier." },
  { question: "what is organic farming", answer: "Organic farming avoids chemical fertilizers and pesticides, focusing on natural methods like compost, manure, and biopesticides." },
  { question: "advantages of organic farming", answer: "Organic farming improves soil fertility, produces healthier crops, and protects the environment." },

  // 🌾 Crops
  { question: "best crop for sandy soil", answer: "Groundnut, watermelon, millet, and potato grow well in sandy soil." },
  { question: "best crop for clay soil", answer: "Rice, wheat, and pulses are suitable for clay soil due to its water retention." },
  { question: "best crop for loamy soil", answer: "Loamy soil is best for most crops like rice, wheat, maize, and vegetables." },
  { question: "when to plant rice", answer: "Rice is usually planted at the start of the monsoon, between June and July." },
  { question: "when to harvest wheat", answer: "Wheat is harvested in March–April when the grains are golden and hard." },
  { question: "which crop needs more water", answer: "Rice and sugarcane need high amounts of water compared to other crops." },
  { question: "which crop needs less water", answer: "Millets, mustard, and pulses require less water." },
  { question: "how to increase crop yield", answer: "Use improved seeds, proper irrigation, balanced fertilizers, pest control, and crop rotation." },

  // 💧 Soil & Irrigation
  { question: "what is soil fertility", answer: "Soil fertility is the ability of soil to provide essential nutrients to plants." },
  { question: "how to improve soil fertility", answer: "Add compost, manure, crop rotation, green manure, and organic fertilizers." },
  { question: "what is drip irrigation", answer: "Drip irrigation delivers water directly to plant roots, saving water." },
  { question: "what is sprinkler irrigation", answer: "Sprinkler irrigation sprays water over crops like rainfall." },
  { question: "which irrigation saves water", answer: "Drip irrigation saves maximum water and increases efficiency." },
  { question: "best time to irrigate crops", answer: "Early morning or late evening reduces water loss due to evaporation." },
  { question: "how to test soil", answer: "Soil testing can be done at agriculture labs to check nutrients and pH levels." },

  // 🐛 Pests & Diseases
  { question: "how to control pests naturally", answer: "Use neem oil, cow urine, or biological control like ladybugs for pests." },
  { question: "common rice disease", answer: "Rice blast, sheath blight, and bacterial blight are common rice diseases." },
  { question: "common wheat disease", answer: "Rust, smut, and blight are major wheat diseases." },
  { question: "how to prevent crop diseases", answer: "Use resistant varieties, proper spacing, crop rotation, and timely weeding." },
  { question: "what is pesticide", answer: "Pesticides are chemicals used to kill or control pests." },
  { question: "what is insecticide", answer: "Insecticides are chemicals specifically used to kill insects." },
  { question: "difference between pesticide and insecticide", answer: "Pesticide covers all pest control, while insecticide targets only insects." },
  { question: "side effects of pesticides", answer: "Overuse of pesticides harms soil, water, and human health." },

  // 🌿 Organic Farming
  { question: "organic fertilizer examples", answer: "Examples: cow dung, compost, green manure, and biofertilizers." },
  { question: "benefits of organic fertilizer", answer: "They improve soil fertility, are eco-friendly, and enhance crop quality." },
  { question: "what is vermicompost", answer: "Vermicompost is organic fertilizer made from earthworms decomposing organic waste." },
  { question: "what is biopesticide", answer: "Biopesticides are natural substances like neem, bacteria, or fungi used to control pests." },

  // ⚙️ Tools & Technology
  { question: "basic tools for farming", answer: "Plough, sickle, hoe, axe, spade, and watering can are basic farming tools." },
  { question: "modern tools for farming", answer: "Tractors, seed drills, harvesters, and irrigation pumps are modern tools." },
  { question: "what is tractor used for", answer: "A tractor is used for ploughing, planting, and transporting goods." },
  { question: "what is harvester", answer: "A harvester is a machine used to reap, thresh, and clean crops." },
  { question: "benefits of modern farming tools", answer: "They save time, reduce labor, and increase productivity." },

  // 🌎 General Queries
  { question: "what is crop rotation", answer: "Crop rotation is growing different crops in sequence to maintain soil fertility." },
  { question: "what is mixed farming", answer: "Mixed farming is growing crops and rearing animals on the same farm." },
  { question: "what is subsistence farming", answer: "Subsistence farming is when crops are grown only for family use, not for sale." },
  { question: "what is commercial farming", answer: "Commercial farming focuses on producing crops for the market at large scale." },
  { question: "what is horticulture", answer: "Horticulture is the science of growing fruits, vegetables, and ornamental plants." },
  { question: "what is floriculture", answer: "Floriculture is the practice of growing flowers for commercial purposes." },
  { question: "what is apiculture", answer: "Apiculture is beekeeping for honey production." },
  { question: "what is sericulture", answer: "Sericulture is the rearing of silkworms for silk production." },
  { question: "what is aquaculture", answer: "Aquaculture is the farming of fish, prawns, and aquatic plants." },
  { question: "what is greenhouse farming", answer: "Greenhouse farming is growing crops under controlled conditions inside a structure." },
  { question: "advantages of greenhouse farming", answer: "It allows year-round cultivation, better yield, and protection from pests/weather." },

  // 💰 Government & Support
  { question: "what is crop insurance", answer: "Crop insurance protects farmers against crop loss due to natural disasters." },
  { question: "how to get crop subsidy", answer: "Crop subsidies are provided by local agriculture offices and cooperatives." },
  { question: "government scheme for farmers", answer: "Governments provide subsidies, loans, seeds, and crop insurance schemes." },

  // 🧑‍🌾 Practical Guidance
  { question: "how to store grains", answer: "Grains should be dried properly and stored in airtight containers or silos." },
  { question: "how to reduce post harvest loss", answer: "Use proper storage, avoid moisture, and adopt scientific storage methods." },
  { question: "how to prepare land for farming", answer: "Plough the land, level it, remove weeds, and add compost before planting." },
  { question: "how to save water in farming", answer: "Use drip irrigation, rainwater harvesting, and mulching." },

  // 🙏 Closing
  { question: "thank you", answer: "You're welcome! Happy farming 🌱" },
  { question: "thanks", answer: "Anytime! Wishing you a great harvest 🌾" },
  { question: "bye", answer: "Goodbye! Reach out again for farming help." },
];

export default ChatData;
