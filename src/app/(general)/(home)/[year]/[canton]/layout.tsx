import { cantons } from "@/utils/constants"

export const dynamicParams = false

type generateStaticParamsPropsType = { params: { year: string } }

export async function generateStaticParams({ params: { year } }: generateStaticParamsPropsType) {
  let newParams: Array<{ year: string; canton: string }> = []
  Object.keys(cantons).forEach((cantonID) => {
    newParams.push({ year: year, canton: cantonID })
  })
  return newParams
}

export default function CantonLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
