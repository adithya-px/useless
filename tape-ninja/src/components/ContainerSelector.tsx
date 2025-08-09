import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Container } from "@/data/containers";

interface ContainerSelectorProps {
  containers: Container[];
  selectedContainer: string;
  onContainerSelect: (containerType: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low": return "bg-green-500/20 text-green-600 border-green-500/30";
    case "Medium": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    case "High": return "bg-orange-500/20 text-orange-600 border-orange-500/30";
    case "Very High": return "bg-red-500/20 text-red-600 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-600 border-gray-500/30";
  }
};

export const ContainerSelector = ({ 
  containers, 
  selectedContainer, 
  onContainerSelect,
  isOpen,
  onClose
}: ContainerSelectorProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[80vh] overflow-y-auto"
          >
            <Card className="shadow-2xl border-2 border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-2xl font-bold">
                  🎯 Choose Your Weapon of Mass Protection
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground text-sm">
                  Select the container that best represents your level of paranoia and commitment to food safety.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {containers.map((container, index) => (
                    <motion.div
                      key={container.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          selectedContainer === container.type 
                            ? 'ring-2 ring-primary shadow-lg bg-primary/5' 
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => {
                          onContainerSelect(container.type);
                          onClose();
                        }}
                      >
                        <CardContent className="p-4">
                          {/* Container Image */}
                          <div className="relative mb-3">
                            <img
                              src={container.image}
                              alt={container.type}
                              className="w-full h-32 object-cover rounded-lg bg-muted"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%236b7280'%3E%3C/rect%3E%3C/svg%3E";
                              }}
                            />
                            <Badge 
                              className={`absolute top-2 right-2 ${getRiskColor(container.risk)}`}
                            >
                              {container.risk} Risk
                            </Badge>
                          </div>

                          {/* Container Info */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-card-foreground">
                              {container.type}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {container.description}
                            </p>

                            {/* Food Items */}
                            <div className="pt-2">
                              <p className="text-xs font-medium text-muted-foreground mb-1">
                                Perfect for:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {container.foods.slice(0, 2).map((food) => (
                                  <span 
                                    key={food}
                                    className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                                  >
                                    {food}
                                  </span>
                                ))}
                                {container.foods.length > 2 && (
                                  <span className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full">
                                    +{container.foods.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Tape Type */}
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground">
                                Recommended: <span className="font-medium">{container.tape}</span>
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Remember: The best container is the one that survives your mother's inspection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
