import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 10 + 10 as sum");
  console.log(result);

  response.status(200).json({ chave: "teste de api" });
}

export default status;
