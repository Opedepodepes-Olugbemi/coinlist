import { Asset } from "@/types/crypto";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function AssetTable({ assets }: { assets: Asset[] }) {
  return (
    <div className="w-full overflow-x-auto brutal-border bg-brutal-white dark:bg-brutal-black p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b-4 border-brutal-black dark:border-brutal-white">
            <th className="p-4">Rank</th>
            <th className="p-4">Name</th>
            <th className="p-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                Price (USD)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Current price in US Dollars</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </th>
            <th className="p-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                24h Change
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Price change in the last 24 hours</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </th>
            <th className="p-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                Market Cap
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total market value in US Dollars</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-b-2 border-brutal-black dark:border-brutal-white hover:bg-brutal-yellow/20 transition-colors"
            >
              <td className="p-4">{asset.rank}</td>
              <td className="p-4">
                <Link
                  to={`/asset/${asset.id}`}
                  className="flex items-center gap-2 hover:text-brutal-orange brutal-hover"
                >
                  <span className="font-bold">{asset.symbol}</span>
                  <span className="text-sm">{asset.name}</span>
                </Link>
              </td>
              <td className="p-4">
                ${Number(asset.priceUsd).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td
                className={`p-4 ${
                  Number(asset.changePercent24Hr) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {Number(asset.changePercent24Hr).toFixed(2)}%
              </td>
              <td className="p-4">
                ${Number(asset.marketCapUsd).toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}