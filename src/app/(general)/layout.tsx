import Header from "@/components/Header"
import "../globals.css"

export const metadata = {
  title: "Wann habe ich frei?",
  description:
    "Erhalte einen Überblick über nationale, kantonale, gesetzliche und optionale Feiertage in der Schweiz."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="p-7">
        <Header />
        <div>{children}</div>
      </body>
    </html>
  )
}
