import { Coins, Menu, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-brutal-white brutal-border mb-8">
      <div className="container mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold brutal-hover"
          >
            <Coins className="h-8 w-8 text-brutal-orange" />
            <span>CryptoTracker</span>
          </Link>
          <div className="flex items-center gap-4">
            {session && (
              <Link
                to="/favorites"
                className="flex items-center gap-2 brutal-hover px-3 py-2"
              >
                <Star className="h-4 w-4" />
                <span>Favorites</span>
              </Link>
            )}
            <div className="text-sm flex items-center gap-2">
              <Coins className="h-4 w-4 text-brutal-orange" />
              made for coin enthusiasts by coderhema
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-bold brutal-hover"
            >
              <Coins className="h-6 w-6 text-brutal-orange" />
              <span>CryptoTracker</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-brutal-yellow/20 rounded-md transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="mt-4 py-4 border-t-4 border-brutal-black animate-slide-up">
              {session && (
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 justify-center brutal-hover px-3 py-2"
                >
                  <Star className="h-4 w-4" />
                  <span>Favorites</span>
                </Link>
              )}
              <div className="flex items-center gap-2 text-sm justify-center mt-2">
                <Coins className="h-4 w-4 text-brutal-orange" />
                made for coin enthusiasts by coderhema
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};