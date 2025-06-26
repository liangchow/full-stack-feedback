import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({subsets: ["latin"]})
const fugaz = Fugaz_One({subsets: ["latin"], weight:["400"]})


export const metadata = {
  title: "Feedback App",
  description: "Make everyone counts!",
};

export default function RootLayout({ children }) {

  const header = (
    <header className={"text-xl sm:text-2xl md:text-3xl p-4 sm:p-8 flex items-center justify-between gap-4 textGradient " + fugaz.className}>
      <h1>header</h1>
    </header>
  )

    const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center ">
      <p className={"text-indigo-500 "+ fugaz.className}>Created with 💜</p>
    </footer>
  )

  return (
    <html lang="en">
      <body className={"max-w-[1000px] w-full mx-auto min-h-screen flex flex-col text-slate-800 text-sm sm:text-base md:text-lg " + opensans.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
