import https from 'https';
import drainBody from './drainBody.js';

export default function post(/** @type {string} */ url, /** @type {object} */ data, /** @type {string[] || ''} */ cookies = '') {
  return new Promise((resolve, reject) => {
    https
      .request(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: cookies
          }
        },
        async response => {
          const data = await drainBody(response);
          const body = JSON.parse(data);
          if (body.code !== 0) {
            throw new Error(`Expected zero-code response: ${data.toString()}`);
          }

          resolve({ body, headers: response.headers });
        })
      .once('error', reject)
      .end(JSON.stringify(data))
      ;
  });
}
