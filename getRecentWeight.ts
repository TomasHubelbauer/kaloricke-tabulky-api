import czechDateTimeFormat from "./czechDateTimeFormat.ts";
import type { ApiResponse, SummaryData } from "./types.ts";

export default async function getRecentWeight(
  cookies: string,
  date = czechDateTimeFormat.format(new Date()).replace(/ /g, "")
) {
  const response = await fetch(
    `https://www.kaloricketabulky.cz/statistic/summary/${date}/get?format=json`,
    { headers: { Cookie: cookies } }
  );

  const body: ApiResponse<SummaryData> = await response.json();
  if (body.code !== 0) {
    throw new Error(`Expected zero-code response: ${JSON.stringify(body)}`);
  }

  return body.data.monthWeight.map((item) => ({
    date: item.description,
    weight: item.value,
  }));
}
