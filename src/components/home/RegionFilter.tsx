import { useParams } from "next/navigation"

import { cantons } from "@/utils/constants"
import Dropdown from "../common/Dropdown"
import Button from "../common/Button"

const CANTON_PLACEHOLDER = "Kanton wählen..."

export default function RegionFilter() {
  const params = useParams()

  const currentYear = new Date().getFullYear()
  const year = params.year || currentYear
  const cantonID = params.canton

  let cantonPlaceholder = CANTON_PLACEHOLDER
  let isCantonSelected = false
  if (cantonID) {
    cantonPlaceholder = cantons[cantonID as keyof typeof cantons]
    isCantonSelected = true
  }

  return (
    <div className="mt-16 flex flex-col sm:mt-32 sm:flex-row sm:items-center sm:justify-center">
      <Dropdown
        className={`${isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"}`}
        placeholder={cantonPlaceholder}
        options={Object.entries(cantons).map(([id, name]) => ({
          id,
          value: name,
          link: `/${year}/${id}`
        }))}
        areLinks
      />
      <Button
        href={`/${year}`}
        className={`${!isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"} mt-5 sm:mt-0 sm:ml-5`}>
        Gesamte Schweiz
      </Button>
    </div>
  )
}
