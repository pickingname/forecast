import FetchAndDisplayData from "@/components/parts/fetchAndDisplay";
import GetLocation from "@/components/parts/getLocation";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <p className="text-2xl pb-5">Get the current weather for your location</p>
      <GetLocation />
      <FetchAndDisplayData />
      <div>
        {/* NOTE: loads this note and warning with the font so the font is loaded and cached first before the weather data is fetched */}
        <p className="text-center text-neutral-600 pt-4 font-outfit">
          Current weather conditions are updated every 15 minutes using weather
          model data from the Open-Meteo API.
        </p>
      </div>
    </div>
  );
}
