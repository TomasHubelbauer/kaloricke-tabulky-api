import https from 'https';
import drainBody from './drainBody.js';

export default function get(/** @type {string} */ url, /** @type {string[] || ''} */ cookies = '') {
  return new Promise((resolve, reject) => {
    https
      .request(
        url,
        {
          headers: {
            Cookie: cookies
          }
        },
        async response => {
          const data = await drainBody(response);
          const body = JSON.parse(data);
          if (body.code !== 0) {
            throw new Error(`Expected zero-code response: ${data.toString()}`);
          }

          resolve(body);
        })
      .once('error', reject)
      .end()
      ;
  });
}
