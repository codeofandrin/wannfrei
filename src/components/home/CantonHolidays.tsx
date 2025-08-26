import { getCantonHolidays } from "@/lib/api"
import { getHolidayRowsData } from "@/utils/helpers"

import Holidays from "./Holidays"

interface CantonHolidaysPropsType {
  year: string | null
}

export default async function CantonHolidays({ year }: CantonHolidaysPropsType) {
  const { isError, errorData, successData } = await getNationalHolidays(year ? parseInt(year) : null)

  if (isError) {
    throw Error(`Error ${errorData?.status_code}: ${errorData?.msg}`)
  }

  const holidayRowsData = getHolidayRowsData(successData)

  const titleScope = (
    <>
      in der <span className="text-primary-800 dark:text-primary-200 font-bold">gesamten Schweiz</span>
    </>
  )

  return (
    <Holidays
      holidaysRowsData={holidayRowsData}
      cantonID={null}
      municID={null}
      year={year}
      titleScope={titleScope}
    />
  )
}
