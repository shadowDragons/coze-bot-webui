import BaiDuAnalytics from '@/app/BaiDuAnalytics'
import GoogleAnalytics from '@/app/GoogleAnalytics'
import CozeChat from '@/components/CozeChat'
import { ThemeProvider } from '@/components/ThemeProvider'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import '@/styles/loading.css'
import { Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Suspense } from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme={siteConfig.defaultNextTheme} enableSystem>
          <Suspense fallback={<div>Loading...</div>}>
            <CozeChat />
          </Suspense>
          {/* <Header /> */}
          {/* <main className='flex flex-col items-center py-6'>{children}</main> */}
          {/* <CozeChat /> */}
          {/* <Footer />
          <Analytics />
          <TailwindIndicator /> */}
        </ThemeProvider>
        {process.env.NODE_ENV === 'development' ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
            <BaiDuAnalytics />
          </>
        )}
      </body>
    </html>
  )
}
