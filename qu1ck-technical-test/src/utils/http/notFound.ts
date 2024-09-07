/**
 * not found response (404)
 * @param json for send to user
 * @returns response
 */
export const notFound = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 404,
    headers: { "Content-type": "application/json" },
  });
};
