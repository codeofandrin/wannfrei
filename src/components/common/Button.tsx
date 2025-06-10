import { ButtonHTMLAttributes } from "react"
import Link from "next/link"

interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any
  className?: string
  theme?: string
  href?: string | null
}

export default function Button({
  children,
  className = "",
  theme = "primary",
  href = null,
  ...props
}: ButtonPropsType) {
  let themeClasses = ""
  if (theme === "primary") {
    themeClasses =
      "text-neutral-800 dark:text-inherit border-primary-600 bg-white dark:bg-neutral-950 hover:bg-primary-100 dark:hover:bg-primary-600/20"
  } else if (theme === "secondary") {
    themeClasses =
      "text-neutral-800 dark:text-inherit border-secondary-600 bg-white dark:bg-neutral-950 hover:bg-secondary-100 dark:hover:bg-secondary-600/20"
  }

  const elementClassName = `${className} ${themeClasses} flex w-full cursor-pointer justify-center rounded-full border-1 px-5 py-3 font-medium transition-colors duration-300 sm:w-56 sm:py-2`

  if (href) {
    return (
      <Link href={href as string} className={elementClassName} scroll={false}>
        {children}
      </Link>
    )
  } else {
    return (
      <button className={elementClassName} {...props}>
        {children}
      </button>
    )
  }
}
