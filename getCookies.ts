import { CryptoHasher } from "bun";
import type { ApiResponse } from "./types.ts";

export default async function getCookies(email: string, password: string) {
  const response = await fetch(
    "https://www.kaloricketabulky.cz/login/create?format=json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: new CryptoHasher("md5").update(password).digest("hex"),
      }),
    }
  );

  const body: ApiResponse = await response.json();
  if (body.code !== 0) {
    throw new Error(`Expected zero-code response: ${JSON.stringify(body)}`);
  }

  return response.headers.getSetCookie().map((c) => c.split(";")[0]).join("; ");
}
