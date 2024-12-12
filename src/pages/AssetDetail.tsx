import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getAsset, getAssetHistory } from "@/lib/api";
import { TrendChart } from "@/components/TrendChart";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PredictButton } from "@/components/PredictButton";

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: asset, isLoading: assetLoading } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAsset(id!),
    enabled: !!id,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load asset details. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ["assetHistory", id],
    queryFn: () => getAssetHistory(id!),
    enabled: !!id,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load price history. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const isLoading = assetLoading || historyLoading;

  if (isLoading) {
    return (
      <div className="container py-8 animate-pulse">
        <div className="h-8 w-64 bg-brutal-black/20 mb-8 rounded" />
        <div className="brutal-border bg-brutal-white h-[400px] rounded" />
      </div>
    );
  }

  if (!asset) return null;

  return (
    <div className="container py-8 animate-slide-up">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 brutal-border px-4 py-2 brutal-hover"
      >
        <ArrowLeft size={20} />
        Back to List
      </Link>

      <div className="grid gap-8">
        <div className="brutal-border bg-brutal-white p-8">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
            <h1 className="text-4xl font-bold">{asset.name}</h1>
            <span className="text-2xl text-brutal-orange">{asset.symbol}</span>
          </div>

          <div className="text-4xl md:text-6xl font-bold mb-4">
            ${Number(asset.priceUsd).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          <div
            className={`text-xl ${
              Number(asset.changePercent24Hr) >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {Number(asset.changePercent24Hr).toFixed(2)}% (24h)
          </div>
        </div>

        {history && <TrendChart data={history} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="brutal-border bg-brutal-white p-4">
            <h3 className="font-bold mb-2">Market Cap</h3>
            <p className="text-xl md:text-2xl">
              ${Number(asset.marketCapUsd).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="brutal-border bg-brutal-white p-4">
            <h3 className="font-bold mb-2">24h Volume</h3>
            <p className="text-xl md:text-2xl">
              ${Number(asset.volumeUsd24Hr).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>

          <div className="brutal-border bg-brutal-white p-4">
            <h3 className="font-bold mb-2">Supply</h3>
            <p className="text-xl md:text-2xl">
              {Number(asset.supply).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
      
      <PredictButton asset={asset} />
    </div>
  );
};

export default AssetDetail;