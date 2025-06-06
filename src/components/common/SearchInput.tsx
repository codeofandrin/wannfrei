import { InputHTMLAttributes, type Ref } from "react"

import SVGSearch from "@/assets/icons/Search.svg"

interface SearchInputPropsType extends InputHTMLAttributes<HTMLInputElement> {
  value?: string | number | readonly string[] | undefined
  placeholder?: string
  ref?: Ref<HTMLInputElement> | undefined
}

export default function SearchInput({ value, placeholder = "Suchen", ref, ...props }: SearchInputPropsType) {
  return (
    <div>
      <div className="relative">
        <div className="text-neutral-700 dark:text-inherit">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-4 sm:pl-3.25">
            <SVGSearch className="text-secondary-600 h-4 w-4" />
          </div>
          <input
            ref={ref}
            type="text"
            className={`border-secondary-600 sm:hover:not-focus:bg-secondary-100 dark:sm:hover:not-focus:bg-secondary-600/20 focus:bg-secondary-100 dark:focus:bg-secondary-600/20 block w-full rounded-full border-1 py-3 pr-4 pl-10 ${value ? "bg-secondary-100 dark:bg-secondary-600/20 sm:w-60 sm:py-2 sm:pl-10" : "sm:w-0 sm:cursor-pointer sm:py-2 sm:pl-6 sm:focus:w-60 sm:focus:cursor-text sm:focus:pl-10"} transition-all duration-500 focus:outline-0`}
            placeholder={placeholder}
            value={value}
            {...props}
          />
        </div>
      </div>
    </div>
  )
}
