# 🧳 SuitcaseSaver Pro

> **The most serious packing calculator you'll ever need** - because your curry deserves better than a plastic bag and prayers.

A comprehensive React-based packing calculator that uses scientifically rigorous formulas to determine the optimal amount of tape needed to secure your food containers for travel. Built with humor, personality, and real-world packing wisdom.

## ✨ Features

### 🎪 **Interactive Container Selection**
- **Drag & Drop**: Intuitive drag-and-drop interface for adding containers
- **Click to Add**: Alternative click functionality for mobile users
- **Horizontal Scrolling**: Unlimited container selection with smooth scrolling
- **Visual Stacking**: Duplicate containers are grouped with count badges
- **Real-time Preview**: See your selection as you build it

### 🍽️ **Flexible Food System**
- **35+ Food Items**: Comprehensive list of traditional Kerala foods and spices
- **Any Food, Any Container**: Mix and match without restrictions
- **Per-Container Food Selection**: Assign different foods to each container
- **Sarcastic Messages**: Humorous commentary on questionable combinations

### 🧮 **Smart Calculation Engine**
- **Scientific Formula**: `base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)`
- **Container Multipliers**: Realistic tape requirements based on fragility
- **Airline Brutality**: Different airlines have different baggage handling "personalities"
- **Multi-Container Support**: Aggregate results from multiple containers
- **Real-time Updates**: Visual feedback as you adjust settings

### 🏆 **Achievement System**
- **10 Unique Badges**: Unlock achievements based on your packing choices
- **25 Roast Messages**: Humorous commentary on your packing strategy
- **8 Tape Types**: Variety in recommendations for different scenarios
- **Conditional Awards**: Special badges for extreme packing choices

### 🎨 **Enhanced User Experience**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Dark/Light Mode**: Automatic theme detection
- **Accessibility**: Full keyboard navigation and screen reader support
- **Share Results**: Native sharing or clipboard copy functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/suitcase-saver-pro.git
cd suitcase-saver-pro

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 📊 How It Works

### Core Calculation Formula
```
tapeLength = base * quantity * (1 + anxietyFactor/10) * (1 + brutalityIndex/8)
```

Where:
- **base**: Container-specific multiplier (0.6m - 2.2m)
- **quantity**: Number of containers (currently 1 per calculation)
- **anxietyFactor**: User's security level (0-10)
- **brutalityIndex**: Airline's baggage handling rating (0-10)

### Container Multipliers
| Container Type | Multiplier | Description |
|----------------|------------|-------------|
| Plastic Bag | 2.2m | High risk, needs lots of tape |
| Glass Jar | 1.8m | Fragile, careful packing required |
| Coffee Bottle | 1.5m | Moderate risk |
| Plastic Bottle | 1.2m | Standard protection |
| Banana Leaf | 1.0m | Traditional, moderate risk |
| Cardboard Box | 0.9m | Sturdy but needs sealing |
| Tupperware | 0.8m | Reliable, minimal tape |
| Steel Dabba | 0.7m | Indestructible, minimal tape |
| Plastic Pouch | 0.6m | Lightweight, easy to secure |

### Airline Brutality Indices
| Airline | Brutality Index | Description |
|---------|-----------------|-------------|
| Budget Airline | 10 | "Baggage handler's revenge" |
| SpiceJet | 9 | High turbulence expected |
| IndiGo | 8 | Moderate brutality |
| Air India | 7 | Standard handling |
| British Airways | 5 | Professional but busy |
| Vistara | 4 | Gentle handling |
| Emirates | 3 | Premium service |
| Qatar Airways | 2 | Careful handling |
| Singapore Airlines | 2 | Excellent service |

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first styling with custom design system
- **Framer Motion**: Smooth animations and transitions
- **Radix UI**: Accessible component primitives
- **React Router**: Client-side routing

### Key Components
- **Calculator.tsx**: Main application logic and calculation engine
- **DragDropContainerSelector.tsx**: Container selection interface
- **AnimatedSuitcase.tsx**: Visual feedback component
- **BananaChipParticles.tsx**: Decorative background animation

### Data Structure
```typescript
interface Container {
  type: string;
  risk: "Low" | "Medium" | "High" | "Very High";
  packing: string;
  tape: string;
  foods: string[];
  image: string;
  description: string;
}

interface ContainerWithFood extends Container {
  selectedFood?: string;
}

interface CalculationResults {
  tapeLength: { cm: number; mm: number; uncleArmSpans: number };
  tapeType: string;
  bubbleWrapLayers: number;
  leakProbability: number;
  packingInstructions: string;
  roastMessage: string;
  riskLevel: string;
  achievements: string[];
}
```

## 🎯 Customization

### Adding New Containers
Edit `src/data/containers.ts`:
```typescript
export const containers: Container[] = [
  {
    type: "Your Container",
    risk: "Medium",
    packing: "Your packing instructions",
    tape: "Recommended tape type",
    foods: ["Food1", "Food2"],
    image: "https://your-image-url.com/image.jpg",
    description: "Humorous description"
  }
];
```

### Adding New Foods
Add to the `allFoods` array in `src/data/containers.ts`:
```typescript
export const allFoods = [
  // ... existing foods
  "Your New Food"
];
```

### Adding Sarcastic Messages
Add to the `sarcasticMessages` object:
```typescript
export const sarcasticMessages: Record<string, Record<string, string>> = {
  "Container Type": {
    "Food Item": "Your sarcastic message here"
  }
};
```

### Modifying Calculation Formula
Edit the calculation logic in `src/utils/calculator.ts`:
```typescript
// Modify the core formula in calculatePacking function
let tapeLength = base * quantity * (1 + anxietyFactor / 10) * (1 + brutalityIndex / 8);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Add JSDoc comments for all functions
- Maintain the humorous tone in user-facing text
- Test on multiple screen sizes
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Amma's Wisdom**: For teaching us that hope is not a packing strategy
- **Baggage Handlers**: For inspiring our brutality indices
- **Traditional Kerala Cuisine**: For providing endless packing challenges
- **The Tape Industry**: For making this calculator necessary

## 🐛 Known Issues

- None currently known. The app is scientifically perfect. ✨

## 📞 Support

If you have questions about packing strategies or need help with the calculator:
- Open an issue on GitHub
- Check the calculation formula documentation
- Remember: when in doubt, add more tape

---

**Remember**: This calculator is 100% scientifically accurate* and will ensure your food arrives safely at its destination.

*Accuracy not guaranteed, but the humor is.
