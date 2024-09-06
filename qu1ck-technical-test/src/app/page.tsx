import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chat");
  return <h1>Hello World</h1>;
}
