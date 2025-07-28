import { Suspense } from "react"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { munics, cantonAbbrs } from "@/utils/constants"
import { isMunicEqCantAndCity, isMunicEqCant, isMunicParamValid } from "@/utils/helpers"
import Hero from "@/components/home/Hero"
import Holidays from "@/components/home/Holidays"
import HolidaysFallback from "@/components/home/HolidaysFallback"

type MetadataParamsType = { params: Promise<{ year: string; canton: string; munic: string }> }

export async function generateMetadata({ params }: MetadataParamsType): Promise<Metadata> {
  const { year, canton, munic } = await params

  if (!isMunicParamValid(canton, munic)) {
    return {}
  }

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
