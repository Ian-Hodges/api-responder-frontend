"use server";

import "@/styles/calls.css";
import { getAllCallsByResponderId } from "@/lib/api-responder";
import Calls from "./components/calls";

export default async function App() {
  const initialCalls = await getAllCallsByResponderId("moo");

  return <Calls initialCalls={initialCalls} />;
}
