import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "../globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col items-center p-7 sm:px-14 sm:py-10 lg:px-20 xl:px-30">
        <NuqsAdapter>
          <div className="w-full max-w-screen-xl">
            <ThemeProvider>
              <Header />
              <div>{children}</div>
              <Footer />
              <Analytics />
            </ThemeProvider>
          </div>
        </NuqsAdapter>
      </body>
    </html>
  )
}
