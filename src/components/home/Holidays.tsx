"use client"

import MiniSearch from "minisearch"
import { useQueryState } from "nuqs"

import { Email } from "@/utils/constants"
import { cantons } from "@/utils/constants"
import {
  getNationalHolidayRows,
  getHolidayRowsFromCanton,
  getWeekdayStr,
  sortByDateField
} from "@/utils/helpers"
import { HolidayType } from "@/utils/enums"
import type { HolidayRowType } from "@/utils/types"
import HolidaysFilter from "./HolidaysFilter"

function getHolidayRows(
  holidays: HolidayRowType[],
  year: string,
  typeFilter: string | null,
  weekdayFilter: string | null,
  searchFilter: string | null
): React.ReactElement[] {
  let oldMonthName = ""
  let holidayRows: React.ReactElement[] = []
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

  sortByDateField(holidays, "date").forEach(({ date, name, weekday, type, monthName }, i) => {
    // type filter
    if (typeFilter && type !== typeFilter) {
      return
    }

    // weekday filter
    if (weekdayFilter && weekday !== weekdayFilter) {
      return
    }

    // search filter
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
            className="bg-primary-100 dark:bg-primary-600/20 border-primary-200 dark:border-primary-900 text-primary-600 dark:text-primary-500 border-y-1 py-4 pl-4 text-left font-medium sm:pl-8"
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
        <td className="pl-4">{name}</td>
        <td className="pl-4">{weekday}</td>
        <td className="px-4 sm:pr-8">{getTypeBadge(type)}</td>
      </tr>
    )
  })

  if (holidayRows.length === 0) {
    holidayRows.push(
      <tr key="no-results">
        <td
          className="border-t-1 border-neutral-200 bg-neutral-100 py-4 pl-4 text-left text-neutral-500 sm:pl-8 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
          colSpan={4}>
          Keine Ergebnisse gefunden.
        </td>
      </tr>
    )
  }

  return holidayRows
}

function getTypeBadge(type: HolidayType): React.ReactElement {
  let text
  let textColor
  let borderColor
  let bgColor

  switch (type) {
    case HolidayType.by_law:
      text = "gesetzlich"
      textColor = "text-red-600 dark:text-red-500"
      borderColor = "border-red-400 dark:border-red-800"
      bgColor = "bg-red-100 dark:bg-red-600/20"
      break

    case HolidayType.partly_by_law:
      text = "teils gesetzlich"
      textColor = "text-yellow-700 dark:text-yellow-600"
      borderColor = "border-yellow-400 dark:border-yellow-700"
      bgColor = "bg-yellow-100 dark:bg-yellow-600/20"
      break

    case HolidayType.optional:
      text = "optional"
      textColor = "text-sky-700 dark:text-sky-500"
      borderColor = "border-sky-400 dark:border-sky-800"
      bgColor = "bg-sky-100 dark:bg-sky-600/20"
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

interface HolidaysPropsType {
  year: string | null
  cantonID: string | null
}

export default function Holidays({ year, cantonID }: HolidaysPropsType) {
  // * States *
  const [type, setType] = useQueryState("type")
  const [weekdayNr, setWeekdayNr] = useQueryState("weekday")
  const [searchValue, setSearchValue] = useQueryState("search")

  // * Variables *
  const weekday = weekdayNr ? getWeekdayStr(parseInt(weekdayNr)) : null
  // const searchFilter = searchParams.get("search") || ""
  const currentYear = new Date().getFullYear()
  const fixedOrCurrentYear = year || currentYear.toString()

  let titleScope = (
    <>
      in der <span className="text-primary-800 dark:text-primary-200 font-bold">gesamten Schweiz</span>
    </>
  )
  let holidays: HolidayRowType[] = getNationalHolidayRows(parseInt(fixedOrCurrentYear))
  if (cantonID) {
    const cantonName = cantons[cantonID as keyof typeof cantons]
    titleScope = (
      <>
        im <span className="text-primary-800 dark:text-primary-200 font-bold">Kanton {cantonName}</span>
      </>
    )
    holidays = getHolidayRowsFromCanton(cantonID, parseInt(fixedOrCurrentYear))
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium sm:text-center sm:text-3xl">
        Feiertage{" "}
        <span className="text-secondary-800 dark:text-secondary-100 font-bold">{fixedOrCurrentYear}</span>{" "}
        {titleScope}
      </h1>
      {/* Filters */}
      <HolidaysFilter
        year={fixedOrCurrentYear}
        cantonID={cantonID}
        type={type}
        weekday={weekday}
        searchValue={searchValue}
        setType={setType}
        setWeekdayNr={setWeekdayNr}
        setSearchValue={setSearchValue}
      />
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg border-1 border-neutral-300 shadow-lg sm:max-h-[600px] dark:border-neutral-800 dark:shadow-xl dark:shadow-neutral-900/50">
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-neutral-200 dark:bg-neutral-700">
              <tr className="font-semibold">
                <td className="relative py-4 pl-4 sm:pl-8">
                  <p>Datum</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative pl-4">
                  <p>Feiertag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative pl-4">
                  <p>Wochentag</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
                <td className="relative px-4 sm:pr-8">
                  <p>Typ</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-full" />
                </td>
              </tr>
            </thead>
            <tbody>{getHolidayRows(holidays, fixedOrCurrentYear, type, weekday, searchValue)}</tbody>
          </table>
        </div>
        {/* Report bug */}
        <div className="mt-3 w-full text-right">
          <a
            href={`mailto:${Email.general}`}
            className="hover:text-primary-400 dark:hover:text-primary-600 text-xs text-neutral-400 transition-colors duration-300 dark:text-neutral-600">
            Fehler melden
          </a>
        </div>
      </div>
    </div>
  )
}
