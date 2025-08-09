import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Package, Plus, Edit3 } from "lucide-react";
import { Container, allFoods } from "@/data/containers";

// Extended container interface with selected food
/**
 * Extended container interface that includes the user's selected food
 * This allows each container instance to have its own food assignment
 */
export interface ContainerWithFood extends Container {
  /** The food item selected by the user for this specific container */
  selectedFood?: string;
}

/**
 * Props interface for the DragDropContainerSelector component
 */
interface DragDropContainerSelectorProps {
  /** Available containers to choose from */
  containers: Container[];
  /** Currently selected containers with their assigned foods */
  selectedContainers: ContainerWithFood[];
  /** Callback when container selection changes */
  onContainerSelect: (containers: ContainerWithFood[]) => void;
  /** Whether the selector modal is open */
  isOpen: boolean;
  /** Callback to close the selector modal */
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

/**
 * DragDropContainerSelector Component
 * 
 * A comprehensive container selection interface that supports:
 * - Drag and drop functionality for adding containers
 * - Click-to-add functionality for easier mobile use
 * - Horizontal scrolling for unlimited container selection
 * - Food selection per container with full food list
 * - Visual stacking indicators for duplicate containers
 * - Real-time container count and type display
 * 
 * The component provides an intuitive way to build a packing list
 * with multiple containers and custom food assignments.
 */
export const DragDropContainerSelector = ({
  containers,
  selectedContainers,
  onContainerSelect,
  isOpen,
  onClose
}: DragDropContainerSelectorProps) => {
  // State for drag and drop functionality
  const [draggedContainer, setDraggedContainer] = useState<Container | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  
  // State for food editing interface
  const [editingFoodIndex, setEditingFoodIndex] = useState<number | null>(null);
  
  // State to prevent click events during drag operations
  const [isDragging, setIsDragging] = useState(false);
  
  // Reference to the drop zone for drag and drop events
  const dropZoneRef = useRef<HTMLDivElement>(null);

  /**
   * Handles the start of a drag operation
   * Sets up the drag data and prevents click events during drag
   * 
   * @param e - Drag event
   * @param container - Container being dragged
   */
  const handleDragStart = (e: React.DragEvent, container: Container) => {
    setDraggedContainer(container);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", container.type);
    
    // Reset dragging state after a timeout in case drag doesn't complete properly
    setTimeout(() => setIsDragging(false), 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  /**
   * Handles dropping a container into the selection area
   * Creates a new ContainerWithFood with default food selection
   * 
   * @param e - Drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    setIsDragging(false);
    
    if (draggedContainer) {
      // Create container with default food selection
      const containerWithFood: ContainerWithFood = {
        ...draggedContainer,
        selectedFood: draggedContainer.foods[0] // Default to first food
      };
      const newSelectedContainers = [...selectedContainers, containerWithFood];
      onContainerSelect(newSelectedContainers);
      setDraggedContainer(null);
    }
  };

  /**
   * Updates the food selection for a specific container
   * 
   * @param containerIndex - Index of the container to update
   * @param newFood - New food item to assign
   */
  const handleFoodChange = (containerIndex: number, newFood: string) => {
    const updatedContainers = [...selectedContainers];
    updatedContainers[containerIndex] = {
      ...updatedContainers[containerIndex],
      selectedFood: newFood
    };
    onContainerSelect(updatedContainers);
    setEditingFoodIndex(null);
  };

  /**
   * Handles clicking on a container to add it (alternative to drag & drop)
   * Prevents accidental clicks during drag operations
   * 
   * @param container - Container to add
   */
  const handleContainerClick = (container: Container) => {
    // Don't trigger click if we're in the middle of dragging
    if (isDragging) return;
    
    const containerWithFood: ContainerWithFood = {
      ...container,
      selectedFood: container.foods[0] // Default to first food
    };
    const newSelectedContainers = [...selectedContainers, containerWithFood];
    onContainerSelect(newSelectedContainers);
  };

  /**
   * Groups selected containers by type and counts duplicates
   * This enables the stacking UI where multiple containers of the same type
   * are displayed as a single card with a count badge
   */
  const groupedContainers = selectedContainers.reduce((acc, container, index) => {
    const existingGroup = acc.find(group => group.container.type === container.type);
    if (existingGroup) {
      existingGroup.count += 1;
      existingGroup.indices.push(index);
    } else {
      acc.push({
        container,
        count: 1,
        indices: [index]
      });
    }
    return acc;
  }, [] as Array<{ container: ContainerWithFood; count: number; indices: number[] }>);

  const removeContainer = (index: number) => {
    const newSelectedContainers = selectedContainers.filter((_, i) => i !== index);
    onContainerSelect(newSelectedContainers);
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex flex-col"
          onClick={onClose}
        >
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-background/95 backdrop-blur-sm border-b">
              <div>
                <h2 className="text-2xl font-bold">🎯 Container Selection</h2>
                <p className="text-muted-foreground">Drag containers from the bottom bar to the drop zone</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col p-6 gap-6">
              {/* Drop Zone */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Selected Containers</h3>
                  {selectedContainers.length > 0 && (
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {groupedContainers.length !== selectedContainers.length 
                        ? `${groupedContainers.length} types, ${selectedContainers.length} total`
                        : `${selectedContainers.length} selected`
                      }
                    </span>
                  )}
                </div>
                
                <div
                  ref={dropZoneRef}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`h-32 border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
                    isDraggingOver 
                      ? 'border-primary bg-primary/10 scale-105' 
                      : 'border-muted-foreground/30 bg-muted/20'
                  }`}
                >
                  {selectedContainers.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <Package className="w-8 h-8 text-muted-foreground/50 mb-2" />
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Drop containers here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Drag from below to build your strategy
                      </p>
                    </div>
                  ) : (
                    <div className="h-full overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
                      <div className="flex gap-3 h-full pb-2">
                        {groupedContainers.map((group, groupIndex) => (
                          <motion.div
                            key={`${group.container.type}-group`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="flex-shrink-0 relative"
                          >
                            <Card className="h-full w-40 shadow-md hover:shadow-lg transition-shadow">
                              <CardContent className="p-2 h-full flex flex-col">
                                <div className="relative mb-2">
                                  <img
                                    src={group.container.image}
                                    alt={group.container.type}
                                    className="w-full h-12 object-cover rounded bg-muted"
                                  />
                                  <Badge 
                                    className={`absolute -top-1 -right-1 text-xs ${getRiskColor(group.container.risk)}`}
                                  >
                                    {group.container.risk}
                                  </Badge>
                                  {group.count > 1 && (
                                    <Badge 
                                      className="absolute top-0 left-0 bg-primary text-primary-foreground text-xs font-bold"
                                    >
                                      ×{group.count}
                                    </Badge>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -top-1 -left-1 h-4 w-4 p-0 bg-background/90 hover:bg-background rounded-full"
                                    onClick={() => removeContainer(group.indices[group.indices.length - 1])}
                                  >
                                    <X className="h-2 w-2" />
                                  </Button>
                                </div>
                                
                                <h4 className="font-semibold text-xs mb-1 line-clamp-1" title={group.container.type}>
                                  {group.container.type}
                                  {group.count > 1 && <span className="text-muted-foreground ml-1">(×{group.count})</span>}
                                </h4>
                                <p className="text-xs text-muted-foreground mb-1 line-clamp-1 flex-1" title={group.container.description}>
                                  {group.container.description}
                                </p>
                                
                                <div className="flex flex-col gap-1">
                                  {editingFoodIndex === groupIndex ? (
                                    <Select
                                      value={group.container.selectedFood || group.container.foods[0]}
                                      onValueChange={(value) => handleFoodChange(group.indices[0], value)}
                                    >
                                      <SelectTrigger className="h-6 text-xs">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {allFoods.map((food) => (
                                          <SelectItem key={food} value={food} className="text-xs">
                                            {food}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <div className="flex items-center gap-1">
                                      <span 
                                        className="px-1 py-0.5 bg-secondary/50 text-secondary-foreground text-xs rounded-full flex-1 text-center cursor-pointer hover:bg-secondary/70"
                                        title="Click to change food"
                                        onClick={() => setEditingFoodIndex(groupIndex)}
                                      >
                                        {group.container.selectedFood || group.container.foods[0]}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0 hover:bg-secondary/50"
                                        onClick={() => setEditingFoodIndex(groupIndex)}
                                      >
                                        <Edit3 className="h-2 w-2" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                        
                        {/* Scroll indicator */}
                        {groupedContainers.length > 4 && (
                          <div className="flex-shrink-0 w-8 flex items-center justify-center">
                            <div className="text-muted-foreground/50 text-xs rotate-90">
                              scroll →
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {selectedContainers.length} container{selectedContainers.length !== 1 ? 's' : ''} selected 
                  {groupedContainers.length !== selectedContainers.length && (
                    <span className="ml-1">({groupedContainers.length} unique)</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onContainerSelect([])}>
                    Clear All
                  </Button>
                  <Button onClick={handleDone} disabled={selectedContainers.length === 0}>
                    Done ({selectedContainers.length})
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom Container Bar */}
            <div className="bg-background/95 backdrop-blur-sm border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Available Containers</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Click or drag to add
                </span>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent">
                {containers.map((container) => (
                  <motion.div
                    key={container.type}
                    draggable
                    onDragStart={(e) => handleDragStart(e as any, container)}
                    onClick={() => handleContainerClick(container)}
                    className="flex-shrink-0 cursor-pointer hover:cursor-grab active:cursor-grabbing"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="w-48 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-3">
                        <div className="relative mb-2">
                          <img
                            src={container.image}
                            alt={container.type}
                            className="w-full h-20 object-cover rounded-lg bg-muted"
                          />
                          <Badge 
                            className={`absolute top-1 right-1 text-xs ${getRiskColor(container.risk)}`}
                          >
                            {container.risk}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-sm mb-1">{container.type}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {container.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {container.foods.slice(0, 1).map((food) => (
                              <span 
                                key={food}
                                className="px-1.5 py-0.5 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                          <Plus className="w-4 h-4 text-primary hover:text-primary/80" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
