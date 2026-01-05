import email from "./email.ts";
import password from "./password.ts";
import weight from "./weight.ts";
import getCookies from "./getCookies.ts";
import czechDateTimeFormat from "./czechDateTimeFormat.ts";
import recordWeight from "./recordWeight.ts";
import getRecentWeight from "./getRecentWeight.ts";

console.log("Getting cookies…");
const cookies = await getCookies(email, password);
console.log(`\tGot cookies`);

const today = czechDateTimeFormat.format(new Date()).replace(/ /g, "");
const logFile = Bun.file("log.log");
const logContent = (await logFile.exists()) ? await logFile.text() : "";

if (weight[today] && !logContent.includes(`${today}-recorded`)) {
  console.log(`Recording ${weight[today]}kg for ${today}…`);
  await recordWeight(weight[today], cookies);
  console.log(`\tRecorded ${weight[today]}kg for ${today}`);

  const logEntry = `${new Date().toISOString()} | ${today}-recorded | Recorded ${
    weight[today]
  }kg for ${today}\n`;
  await Bun.write("log.log", logContent + logEntry);
}

console.log("Getting recent weight…");
const records = await getRecentWeight(cookies);
console.log("\tGot recent weight:");
for (const record of records) {
  console.log(`\t${record.date}: ${record.weight}kg`);
}
