"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Button from "@/components/common/Button"
import "./globals.css"

export const metadata = {
  title: "Fehler"
}

interface GlobalErrorPropsType {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorPropsType) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  function handleReset() {
    reset()
  }

  return (
    <html lang="en">
      <body className="flex h-screen flex-col p-7">
        <Header />
        <div className="mt-28">
          <h1 className="font-brand text-4xl font-[550]">Es ist ein unerwarteter Fehler aufgetreten.</h1>
          <Button className="mt-20" onClick={handleReset}>
            Erneut versuchen
          </Button>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  )
}
