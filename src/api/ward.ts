import { createAPIEndpoint } from "./config";

export const getWard = async (districtId: string) => {
  const response = await fetch(
    createAPIEndpoint(`wards?DistrictId=${districtId}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};
