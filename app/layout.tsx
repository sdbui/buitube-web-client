import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar/navbar';
import { CssVarsProvider, Sheet } from '@mui/joy';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BuiTube',
  description: 'A youtube clone for Buis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CssVarsProvider defaultMode='dark'>
        <body className={inter.className}>
          <Sheet variant="outlined" sx={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Navbar/>
            <Sheet sx={{flexGrow: 1}}>
              {children}
            </Sheet>
          </Sheet>
        </body>
      </CssVarsProvider>
    </html>
  )
}
