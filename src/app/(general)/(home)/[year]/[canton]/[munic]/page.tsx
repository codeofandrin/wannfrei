import { Suspense } from "react"
// import type { Metadata } from "next"

import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

// type generateMetadataPropsType = { params: Promise<{ year: string; canton: string }> }

// export async function generateMetadata({ params }: generateMetadataPropsType): Promise<Metadata> {
//   const { year, canton } = await params
//   const cantonName = cantons[canton as keyof typeof cantons]

//   return {
//     title: `Wann habe ich frei? - Feiertage ${year} im Kanton ${cantonName}`,
//     description: `Erhalte einen Überblick über gesetzliche und optionale Feiertage ${year} im Kanton ${cantonName}`,
//     keywords: `${year}, Feiertage ${year}, Feiertage ${year} Kanton ${cantonName}, arbeitsfreie Tage ${year}, arbeitsfrei ${year}, freie Tage ${year}, Kanton ${cantonName}, ${cantonName}`,
//     authors: [{ name: "Andrin Schaller" }],
//     publisher: "Andrin Schaller"
//   }
// }

interface MunicPropsType {
  params: Promise<{ year: string; canton: string; munic: string }>
}
export default async function Munic({ params }: MunicPropsType) {
  const { year, canton, munic } = await params

  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays year={year} cantonID={canton} municID={munic} />
      </Suspense>
    </div>
  )
}
