import { AssetHistory } from "@/types/crypto";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function PriceChart({ data }: { data: AssetHistory[] }) {
  return (
    <div className="w-full h-[400px] brutal-border bg-brutal-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={(str) => new Date(str).toLocaleDateString()}
            stroke="#000000"
          />
          <YAxis
            tickFormatter={(num) =>
              "$" + Number(num).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
            stroke="#000000"
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="brutal-border bg-brutal-white p-2">
                    <p className="font-bold">
                      ${Number(payload[0].value).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-sm">
                      {new Date(payload[0].payload.date).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="priceUsd"
            stroke="#FF6B35"
            fill="#FF6B35"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}