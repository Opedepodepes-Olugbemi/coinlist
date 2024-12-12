import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { AssetTable } from "@/components/AssetTable";
import { getTopAssets } from "@/lib/api";
import { Asset } from "@/types/crypto";
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  const { session } = useAuth();
  const { toast } = useToast();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("asset_id")
        .eq("user_id", session?.user?.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch favorites",
          variant: "destructive",
        });
        return [];
      }

      return data;
    },
    enabled: !!session?.user?.id,
  });

  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: getTopAssets,
  });

  if (!session) {
    return (
      <div className="container py-8">
        <div className="brutal-border bg-brutal-orange/20 p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p>You need to be signed in to view your favorites.</p>
        </div>
      </div>
    );
  }

  const favoriteAssets: Asset[] = assets?.filter((asset) =>
    favorites?.some((fav) => fav.asset_id === asset.id)
  ) || [];

  return (
    <div className="container py-8 animate-slide-up">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Favorites</h1>
      {favoriteAssets.length === 0 ? (
        <div className="brutal-border bg-brutal-white p-8 text-center">
          <h2 className="text-xl font-bold mb-4">No Favorites Yet</h2>
          <p>Start adding some cryptocurrencies to your favorites!</p>
        </div>
      ) : (
        <AssetTable assets={favoriteAssets} />
      )}
    </div>
  );
};

export default Favorites;