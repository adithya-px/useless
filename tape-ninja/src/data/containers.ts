 /**
 * Container interface defining the structure for food storage containers
 * Each container has specific properties that affect packing calculations
 */
export interface Container {
  /** The name/type of the container (e.g., "Glass Jar", "Plastic Bottle") */
  type: string;
  /** Risk level that affects tape requirements and leak probability */
  risk: "Low" | "Medium" | "High" | "Very High";
  /** Specific packing instructions for this container type */
  packing: string;
  /** Recommended tape type for this container */
  tape: string;
  /** Default food items that work well with this container */
  foods: string[];
  /** Image URL for the container (used in UI) */
  image: string;
  /** Humorous description of the container's characteristics */
  description: string;
}

/**
 * Tape length multipliers for each container type (in meters per item)
 * These values are used in the core calculation formula:
 * tapeLength = base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)
 * 
 * Higher values = more tape needed (fragile containers)
 * Lower values = less tape needed (sturdy containers)
 */
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

/**
 * Available containers for food storage
 * Each container has specific characteristics that affect packing requirements
 * and comes with humorous descriptions reflecting real-world packing experiences
 */
export const containers: Container[] = [
  {
    type: "Glass Jar",
    risk: "High",
    packing: "Wrap in bubble wrap until it looks like a mummy",
    tape: "Brown packing tape",
    foods: ["Achhar", "Meen Curry", "Mango Chutney"],
    image: "glass.png",
    description: "The classic choice. Fragile but dignified, like a wine bottle that's been through customs."
  },
  {
    type: "Plastic Bottle",
    risk: "Medium",
    packing: "Bubble wrap + cling film",
    tape: "Duct tape",
    foods: ["Coconut Oil", "Curry Paste"],
    image: "boost.png",
    description: "The workhorse. Not fancy but gets the job done without drama."
  },
  {
    type: "Tupperware",
    risk: "Low",
    packing: "Just cling film around the lid",
    tape: "Electrical tape",
    foods: ["Snacks", "Curries"],
    image: "tupper.png",
    description: "The responsible choice. Won't cause international incidents."
  },
  {
    type: "Banana Leaf",
    risk: "Medium",
    packing: "Aluminium foil + plastic bag",
    tape: "Transparent tape",
    foods: ["Snacks"],
    image: "banana.png",
    description: "Traditional meets modern. Eco-friendly until you wrap it in plastic."
  },
  {
    type: "Coffee Bottle",
    risk: "High",
    packing: "Bubble wrap + cloth wrap",
    tape: "Brown packing tape",
    foods: ["Coffee Powder"],
    image: "coffee.jpg",
    description: "Because instant coffee is for amateurs."
  },
  {
    type: "Plastic Pouch",
    risk: "Medium",
    packing: "Double bagging",
    tape: "Transparent tape",
    foods: ["Banana Chips", "Jackfruit Chips"],
    image: "plastic.jpg",
    description: "The snack smuggler's best friend."
  },
  {
    type: "Cardboard Box",
    risk: "Low",
    packing: "Tape all seams",
    tape: "Brown packing tape",
    foods: ["Pappadams"],
    image: "box.jpg",
    description: "The unsung hero. Simple and effective."
  },
  {
    type: "Steel Dabba",
    risk: "Low",
    packing: "Just cling film",
    tape: "Electrical tape",
    foods: ["Pickles", "Payasam Mix"],
    image: "steel.jpeg",
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

/**
 * Airlines with their brutality indices
 * Higher brutality index = more aggressive baggage handling = more tape needed
 * Based on real-world experiences and urban legends
 */
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

/**
 * All available foods that can be put in any container
 * This comprehensive list includes traditional Kerala foods, spices, and other items
 * Users can mix and match any food with any container (with hilarious results)
 */
export const allFoods = [
  "Achhar", "Meen Curry", "Mango Chutney", "Coconut Oil", "Curry Paste",
  "Snacks", "Curries", "Coffee Powder", "Banana Chips", "Jackfruit Chips",
  "Pappadams", "Pickles", "Payasam Mix", "Random stuff", "Sambar Powder",
  "Rasam Powder", "Idli Batter", "Dosa Batter", "Ghee", "Tamarind Paste",
  "Cardamom", "Cinnamon", "Cloves", "Black Pepper", "Turmeric", "Chili Powder",
  "Coriander Seeds", "Cumin Seeds", "Mustard Seeds","Jaggery", "Coconut"
];

/**
 * Available tape types for packing
 * Randomly selected during calculations to add variety and humor
 * Each tape type has different characteristics and use cases
 */
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

/**
 * Humorous roast messages that appear in calculation results
 * These messages provide comedic commentary on the user's packing choices
 * Randomly selected to add personality and entertainment to the app
 */
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

/**
 * Achievement badges that users can unlock
 * Awarded based on specific conditions like high security levels,
 * excessive tape usage, or choosing brutal airlines
 */
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

/**
 * Sarcastic messages for weird food-container combinations
 * These messages appear when users make questionable choices
 * like putting liquid curry in a plastic bag or spices in a steel container
 * 
 * Structure: containerType -> foodItem -> sarcastic message
 */
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

