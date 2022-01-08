import { IncomingMessage } from 'http';

export default async function drainBody(/** @type {IncomingMessage} */ response) {
  const chunks = [];
  for await (const chunk of response) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}
