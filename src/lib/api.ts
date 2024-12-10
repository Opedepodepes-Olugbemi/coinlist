import { Asset, ApiResponse, AssetHistory } from "@/types/crypto";

const BASE_URL = "https://api.coincap.io/v2";

export async function getTopAssets(): Promise<Asset[]> {
  const response = await fetch(`${BASE_URL}/assets?limit=50`);
  if (!response.ok) throw new Error("Failed to fetch assets");
  const data: ApiResponse<Asset[]> = await response.json();
  return data.data;
}

export async function getAsset(id: string): Promise<Asset> {
  const response = await fetch(`${BASE_URL}/assets/${id}`);
  if (!response.ok) throw new Error("Failed to fetch asset");
  const data: ApiResponse<Asset> = await response.json();
  return data.data;
}

export async function getAssetHistory(id: string): Promise<AssetHistory[]> {
  const response = await fetch(
    `${BASE_URL}/assets/${id}/history?interval=h1`
  );
  if (!response.ok) throw new Error("Failed to fetch asset history");
  const data: ApiResponse<AssetHistory[]> = await response.json();
  return data.data;
}