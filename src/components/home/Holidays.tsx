"use client"

import { ReactElement, useCallback, useRef, useEffect, useState, Ref } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import MiniSearch from "minisearch"

import { cantons } from "@/utils/constants"
import { getNationalHolidayRows, getHolidayRowsFromCanton } from "@/utils/helpers"
import { HolidayType } from "@/utils/enums"
import type { HolidayRowType } from "@/utils/types"
import Dropdown from "../common/Dropdown"
import SearchInput from "../common/SearchInput"

function getHolidayRows(holidays: HolidayRowType[], year: string, searchFilter: string): ReactElement[] {
  let oldMonthName = ""
  let holidayRows: ReactElement[] = []
  let fuzzyResults: string[] = []
  if (searchFilter) {
    let miniSearch = new MiniSearch({
      fields: ["name"],
      idField: "name"
    })
    miniSearch.addAll(holidays)

    const results = miniSearch.search(searchFilter, { fuzzy: 0.2 })
    results.forEach(({ id }) => {
      fuzzyResults.push(id)
    })
  }

  holidays.forEach(({ date, name, weekday, type, monthName }, i) => {
    if (
      searchFilter &&
      !name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) &&
      !fuzzyResults.includes(name)
    ) {
      return
    }

    if (monthName !== oldMonthName) {
      holidayRows.push(
        <tr key={`month-header-${i}`}>
          <td
            className="bg-primary-100 border-primary-200 text-primary-600 border-y-1 py-4 pl-4 text-left font-medium sm:pl-8"
            colSpan={4}>
            {monthName} {year}
          </td>
        </tr>
      )

      oldMonthName = monthName
    }

    holidayRows.push(
      <tr key={i}>
        <td className="py-4 pl-4 sm:pl-8">{date}</td>
        <td>{name}</td>
        <td>{weekday}</td>
        <td className="pr-4 sm:pr-8">{getTypeBadge(type)}</td>
      </tr>
    )
  })

  if (holidayRows.length === 0) {
    holidayRows.push(
      <tr key="no-results">
        <td
          className="border-y-1 border-neutral-200 bg-neutral-100 py-4 pl-4 text-left text-neutral-500 sm:pl-8"
          colSpan={4}>
          Keine Ergebnisse gefunden
        </td>
      </tr>
    )
  }

  return holidayRows
}

function getTypeBadge(type: HolidayType): ReactElement {
  let text
  let textColor
  let borderColor
  let bgColor

  switch (type) {
    case HolidayType.by_law:
      text = "gesetzlich"
      textColor = "text-red-600"
      borderColor = "border-red-400"
      bgColor = "bg-red-100"
      break

    case HolidayType.partly_by_law:
      text = "teils gesetzlich"
      textColor = "text-yellow-700"
      borderColor = "border-yellow-400"
      bgColor = "bg-yellow-100"
      break

    case HolidayType.optional:
      text = "optional"
      textColor = "text-sky-700"
      borderColor = "border-sky-400"
      bgColor = "bg-sky-100"
      break

    default:
      break
  }

  return (
    <div className={`${textColor} ${borderColor} ${bgColor} w-fit rounded-full border-1 px-2 py-1 sm:px-3`}>
      <p className="text-xs sm:text-sm">{text}</p>
    </div>
  )
}

export function HolidaysFallback() {
  let holidayRows = []
  for (let i = 0; i < 5; i++) {
    holidayRows.push(
      <tr key={i}>
        <td className="flex py-4 pl-4 sm:pl-8">
          <div className="h-5 w-14 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-20" />
        </td>
        <td>
          <div className="h-5 w-32 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-44" />
        </td>
        <td>
          <div className="h-5 w-28 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-32" />
        </td>
        <td className="pr-4 sm:pr-8">
          <div className="h-5 w-20 animate-pulse rounded-full bg-neutral-200 sm:h-6 sm:w-24" />
        </td>
      </tr>
    )
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage für <span className="text-primary-800 animate-pulse font-bold">. . .</span>
      </h1>
      {/* Filters */}
      <div className="mt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between">
        <div className="flex w-32 animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:w-28 sm:py-2">
          placeholder
        </div>
        <div className="mt-3 flex w-full animate-pulse cursor-not-allowed justify-center rounded-full border-1 border-neutral-300 bg-neutral-300 px-5 py-3 font-medium text-transparent sm:mt-0 sm:w-0 sm:py-2">
          placeholder
        </div>
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px]">
          <table className="w-full min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr className="font-semibold">
                <td className="py-4 pl-4 sm:pl-8">Datum</td>
                <td>Feiertag</td>
                <td>Wochentag</td>
                <td className="pr-4 sm:pr-8">Typ</td>
              </tr>
            </thead>
            <tbody>{holidayRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Holidays() {
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
  const searchFilter = searchParams.get("search") || ""
  const [searchValue, setSearchValue] = useState("")
  const searchFilterRef: Ref<HTMLInputElement> = useRef(null)
  useEffect(() => {
    const currentSearchValue = searchFilterRef.current?.value
    if (currentSearchValue !== searchFilter) {
      setSearchValue(searchFilter)
    }
  }, [])

  const cantonID = searchParams.get("canton")
  const year = searchParams.get("year")
  const currentYear = new Date().getFullYear()
  const fixedOrCurrentYear = year || currentYear.toString()

  let yearOptions = []
  for (let i = 0; i < 26; i++) {
    // range from now: -5 years, +20 years
    let yearStr = (currentYear - 5 + i).toString()
    yearOptions.push({ id: yearStr, value: yearStr })
  }

  let titleScope = "die gesamte Schweiz"
  let holidays: HolidayRowType[] = getNationalHolidayRows(parseInt(fixedOrCurrentYear))
  if (cantonID) {
    const cantonName = cantons[cantonID as keyof typeof cantons]
    titleScope = `Kanton ${cantonName}`
    holidays = getHolidayRowsFromCanton(cantonID, parseInt(fixedOrCurrentYear))
  }

  function handleSetYear(id: string) {
    router.push(`${pathname}?${createQueryString("year", id)}`, { scroll: false })
  }

  function handleSearchFilterChange(e: any) {
    setSearchValue(e.target.value)
  }

  function handleSearchFilterLeave(e: any) {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`, { scroll: false })
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage für <span className="text-primary-800 font-bold">{titleScope}</span>
      </h1>
      {/* Filters */}
      <div className="mt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between">
        <Dropdown
          className="!w-32 sm:!w-28"
          theme="secondary"
          placeholder={fixedOrCurrentYear as string}
          options={yearOptions}
          setValue={handleSetYear}
        />
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
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px]">
          <table className="w-full min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr className="font-semibold">
                <td className="py-4 pl-4 sm:pl-8">Datum</td>
                <td>Feiertag</td>
                <td>Wochentag</td>
                <td className="pr-4 sm:pr-8">Typ</td>
              </tr>
            </thead>
            <tbody>{getHolidayRows(holidays, fixedOrCurrentYear, searchValue)}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
