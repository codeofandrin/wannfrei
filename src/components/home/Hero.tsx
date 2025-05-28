"use client"

import { Suspense } from "react"

import RegionFilter, { RegionFilterFallback } from "./RegionFilter"

export default function Hero() {
  return (
    <div className="mt-28 sm:mt-36">
      <h1 className="font-brand text-4xl font-[550] sm:text-center sm:text-5xl sm:font-semibold">
        <span className="text-primary-600">Wann</span> habe ich{" "}
        <span className="text-secondary-600">frei</span>?
      </h1>
      <h2 className="mt-8 font-medium text-neutral-500 sm:mt-10 sm:text-center sm:text-xl">
        Erhalte einen Überblick über nationale, kantonale, gesetzliche und optionale Feiertage in der Schweiz.
      </h2>
      <Suspense fallback={<RegionFilterFallback />} key={"section-region-filter"}>
        <RegionFilter />
      </Suspense>
    </div>
  )
}
