import { TWO_DIGITS } from "../constant/constant";

export function getHourFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    hour: TWO_DIGITS,
    hour12: false,
  });
}
