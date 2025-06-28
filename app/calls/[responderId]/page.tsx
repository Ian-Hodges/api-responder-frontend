import "@/calls/styles/calls.css";
import Calls from "./components/calls";

type PageProps = {
  params: Promise<{ responderId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { responderId } = await params;

  return <Calls responderId={responderId} />;
}
