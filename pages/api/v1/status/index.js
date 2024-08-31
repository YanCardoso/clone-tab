import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const serveStatus = await database.query(
    `SELECT 
      current_setting('server_version') AS server_version,
      current_setting('max_connections') AS max_connections,
      (SELECT count(*) FROM pg_stat_activity WHERE state = 'active') AS current_connections;
    `,
  );

  response.status(200).json({
    updated_at: updatedAt,
    data_infos: {
      version: serveStatus.rows[0]["server_version"],
      max_connections: parseInt(serveStatus.rows[0]["max_connections"]),
      current_connections: serveStatus.rows[0]["current_connections"],
    },
  });
}

export default status;
