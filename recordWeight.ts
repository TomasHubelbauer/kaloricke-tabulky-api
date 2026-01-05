import czechDateTimeFormat from "./czechDateTimeFormat.ts";
import type { ApiResponse } from "./types.ts";

export default async function recordWeight(
  weight: string | number,
  cookies: string,
  date = czechDateTimeFormat.format(new Date()).replace(/ /g, "")
) {
  const response = await fetch(
    "https://www.kaloricketabulky.cz/user/weight/add?format=json&=",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies,
      },
      body: JSON.stringify({ weight, date }),
    }
  );

  const text = await response.text();
  let body: ApiResponse;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse response: ${text}`);
  }

  if (body.code !== 0) {
    throw new Error(`Expected zero-code response: ${JSON.stringify(body)}`);
  }

  return body;
}
