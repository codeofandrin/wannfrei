import { useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

import { holidayTypes } from "@/utils/constants"
import { getWeekdayStr } from "@/utils/helpers"
import Dropdown from "../common/Dropdown"
import SearchInput from "../common/SearchInput"

interface HolidaysFilterPropsType {
  year: string
  type: string | null
  weekday: string | null
  searchValue: string
  setSearchValue: Function
  searchFilterRef: React.Ref<HTMLInputElement>
}

export default function HolidaysFilter({
  year,
  type,
  weekday,
  searchValue,
  setSearchValue,
  searchFilterRef
}: HolidaysFilterPropsType) {
  // * States *
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams]
  )

  const currentYear = new Date().getFullYear()
  let yearOptions = []
  for (let i = 0; i < 26; i++) {
    // range from now: -5 years, +20 years
    let yearStr = (currentYear - 5 + i).toString()
    yearOptions.push({ id: yearStr, value: yearStr })
  }

  function handleSetYear(id: string) {
    router.push(`${pathname}?${createQueryString("year", id)}`, { scroll: false })
  }

  function handleSetType(id: string) {
    router.push(`${pathname}?${createQueryString("type", id)}`, { scroll: false })
  }

  function handleSetWeekday(id: string) {
    router.push(`${pathname}?${createQueryString("weekday", id)}`, { scroll: false })
  }

  function handleSearchFilterChange(e: any) {
    setSearchValue(e.target.value)
  }

  function handleSearchFilterLeave(e: any) {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`, { scroll: false })
  }

  return (
    <div className="mt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between">
      <div className="sm:flex sm:w-1/2 sm:items-center">
        {/* Year Filter */}
        <Dropdown
          className="!bg-secondary-100 !w-32 sm:!w-28"
          theme="secondary"
          placeholder={year}
          options={yearOptions}
          setValue={handleSetYear}
        />
        {/* Type Filter */}
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <Dropdown
            className={`${type && "!bg-secondary-100"} !w-48 sm:!w-44`}
            theme="secondary"
            placeholder={type ? holidayTypes[type] : "Typ"}
            options={[
              { id: "by_law", value: holidayTypes["by_law"] },
              { id: "partly_by_law", value: holidayTypes["partly_by_law"] },
              { id: "optional", value: holidayTypes["optional"] }
            ]}
            setValue={handleSetType}
            resetValue={() => handleSetType("")}
            resetBtnActive={Boolean(type)}
          />
        </div>
        {/* Weekday Filter */}
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <Dropdown
            className={`${weekday && "!bg-secondary-100"} !w-48 sm:!w-44`}
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
            resetValue={() => handleSetWeekday("")}
            resetBtnActive={Boolean(weekday)}
          />
        </div>
      </div>
      {/* Search Filter */}
      <div className="mt-3 sm:mt-0">
        <SearchInput
          value={searchValue}
          ref={searchFilterRef}
          placeholder="Suche nach Feiertage"
          onChange={handleSearchFilterChange}
          onBlur={handleSearchFilterLeave}
        />
      </div>
    </div>
  )
}
