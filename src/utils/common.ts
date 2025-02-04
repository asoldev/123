export function objectToQueryParams(obj: Record<string, any>): string {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => {
    return value !== undefined && value !== null && value !== "";
  });

  const queryParams = new URLSearchParams(filteredEntries);
  return queryParams.toString();
}

export function formatDate(date?: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const [timePart, datePart] = formattedDate.split(" ");
  const finalFormat = `${datePart} ${timePart}`;

  return finalFormat;
}

export function formatDateDay(date?: string | null): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  const weekday = parsedDate.toLocaleString("vi-VN", { weekday: "long" });

  const datePart = parsedDate.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const timePart = parsedDate.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });
  
  return `${weekday}, ${datePart} ${timePart}`;
}

export function formatDateNotTime(date?: string | null): string {
  if (!date) return "";
  const formattedDate = new Date(date).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
  });

  const [timePart, datePart] = formattedDate.split(" ");
  const finalFormat = `${datePart}`;

  return finalFormat;
}