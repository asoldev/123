import { objectToQueryParams } from "@/utils/common";
import { createAPIEndpoint } from "./config";

export const getDiagrams = async (
  districtId?: string | null,
  wardId?: string | null,
  villageId?: string | null,
  id?: string | null
) => {
  const queryParam = objectToQueryParams({
    districtId,
    wardId,
    villageId,
    id,
  });
  const response = await fetch(createAPIEndpoint(`diagrams?${queryParam}`));
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const getProvince = async () => {
  const response = await fetch(createAPIEndpoint(`provinces`));
  if (!response.ok) throw new Error("Failed to fetch API");
  return response.json();
};

export const getDiagramLst = async (filter) => {
  const { districtId, wardId, villageId } = filter;

  const queryParams = new URLSearchParams({
    districtId,
    ...(wardId && { wardId }),
    ...(villageId && { villageId }),
  }).toString();

  const response = await fetch(createAPIEndpoint(`diagrams?${queryParams}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch diagrams");
  return response.json();
};
