import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AnimatedSuitcase } from "@/components/AnimatedSuitcase";
import { BananaChipParticles } from "@/components/BananaChipParticles";
import { DragDropContainerSelector, ContainerWithFood } from "@/components/DragDropContainerSelector";
import { buttonVariants } from "@/components/ui/button-variants";
import { containers, airlines, Container, sarcasticMessages, allFoods } from "@/data/containers";
import { calculatePacking, playTapeSound, CalculationInputs, CalculationResults } from "@/utils/calculator";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share, Trophy, Zap, Package, Shield } from "lucide-react";
import { toast } from "sonner";

export const Calculator = () => {
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState<CalculationInputs>({
    containerType: "",
    foodItem: "",
    securityLevel: 5,
    airline: "",
    journeyRoughness: 5
  });
  
  const [selectedContainers, setSelectedContainers] = useState<ContainerWithFood[]>([]);
  
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [tapeLayers, setTapeLayers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isContainerSelectorOpen, setIsContainerSelectorOpen] = useState(false);

  const selectedContainer = selectedContainers.length > 0 ? selectedContainers[0] : null;
  const availableFoods = selectedContainers.flatMap(c => c.selectedFood ? [c.selectedFood] : c.foods);

  // Generate sarcastic messages for weird combinations
  const getSarcasticMessage = (container: ContainerWithFood): string | null => {
    if (!container.selectedFood) return null;
    const containerMessages = sarcasticMessages[container.type];
    return containerMessages?.[container.selectedFood] || null;
  };

  // Calculate tape layers based on inputs
  useEffect(() => {
    const layers = Math.ceil((inputs.securityLevel + inputs.journeyRoughness) / 2.5);
    setTapeLayers(layers);
    
    if (layers > tapeLayers) {
      playTapeSound();
    }
  }, [inputs.securityLevel, inputs.journeyRoughness]);

  const handleCalculate = () => {
    if (selectedContainers.length === 0 || !inputs.foodItem || !inputs.airline) {
      toast.error("Please select at least one container and fill in all fields before calculating!");
      return;
    }

    try {
      // Calculate for all selected containers
      const allResults = selectedContainers.map(container => {
        const calculationInputs = {
          ...inputs,
          containerType: container.type
        };
        return calculatePacking(calculationInputs);
      });
      
      // Combine results (use the first one as base, but aggregate achievements)
      const combinedResults = allResults[0];
      combinedResults.achievements = [...new Set(allResults.flatMap(r => r.achievements))];
      
      // Sum up tape lengths
      const totalTapeLength = allResults.reduce((sum, result) => sum + result.tapeLength.cm, 0);
      combinedResults.tapeLength = {
        cm: totalTapeLength,
        mm: totalTapeLength * 10,
        uncleArmSpans: Math.round((totalTapeLength / 180) * 10) / 10
      };
      
      // Average leak probability
      const avgLeakProbability = Math.round(
        allResults.reduce((sum, result) => sum + result.leakProbability, 0) / allResults.length
      );
      combinedResults.leakProbability = avgLeakProbability;
      
      // Max bubble wrap layers
      const maxBubbleWrapLayers = Math.max(...allResults.map(r => r.bubbleWrapLayers));
      combinedResults.bubbleWrapLayers = maxBubbleWrapLayers;
      
      setResults(combinedResults);
      setShowResults(true);
      toast.success(`Packing calculation complete for ${selectedContainers.length} container(s)! Your food is now scientifically protected.`);
    } catch (error) {
      toast.error("Calculation failed. Please check your inputs.");
    }
  };

  const handleShare = () => {
    if (results) {
      const shareText = `I need ${results.tapeLength.cm}cm of tape for my ${inputs.foodItem}! SuitcaseSaver Pro - because hope is not a strategy.`;
      
      if (navigator.share) {
        navigator.share({
          title: "SuitcaseSaver Pro Results",
          text: shareText,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(shareText);
        toast.success("Results copied to clipboard!");
      }
    }
  };

  const getSecurityLevelDescription = (level: number) => {
    if (level <= 2) return "Living dangerously (not recommended)";
    if (level <= 4) return "Playing it safe (boring but effective)";
    if (level <= 6) return "Better safe than sorry (your mother approves)";
    if (level <= 8) return "Fort Knox level (excessive but impressive)";
    return "Apocalypse ready (you might have issues)";
  };

  const getJourneyDescription = (level: number) => {
    if (level <= 2) return "Smooth sailing (rare but nice)";
    if (level <= 4) return "Minor turbulence (standard experience)";
    if (level <= 6) return "Moderate roughness (brace yourself)";
    if (level <= 8) return "High turbulence (pray for your food)";
    return "Baggage handler's revenge (good luck)";
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BananaChipParticles />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing
          </Button>
          
          <h1 className="text-2xl md:text-4xl font-bold kerala-gradient bg-clip-text text-transparent">
            Packing Calculator
          </h1>
          
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-playful">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Packing Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Container Type Selection */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Choose Your Containers
                </Label>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => setIsContainerSelectorOpen(true)}
                >
                  {selectedContainers.length > 0 ? (
                    <div className="w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{selectedContainers.length} container{selectedContainers.length !== 1 ? 's' : ''} selected</div>
                          <div className="text-sm text-muted-foreground">Click to modify selection</div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {selectedContainers.slice(0, 3).map((container, index) => (
                          <div key={index} className="flex items-center gap-2 px-2 py-1 bg-secondary/50 rounded-full text-xs">
                            <img
                              src={container.image}
                              alt={container.type}
                              className="w-4 h-4 object-cover rounded"
                            />
                            <span>{container.type}</span>
                          </div>
                        ))}
                        {selectedContainers.length > 3 && (
                          <div className="px-2 py-1 bg-secondary/50 rounded-full text-xs">
                            +{selectedContainers.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">
                      Click to select your containers of choice...
                    </div>
                  )}
                </Button>
              </div>

              {/* Food Item */}
              {selectedContainers.length > 0 && (
                <div>
                  <Label htmlFor="food" className="text-base font-medium">
                    Food Item
                  </Label>
                  <Select
                    value={inputs.foodItem}
                    onValueChange={(value) => setInputs({ ...inputs, foodItem: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your precious cargo" />
                    </SelectTrigger>
                                      <SelectContent>
                    {allFoods.map((food) => (
                      <SelectItem key={food} value={food}>
                        {food}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
                </div>
              )}

              {/* Security Level */}
              <div>
                <Label className="text-base font-medium">
                  Security Level: {inputs.securityLevel}/10
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {getSecurityLevelDescription(inputs.securityLevel)}
                </p>
                <Slider
                  value={[inputs.securityLevel]}
                  onValueChange={(value) => setInputs({ ...inputs, securityLevel: value[0] })}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Basic</span>
                  <span>Maximum</span>
                </div>
              </div>

              {/* Airline */}
              <div>
                <Label htmlFor="airline" className="text-base font-medium">
                  Airline
                </Label>
                <Select
                  value={inputs.airline}
                  onValueChange={(value) => setInputs({ ...inputs, airline: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your airline" />
                  </SelectTrigger>
                  <SelectContent>
                    {airlines.map((airline) => (
                      <SelectItem key={airline.name} value={airline.name}>
                        {airline.name} (Risk: {airline.brutalityIndex}/10)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Journey Roughness */}
              <div>
                <Label className="text-base font-medium">
                  Journey Roughness: {inputs.journeyRoughness}/10
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {getJourneyDescription(inputs.journeyRoughness)}
                </p>
                <Slider
                  value={[inputs.journeyRoughness]}
                  onValueChange={(value) => setInputs({ ...inputs, journeyRoughness: value[0] })}
                  max={10}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smooth</span>
                  <span>Rough</span>
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                className={buttonVariants({ variant: "kerala", size: "lg" })}
                disabled={selectedContainers.length === 0 || !inputs.foodItem || !inputs.airline}
              >
                <Shield className="w-4 h-4 mr-2" />
                Calculate Tape Requirements
              </Button>
            </CardContent>
          </Card>

          {/* Visual Feedback */}
          <div className="space-y-6">
            {/* Animated Suitcase */}
            <Card className="shadow-playful">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>🧳</span> Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <AnimatedSuitcase 
                  tapeLayers={tapeLayers} 
                  isLeaking={false}
                  className="scale-110"
                />
                
                <div className="text-center text-sm text-muted-foreground">
                  Current protection layers: <span className="font-bold text-primary">{tapeLayers}</span>
                </div>
                
                <p className="text-xs text-muted-foreground text-center">
                  Your food is being protected by {tapeLayers} layers of tape. 
                  {tapeLayers > 5 && " That's... a lot of tape."}
                </p>
              </CardContent>
            </Card>

            {/* Results */}
            <AnimatePresence>
              {showResults && results && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                >
                  <Card className="shadow-suitcase border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 kerala-gradient bg-clip-text text-transparent">
                        <Trophy className="w-5 h-5 text-kerala-gold" />
                        Packing Analysis Report
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Tape Requirements */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{(results.tapeLength.cm / 100).toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Meters</div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{results.tapeLength.uncleArmSpans}</div>
                          <div className="text-sm text-muted-foreground">Arm Spans</div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tape Type:</span>
                          <span className="font-semibold">{results.tapeType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protection Layers:</span>
                          <span className="font-semibold">{results.bubbleWrapLayers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Leak Chance:</span>
                          <span className="font-semibold text-accent">{results.leakProbability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk Level:</span>
                          <span className={`font-semibold ${
                            results.riskLevel === 'Low' ? 'text-green-600' :
                            results.riskLevel === 'Medium' ? 'text-yellow-600' :
                            results.riskLevel === 'High' ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {results.riskLevel}
                          </span>
                        </div>
                      </div>

                      {/* Analysis Message */}
                      <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                        <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Expert Analysis
                        </h4>
                        <p className="text-sm italic">{results.roastMessage}</p>
                      </div>

                      {/* Sarcastic Messages for Weird Combinations */}
                      {selectedContainers.some(container => getSarcasticMessage(container)) && (
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800/30">
                          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-2">
                            🤔 Questionable Choices Detected
                          </h4>
                          <div className="space-y-2">
                            {selectedContainers.map((container, index) => {
                              const message = getSarcasticMessage(container);
                              if (!message) return null;
                              return (
                                <div key={index} className="text-sm text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 p-2 rounded">
                                  <span className="font-medium">{container.type} + {container.selectedFood}:</span> {message}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Achievements */}
                      {results.achievements.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-kerala-gold" />
                            Achievements Unlocked
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {results.achievements.map((achievement, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-kerala-gold/20 text-kerala-gold text-xs rounded-full border border-kerala-gold/30"
                              >
                                🏆 {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Packing Instructions */}
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Packing Instructions</h4>
                        <p className="text-sm">{results.packingInstructions}</p>
                      </div>

                      {/* Share Button */}
                      <Button
                        onClick={handleShare}
                        className={buttonVariants({ variant: "tape", size: "lg" })}
                      >
                        <Share className="w-4 h-4 mr-2" />
                        Share Results
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Container Selector Modal */}
        <DragDropContainerSelector
          containers={containers}
          selectedContainers={selectedContainers}
          onContainerSelect={(containers) => {
            setSelectedContainers(containers);
            setInputs({ ...inputs, foodItem: "" });
          }}
          isOpen={isContainerSelectorOpen}
          onClose={() => setIsContainerSelectorOpen(false)}
        />
      </div>
    </div>
  );
};