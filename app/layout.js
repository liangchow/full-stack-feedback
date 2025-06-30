import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Logout from "@/components/Logout";

const opensans = Open_Sans({subsets: ["latin"]})
const fugaz = Fugaz_One({subsets: ["latin"], weight:["400"]})


export const metadata = {
  title: "Feedback App",
  description: "Make everyone counts!",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href="/">
        <h1 className={"text-lg sm:text-xl md:text-2xl textGradient " + fugaz.className}>header</h1>
      </Link>
      <Logout />
    </header>
  )

    const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center ">
      <p className={"text-indigo-500 "+ fugaz.className}>Created with 💜</p>
    </footer>
  )

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={"max-w-[1000px] w-full mx-auto min-h-screen flex flex-col text-slate-800 text-sm sm:text-base md:text-lg " + opensans.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
