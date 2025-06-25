import { Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({subsets: ["latin"]})


export const metadata = {
  title: "Feedback App",
  description: "Make everyone counts!",
};

export default function RootLayout({ children }) {

  const header = (
    <header className={"p-4 sm:p-8 flex items-center justify-between gap-4 textGradient " + opensans.className}>
      <h1>header</h1>
    </header>
  )

    const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center ">
      <p className={"text-indigo-500 "+ opensans.className}>Created with 💜</p>
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
