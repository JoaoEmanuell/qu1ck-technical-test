/**
 * response with bad request (400)
 * @param json for send to user
 * @returns response
 */
export const badRequest = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 400,
    headers: { "Content-type": "application/json" },
  });
};
