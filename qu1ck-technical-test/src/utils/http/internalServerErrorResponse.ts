/**
 * internal server error response (500)
 * @param message for send to user
 * @returns response
 */
export const internalServerErrorResponse = (message: string) => {
  return new Response(message, {
    status: 500,
    headers: { "Content-type": "text/plain" },
  });
};
