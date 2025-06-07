import useRouter from "@/hooks/useRouter"
import { holidayTypes } from "@/utils/constants"
import { getWeekdayStr, getYearRange } from "@/utils/helpers"
import Dropdown from "../common/Dropdown"
import SearchInput from "../common/SearchInput"

interface HolidaysFilterPropsType {
  year: string
  cantonID: string | null
  type: string | null
  weekday: string | null
  searchValue: string | null
  setType: Function
  setWeekdayNr: Function
  setSearchValue: Function
}

export default function HolidaysFilter({
  year,
  cantonID,
  type,
  weekday,
  searchValue,
  setType,
  setWeekdayNr,
  setSearchValue
}: HolidaysFilterPropsType) {
  const router = useRouter()

  let yearOptions: { id: string; value: string }[] = []
  getYearRange().forEach((year) => {
    const yearStr = year.toString()
    yearOptions.push({ id: yearStr, value: yearStr })
  })

  function handleSetYear(id: string) {
    router.push({ pathname: `/${id}/${cantonID || ""}`, options: { scroll: false } })
  }

  function handleSetType(id: string | null) {
    setType(id)
  }

  function handleSetWeekday(id: string | null) {
    setWeekdayNr(id)
  }

  function handleSearchFilterChange(e: any) {
    const value = e.target.value
    if (value === "") {
      setSearchValue(null)
    } else {
      setSearchValue(value)
    }
  }

  return (
    <div className="mt-8 sm:mt-14 sm:flex sm:items-end sm:justify-between">
      <div className="sm:flex sm:w-3/5 sm:flex-wrap sm:items-center sm:gap-3">
        {/* Year Filter */}
        <Dropdown
          className="!bg-secondary-100 dark:!bg-secondary-600/20 !w-48 sm:!w-44"
          theme="secondary"
          placeholder={year}
          options={yearOptions}
          setValue={handleSetYear}
        />
        {/* Type Filter */}
        <div className="mt-3 sm:mt-0">
          <Dropdown
            className={`${type && "!bg-secondary-100 dark:!bg-secondary-600/20"} !w-48 sm:!w-44`}
            theme="secondary"
            placeholder={type ? holidayTypes[type] : "Typ"}
            options={[
              { id: "by_law", value: holidayTypes["by_law"] },
              { id: "partly_by_law", value: holidayTypes["partly_by_law"] },
              { id: "optional", value: holidayTypes["optional"] }
            ]}
            setValue={handleSetType}
            resetValue={() => handleSetType(null)}
            resetBtnActive={Boolean(type)}
          />
        </div>
        {/* Weekday Filter */}
        <div className="mt-3 sm:mt-0">
          <Dropdown
            className={`${weekday && "!bg-secondary-100 dark:!bg-secondary-600/20"} !w-48 sm:!w-44`}
            theme="secondary"
            placeholder={weekday ? weekday : "Wochentag"}
            options={[
              // getWeekdayStr starts at Sunday and index 0
              { id: "1", value: getWeekdayStr(1) },
              { id: "2", value: getWeekdayStr(2) },
              { id: "3", value: getWeekdayStr(3) },
              { id: "4", value: getWeekdayStr(4) },
              { id: "5", value: getWeekdayStr(5) },
              { id: "6", value: getWeekdayStr(6) },
              { id: "0", value: getWeekdayStr(0) }
            ]}
            setValue={handleSetWeekday}
            resetValue={() => handleSetWeekday(null)}
            resetBtnActive={Boolean(weekday)}
          />
        </div>
      </div>
      {/* Search Filter */}
      <div className="mt-3 sm:mt-0">
        <SearchInput
          value={searchValue || ""}
          placeholder="Suche nach Feiertage"
          onChange={handleSearchFilterChange}
        />
      </div>
    </div>
  )
}
