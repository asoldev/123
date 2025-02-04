import { createAPIEndpoint } from "./config";

export const getDistrict = async (provinceId: string) => {
  const response = await fetch(
    createAPIEndpoint(`districts?ProvinceId=${provinceId}`)
  );
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};
