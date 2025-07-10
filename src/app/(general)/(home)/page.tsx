import { Suspense } from "react"

import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

export const metadata = {
  title: "Wann habe ich frei? - Feiertage Schweiz",
  description:
    "Erhalte einen Überblick über nationale, kantonale, regionale, gesetzliche und optionale Feiertage in der Schweiz. Wann ist ein arbeitsfreier Tag? - Erhalte hier alle Feiertage! Feiertage im Kanton Aargau, Kanton Appenzell Ausserrhoden, Kanton Appenzell Innerrhoden, Kanton Basel-Landschaft, Kanton Basel-Stadt, Kanton Bern, Kanton Freiburg, Kanton Genf, Kanton Glarus, Kanton Graubünden, Kanton Jura, Kanton Luzern, Kanton Neuenburg, Kanton Nidwalden, Kanton Obwalden, Kanton Schaffhausen, Kanton Schwyz, Kanton Solothurn, Kanton St. Gallen, Kanton Tessin, Kanton Thurgau, Kanton Uri, Kanton Waadt, Kanton Wallis, Kanton Zug, Kanton Zürich.",
  keywords:
    "Nationalfeiertage, Feiertage, Feiertage Schweiz, arbeitsfreie Tage, arbeitsfrei, freie Tage, Schweiz, Switzerland",
  authors: [{ name: "Andrin Schaller" }],
  publisher: "Andrin Schaller"
}

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays year={null} cantonID={null} />
      </Suspense>
    </div>
  )
}
