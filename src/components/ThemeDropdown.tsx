"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

import useClickOutsideAction from "@/hooks/useClickOutsideAction"
import SVGMoon from "@/assets/icons/Moon.svg"
import SVGSun from "@/assets/icons/Sun.svg"
import SVGComputer from "@/assets/icons/Computer.svg"
import SVGAngleDown from "@/assets/icons/AngleDown.svg"

function ThemeDropdownFallback() {
  return (
    <div className="flex items-center">
      <div className="h-5 w-5 animate-pulse cursor-not-allowed rounded-full bg-neutral-300 dark:bg-neutral-800" />
    </div>
  )
}

export default function ThemeDropdown() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownListRef = useRef(null)
  useClickOutsideAction(dropdownListRef, () => setIsOpen(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ThemeDropdownFallback />
  }

  const dropdownItemClass =
    "flex cursor-pointer items-center px-3 py-3 transition-colors duration-100 select-none sm:py-3 hover:bg-neutral-300 hover:dark:bg-neutral-800"
  let placeholder
  if (theme === "system") {
    placeholder = (
      <>
        <SVGComputer className="h-4 w-4" />
        <p className="ml-1">System</p>
      </>
    )
  } else if (theme === "dark") {
    placeholder = (
      <>
        <SVGMoon className="h-3 w-3" />
        <p className="ml-1">Dunkel</p>
      </>
    )
  } else if (theme === "light") {
    placeholder = (
      <>
        <SVGSun className="h-3 w-3" />
        <p className="ml-1">Hell</p>
      </>
    )
  }

  function handleDropdownToggle() {
    setIsOpen(!isOpen)
  }

  function handleSelect(id: string) {
    setTheme(id)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-26 text-xs sm:w-26" ref={dropdownListRef}>
      {isOpen && (
        <div className="absolute z-10 -mt-34 w-full overflow-hidden rounded-2xl shadow-lg">
          <ul className="max-h-80 overflow-y-auto bg-neutral-200 py-1 sm:max-h-50 dark:bg-neutral-900">
            <li onClick={() => handleSelect("dark")} className={dropdownItemClass}>
              <SVGMoon className="h-3 w-3" />
              <p className="ml-1">Dunkel</p>
            </li>
            <li onClick={() => handleSelect("light")} className={dropdownItemClass}>
              <SVGSun className="h-3 w-3" />
              <p className="ml-1">Hell</p>
            </li>
            <li onClick={() => handleSelect("system")} className={dropdownItemClass}>
              <SVGComputer className="h-4 w-4" />
              <p className="ml-1">System</p>
            </li>
          </ul>
        </div>
      )}
      <div
        onClick={handleDropdownToggle}
        className="flex max-h-[50px] w-full cursor-pointer items-center justify-between rounded-full border-1 border-neutral-300 py-1 pr-2 pl-3 font-medium transition-colors duration-300 sm:max-h-[42px] dark:border-neutral-800">
        <div className="flex items-center">{placeholder}</div>
        <SVGAngleDown className="h-3 w-3" />
      </div>
    </div>
  )
}
