import { Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Asset } from "@/types/crypto";
import { useState } from "react";
import { PredictionChatbot } from "./PredictionChatbot";

interface PredictButtonProps {
  asset?: Asset;
}

export function PredictButton({ asset }: PredictButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 brutal-border bg-brutal-orange hover:bg-brutal-orange/80 text-white gap-2"
      >
        <Bot className="h-4 w-4" />
        Predict
      </Button>

      {isOpen && <PredictionChatbot asset={asset} onClose={() => setIsOpen(false)} />}
    </>
  );
}