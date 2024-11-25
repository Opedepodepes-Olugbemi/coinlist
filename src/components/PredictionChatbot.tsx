import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Asset } from "@/types/crypto";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PredictionChatbotProps {
  asset?: Asset;
  onClose: () => void;
}

export function PredictionChatbot({ asset, onClose }: PredictionChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async () => {
    if (!input.trim() || !asset) return;

    const userMessage = {
      role: "user" as const,
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.xai.com/v1/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer xai-6lbwVHBo8BOanCYOvC7QcIyE9D8WbV56jikyvm268PwWKBWcLzw8vtlVbSu93jO5ReemzG397MTZOlCW",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            userMessage,
            {
              role: "system",
              content: `You are a crypto investment advisor. The user is asking about ${asset.name} (${asset.symbol}). Current price: $${asset.priceUsd}, 24h change: ${asset.changePercent24Hr}%. Provide concise, data-driven advice.`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-80 h-96 brutal-border bg-brutal-white flex flex-col p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Prediction Bot - {asset?.symbol}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-brutal-orange/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 brutal-border ${
              message.role === "assistant"
                ? "bg-brutal-yellow/20"
                : "bg-brutal-orange/20"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-2 brutal-border bg-brutal-yellow/20">
            Thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about this coin..."
          className="flex-1 border-2 border-brutal-black"
        />
        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="brutal-border bg-brutal-orange hover:bg-brutal-orange/80"
        >
          Send
        </Button>
      </div>
    </div>
  );
}