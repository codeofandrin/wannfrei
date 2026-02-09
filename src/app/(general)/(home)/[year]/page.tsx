import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import Hero from "@/components/home/Hero"
import NationalHolidays from "@/components/home/NationalHolidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"
import { isYearParamValid } from "@/utils/helpers"

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

  if (!isYearParamValid(year)) {
    redirect("/")
  }

  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <NationalHolidays year={year} />
      </Suspense>
    </div>
  )
}
