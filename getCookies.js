import post from './post.js';

/** @returns {Promise<string[]>} */
export default async function getCookies(/** @type {string} */ email, /** @type {string} */ password) {
  const { headers } = await post('https://www.kaloricketabulky.cz/login/create?=&format=json', { email, password });
  return headers['set-cookie'];
}
