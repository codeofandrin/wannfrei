import { ButtonHTMLAttributes } from "react"

interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any
  className?: string
  theme?: string
}

export default function Button({ children, className = "", theme = "primary", ...props }: ButtonPropsType) {
  let themeClasses = ""
  if (theme === "primary") {
    themeClasses = "text-neutral-800 border-primary-600 bg-white hover:bg-primary-100"
  } else if (theme === "secondary") {
    themeClasses = "text-neutral-800 border-secondary-600 bg-white hover:bg-secondary-100"
  }

  return (
    <button
      className={`${className} ${themeClasses} flex w-full cursor-pointer justify-center rounded-full border-1 px-5 py-3 font-medium transition-colors duration-300 sm:w-56 sm:py-2`}
      {...props}>
      {children}
    </button>
  )
}
