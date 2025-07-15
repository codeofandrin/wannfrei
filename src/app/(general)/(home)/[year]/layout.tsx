import { redirect } from "next/navigation"
import { getYearRange, isYearParamValid } from "@/utils/helpers"

export async function generateStaticParams() {
  let params: { year: string }[] = []
  getYearRange().forEach((year) => {
    params.push({ year: year.toString() })
  })

  return params
}

interface YearPropsType {
  children: React.ReactNode
  params: Promise<{ year: string }>
}

export default async function YearLayout({ children, params }: YearPropsType) {
  const { year } = await params

  if (!isYearParamValid(year)) {
    redirect("/")
  }

  return <>{children}</>
}
