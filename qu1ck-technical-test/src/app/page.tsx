/**
 * Main page, redirect to /chat
 */

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chat");
}
