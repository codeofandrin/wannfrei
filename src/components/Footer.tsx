import Link from "next/link"

import LogoShort from "./common/LogoShort"
import GitHub from "@/assets/icons/GitHub.svg"

export default function Footer() {
  // website content is based on year automatically
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-28">
      <LogoShort />
      <div className="mt-3 text-sm text-neutral-400">
        <p>© {currentYear} wannfrei.ch</p>
        <p>Alle Rechte vorbehalten.</p>
        <div className="mt-2 flex items-center justify-between">
          <Link href="/legal" className="underline">
            Impressum
          </Link>
          <div>
            <Link href="https://github.com/codeofandrin/wannfrei" target="_blank">
              <GitHub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
