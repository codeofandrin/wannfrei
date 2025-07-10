import { munics } from "@/utils/constants"

export const dynamic = "error"
export const dynamicParams = false

type generateStaticParamsPropsType = { params: { year: string; canton: string } }

export async function generateStaticParams({ params: { year, canton } }: generateStaticParamsPropsType) {
  let newParams: Array<{ year: string; canton: string; munic: string }> = []
  Object.keys(munics[canton as keyof typeof munics]).forEach((municID) => {
    newParams.push({ year: year, canton: canton, munic: municID })
  })
  return newParams
}

export default function MunicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
