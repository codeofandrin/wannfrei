"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { isInAlphabet } from "@/utils/helpers"
import useClickOutsideAction from "@/hooks/useClickOutsideAction"
import SVGAngleDown from "@/assets/icons/AngleDown.svg"
import SVGCross from "@/assets/icons/Cross.svg"

interface DropdownPropsType {
  theme?: string
  className?: string | undefined
  placeholder: string
  options: { id: string | number; value: string; link?: string | undefined }[]
  setValue?: Function | null
  resetValue?: Function | null
  resetBtnActive?: boolean | null
  areLinks?: boolean
  disabled?: boolean
}

export default function Dropdown({
  theme = "primary",
  className = "",
  placeholder,
  options,
  setValue = null,
  resetValue,
  resetBtnActive = null,
  areLinks = false,
  disabled = false
}: DropdownPropsType) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const dropdownListRef = useRef<HTMLUListElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>(Array(options.length).fill(null))
  const params = useParams()

  useClickOutsideAction(dropdownRef, () => setIsOpen(false))

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (isOpen) {
        const key = event.key.toLowerCase()

        // jump to element on keypress
        if (isInAlphabet(key)) {
          const idx = options.findIndex((opt) => opt.value.toLowerCase().startsWith(key))
          if (idx !== -1 && optionRefs.current[idx] && dropdownListRef.current) {
            const optionEl = optionRefs.current[idx]
            const listEl = dropdownListRef.current
            // Scroll so that the matched element is at the top
            listEl.scrollTop = (optionEl as HTMLElement).offsetTop - listEl.offsetTop
          }
        } else {
          if (key === "escape") {
            setIsOpen(false)
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress)
    }

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isOpen])

  let buttonThemeClasses = ""
  let dropdownThemeClasses = ""
  let optionThemeClasses = ""
  if (theme === "primary") {
    buttonThemeClasses = `${disabled ? "text-neutral-300 dark:text-neutral-800 border-neutral-300 dark:border-neutral-800" : "text-neutral-800 dark:text-inherit border-primary-600 hover:bg-primary-100 dark:hover:bg-primary-600/20"} bg-white dark:bg-neutral-950`
    dropdownThemeClasses = "bg-primary-800"
    optionThemeClasses = "hover:bg-primary-700 dark:hover:bg-primary-900"
  } else if (theme === "secondary") {
    buttonThemeClasses = `${disabled ? "text-neutral-300 dark:text-neutral-800 border-neutral-300 dark:border-neutral-800" : "text-neutral-800 dark:text-inherit border-secondary-600 hover:bg-secondary-100 dark:hover:bg-secondary-600/20"} bg-white dark:bg-neutral-950`
    dropdownThemeClasses = "bg-secondary-800"
    optionThemeClasses = "hover:bg-secondary-700 dark:hover:bg-secondary-900"
  }

  function handleDropdownToggle() {
    if (disabled) return
    setIsOpen(!isOpen)
  }

  function handleSelect(id: string | number) {
    if (disabled) return
    setIsOpen(false)
    setValue && setValue(id)
  }

  // Helper to assign refs with correct type
  function setOptionRef(i: number): React.RefCallback<HTMLLIElement> {
    return (el) => {
      optionRefs.current[i] = el
    }
  }

  return (
    <div className="relative inline-block w-full sm:w-fit" ref={dropdownRef}>
      {resetBtnActive ? (
        <div
          className={`${className} ${buttonThemeClasses} flex max-h-[50px] w-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-between rounded-full border-1 py-3 pr-3 pl-5 font-medium transition-colors duration-300 sm:max-h-[42px] sm:w-68 sm:py-2`}>
          <div className="w-3/4" onClick={handleDropdownToggle}>
            <p>{placeholder}</p>
          </div>
          {areLinks ? (
            <div className="cursor-pointer rounded-full bg-red-600 p-1.5 transition-colors duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
              <Link href={`/${params.year}/${params.canton}`} scroll={false}>
                <SVGCross className="h-4 w-4 text-white dark:text-neutral-950" />
              </Link>
            </div>
          ) : (
            <div
              className="cursor-pointer rounded-full bg-red-600 p-1.5 transition-colors duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              onClick={resetValue ? () => resetValue() : () => {}}>
              <SVGCross className="h-4 w-4 text-white dark:text-neutral-950" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleDropdownToggle}
          className={`${className} ${buttonThemeClasses} flex max-h-[50px] w-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-between rounded-full border-1 py-3 pr-3 pl-5 font-medium transition-colors duration-300 sm:max-h-[42px] sm:w-68 sm:py-2`}>
          <p>{placeholder}</p>
          <SVGAngleDown className="ml-2 h-5 w-5" />
        </div>
      )}
      {/* Dropdown list */}
      <div
        className={`${dropdownThemeClasses} ${!isOpen && "hidden"} absolute z-10 mt-2 w-full overflow-hidden rounded-2xl shadow-lg`}>
        <ul className="max-h-80 overflow-y-auto py-2 text-white sm:max-h-60" ref={dropdownListRef}>
          {options.map(({ id, value, link }, i) => {
            const className = `${optionThemeClasses} flex cursor-pointer items-center transition-colors duration-100 select-none`

            if (areLinks) {
              return (
                <li ref={setOptionRef(i)} key={i} value={id} className={className}>
                  <Link href={link as string} className="h-full w-full" scroll={false}>
                    <p className="px-4 py-4 sm:py-3">{value}</p>
                  </Link>
                </li>
              )
            } else {
              return (
                <li
                  ref={setOptionRef(i)}
                  onClick={() => handleSelect(id)}
                  key={i}
                  value={id}
                  className={`${className} px-4 py-4 sm:py-3`}>
                  {value}
                </li>
              )
            }
          })}
        </ul>
      </div>
    </div>
  )
}
