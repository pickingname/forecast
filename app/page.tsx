import GetLocation from "@/components/parts/getLocation";
import InputKey from "@/components/parts/inputKey";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <p className="text-2xl pb-5">Get forecast for your location</p>
      <InputKey />
      <GetLocation />
    </div>
  );
}
