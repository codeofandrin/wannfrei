import type { Metadata } from "next"

import Hero from "@/components/api-docs/Hero"
import Endpoints from "@/components/api-docs/Endpoints"
import HolidayTypes from "@/components/api-docs/HolidayTypes"
import ErrorCodes from "@/components/api-docs/ErrorCodes"
import CantonSlugs from "@/components/api-docs/CantonSlugs"

export const metadata: Metadata = {
  title: "Schweizer Feiertage REST API | wannfrei",
  description:
    "Öffentliche REST API für Schweizer Feiertage. Abrufen von nationalen, kantonalen und regionalen Feiertagen.",
  keywords:
    "Schweiz Feiertage API, Switzerland holidays API, REST API Feiertage, kantonale Feiertage API, nationale Feiertage API, Schweiz public holiday API, wannfrei API",
  authors: [{ name: "Andrin Schaller" }]
}

export default function ApiDocs() {
  return (
    <div className="pb-4">
      <Hero />
      <Endpoints />
      <HolidayTypes />
      <ErrorCodes />
      <CantonSlugs />
    </div>
  )
}
