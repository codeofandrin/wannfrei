"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"

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
  useEffect(() => {
    console.error(error)
  }, [error])

  function handleReset() {
    reset()
  }

  return (
    <html>
      <body className="flex h-screen justify-center p-7 sm:px-14 sm:py-10 lg:px-20 xl:px-30">
        <div className="flex h-full w-full max-w-screen-xl flex-col">
          <ThemeProvider>
            <Header />
            <div className="mt-28 sm:mt-36 sm:flex sm:flex-col sm:items-center">
              <h1 className="font-brand text-4xl font-[550] sm:text-center sm:text-5xl sm:font-semibold">
                Es ist ein unerwarteter Fehler aufgetreten.
              </h1>
              <Button className="mt-16 sm:mt-20" onClick={handleReset}>
                Erneut versuchen
              </Button>
            </div>
            <div className="mt-auto">
              <Footer />
            </div>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
