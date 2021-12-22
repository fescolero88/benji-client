const fs = require('node:fs');
const path = require('node:path');
const { parseEnv } = require('node:util');
const { isCredential } = require('./client-secrets.cjs');
const environments = [process.env];
for (const file of ['.env', '.env.local', '.env.production', '.env.production.local']) {
  if (fs.existsSync(file)) environments.push(parseEnv(fs.readFileSync(file, 'utf8')));
}
const credentials = environments.flatMap(env => Object.entries(env)
  .filter(([name, value]) => isCredential(name) && value).map(([, value]) => value));
let exposed = false;
let inspected = 0;
function inspect(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) inspect(file);
    else if (/\.js(?:\.map)?$/.test(file)) {
      inspected++;
      const source = fs.readFileSync(file, 'utf8');
      if (credentials.some(value => source.includes(value))) exposed = true;
    }
  }
}
inspect('build');
if (!inspected) {
  console.error('No generated JavaScript was found. Build the client before checking it.');
  process.exitCode = 1;
} else if (exposed) {
  console.error('AWS credentials were found in the generated JavaScript. Do not deploy this build.');
  process.exitCode = 1;
} else console.log('Generated JavaScript contains no configured AWS credentials.');
