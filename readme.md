# KalorickeTabulky API

This repository hosts a script that implements the most basic features of the
KalorickeTabulky.cz app and website: login to get the session, weight recording
and fetching the recorded weight.

## Usage

1. Create `email.ts` and `password.ts` with your credentials:
   ```typescript
   export default "your@email.com";
   ```
   ```typescript
   export default "your-password";
   ```
2. Add weight entries to `weight.ts`:
   ```typescript
   export default {
     "05.01.2026": 75.5,
   } as Record<string, number>;
   ```
3. Run `bun .` to log in, record weight (if any), and print recent records

The script tracks recorded weights in `log.log` to avoid duplicate submissions.

## API

```typescript
import getCookies from "./getCookies.ts";
import recordWeight from "./recordWeight.ts";
import getRecentWeight from "./getRecentWeight.ts";

const cookies = await getCookies(email, password);
await recordWeight(75.5, cookies);
const records = await getRecentWeight(cookies);
```
