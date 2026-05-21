"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export default function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      disabled={copied}
      className={`${className} rounded-md px-2 py-1 font-mono text-xs transition-colors ${
        copied
          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
          : "cursor-pointer bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
      }`}>
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  )
}
