import { Coins } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="w-full bg-brutal-white brutal-border mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold brutal-hover">
            <Coins className="h-6 w-6 text-brutal-orange" />
            <span>CryptoTracker</span>
          </Link>
          <div className="text-sm">
            made for coin enthusiasts by coderhema
          </div>
        </div>
      </div>
    </nav>
  );
};