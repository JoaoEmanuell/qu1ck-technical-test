/**
 * delete response (200)
 * @param json for send to user
 * @returns response
 */
export const deleteResponse = (json: any) => {
  return new Response(JSON.stringify(json), {
    status: 200,
    headers: { "Content-type": "application/json" },
  });
};
