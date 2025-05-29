import { Suspense } from "react"

import Hero from "@/components/home/Hero"
import Holidays, { HolidaysFallback } from "@/components/home/Holidays"

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<HolidaysFallback />} key={"section-holidays"}>
        <Holidays />
      </Suspense>
    </div>
  )
}
