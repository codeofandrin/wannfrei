import { Suspense } from "react"
import type { Metadata } from "next"

import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

type MetadataParamsType = { params: Promise<{ year: string }> }

export async function generateMetadata({ params }: MetadataParamsType): Promise<Metadata> {
  const { year } = await params

  return {
    title: `Wann habe ich frei? - Feiertage ${year} in der Schweiz `,
    description: `Erhalte einen Überblick über gesetzliche und optionale Feiertage ${year} in der Schweiz`,
    keywords: `${year}, Feiertage ${year}, Feiertage ${year} Schweiz, arbeitsfreie Tage ${year}, arbeitsfrei ${year}, freie Tage ${year}, Schweiz, Switzerland`,
    authors: [{ name: "Andrin Schaller" }],
    publisher: "Andrin Schaller"
  }
}

interface YearPropsType {
  params: Promise<{ year: string }>
}
export default async function Year({ params }: YearPropsType) {
  const { year } = await params

  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays year={year} />
      </Suspense>
    </div>
  )
}
