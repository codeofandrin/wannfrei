import { cantons } from "@/utils/constants"

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
}

export default async function CantonLayout({ children }: CantonPropsType) {
  return <>{children}</>
}
