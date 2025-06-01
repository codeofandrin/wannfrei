"use client"

import { useState, useRef } from "react"
import useClickOutsideAction from "@/hooks/useClickOutsideAction"
import SVGAngleDown from "@/assets/icons/AngleDown.svg"
import SVGCross from "@/assets/icons/Cross.svg"

interface DropdownPropsType {
  theme?: string
  className?: string | undefined
  placeholder: string
  options: { id: string | number; value: string }[]
  setValue: Function
  resetValue?: Function | null
  resetBtnActive?: boolean | null
}

export default function Dropdown({
  theme = "primary",
  className = "",
  placeholder,
  options,
  setValue,
  resetValue,
  resetBtnActive = null
}: DropdownPropsType) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownListRef = useRef(null)
  useClickOutsideAction(dropdownListRef, () => setIsOpen(false))

  let buttonThemeClasses = ""
  let dropdownThemeClasses = ""
  let optionThemeClasses = ""
  if (theme === "primary") {
    buttonThemeClasses =
      "text-neutral-800 dark:text-inherit border-primary-600 bg-white dark:bg-neutral-950 hover:bg-primary-100 dark:hover:bg-primary-600/20"
    dropdownThemeClasses = "bg-primary-800"
    optionThemeClasses = "hover:bg-primary-700 dark:hover:bg-primary-900"
  } else if (theme === "secondary") {
    buttonThemeClasses =
      "text-neutral-800 dark:text-inherit border-secondary-600 bg-white dark:bg-neutral-950 hover:bg-secondary-100 dark:hover:bg-secondary-600/20"
    dropdownThemeClasses = "bg-secondary-800"
    optionThemeClasses = "hover:bg-secondary-700 dark:hover:bg-secondary-900"
  }

  function handleDropdownToggle() {
    setIsOpen(!isOpen)
  }

  function handleSelect(id: string | number) {
    setIsOpen(false)
    setValue(id)
  }

  return (
    <div className="relative inline-block w-full sm:w-fit" ref={dropdownListRef}>
      {resetBtnActive ? (
        <div
          className={`${className} ${buttonThemeClasses} flex max-h-[50px] w-full cursor-pointer items-center justify-between rounded-full border-1 py-3 pr-3 pl-5 font-medium transition-colors duration-300 sm:max-h-[42px] sm:w-68 sm:py-2`}>
          <div className="w-3/4" onClick={handleDropdownToggle}>
            <p>{placeholder}</p>
          </div>
          <div
            className="cursor-pointer rounded-full bg-red-600 p-1.5 transition-colors duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            onClick={resetValue ? () => resetValue() : () => {}}>
            <SVGCross className="h-4 w-4 text-white dark:text-neutral-950" />
          </div>
        </div>
      ) : (
        <div
          onClick={handleDropdownToggle}
          className={`${className} ${buttonThemeClasses} flex max-h-[50px] w-full cursor-pointer items-center justify-between rounded-full border-1 py-3 pr-3 pl-5 font-medium transition-colors duration-300 sm:max-h-[42px] sm:w-68 sm:py-2`}>
          <p>{placeholder}</p>
          <SVGAngleDown className="ml-2 h-5 w-5" />
        </div>
      )}

      {isOpen && (
        <div
          className={`${dropdownThemeClasses} absolute z-10 mt-2 w-full overflow-hidden rounded-2xl shadow-lg`}>
          <ul className="max-h-80 overflow-y-auto py-2 text-white sm:max-h-60">
            {options.map(({ id, value }, i) => (
              <li
                onClick={() => handleSelect(id)}
                key={i}
                value={id}
                className={`${optionThemeClasses} flex cursor-pointer items-center px-4 py-4 transition-colors duration-100 select-none sm:py-3`}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
