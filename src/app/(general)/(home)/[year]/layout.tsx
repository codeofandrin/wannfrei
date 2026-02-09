import { getYearRange } from "@/utils/helpers"

export async function generateStaticParams() {
  let params: { year: string }[] = []
  getYearRange().forEach((year) => {
    params.push({ year: year.toString() })
  })

  return params
}

interface YearPropsType {
  children: React.ReactNode
}

export default async function YearLayout({ children }: YearPropsType) {
  return <>{children}</>
}
