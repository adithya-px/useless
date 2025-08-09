import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedSuitcase } from "@/components/AnimatedSuitcase";
import { BananaChipParticles } from "@/components/BananaChipParticles";
import { useNavigate } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button-variants";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BananaChipParticles />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 kerala-gradient bg-clip-text text-transparent">
            SuitcaseSaver Pro
          </h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The most serious packing calculator you'll ever need
          </motion.p>
          <motion.p 
            className="text-sm text-muted-foreground/70 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Because your curry deserves better than a plastic bag and prayers
          </motion.p>
        </motion.div>

        {/* Animated Suitcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-12"
        >
          <AnimatedSuitcase tapeLayers={0} className="scale-125" />
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8 max-w-3xl"
        >
          <p className="text-base md:text-lg text-foreground/80 mb-4">
            Professional-grade packing calculator for travelers who take their food seriously. 
            Very seriously. Like, way too seriously.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-secondary/50 rounded-full">🔒 Secure</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">📊 Scientific</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">🎯 Precise</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">😅 Excessive</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="space-y-4"
        >
          <Button
            onClick={() => navigate("/calculator")}
            className={buttonVariants({ variant: "kerala", size: "xl" })}
          >
            🧳 Start Packing Science
          </Button>
          
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Warning: May result in excessive tape usage and confused airport staff
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          <div className="bg-card p-6 rounded-lg shadow-playful border border-border">
            <div className="text-3xl mb-3">📐</div>
            <h3 className="font-bold text-card-foreground mb-2">Advanced Math</h3>
            <p className="text-sm text-muted-foreground">
              Complex algorithms that calculate exactly how much tape you need. 
              Because math is the only language baggage handlers understand.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-playful border border-border">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-bold text-card-foreground mb-2">Risk Analysis</h3>
            <p className="text-sm text-muted-foreground">
              We analyze every possible disaster scenario. 
              We've seen things you wouldn't believe. And we're still traumatized.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-playful border border-border">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-card-foreground mb-2">Expert Reports</h3>
            <p className="text-sm text-muted-foreground">
              Professional packing instructions and analysis. 
              Because winging it is not a strategy. Trust us, we've tried.
            </p>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-12 max-w-2xl"
        >
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent font-semibold">⚠️ Professional Disclaimer</span>
            </div>
            <p className="text-sm text-muted-foreground">
              While our calculations are scientifically rigorous, we cannot guarantee that your 
              mother will stop calling to ask if you've packed enough food. Some things are beyond 
              even the most advanced algorithms. Also, we're not responsible for any 
              excessive tape usage or confused customs officers.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-8 grid grid-cols-3 gap-8 max-w-2xl"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-xs text-muted-foreground">Tape Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground">Paranoia Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-xs text-muted-foreground">Food Lost</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};