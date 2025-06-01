import { Suspense } from "react"

import Hero from "@/components/home/Hero"
import Holidays, { HolidaysFallback } from "@/components/home/Holidays"

export const metadata = {
  keywords: "Feiertage, Feiertage Schweiz, arbeitsfreie Tage, arbeitsfrei, freie Tage, Schweiz, Switzerland, Aargau, Appenzell Ausserrhoden, Appenzell Innerrhoden, Basel-Landschaft, Basel-Stadt, Bern, Freiburg, Genf, Glarus, Graubünden, Jura, Luzern, Neuenburg, Nidwalden, Obwalden, Schaffhausen, Schwyz, Solothurn, St. Gallen, Tessin, Thurgau, Uri, Waadt, Wallis, Zug, Zürich"
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays />
      </Suspense>
    </div>
  )
}
