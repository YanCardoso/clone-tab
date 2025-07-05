const {exec} = require('node:child_process');

function checkPostgres() {
  exec('docker exec postgres_dev pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout, stderr) {
    if (stdout.includes('accepting connections')) {
      console.log('\n✅ PostgreSQL is ready!\n');
      return;
    }
    process.stdout.write('.');
    checkPostgres();
  }
}

process.stdout.write('\n\n🔴 Waiting for PostgreSQL to be ready');
checkPostgres();
