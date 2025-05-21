"use client"

import { useCallback } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { cantons } from "@/utils/constants"
import Dropdown from "../common/Dropdown"

interface HolidaysPropsType {
  cantonID: string | null
  year: string | null
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

  const cantonID = searchParams.get("canton")
  const year = searchParams.get("year")
  const currentYear = new Date().getFullYear()
  const yearPlaceholder = year || currentYear.toString()

  let yearOptions = []
  for (let i = 0; i < 26; i++) {
    // range from now: -5 years, +20 years
    let yearStr = (currentYear - 5 + i).toString()
    yearOptions.push({ id: yearStr, value: yearStr })
  }

  let titleScope = "die gesamte Schweiz"
  if (cantonID) {
    const cantonName = cantons[cantonID as keyof typeof cantons]
    titleScope = `Kanton ${cantonName}`
  }

  function handleSetYear(id: string) {
    router.push(`${pathname}?${createQueryString("year", id)}`)
  }

  return (
    <div className="mt-24 flex flex-col">
      <h1 className="font-brand text-2xl font-medium">
        Feiertage für <span className="text-primary-800 font-bold">{titleScope}</span>
      </h1>
      {/* Filters */}
      <div className="mt-8">
        <Dropdown
          className="!w-32"
          theme="secondary"
          placeholder={yearPlaceholder as string}
          options={yearOptions}
          setValue={handleSetYear}
        />
      </div>
      {/* Holidays Table */}
      <div className="mt-5">
        <div className="relative max-h-[500px] overflow-scroll rounded-lg shadow-lg">
          <table className="min-w-[600px]">
            <thead className="bg-neutral-200">
              <tr className="font-semibold">
                <td className="py-4 pl-4">Datum</td>
                <td>Feiertag</td>
                <td>Wochentag</td>
                <td className="pr-4">Typ</td>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td className="text-left font-medium bg-primary-100 border-y-1 border-primary-200 text-primary-600 py-4 px-4" colSpan={4}>Januar 2025</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">01.01.2025</td>
                <td>Neujahrestag</td>
                <td>Montag</td>
                <td className="pr-4">gesetzlich</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">02.01.2025</td>
                <td>Berchtoldstag</td>
                <td>Dienstag</td>
                <td className="pr-4">optional</td>
              </tr>
              <tr>
                <td className="text-left font-medium bg-primary-100 border-y-1 border-primary-200 text-primary-600 py-4 px-4" colSpan={4}>Januar 2025</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">01.01.2025</td>
                <td>Neujahrestag</td>
                <td>Montag</td>
                <td className="pr-4">gesetzlich</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">02.01.2025</td>
                <td>Berchtoldstag</td>
                <td>Dienstag</td>
                <td className="pr-4">optional</td>
              </tr>
              <tr>
                <td className="text-left font-medium bg-primary-100 border-y-1 border-primary-200 text-primary-600 py-4 px-4" colSpan={4}>Januar 2025</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">01.01.2025</td>
                <td>Neujahrestag</td>
                <td>Montag</td>
                <td className="pr-4">gesetzlich</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">02.01.2025</td>
                <td>Berchtoldstag</td>
                <td>Dienstag</td>
                <td className="pr-4">optional</td>
              </tr>
              <tr>
                <td className="text-left font-medium bg-primary-100 border-y-1 border-primary-200 text-primary-600 py-4 px-4" colSpan={4}>Januar 2025</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">01.01.2025</td>
                <td>Neujahrestag</td>
                <td>Montag</td>
                <td className="pr-4">gesetzlich</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">02.01.2025</td>
                <td>Berchtoldstag</td>
                <td>Dienstag</td>
                <td className="pr-4">optional</td>
              </tr>
              <tr>
                <td className="text-left font-medium bg-primary-100 border-y-1 border-primary-200 text-primary-600 py-4 px-4" colSpan={4}>Januar 2025</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">01.01.2025</td>
                <td>Neujahrestag</td>
                <td>Montag</td>
                <td className="pr-4">gesetzlich</td>
              </tr>
              <tr>
                <td className="pl-4 py-4">02.01.2025</td>
                <td>Berchtoldstag</td>
                <td>Dienstag</td>
                <td className="pr-4">optional</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
