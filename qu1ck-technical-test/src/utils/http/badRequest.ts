export const badRequest = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 400,
    headers: { "Content-type": "application/json" },
  });
};
