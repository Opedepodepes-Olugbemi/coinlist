import { Coins } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-brutal-white brutal-border mt-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-brutal-orange" />
            <span>Made for coin enthusiasts by coderhema</span>
          </div>
          <p className="text-brutal-black/60">
            © {new Date().getFullYear()} CryptoTracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};