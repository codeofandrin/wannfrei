import { getCantonHolidays } from "@/lib/api"
import { getHolidayRowsData } from "@/utils/helpers"
import { cantons } from "@/utils/constants"

import Holidays from "./Holidays"

interface CantonHolidaysPropsType {
  cantonID: string
  year: string | null
}

export default async function CantonHolidays({ cantonID, year }: CantonHolidaysPropsType) {
  const { isError, errorData, successData } = await getCantonHolidays(cantonID, year ? parseInt(year) : null)

  if (isError) {
    throw Error(`Error ${errorData?.status_code}: ${errorData?.msg}`)
  }

  const holidayRowsData = getHolidayRowsData(successData)

  const cantonName = cantons[cantonID as keyof typeof cantons]
  const titleScope = (
    <>
      im <span className="text-primary-800 dark:text-primary-200 font-bold">Kanton {cantonName}</span>
    </>
  )

  return (
    <Holidays
      holidaysRowsData={holidayRowsData}
      cantonID={cantonID}
      municID={null}
      year={year}
      titleScope={titleScope}
    />
  )
}
