import { useQuery } from "@tanstack/react-query";
import { getTopAssets } from "@/lib/api";
import { AssetTable } from "@/components/AssetTable";
import { useToast } from "@/components/ui/use-toast";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { useState, useMemo } from "react";

const Index = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rank");

  const { data: assets, isLoading, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load cryptocurrency data. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const filteredAndSortedAssets = useMemo(() => {
    if (!assets) return [];

    let filtered = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return Number(a.priceUsd) - Number(b.priceUsd);
        case "priceDesc":
          return Number(b.priceUsd) - Number(a.priceUsd);
        case "changeAsc":
          return (
            Number(a.changePercent24Hr) - Number(b.changePercent24Hr)
          );
        case "changeDesc":
          return (
            Number(b.changePercent24Hr) - Number(a.changePercent24Hr)
          );
        default:
          return Number(a.rank) - Number(b.rank);
      }
    });
  }, [assets, search, sortBy]);

  if (isLoading) {
    return (
      <div className="container py-8 animate-pulse">
        <div className="h-8 w-64 bg-brutal-black/20 mb-8 rounded" />
        <div className="brutal-border bg-brutal-white p-4">
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-12 bg-brutal-black/20 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="brutal-border bg-brutal-orange/20 p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Assets</h1>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-slide-up">
      <h1 className="text-4xl font-bold mb-8">Top 50 Cryptocurrencies</h1>
      <SearchAndFilter
        searchValue={search}
        sortValue={sortBy}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
      />
      <AssetTable assets={filteredAndSortedAssets} />
    </div>
  );
};

export default Index;