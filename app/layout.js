import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Session from './session/provider'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SMART DSA REMINDER AND STREAK TRACKER",
  description: "SMART DSA REMINDER AND STREAK TRACKER",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/search.png" />
        <title>SMART DSA REM</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Session>
          {children}
        </Session>
      </body>
    </html>
  );
}
