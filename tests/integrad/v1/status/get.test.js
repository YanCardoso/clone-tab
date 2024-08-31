test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody.data_infos);

  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.data_infos["version"]).toBeDefined();
  expect(responseBody.data_infos["max_connections"]).toBeDefined();
  expect(responseBody.data_infos["current_connections"]).toBeDefined();
});
