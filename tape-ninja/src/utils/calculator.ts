import { Container, containers, airlines, roastMessages, containerMultipliers, tapeTypes, badges } from "@/data/containers";

export interface CalculationInputs {
  containerType: string;
  foodItem: string;
  securityLevel: number;
  airline: string;
  journeyRoughness: number;
}

export interface CalculationResults {
  tapeLength: {
    cm: number;
    mm: number;
    uncleArmSpans: number;
  };
  tapeType: string;
  bubbleWrapLayers: number;
  leakProbability: number;
  packingInstructions: string;
  roastMessage: string;
  riskLevel: string;
  achievements: string[];
}

const getRiskMultiplier = (risk: string): number => {
  switch (risk) {
    case "Low": return 1;
    case "Medium": return 2;
    case "High": return 3;
    case "Very High": return 5;
    default: return 1;
  }
};

const getAchievements = (results: CalculationResults, inputs: CalculationInputs): string[] => {
  const achievements: string[] = [];
  
  if (results.bubbleWrapLayers >= 5) {
    achievements.push("Overpacker");
  }
  
  if (results.tapeLength.cm > 500) {
    achievements.push("Tape Master");
  }
  
  if (inputs.foodItem.toLowerCase().includes("curry") && inputs.containerType === "Glass Jar") {
    achievements.push("Curry Smuggler");
  }
  
  if (inputs.securityLevel >= 9) {
    achievements.push("Paranoid");
  }
  
  if (results.tapeLength.cm > 1000) {
    achievements.push("Tape Tycoon");
  }
  
  return achievements;
};

export const calculatePacking = (inputs: CalculationInputs): CalculationResults => {
  const container = containers.find(c => c.type === inputs.containerType);
  const airline = airlines.find(a => a.name === inputs.airline);
  
  if (!container || !airline) {
    throw new Error("Invalid container or airline selection");
  }
  
  // Core formula: base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)
  const base = containerMultipliers[inputs.containerType] || 1.0;
  const quantity = 1; // We're calculating per container
  const anxietyFactor = inputs.securityLevel;
  const brutalityIndex = airline.brutalityIndex;
  
  let tapeLength = base * quantity * (1 + anxietyFactor / 10) * (1 + brutalityIndex / 8);
  tapeLength = Number(tapeLength.toFixed(2)); // meters
  
  // Convert to different units
  const tapeLengthCm = Math.round(tapeLength * 100);
  const tapeLengthMm = Math.round(tapeLength * 1000);
  const uncleArmSpans = Math.round((tapeLength / 1.8) * 10) / 10; // Average arm span is 1.8m
  
  // Calculate bubble wrap layers based on security and journey roughness
  const bubbleWrapLayers = Math.ceil(
    (inputs.securityLevel + getRiskMultiplier(container.risk) + inputs.journeyRoughness) / 3
  );
  
  // Calculate leak probability
  const leakProbability = Math.max(0, Math.min(100, 
    (getRiskMultiplier(container.risk) * 15) + 
    (brutalityIndex * 5) - 
    (inputs.securityLevel * 3) +
    (inputs.journeyRoughness * 8)
  ));
  
  // Generate packing advice
  const packingAdvice = `Wrap each ${inputs.containerType} with care and secure with the chosen tape. ${container.packing}`;
  
  // Get random tape type, roast message, and badge
  const randomTapeType = tapeTypes[Math.floor(Math.random() * tapeTypes.length)];
  const randomRoastMessage = roastMessages[Math.floor(Math.random() * roastMessages.length)];
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];
  
  const results: CalculationResults = {
    tapeLength: {
      cm: tapeLengthCm,
      mm: tapeLengthMm,
      uncleArmSpans: uncleArmSpans
    },
    tapeType: randomTapeType,
    bubbleWrapLayers,
    leakProbability: Math.round(leakProbability),
    packingInstructions: packingAdvice,
    roastMessage: randomRoastMessage,
    riskLevel: container.risk,
    achievements: [randomBadge]
  };
  
  // Add additional achievements based on conditions
  if (tapeLength > 3) {
    results.achievements.push("🏆 Tape Tycoon");
  }
  if (inputs.securityLevel >= 8) {
    results.achievements.push("🔒 Paranoia Expert");
  }
  if (brutalityIndex >= 8) {
    results.achievements.push("✈️ TSA Nightmare");
  }
  if (leakProbability < 10) {
    results.achievements.push("🛡️ Amma Approved");
  }
  
  return results;
};

export const playTapeSound = () => {
  // Simulate tape sound effect
  console.log("🎵 kkrrttttchhh...");
};