import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "../globals.css"

export const metadata = {
  title: "Wann habe ich frei?",
  description:
    "Erhalte einen Überblich über nationale, kantonale, gesetzliche und optionale Feiertage in der Schweiz. Wann ist ein arbeitsfreier Tag? - Erhalte hier alle Feiertage! Feiertage im Kanton Aargau, Kanton Appenzell Ausserrhoden, Kanton Appenzell Innerrhoden, Kanton Basel-Landschaft, Kanton Basel-Stadt, Kanton Bern, Kanton Freiburg, Kanton Genf, Kanton Glarus, Kanton Graubünden, Kanton Jura, Kanton Luzern, Kanton Neuenburg, Kanton Nidwalden, Kanton Obwalden, Kanton Schaffhausen, Kanton Schwyz, Kanton Solothurn, Kanton St. Gallen, Kanton Tessin, Kanton Thurgau, Kanton Uri, Kanton Waadt, Kanton Wallis, Kanton Zug, Kanton Zürich."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col items-center p-7 sm:px-14 sm:py-10 lg:px-20 xl:px-30">
        <div className="w-full max-w-screen-xl">
          <ThemeProvider>
            <Header />
            <div>{children}</div>
            <Footer />
            <Analytics />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
