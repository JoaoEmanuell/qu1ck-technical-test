export const internalServerErrorResponse = (message: string) => {
  return new Response(message, {
    status: 500,
    headers: { "Content-type": "text/plain" },
  });
};
