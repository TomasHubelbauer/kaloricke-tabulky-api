import post from './post.js';
import formatToday from './formatToday.js';

export default async function recordWeight(
  /** @type {string | number} */ weight,
  /** @type {string[]} */ cookies,
  /** @type {string} */ date = formatToday()
) {
  const { body } = await post('https://www.kaloricketabulky.cz/user/weight/add?format=json&=', { weight, date }, cookies)
  return body;
}
