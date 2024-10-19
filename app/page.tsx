import FetchAndDisplayData from "@/components/parts/fetchAndDisplay";
import GetLocation from "@/components/parts/getLocation";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <p className="text-2xl pb-5">Get forecast for your location</p>
      <GetLocation />
      <FetchAndDisplayData />
    </div>
  );
}
