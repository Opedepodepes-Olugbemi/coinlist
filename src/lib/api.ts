import { Asset, ApiResponse, AssetHistory } from "@/types/crypto";
import { supabase } from "@/integrations/supabase/client";

export async function getTopAssets(): Promise<Asset[]> {
  const { data, error } = await supabase.functions.invoke('coincap', {
    body: { endpoint: 'assets', params: 'limit=50' }
  });
  
  if (error) throw new Error("Failed to fetch assets");
  return data.data;
}

export async function getAsset(id: string): Promise<Asset> {
  const { data, error } = await supabase.functions.invoke('coincap', {
    body: { endpoint: `assets/${id}` }
  });
  
  if (error) throw new Error("Failed to fetch asset");
  return data.data;
}

export async function getAssetHistory(id: string): Promise<AssetHistory[]> {
  const { data, error } = await supabase.functions.invoke('coincap', {
    body: { endpoint: `assets/${id}/history`, params: 'interval=h1' }
  });
  
  if (error) throw new Error("Failed to fetch asset history");
  return data.data;
}