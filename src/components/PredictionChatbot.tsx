import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Asset } from "@/types/crypto";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface PredictionChatbotProps {
  asset: Asset;
  onClose: () => void;
}

const formatMarkdown = (text: string) => {
  // Bold text between ** or __
  text = text.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
  
  // Italic text between * or _
  text = text.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
  
  // Convert line breaks to <br>
  text = text.replace(/\n/g, '<br>');
  
  return text;
};

export const PredictionChatbot = ({ asset, onClose }: PredictionChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI investment advisor. Ask me anything about ${asset.name} (${asset.symbol})!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://srvwhyvkmheqhectyghl.supabase.co/functions/v1/chat-completion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            assetInfo: {
              name: asset.name,
              symbol: asset.symbol,
              priceUsd: asset.priceUsd,
              changePercent24Hr: asset.changePercent24Hr,
            },
          }),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.choices[0].message.content },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 brutal-border bg-brutal-white">
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg brutal-border ${
                  message.role === "user"
                    ? "bg-brutal-orange text-white"
                    : "bg-brutal-yellow"
                }`}
              >
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdown(message.content) 
                  }}
                />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this asset..."
          className="flex-1 p-2 brutal-border focus:outline-none focus:ring-2 focus:ring-brutal-orange"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="brutal-border hover:bg-brutal-orange hover:text-white transition-colors"
        >
          Send
        </Button>
      </form>

      <Button
        onClick={onClose}
        className="mt-4 w-full brutal-border hover:bg-brutal-orange hover:text-white transition-colors"
      >
        Close
      </Button>
    </Card>
  );
};