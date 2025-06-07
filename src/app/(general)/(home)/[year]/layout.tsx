import { getYearRange } from "@/utils/helpers"

export const dynamic = "error"
export const dynamicParams = false

export async function generateStaticParams() {
  let params: { year: string }[] = []
  getYearRange().forEach((year) => {
    params.push({ year: year.toString() })
  })

  return params
}

export default function YearLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
