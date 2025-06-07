import { useParams } from "next/navigation"

import useRouter from "@/hooks/useRouter"
import { cantons } from "@/utils/constants"
import Dropdown from "../common/Dropdown"
import Button from "../common/Button"

const CANTON_PLACEHOLDER = "Kanton wählen..."

export function RegionFilterFallback() {
  return (
    <div className="mt-16 flex flex-col sm:mt-32 sm:flex-row sm:items-center sm:justify-center">
      <div className="flex w-full animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:w-68 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
        placeholder
      </div>
      <div className="mt-5 flex w-full animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:ml-5 sm:w-56 sm:py-2 dark:border-neutral-800 dark:bg-neutral-800">
        placeholder
      </div>
    </div>
  )
}

export default function RegionFilter() {
  const params = useParams()
  const router = useRouter()

  const currentYear = new Date().getFullYear()
  const year = params.year || currentYear
  const cantonID = params.canton

  let cantonPlaceholder = CANTON_PLACEHOLDER
  let isCantonSelected = false
  if (cantonID) {
    cantonPlaceholder = cantons[cantonID as keyof typeof cantons]
    isCantonSelected = true
  }

  function handleSetCanton(id: string) {
    router.push({ pathname: `/${year}/${id}`, options: { scroll: false } })
  }

  function handleSetNational() {
    router.push({ pathname: `/${year}`, options: { scroll: false } })
  }

  return (
    <div className="mt-16 flex flex-col sm:mt-32 sm:flex-row sm:items-center sm:justify-center">
      <Dropdown
        className={`${isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"}`}
        placeholder={cantonPlaceholder}
        options={Object.entries(cantons).map(([id, name]) => ({
          id,
          value: name
        }))}
        setValue={handleSetCanton}
      />
      <Button
        className={`${!isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"} mt-5 sm:mt-0 sm:ml-5`}
        onClick={handleSetNational}>
        Gesamte Schweiz
      </Button>
    </div>
  )
}
