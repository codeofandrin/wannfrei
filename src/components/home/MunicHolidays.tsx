import { getMunicHolidays } from "@/lib/api"
import { getHolidayRowsData, isMunicEqCantAndCity, isMunicEqCant } from "@/utils/helpers"
import { munics, cantonAbbrs } from "@/utils/constants"

import Holidays from "./Holidays"

interface MunicHolidaysPropsType {
  cantonID: string
  municID: string
  year: string | null
}

export default async function MunicHolidays({ cantonID, municID, year }: MunicHolidaysPropsType) {
  const { isError, errorData, successData } = await getMunicHolidays(
    cantonID,
    municID,
    year ? parseInt(year) : null
  )

  if (isError) {
    throw Error(`Error ${errorData?.status_code}: ${errorData?.msg}`)
  }

  const holidayRowsData = getHolidayRowsData(successData)

  const municsOfCanton = munics[cantonID as keyof typeof munics]
  const municName = municsOfCanton[municID as keyof typeof municsOfCanton]
  const cantonAbbr = cantonAbbrs[cantonID as keyof typeof cantonAbbrs]

  let titleScope
  if (isMunicEqCantAndCity(municID)) {
    titleScope = (
      <>
        in <span className="text-primary-800 dark:text-primary-200 font-bold">Stadt {municName}</span>
      </>
    )
  } else if (isMunicEqCant(municID)) {
    titleScope = (
      <>
        in <span className="text-primary-800 dark:text-primary-200 font-bold">Gemeinde {municName}</span>
      </>
    )
  } else {
    titleScope = (
      <>
        in{" "}
        <span className="text-primary-800 dark:text-primary-200 font-bold">
          {municName}, {cantonAbbr}
        </span>
      </>
    )
  }

  return (
    <Holidays
      holidaysRowsData={holidayRowsData}
      cantonID={cantonID}
      municID={municID}
      year={year}
      titleScope={titleScope}
    />
  )
}
