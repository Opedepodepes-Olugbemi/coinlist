import { Star } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function FavoriteButton({ assetId }: { assetId: string }) {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isFavorite, isLoading } = useQuery({
    queryKey: ["favorite", assetId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select()
        .eq("asset_id", assetId)
        .eq("user_id", session?.user?.id)
        .maybeSingle(); // Changed from .single() to .maybeSingle()

      if (error) {
        console.error("Error fetching favorite:", error);
        return false;
      }
      
      return !!data;
    },
    enabled: !!session?.user?.id,
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isFavorite) {
        await supabase
          .from("favorites")
          .delete()
          .eq("asset_id", assetId)
          .eq("user_id", session?.user?.id);
      } else {
        await supabase.from("favorites").insert({
          asset_id: assetId,
          user_id: session?.user?.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", assetId] });
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    },
  });

  if (!session) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className={`brutal-border ${
        isFavorite ? "bg-brutal-yellow" : "bg-brutal-white"
      }`}
      onClick={() => toggleFavorite()}
      disabled={isLoading}
    >
      <Star
        className={`h-4 w-4 mr-2 ${isFavorite ? "fill-black" : ""}`}
      />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </Button>
  );
}