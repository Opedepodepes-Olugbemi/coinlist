import { Asset } from "@/types/crypto";
import { Link } from "react-router-dom";

export function AssetTable({ assets }: { assets: Asset[] }) {
  return (
    <div className="w-full overflow-x-auto brutal-border bg-brutal-white p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b-4 border-brutal-black">
            <th className="p-4">Rank</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price (USD)</th>
            <th className="p-4">24h Change</th>
            <th className="p-4">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-b-2 border-brutal-black hover:bg-brutal-yellow/20 transition-colors"
            >
              <td className="p-4">{asset.rank}</td>
              <td className="p-4">
                <Link
                  to={`/asset/${asset.id}`}
                  className="flex items-center gap-2 hover:text-brutal-orange"
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