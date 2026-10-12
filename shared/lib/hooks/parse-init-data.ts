import { TelegramUser } from "@/shared/interface";

type ParsedInitData = {
  query_id?: string;
  user?: TelegramUser;
  auth_date?: number;
  hash: string;
};

export function parseTelegramInitData(initData: string): ParsedInitData {
  const result: ParsedInitData = { hash: "" };

  // Split into key-value pairs
  const params = new URLSearchParams(initData);

  // Parse each parameter
  params.forEach((value, key) => {
    if (key === "user") {
      try {
        result.user = JSON.parse(decodeURIComponent(value));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    } else if (key === "auth_date") {
      result.auth_date = parseInt(value, 10);
    } else if (key === "query_id") {
      result.query_id = value;
    } else if (key === "hash") {
      result.hash = value;
    }
  });

  return result;
}
