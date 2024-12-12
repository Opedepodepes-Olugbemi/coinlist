import { Menu, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

const IsometricCoin = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 80 118"
    fill="#FF6B35"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="0.5px"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M60.4902 102.99V105.56L40.4902 115.56V105.74C45.1902 108.46 49.2202 108.86 52.5702 106.95L58.1102 104.18L60.4902 102.99Z" stroke="#000000" strokeLinejoin="round"/>
    <path d="M49.0403 91.0499C49.0403 93.7499 48.2003 95.5799 46.5303 96.5399C45.1403 97.3199 43.5303 97.3199 41.6803 96.5299C41.3003 96.3699 40.9004 96.1699 40.4904 95.9299L19.1104 83.5899L30.0004 78.1399L37.3303 74.4799L40.4904 76.2999C42.8404 77.6599 44.8503 79.7799 46.5303 82.6699C47.7903 84.8499 48.5802 86.9799 48.8802 89.0499C48.9902 89.7199 49.0403 90.3899 49.0403 91.0499Z" stroke="#000000" strokeLinejoin="round"/>
    <path d="M37.3303 74.4799L30.0004 78.1399L19.1104 83.5899V65.1599L20.2203 64.5999L22.0004 65.6299L37.3303 74.4799Z" stroke="#000000" strokeLinejoin="round"/>
    <path d="M37.2603 45.0699L30.5503 48.4299L19.1104 54.1499V34.5199L30.5503 41.1199L36.2103 44.3899C36.5703 44.5999 36.9203 44.8199 37.2603 45.0699Z" stroke="#000000" strokeLinejoin="round"/>
    <path d="M73.3202 54.0799C73.3202 56.4499 72.9602 58.5199 72.2502 60.2699C71.5302 62.0299 70.5402 63.3999 69.2502 64.3699L49.2502 74.3699C50.5402 73.3999 51.5302 72.0299 52.2502 70.2699C52.9602 68.5199 53.3202 66.4499 53.3202 64.0799C53.3202 63.4299 53.2902 62.7699 53.2402 62.1199C52.9602 58.3099 51.8502 54.3999 49.9202 50.3899C49.8402 50.2299 49.7602 50.0599 49.6802 49.8999C47.2602 45.0299 44.1902 40.9499 40.4902 37.6599L51.9502 31.9299L60.4902 27.6599C64.1902 30.9499 67.2602 35.0299 69.6802 39.8999C72.1002 44.7799 73.3202 49.4999 73.3202 54.0799Z" stroke="#000000" strokeLinejoin="round"/>
    <path d="M55.29 84.8499C54.94 83.9799 54.57 83.1199 54.16 82.2799C52.82 79.4399 51.1801 76.8099 49.2501 74.3699C50.5401 73.3999 51.5301 72.0299 52.2501 70.2699C52.9601 68.5199 53.32 66.4499 53.32 64.0799C53.32 63.4299 53.2901 62.7699 53.2401 62.1199C52.9601 58.3099 51.85 54.3999 49.92 50.3899C49.84 50.2299 49.76 50.0599 49.68 49.8999C47.26 45.0299 44.1901 40.9499 40.4901 37.6599V27.2399L39.11 26.4399L32.4901 22.6199L31.94 22.2999V32.1099L30.55 31.3099L23.3799 27.1699V17.3599L14.83 12.4199V22.2399L2 14.8299V24.6399L10.55 29.5799V78.6499L2 73.7099V83.5199L14.83 90.9299V100.75L23.3799 105.68V95.8699L31.94 100.81V110.62L40.4901 115.56V105.74C45.1901 108.46 49.22 108.86 52.57 106.95C54.16 106.05 55.36 104.75 56.19 103.08C57.12 101.2 57.59 98.8399 57.59 95.9899C57.59 92.3899 56.83 88.6799 55.29 84.8499ZM19.11 34.5199L30.55 41.1199L36.21 44.3899C36.57 44.5999 36.9199 44.8199 37.2599 45.0699C39.1699 46.4099 40.8301 48.3099 42.2501 50.7599C43.5201 52.9399 44.3 55.0599 44.6 57.1299C44.71 57.8099 44.7599 58.4799 44.7599 59.1399C44.7599 61.8399 43.9301 63.6699 42.2501 64.6299C41.3101 65.1599 40.26 65.3299 39.11 65.1399C38.2 64.9899 37.24 64.6199 36.21 64.0199L30.55 60.7499L19.11 54.1499V34.5199ZM46.53 96.5399C45.14 97.3199 43.53 97.3199 41.68 96.5399C41.3 96.3799 40.9001 96.1799 40.4901 95.9399L19.11 83.5999V63.9699L20.22 64.6099L22.0001 65.6399L37.33 74.4899L40.4901 76.3099C42.8401 77.6699 44.85 79.7899 46.53 82.6799C47.79 84.8599 48.5799 86.9899 48.8799 89.0599C48.9899 89.7299 49.04 90.3999 49.04 91.0599C49.04 93.7599 48.2 95.5899 46.53 96.5499V96.5399Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M77.59 85.9899C77.59 91.3899 75.9199 95.0399 72.5699 96.9499L71.6899 97.3899L60.49 102.99L58.11 104.18L52.5699 106.95C54.1599 106.05 55.3599 104.75 56.1899 103.08C57.1199 101.2 57.59 98.8399 57.59 95.9899C57.59 92.3899 56.8299 88.6799 55.2899 84.8499C54.9399 83.9799 54.5699 83.1199 54.1599 82.2799C52.8199 79.4399 51.18 76.8099 49.25 74.3699L69.25 64.3699C71.75 67.5299 73.7599 71.0199 75.2899 74.8499C76.8299 78.6799 77.59 82.3899 77.59 85.9899Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M60.4902 17.2399V27.6599L51.9502 31.9299L40.4902 37.6599V27.2399L42.2802 26.3499L51.3901 21.7899L51.9402 21.5199L60.4902 17.2399Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M60.4905 17.2399L51.9404 21.5199L51.3904 21.7899L42.2804 26.3499L40.4905 27.2399L39.1105 26.4399L32.4905 22.6199L31.9404 22.2999L43.3804 16.5799L51.9404 12.2999L60.4905 17.2399Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M31.9399 22.8899V32.1099L30.5499 31.3099L23.3799 27.1699L30.5499 23.5899L31.9399 22.8899Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M43.3799 7.35992V16.5799L31.9399 22.2999V22.8899L30.5499 23.5899L23.3799 27.1699V17.3599L25.1599 16.4699L34.2699 11.9199L34.83 11.6399L43.3799 7.35992Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M25.72 6.9799L22.0001 8.83989L14.83 12.4199V22.2399L2 14.8299L22.0001 4.8299L25.72 6.9799Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M43.38 7.35992L34.8301 11.6399L34.27 11.9199L25.16 16.4699L23.38 17.3599L14.8301 12.4199L22.0001 8.83992L25.7201 6.97992L34.8301 2.41992L43.38 7.35992Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M10.55 69.4399V78.6499L2 73.7099L10.55 69.4399Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M44.7603 59.1399C44.7603 61.8399 43.9304 63.6699 42.2504 64.6299C41.3104 65.1599 40.2604 65.3299 39.1104 65.1399C38.2004 64.9899 37.2403 64.6199 36.2103 64.0199L30.5503 60.7499L19.1104 54.1499L30.5503 48.4299L37.2603 45.0699C39.1703 46.4099 40.8304 48.3099 42.2504 50.7599C43.5204 52.9399 44.3003 55.0599 44.6003 57.1299C44.7103 57.8099 44.7603 58.4799 44.7603 59.1399Z" stroke="#FFBE00" strokeLinejoin="round"/>
    <path d="M31.9399 100.81V101.4L23.3799 105.68V95.8699L31.9399 100.81Z" stroke="#FFBE00" strokeLinejoin="round"/>
  </svg>
);

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
            <IsometricCoin />
            <span>Coinlist</span>
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
              <IsometricCoin />
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
              <IsometricCoin />
              <span>Coinlist</span>
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
                <IsometricCoin />
                made for coin enthusiasts by coderhema
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
