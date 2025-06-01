import Link from "next/link"

import ThemeDropdown from "./ThemeDropdown"
import LogoShort from "./common/LogoShort"
import GitHub from "@/assets/icons/GitHub.svg"

export default function Footer() {
  // website content is based on year automatically
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-28 sm:mt-40">
      <LogoShort />
      <div className="mt-3 text-sm text-neutral-400 sm:mt-5 dark:text-neutral-600">
        <p>© {currentYear} wannfrei.ch</p>
        <p>Alle Rechte vorbehalten.</p>
        <div className="mt-2">
          <Link
            href="/legal"
            className="hover:text-primary-600 dark:hover:text-primary-500 underline transition-colors duration-300">
            Impressum
          </Link>
        </div>
        <div className="mt-10 flex items-center justify-between">
          <ThemeDropdown />
          <Link href="https://github.com/codeofandrin/wannfrei" target="_blank">
            <GitHub className="h-5 w-5 transition-colors duration-300 hover:text-neutral-800 sm:h-6 sm:w-6 dark:hover:text-neutral-200" />
          </Link>
        </div>
      </div>
    </div>
  )
}
