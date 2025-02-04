import { createAPIEndpoint } from "./config";

export const getVillage = async (wardId: string) => {
  const response = await fetch(createAPIEndpoint(`villages?WardId=${wardId}`));
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};
