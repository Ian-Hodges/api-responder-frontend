import "@/styles/calls.css";
import Calls from "./components/calls";

type Props = {
  params: {
    responderId: string;
  };
};

export default async function Page({ params }: Props) {
  const { responderId } = await params

  return <Calls responderId={responderId} />;
}
