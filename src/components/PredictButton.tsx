import { Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Asset } from "@/types/crypto";
import { useState, useEffect } from "react";
import { PredictionChatbot } from "./PredictionChatbot";

interface PredictButtonProps {
  asset?: Asset;
}

export function PredictButton({ asset }: PredictButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const distanceToFooter = footerRect.top - window.innerHeight;
        
        if (distanceToFooter < 100) {
          const newOpacity = Math.max(0.2, distanceToFooter / 100);
          setOpacity(newOpacity);
        } else {
          setOpacity(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        className="fixed bottom-4 right-4 z-50"
        style={{ opacity }}
      >
        {asset && (
          <div className="absolute -top-2 -right-2 bg-brutal-yellow brutal-border px-2 py-1 text-xs font-bold z-10">
            {asset.symbol}
          </div>
        )}
        <Button
          onClick={() => setIsOpen(true)}
          className={`brutal-border bg-brutal-orange hover:bg-brutal-orange/80 text-white gap-2 relative ${
            asset ? 'animate-pulse-aura' : ''
          }`}
        >
          <Bot className="h-4 w-4" />
          Predict
        </Button>
      </div>

      {isOpen && <PredictionChatbot asset={asset} onClose={() => setIsOpen(false)} />}
    </>
  );
}