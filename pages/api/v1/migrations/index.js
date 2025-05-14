import migrationsRunner from 'node-pg-migrate';
import {join} from 'node:path';
import database from 'infra/database.js';
export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join('infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations'
  };

  try {
    if (request.method === 'GET') {
      const pendingMigrations = await migrationsRunner(
        defaultMigrationsOptions
      );
      await dbClient.end();
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === 'POST') {
      const migratedMigrations = await migrationsRunner({
        ...defaultMigrationsOptions,
        dryRun: false
      });
      await dbClient.end();

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    await dbClient.end();
    console.error('Error running migrations:', error);
    return response.status(500).json({error: error.message});
  } finally {
    await dbClient.end();
  }

  return response.status(405).end();
}
