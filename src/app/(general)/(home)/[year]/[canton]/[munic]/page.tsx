import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { munics, cantonAbbrs, staticPageMunics } from "@/utils/constants"
import {
  isMunicEqCantAndCity,
  isMunicEqCant,
  isMunicParamValid,
  getStaticPageYearRange
} from "@/utils/helpers"
import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

// ISR strategy with revalidation every 1 day
// - if not in generateStaticParams, generate on demand
// - wrong routes are handled manually in page component
// - range from current year: -1 ... +3 years
// - every January 1st cron job rebuilds website to update static pages in year range
export const revalidate = 86400

type MetadataParamsType = { params: Promise<{ year: string; canton: string; munic: string }> }

export async function generateMetadata({ params }: MetadataParamsType): Promise<Metadata> {
  const { year, canton, munic } = await params

  const municsInCanton = munics[canton as keyof typeof munics]
  let municName = municsInCanton[munic as keyof typeof municsInCanton] as string

  if (isMunicEqCantAndCity(munic)) {
    municName = `Stadt ${municName}`
  } else if (isMunicEqCant(munic)) {
    municName = `Gemeinde ${municName}`
  } else {
    const cantonAbbr = cantonAbbrs[canton as keyof typeof cantonAbbrs]
    municName = `${municName}, ${cantonAbbr}`
  }

  return {
    title: `Wann habe ich frei? - Feiertage ${year} in ${municName}`,
    description: `Erhalte einen Überblick über gesetzliche und optionale Feiertage ${year} in ${municName}`,
    keywords: `${year}, Feiertage ${year}, Feiertage ${year} ${municName}, arbeitsfreie Tage ${year}, arbeitsfrei ${year}, freie Tage ${year}, ${municName}`,
    authors: [{ name: "Andrin Schaller" }],
    publisher: "Andrin Schaller"
  }
}

type StaticParamsType = { params: { canton: string } }

export async function generateStaticParams({ params: { canton } }: StaticParamsType) {
  const staticYears = getStaticPageYearRange()

  let newParams: Array<{ year: string; canton: string; munic: string }> = []
  for (const staticYear of staticYears) {
    for (const municID of Object.keys(munics[canton as keyof typeof munics])) {
      if (staticPageMunics.includes(municID)) {
        newParams.push({ year: staticYear, canton: canton, munic: municID })
      }
    }
  }

  return newParams
}

interface MunicPropsType {
  params: Promise<{ year: string; canton: string; munic: string }>
}
export default async function Munic({ params }: MunicPropsType) {
  const { year, canton, munic } = await params

  if (!isMunicParamValid(canton, munic)) {
    redirect("/")
  }

  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays year={year} cantonID={canton} municID={munic} />
      </Suspense>
    </div>
  )
}
