import { useParams } from "next/navigation"

import { cantons, munics } from "@/utils/constants"
import Dropdown from "../common/Dropdown"
import Button from "../common/Button"

const CANTON_PLACEHOLDER = "Kanton wählen..."
const MUNIC_PLACEHOLDER = "Gemeinde wählen..."

export default function RegionFilter() {
  const params = useParams()

  const currentYear = new Date().getFullYear()
  const year = params.year || currentYear
  const cantonID = params.canton
  const municID = params.munic

  let cantonPlaceholder = CANTON_PLACEHOLDER
  let isCantonSelected = false
  let municPlaceholder = MUNIC_PLACEHOLDER
  let isMunicSelected = false
  if (cantonID) {
    cantonPlaceholder = cantons[cantonID as keyof typeof cantons]
    isCantonSelected = true

    if (municID) {
      const municsOfCanton = munics[cantonID as keyof typeof munics]
      municPlaceholder = municsOfCanton[municID as keyof typeof municsOfCanton]
      isMunicSelected = true
    }
  }

  return (
    <div className="mt-16 flex flex-col sm:mt-32 sm:items-center">
      <div>
        <div className="flex flex-col sm:flex-row">
          <Dropdown
            className={`${isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"} sm:!w-60`}
            placeholder={cantonPlaceholder}
            options={Object.entries(cantons).map(([id, name]) => ({
              id,
              value: name,
              link: `/${year}/${id}`
            }))}
            areLinks
          />
          <Dropdown
            className={`${isMunicSelected && "!bg-primary-100 dark:!bg-primary-600/20"} mt-5 sm:mt-0 sm:ml-5`}
            placeholder={municPlaceholder}
            options={
              cantonID
                ? Object.entries(munics[cantonID as keyof typeof munics]).map(([id, name]) => ({
                    id,
                    value: name,
                    link: `/${year}/${cantonID}/${id}`
                  }))
                : [{ id: "null", value: "null", link: "null" }]
            }
            areLinks
            resetBtnActive={Boolean(municID)}
            disabled={!cantonID}
          />
        </div>
        <Button
          href={`/${year}`}
          className={`${!isCantonSelected && "!bg-primary-100 dark:!bg-primary-600/20"} mt-5 !w-full`}>
          Gesamte Schweiz
        </Button>
      </div>
    </div>
  )
}
