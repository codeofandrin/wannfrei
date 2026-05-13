import { useState } from "react"

export function useObfuscatedEmail(encodedEmail: string) {
    const [href, setHref] = useState("mailto:#")
    const [label, setLabel] = useState("[click to reveal]")
    const [isRevealed, setIsRevealed] = useState(false)

    function reveal(e: any) {
        if (isRevealed) return

        e.preventDefault()

        const email = atob(atob(encodedEmail))
        setHref(`mailto:${email}`)
        setLabel(email)
        setIsRevealed(true)
    }

    return { href, label, reveal, isRevealed }
}
