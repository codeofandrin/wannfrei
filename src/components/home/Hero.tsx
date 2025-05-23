"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"

import { cantons } from "@/utils/constants"
import Dropdown from "../common/Dropdown"
import Button from "../common/Button"

const CANTON_PLACEHOLDER = "Kanton wählen..."

interface HeroPropsType {
  cantonID: string | null
  year: string | null
}

export default function Hero() {
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

  let cantonPlaceholder = CANTON_PLACEHOLDER
  let isCantonSelected = false

  if (cantonID) {
    cantonPlaceholder = cantons[cantonID as keyof typeof cantons]
    isCantonSelected = true
  }

  function handleSetCanton(id: string) {
    router.push(`${pathname}?${createQueryString("canton", id)}`, { scroll: false })
  }

  function handleSetNational() {
    router.push("/", { scroll: false })
  }

  return (
    <div className="mt-28">
      <h1 className="font-brand text-4xl font-[550]">
        <span className="text-primary-600">Wann</span> habe ich{" "}
        <span className="text-secondary-600">frei</span>?
      </h1>
      <h2 className="mt-8 font-medium text-neutral-500">
        Erhalte einen Überblick über nationale, kantonale, gesetzliche und optionale Feiertage in der Schweiz.
      </h2>

      <div className="mt-16 flex flex-col">
        <Dropdown
          className={`${isCantonSelected && "!bg-primary-100"}`}
          placeholder={cantonPlaceholder}
          options={Object.entries(cantons).map(([id, name]) => ({
            id,
            value: name
          }))}
          setValue={handleSetCanton}
        />
        <Button className={`${!isCantonSelected && "!bg-primary-100"} mt-5`} onClick={handleSetNational}>
          Gesamte Schweiz
        </Button>
      </div>
    </div>
  )
}
