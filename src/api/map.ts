import { createAPIEndpoint } from "./config";

export const getDistrictId = async (id: string) => {
  const response = await fetch(
    createAPIEndpoint(`districts/${id}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};


export const getWardId = async (id: string) => {
  const response = await fetch(
    createAPIEndpoint(`wards/${id}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};


export const getVillageId = async (id: string) => {
  const response = await fetch(
    createAPIEndpoint(`villages/${id}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};