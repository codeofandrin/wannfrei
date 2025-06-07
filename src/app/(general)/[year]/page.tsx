import { Suspense } from "react"
import type { Metadata } from "next"

import Hero from "@/components/home/Hero"
import Holidays, { HolidaysFallback } from "@/components/home/Holidays"

type generateMetadataPropsType = { params: Promise<{ year: string }> }

export async function generateMetadata({ params }: generateMetadataPropsType): Promise<Metadata> {
  const { year } = await params

  return {
    title: `Wann habe ich frei? - Feiertage Schweiz für ${year}`,
    description: `Erhalte einen Überblick über gesetzliche und optionale Feiertage in der Schweiz für ${year}`,
    keywords: `Feiertage ${year}, Feiertage ${year} Schweiz, arbeitsfreie Tage ${year}, arbeitsfrei ${year}, freie Tage ${year}, Schweiz, Switzerland`
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
        <Holidays year={year} cantonID={null} />
      </Suspense>
    </div>
  )
}
