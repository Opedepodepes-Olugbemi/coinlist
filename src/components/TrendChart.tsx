import { AssetHistory } from "@/types/crypto";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";

interface TrendChartProps {
  data: AssetHistory[];
  showTrend?: boolean;
}

export function TrendChart({ data, showTrend = true }: TrendChartProps) {
  // Calculate simple moving average for trend
  const movingAverage = data.map((point, idx) => {
    const window = data.slice(Math.max(0, idx - 24), idx + 1);
    const sum = window.reduce((acc, curr) => acc + Number(curr.priceUsd), 0);
    return {
      ...point,
      ma: sum / window.length,
    };
  });

  // Calculate growth rate
  const firstPrice = Number(data[0]?.priceUsd) || 0;
  const lastPrice = Number(data[data.length - 1]?.priceUsd) || 0;
  const growthRate = ((lastPrice - firstPrice) / firstPrice) * 100;

  return (
    <div className="w-full h-[400px] brutal-border bg-brutal-white p-4">
      <div className="mb-4">
        <span className="font-bold">
          Growth Rate: {growthRate.toFixed(2)}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={movingAverage}>
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
          {showTrend && (
            <Area
              type="monotone"
              dataKey="ma"
              stroke="#FFD700"
              fill="none"
              strokeDasharray="5 5"
            />
          )}
          <ReferenceLine
            y={firstPrice}
            stroke="#000"
            strokeDasharray="3 3"
            label="Start"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}