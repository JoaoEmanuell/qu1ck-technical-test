export const putResponse = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 201,
    headers: { "Content-type": "application/json" },
  });
};
