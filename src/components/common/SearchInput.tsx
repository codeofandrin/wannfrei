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
        <div className="text-neutral-700">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center pl-4 sm:pl-3 sm:focus:pl-4">
            <SVGSearch className="text-secondary-600 h-4 w-4" />
          </div>
          <input
            ref={ref}
            type="text"
            className={`border-secondary-600 sm:hover:not-focus:bg-secondary-100 focus:bg-secondary-100 block w-full rounded-full border-1 py-3 pr-4 pl-10 ${value ? "bg-secondary-100 sm:w-78 sm:py-2 sm:pl-10" : "sm:w-0 sm:cursor-pointer sm:py-2 sm:pl-6 sm:focus:w-78 sm:focus:cursor-text sm:focus:pl-10"} transition-all duration-500 focus:outline-0`}
            placeholder={placeholder}
            value={value}
            {...props}
          />
        </div>
      </div>
    </div>
  )
}
