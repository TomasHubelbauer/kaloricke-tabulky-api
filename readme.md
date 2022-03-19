# KalorickeTabulky API

This repository hosts a script that implements the most basic features of the
KalorickeTabulky.cz app and website: login to get the session, weight recording
and fetching the recorded weight.

It is a dependency-free Node script that itself can be used as a dependency via
ESM URL imports.

## Usage

Ensure you are using a recent Node version with ESM and TLA support, e.g.:
Node latest.

**Note:** KalorickeTabulky does some sort of a client side processing/hashing of
the password, so instead of your actual password, paste in the corresponding
value as seen in the `login/create?=&format=json` request in the developer tools
in your browser when you sign in manually.

### CLI

1. Set up email and password in `secrets.js` if not done already:
   ```js
   export const email = 'tomas@hubelbauer.net';
   export const password = 'Pa@@w0rd';
   ```
2. Add weight to be recorded in `secrets.js` if so desired and not done already:
   ```js
   export const weight = {
     'dd.MM.yyyy': #
   };
   ```
3. Run `node .` to log in, optionally record weight and print recent records

   If provided, the day's weight will only be recorded if not done so already.

### ESM

Ensure you are using an environment that supports ESM as well as URL imports,
e.g.: Next latest.

Import the desired features like so:

```javascript
import getCookies from 'https://tomashubelbauer.github.io/kaloricke-tabulky-api/getCookies.js';

const cookies = await getCookies(email, password);
// …
```
