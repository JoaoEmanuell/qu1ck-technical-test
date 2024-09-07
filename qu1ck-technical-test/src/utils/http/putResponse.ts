/**
 * put response (201)
 * @param json to send to user
 * @returns response
 */
export const putResponse = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 201,
    headers: { "Content-type": "application/json" },
  });
};
