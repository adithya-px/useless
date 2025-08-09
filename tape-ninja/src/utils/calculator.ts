import { Container, containers, airlines, roastMessages, containerMultipliers, tapeTypes, badges } from "@/data/containers";

/**
 * Input parameters for the packing calculation
 * All values are used in the scientific formula to determine tape requirements
 */
export interface CalculationInputs {
  /** The type of container being used (e.g., "Glass Jar", "Plastic Bottle") */
  containerType: string;
  /** The food item being packed (affects sarcastic messages) */
  foodItem: string;
  /** Security level from 0-10 (user's anxiety factor) */
  securityLevel: number;
  /** Selected airline (affects brutality index) */
  airline: string;
  /** Journey roughness from 0-10 (expected turbulence/handling) */
  journeyRoughness: number;
}

/**
 * Results of the packing calculation
 * Contains all the information needed to pack the user's food safely
 */
export interface CalculationResults {
  /** Tape length in different units for user convenience */
  tapeLength: {
    /** Length in centimeters */
    cm: number;
    /** Length in millimeters */
    mm: number;
    /** Length in uncle arm spans (approximately 1.8m each) */
    uncleArmSpans: number;
  };
  /** Recommended tape type for this packing job */
  tapeType: string;
  /** Number of bubble wrap layers needed */
  bubbleWrapLayers: number;
  /** Probability of leakage (0-100%) */
  leakProbability: number;
  /** Detailed packing instructions */
  packingInstructions: string;
  /** Humorous roast message about the packing choices */
  roastMessage: string;
  /** Risk level of the container (Low/Medium/High/Very High) */
  riskLevel: string;
  /** Achievement badges unlocked */
  achievements: string[];
}

/**
 * Converts risk level string to numerical multiplier
 * Used in calculations to determine tape requirements and leak probability
 * 
 * @param risk - Risk level as string ("Low", "Medium", "High", "Very High")
 * @returns Numerical multiplier for calculations
 */
const getRiskMultiplier = (risk: string): number => {
  switch (risk) {
    case "Low": return 1;
    case "Medium": return 2;
    case "High": return 3;
    case "Very High": return 5;
    default: return 1;
  }
};

/**
 * Determines which achievements the user has unlocked
 * Based on their packing choices and calculation results
 * 
 * @param results - The calculation results
 * @param inputs - The user's input parameters
 * @returns Array of achievement badges unlocked
 */
const getAchievements = (results: CalculationResults, inputs: CalculationInputs): string[] => {
  const achievements: string[] = [];
  
  // Award for excessive bubble wrap usage
  if (results.bubbleWrapLayers >= 5) {
    achievements.push("Overpacker");
  }
  
  // Award for high tape usage
  if (results.tapeLength.cm > 500) {
    achievements.push("Tape Master");
  }
  
  // Special award for curry in glass jar (classic combination)
  if (inputs.foodItem.toLowerCase().includes("curry") && inputs.containerType === "Glass Jar") {
    achievements.push("Curry Smuggler");
  }
  
  // Award for high anxiety levels
  if (inputs.securityLevel >= 9) {
    achievements.push("Paranoid");
  }
  
  // Award for extreme tape usage
  if (results.tapeLength.cm > 1000) {
    achievements.push("Tape Tycoon");
  }
  
  return achievements;
};

/**
 * Main calculation function that determines tape requirements and packing strategy
 * Uses a scientifically rigorous formula to calculate the optimal amount of tape needed
 * 
 * Core Formula: base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)
 * 
 * @param inputs - User's packing parameters
 * @returns Complete calculation results with tape requirements and recommendations
 * @throws Error if container or airline is not found
 */
export const calculatePacking = (inputs: CalculationInputs): CalculationResults => {
  // Find the selected container and airline
  const container = containers.find(c => c.type === inputs.containerType);
  const airline = airlines.find(a => a.name === inputs.airline);
  
  // Validate inputs
  if (!container || !airline) {
    throw new Error("Invalid container or airline selection");
  }
  
  // Apply the core scientific formula for tape calculation
  // Formula: base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)
  const base = containerMultipliers[inputs.containerType] || 1.0; // Container-specific multiplier
  const quantity = 1; // We're calculating per container
  const anxietyFactor = inputs.securityLevel; // User's security level (0-10)
  const brutalityIndex = airline.brutalityIndex; // Airline's baggage handling brutality
  
  // Calculate tape length in meters
  let tapeLength = base * quantity * (1 + anxietyFactor / 10) * (1 + brutalityIndex / 8);
  tapeLength = Number(tapeLength.toFixed(2)); // Round to 2 decimal places
  
  // Convert tape length to different units for user convenience
  const tapeLengthCm = Math.round(tapeLength * 100); // Convert meters to centimeters
  const tapeLengthMm = Math.round(tapeLength * 1000); // Convert meters to millimeters
  const uncleArmSpans = Math.round((tapeLength / 1.8) * 10) / 10; // Convert to uncle arm spans (1.8m each)
  
  // Calculate bubble wrap layers needed for protection
  // Formula: (securityLevel + riskMultiplier + journeyRoughness) / 3
  const bubbleWrapLayers = Math.ceil(
    (inputs.securityLevel + getRiskMultiplier(container.risk) + inputs.journeyRoughness) / 3
  );
  
  // Calculate leak probability percentage (0-100%)
  // Formula: (riskMultiplier * 15) + (brutalityIndex * 5) - (securityLevel * 3) + (journeyRoughness * 8)
  const leakProbability = Math.max(0, Math.min(100, 
    (getRiskMultiplier(container.risk) * 15) + 
    (brutalityIndex * 5) - 
    (inputs.securityLevel * 3) +
    (inputs.journeyRoughness * 8)
  ));
  
  // Generate personalized packing advice
  const packingAdvice = `Wrap each ${inputs.containerType} with care and secure with the chosen tape. ${container.packing}`;
  
  // Select random elements for variety and humor
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
  
  // Award additional achievements based on specific conditions
  if (tapeLength > 3) {
    results.achievements.push("🏆 Tape Tycoon"); // Award for excessive tape usage
  }
  if (inputs.securityLevel >= 8) {
    results.achievements.push("🔒 Paranoia Expert"); // Award for high anxiety levels
  }
  if (brutalityIndex >= 8) {
    results.achievements.push("✈️ TSA Nightmare"); // Award for choosing brutal airlines
  }
  if (leakProbability < 10) {
    results.achievements.push("🛡️ Amma Approved"); // Award for excellent packing (low leak risk)
  }
  
  return results;
};

/**
 * Simulates the sound of tape being applied
 * Currently logs to console, but could be extended to play actual audio
 * Used for humorous effect when tape layers increase
 */
export const playTapeSound = () => {
  // Simulate tape sound effect
  console.log("🎵 kkrrttttchhh...");
};