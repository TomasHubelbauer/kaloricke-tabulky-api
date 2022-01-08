import fs from 'fs';
import { email, password, weight } from './secrets.js';
import getCookies from './getCookies.js';
import formatToday from './formatToday.js';
import recordWeight from './recordWeight.js';
import getRecentWeight from './getRecentWeight.js';

console.log('Getting cookies…');
const cookies = await getCookies(email, password);
console.log(`\tGot ${cookies.length} cookies`);

const today = formatToday();
if (weight[today] && !(await fs.promises.readFile('log.log')).includes(`${today}-recorded`)) {
  console.log(`Recording ${weight[today]}kg for ${today}…`);
  await recordWeight(weight[today], cookies)
  console.log(`\tRecorded ${weight[today]}kg for ${today}`);
  await fs.promises.appendFile('log.log', `${new Date().toISOString()} | ${today}-recorded | Recorded ${weight[today]}kg for ${today}\n`);
}

console.log('Getting recent weight…');
const records = await getRecentWeight(cookies);
console.log('\tGot recent weight:');
for (const record of records) {
  console.log(`\t${record.date}: ${record.weight}kg`);
}
