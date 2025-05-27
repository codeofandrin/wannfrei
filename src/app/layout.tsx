import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata = {
  title: "Wann habe ich frei?",
  description:
    "Erhalte einen Überblick über nationale, kantonale, gesetzliche und optionale Feiertage in der Schweiz."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-7 sm:px-14 sm:py-10 lg:px-20 xl:px-30">
        <Header />
        <div>{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
