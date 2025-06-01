import Link from "next/link"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

import { Email } from "@/utils/constants"

interface MarkdownContentPropsType {
  children: string
}

export default function MarkdownContent({ children }: MarkdownContentPropsType) {
  return (
    <div className="content">
      <Markdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a(props) {
            const replaceList = [{ from: "$email-general", to: Email.general }]

            let content = (props.children as string) || ""
            let href = props.href || ""
            for (let i = 0; i < replaceList.length; i++) {
              const replacePair = replaceList[i]
              content = content.replaceAll(replacePair.from, replacePair.to)
              href = href.replaceAll(replacePair.from, replacePair.to)
            }

            return (
              <Link
                href={href}
                target="_blank"
                className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600 transition-colors duration-300">
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
