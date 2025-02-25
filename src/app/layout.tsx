import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/providers/auth"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tibia Server",
  description: "Join the adventure in our private Tibia server",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}