import { redirect } from "next/navigation"

import { cantons } from "@/utils/constants"
import { isCantonParamValid } from "@/utils/helpers"

type StaticParamsType = { params: { year: string } }

export async function generateStaticParams({ params: { year } }: StaticParamsType) {
  let newParams: Array<{ year: string; canton: string }> = []
  Object.keys(cantons).forEach((cantonID) => {
    newParams.push({ year: year, canton: cantonID })
  })
  return newParams
}

interface CantonPropsType {
  children: React.ReactNode
  params: Promise<{ year: string; canton: string }>
}

export default async function CantonLayout({ children, params }: CantonPropsType) {
  const { canton } = await params

  if (!isCantonParamValid(canton)) {
    redirect("/")
  }

  return <>{children}</>
}
