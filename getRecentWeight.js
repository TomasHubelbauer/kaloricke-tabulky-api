import get from './get.js';
import formatToday from './formatToday.js';

export default async function getRecentWeight(
  /** @type {string[]} */ cookies,
  /** @type {string} */ date = formatToday(),
) {
  const body = await get(`https://www.kaloricketabulky.cz/statistic/summary/${date}/get?format=json`, cookies);
  return body.data.monthWeight.map(item => ({ date: item.description, weight: item.value }));
}
