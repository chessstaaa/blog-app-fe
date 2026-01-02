import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/context/AuthContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eventify",
  description: "Event Ticketing Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* AUTH + SESSION + QUERY LAYER */}
        <SessionProvider>
          <AuthProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </AuthProvider>
        </SessionProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}