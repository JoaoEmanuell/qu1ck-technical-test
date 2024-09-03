export async function GET(request: Request) {
  return Response.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  const json = await request.json();
  return Response.json(json);
}
