import Link from "next/link"

import LogoShort from "./common/LogoShort"

const items = [{ text: "Legal Notice", link: "/legal" }]

export default function Footer() {
  // website content is based on year automatically
  const currentYear = new Date().getFullYear()

  return (
    <div className="mt-28">
      <LogoShort />
      <div className="mt-3 text-sm text-neutral-400">
        <p>© {currentYear} wannfrei.ch.</p>
        <p>All Rights Reserved.</p>
        <div className="mt-2">
          <Link href="/legal" className="underline">
            Legal Notice
          </Link>
        </div>
      </div>
    </div>
  )
}
