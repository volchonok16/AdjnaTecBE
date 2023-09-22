// Скрипт определяет имя для создаваемой миграции
// yarn migration:generate + 'пробел' + имя миграции

const execSync = require('child_process').execSync;

const arg = process.argv[2];
if (!arg) throw new Error('Pass name for migration');
const command = `typeorm-ts-node-esm migration:generate -d ./src/common/providers/postgres/data-source.ts ./src/common/providers/postgres/migrations/${arg}`;

execSync(command, { stdio: 'inherit' });
