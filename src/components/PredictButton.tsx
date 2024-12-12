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
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 brutal-border bg-brutal-orange hover:bg-brutal-orange/80 text-white gap-2 ${
          asset ? 'animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]' : ''
        }`}
        style={{ opacity }}
      >
        <Bot className="h-4 w-4" />
        Predict
      </Button>

      {isOpen && <PredictionChatbot asset={asset} onClose={() => setIsOpen(false)} />}
    </>
  );
}