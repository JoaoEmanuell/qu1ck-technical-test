export const notFound = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 404,
    headers: { "Content-type": "application/json" },
  });
};
