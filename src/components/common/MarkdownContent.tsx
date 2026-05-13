"use client"

import Link from "next/link"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import { EmailObfuscated } from "@/utils/constants"
import { useObfuscatedEmail } from "@/hooks/useObfuscatedEmail"

interface MarkdownContentPropsType {
  children: string
}

export default function MarkdownContent({ children }: MarkdownContentPropsType) {
  const {
    href: generalHref,
    label: generalLabel,
    reveal: revealGeneral,
    isRevealed: isGeneralRevealed
  } = useObfuscatedEmail(EmailObfuscated.general)

  return (
    <div className="content">
      <Markdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a(props) {
            const replaceList = [
              { from: "$email-general", to: isGeneralRevealed ? generalLabel : "[click to reveal]" }
            ]

            let content = (props.children as string) || ""
            let href = props.href || ""
            for (let i = 0; i < replaceList.length; i++) {
              const replacePair = replaceList[i]
              content = content.replaceAll(replacePair.from, replacePair.to)
              href = href.replaceAll(replacePair.from, replacePair.to)
            }

            const isEmailLink = props.href?.includes("$email-general")
            if (isEmailLink) {
              href = generalHref
            }

            function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
              if (isEmailLink && !isGeneralRevealed) {
                e.preventDefault()
                revealGeneral(e)
              }
            }

            return (
              <Link
                href={href}
                target="_blank"
                onClick={handleClick}
                onFocus={isEmailLink ? revealGeneral : undefined}
                className={`text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors duration-300 ${isEmailLink && !isGeneralRevealed ? "italic" : ""}`}>
                {content}
              </Link>
            )
          }
        }}>
        {children}
      </Markdown>
    </div>
  )
}
