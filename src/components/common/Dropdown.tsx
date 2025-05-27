"use client"

import { useState, useEffect, type Ref, type ReactElement, useRef } from "react"
import SVGAngleDown from "@/assets/icons/AngleDown.svg"

function useClickOutsideAction(ref: any, action: Function) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}

interface DropdownPropsType {
  theme?: string
  className?: string | undefined
  placeholder: string
  options: { id: string; value: string }[]
  setValue: Function
}

export default function Dropdown({
  theme = "primary",
  className = "",
  placeholder,
  options,
  setValue
}: DropdownPropsType) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownListRef = useRef(null)
  useClickOutsideAction(dropdownListRef, () => setIsOpen(false))

  let buttonThemeClasses = ""
  let dropdownThemeClasses = ""
  let optionThemeClasses = ""
  if (theme === "primary") {
    buttonThemeClasses = "text-neutral-800 border-primary-600 bg-white hover:bg-primary-100"
    dropdownThemeClasses = "bg-primary-800"
    optionThemeClasses = "hover:bg-primary-700"
  } else if (theme === "secondary") {
    buttonThemeClasses = "text-neutral-800 border-secondary-600 bg-white hover:bg-secondary-100"
    dropdownThemeClasses = "bg-secondary-800"
    optionThemeClasses = "hover:bg-secondary-700"
  }

  function handleDropdownToggle() {
    setIsOpen(!isOpen)
  }

  function handleSelect(id: string) {
    setIsOpen(false)
    setValue(id)
  }

  return (
    <div className="relative inline-block w-full sm:w-fit" ref={dropdownListRef}>
      <button
        onClick={handleDropdownToggle}
        className={`${className} ${buttonThemeClasses} flex w-full items-center justify-center rounded-full border-1 px-5 py-3 font-medium transition-colors duration-300 cursor-pointer sm:w-68 sm:py-2`}
        type="button">
        <p>{placeholder}</p>
        <SVGAngleDown className="ml-2 h-5 w-5" />
      </button>

      {isOpen && (
        <div
          className={`${dropdownThemeClasses} absolute z-10 mt-2 w-full overflow-hidden rounded-2xl shadow-lg`}>
          <ul className="h-48 overflow-y-auto py-2 text-white">
            {options.map(({ id, value }, i) => (
              <li
                onClick={() => handleSelect(id)}
                key={i}
                value={id}
                className={`${optionThemeClasses} flex cursor-pointer items-center px-4 py-3 transition-colors duration-100 select-none`}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
