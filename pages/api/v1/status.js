function status(request, response) {
  response.status(200).json({ chave: "teste de api" });
}

export default status;
