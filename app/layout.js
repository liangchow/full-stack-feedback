import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]})


export const metadata = {
  title: "Feedback App",
  description: "Make everyone counts!",
};

export default function RootLayout({ children }) {

  const header = (
    <header className={"p-4 sm:p-8 flex items-center justify-between gap-4 textGradient " + inter.className}>
      <h1>header</h1>
    </header>
  )

    const footer = (
    <footer className="p-4 sm:p-8 text-center">
      Created with 💜
    </footer>
  )

  return (
    <html lang="en">
      <body className={"max-w-[1000px] w-full mx-auto min-h-screen flex flex-col text-sm sm:text-base md:text-lg " + inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
