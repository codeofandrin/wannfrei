import { munics } from "@/utils/constants"
import { getStaticPageYearRange } from "@/utils/helpers"

// ISR strategy with revalidation every 1 day
// - if not in generateStaticParams, generate on demand
// - wrong routes are handled in page.tsx
// - range from current year: -1 ... +3 years
// - every January 1st cron job rebuilds website to update static pages in year range
export const dynamic = "auto"
export const dynamicParams = true
export const revalidate = 86400

type ParamsType = { params: { canton: string } }

export async function generateStaticParams({ params: { canton } }: ParamsType) {
  const staticYears = getStaticPageYearRange()

  let newParams: Array<{ year: string; canton: string; munic: string }> = []
  for (const staticYear of staticYears) {
    for (const municID of Object.keys(munics[canton as keyof typeof munics])) {
      newParams.push({ year: staticYear, canton: canton, munic: municID })
    }
  }

  return newParams
}

export default function MunicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
