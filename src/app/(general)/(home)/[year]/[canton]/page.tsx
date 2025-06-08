import { Suspense } from "react"
import type { Metadata } from "next"

import { cantons } from "@/utils/constants"
import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

type generateStaticParamsPropsType = { params: { year: string } }

export async function generateStaticParams({ params: { year } }: generateStaticParamsPropsType) {
  let newParams: Array<{ year: string; canton: string }> = []
  Object.keys(cantons).forEach((cantonID) => {
    newParams.push({ year: year, canton: cantonID })
  })
  return newParams
}

type generateMetadataPropsType = { params: Promise<{ year: string; canton: string }> }

export async function generateMetadata({ params }: generateMetadataPropsType): Promise<Metadata> {
  const { year, canton } = await params
  const cantonName = cantons[canton as keyof typeof cantons]

  return {
    title: `Wann habe ich frei? - Feiertage ${year} im Kanton ${cantonName}`,
    description: `Erhalte einen Überblick über gesetzliche und optionale Feiertage ${year} im Kanton ${cantonName}`,
    keywords: `${year}, Feiertage ${year}, Feiertage ${year} Kanton ${cantonName}, arbeitsfreie Tage ${year}, arbeitsfrei ${year}, freie Tage ${year}, Kanton ${cantonName}, ${cantonName}`,
    authors: [{ name: "Andrin Schaller" }],
    publisher: "Andrin Schaller"
  }
}

interface CantonPropsType {
  params: Promise<{ year: string; canton: string }>
}
export default async function Canton({ params }: CantonPropsType) {
  const { year, canton } = await params

  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays year={year} cantonID={canton} />
      </Suspense>
    </div>
  )
}
