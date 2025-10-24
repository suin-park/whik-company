import type { Metadata } from "next"
import "./globals.css"
import TopNav from "@/components/TopNav"
import Footer from "@/components/Footer"
import I18nProvider from "@/components/I18nProvider"

export const metadata: Metadata = {
  title: "Whik Company — Create Faster, Move Whik",
  description: "AI로 창작의 경계를 허무는 Whik Ecosystem",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://whik.co.kr"),
  openGraph: {
    title: "Whik Company",
    description: "Create Faster, Move Whik.",
    images: ["/og/og-company.png"]
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <I18nProvider>
          <TopNav />
          <main className="pt-16">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
