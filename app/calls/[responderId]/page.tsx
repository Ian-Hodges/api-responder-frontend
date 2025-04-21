import "@/styles/calls.css";
import { getAllCallsByResponderId } from "@/lib/api-responder";
import Calls from "./components/calls";

type Props = {
  params: {
    responderId: string;
  };
};

export default async function Page({ params }: Props) {
  const { responderId } = await params
  const initialCalls = await getAllCallsByResponderId(responderId);

  return <Calls initialCalls={initialCalls} />;
}
