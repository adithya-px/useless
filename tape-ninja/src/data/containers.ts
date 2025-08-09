 export interface Container {
  type: string;
  risk: "Low" | "Medium" | "High" | "Very High";
  packing: string;
  tape: string;
  foods: string[];
  image: string;
  description: string;
}

// Tape length multiplier (in meters per item)
export const containerMultipliers: Record<string, number> = {
  "Glass Jar": 1.8,
  "Plastic Bottle": 1.2,
  "Tupperware": 0.8,
  "Banana Leaf": 1.0,
  "Coffee Bottle": 1.5,
  "Plastic Pouch": 0.6,
  "Cardboard Box": 0.9,
  "Steel Dabba": 0.7,
  "Plastic Bag": 2.2
};

export const containers: Container[] = [
  {
    type: "Glass Jar",
    risk: "High",
    packing: "Wrap in bubble wrap until it looks like a mummy",
    tape: "Brown packing tape",
    foods: ["Achhar", "Meen Curry", "Mango Chutney"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    description: "The classic choice. Fragile but dignified, like a wine bottle that's been through customs."
  },
  {
    type: "Plastic Bottle",
    risk: "Medium",
    packing: "Bubble wrap + cling film",
    tape: "Duct tape",
    foods: ["Coconut Oil", "Curry Paste"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "The workhorse. Not fancy but gets the job done without drama."
  },
  {
    type: "Tupperware",
    risk: "Low",
    packing: "Just cling film around the lid",
    tape: "Electrical tape",
    foods: ["Snacks", "Curries"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    description: "The responsible choice. Won't cause international incidents."
  },
  {
    type: "Banana Leaf",
    risk: "Medium",
    packing: "Aluminium foil + plastic bag",
    tape: "Transparent tape",
    foods: ["Snacks"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    description: "Traditional meets modern. Eco-friendly until you wrap it in plastic."
  },
  {
    type: "Coffee Bottle",
    risk: "High",
    packing: "Bubble wrap + cloth wrap",
    tape: "Brown packing tape",
    foods: ["Coffee Powder"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "Because instant coffee is for amateurs."
  },
  {
    type: "Plastic Pouch",
    risk: "Medium",
    packing: "Double bagging",
    tape: "Transparent tape",
    foods: ["Banana Chips", "Jackfruit Chips"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    description: "The snack smuggler's best friend."
  },
  {
    type: "Cardboard Box",
    risk: "Low",
    packing: "Tape all seams",
    tape: "Brown packing tape",
    foods: ["Pappadams"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "The unsung hero. Simple and effective."
  },
  {
    type: "Steel Dabba",
    risk: "Low",
    packing: "Just cling film",
    tape: "Electrical tape",
    foods: ["Pickles", "Payasam Mix"],
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&h=200&fit=crop",
    description: "The indestructible option. Survives everything except your mother's disappointment."
  },
  {
    type: "Plastic Bag",
    risk: "Very High",
    packing: "Wrap entire bag in tape until it looks like a rugby ball",
    tape: "Any tape",
    foods: ["Random stuff"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
    description: "The 'I forgot to pack properly' option."
  }
];

export const airlines = [
  { name: "Emirates", brutalityIndex: 3 },
  { name: "Qatar Airways", brutalityIndex: 2 },
  { name: "Air India", brutalityIndex: 7 },
  { name: "IndiGo", brutalityIndex: 8 },
  { name: "SpiceJet", brutalityIndex: 9 },
  { name: "Vistara", brutalityIndex: 4 },
  { name: "British Airways", brutalityIndex: 5 },
  { name: "Lufthansa", brutalityIndex: 4 },
  { name: "Singapore Airlines", brutalityIndex: 2 },
  { name: "Budget Airline", brutalityIndex: 10 }
];

// All available foods that can be put in any container
export const allFoods = [
  "Achhar", "Meen Curry", "Mango Chutney", "Coconut Oil", "Curry Paste",
  "Snacks", "Curries", "Coffee Powder", "Banana Chips", "Jackfruit Chips",
  "Pappadams", "Pickles", "Payasam Mix", "Random stuff", "Sambar Powder",
  "Rasam Powder", "Idli Batter", "Dosa Batter", "Ghee", "Tamarind Paste",
  "Cardamom", "Cinnamon", "Cloves", "Black Pepper", "Turmeric", "Chili Powder",
  "Coriander Seeds", "Cumin Seeds", "Mustard Seeds","Jaggery", "Coconut"
];

// Fun extras for calculations
export const tapeTypes = [
  "Brown Packaging Tape", 
  "Duct Tape", 
  "Cello Tape", 
  "Masking Tape",
  "Electrical Tape",
  "Transparent Tape",
  "Double-sided Tape",
  "Gaffer Tape"
];

export const roastMessages = [
  "Your Amma is still not convinced.",
  "This looks like a hostage suitcase.",
  "Congratulations, you've made an impenetrable snack vault.",
  "Even customs officers will give up.",
  "Your packing strategy suggests deep paranoia. We're not judging.",
  "This level of protection would make a bank vault jealous.",
  "Are you transporting snacks or building a bunker?",
  "Your container choice shows excellent anxiety levels.",
  "This could survive a nuclear winter.",
  "You're either very careful or very traumatized.",
  "Your food is going to military boot camp.",
  "This is what NASA uses for satellites.",
  "You're either prepared or paranoid. Both work.",
  "The Louvre should take notes from your technique.",
  "This could withstand a meteor hit.",
  "You've clearly had bad experiences with baggage handlers.",
  "Your food has full body armor now.",
  "You're either an engineer or traumatized. Both respectable.",
  "This would make a medieval castle jealous.",
  "You've read too many survival guides.",
  "You're either organized or anxious. Hard to tell.",
  "This could survive a zombie apocalypse.",
  "You've learned that hope is not a strategy.",
  "The CIA could learn from you."
];

export const badges = [
  "🛡️ Amma Approved", 
  "🍌 Snack Guardian", 
  "✈️ TSA Nightmare", 
  "💪 Tape Master",
  "🔒 Paranoia Expert",
  "📦 Packing Pro",
  "🎯 Precision Packer",
  "🏆 Tape Tycoon",
  "🛡️ Security Specialist",
  "🎪 Circus Packer"
];

// Sarcastic messages for weird food-container combinations
export const sarcasticMessages: Record<string, Record<string, string>> = {
  "Glass Jar": {
    "Idli Batter": "Putting fermented batter in glass? Bold choice. Hope you enjoy cleaning up the explosion.",
    "Dosa Batter": "Putting fermented batter in glass? Bold choice. Hope you enjoy cleaning up the explosion.",
    "Ghee": "Glass jar for ghee? What are you, royalty? At least it'll look fancy when it shatters.",
    "Rice": "Rice in a glass jar? Very Instagram-worthy. Very impractical for travel.",
  },
  "Plastic Bottle": {
    "Pappadams": "Pappadams in a bottle? Did you also try fitting a square peg in a round hole?",
    "Banana Chips": "Crushing banana chips into bottle shape. Creative destruction at its finest.",
    "Pickles": "Bottle pickles? Your ancestors are crying. And not from joy.",
    "Snacks": "Snacks in a bottle? who did it even fit",
    "Curries": "Curries in a bottle? You're either very organized or very confused.",
  },
  "Banana Leaf": {
    "Coconut Oil": "Oil in banana leaf? Traditional meets disaster. This will end well.",
    "Meen Curry": "Meen curry in banana leaf? I'll pray for the ones around you",
    "Ghee": "Ghee in banana leaf? Even your grandmother wouldn't approve of this mess.",
    "Curry Paste": "Paste in banana leaf? You're basically making organic finger paint.",
  },
  "Plastic Bag": {
    "Meen Curry": "Curry in a plastic bag? You're one turbulence away from a fashion disaster.",
    "Sambar": "Sambar in plastic bag? This is how you traumatize fellow passengers.",
    "Coconut Oil": "Oil in plastic bag? You've invented the world's messiest hand lotion.",
  },
  "Steel Dabba": {
    "Coffee Powder": "Coffee powder in steel dabba? Your coffee will taste like metal. Enjoy your robot breakfast.",
    "Cardamom": "Spices in steel? Everything will taste the same. Congratulations, you've invented bland food.",
  }
};

