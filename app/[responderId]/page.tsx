import Calls from "./components/calls";
import "./styles/calls.css";

type PageProps = {
  params: Promise<{ responderId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { responderId } = await params;

  return <Calls responderId={responderId} />;
}
