import type { Metadata } from "next"

import MarkdownContent from "@/components/common/MarkdownContent"
import MdLegalNotice from "@/content/legal-notice.md"

export const metadata: Metadata = {
  title: "Impressum"
}

export default function LegalNotice() {
  return (
    <div className="mt-24">
      <MarkdownContent>{MdLegalNotice}</MarkdownContent>
    </div>
  )
}
