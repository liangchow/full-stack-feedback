import { Fugaz_One, Open_Sans } from "next/font/google";
import React from 'react'

const opensans = Open_Sans({subsets: ["latin"]})
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Button(props) {

    const {text, dark} = props

    return (
        // <button className={"rounded-full overflow-hidden duration-200 border-2 border-solid border-indigo-600 hover:opacity-60 cursor-pointer " + 
        // (dark ? "text-white bg-indigo-600 " : "text-indigo-600")}>
        //     <p className={"px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 cursor-pointer "+opensans.className}>
        //     {text}
        //     </p>
        // </button>
        <button className="block animate-background rounded-full bg-conic from-green-300 via-blue-600 to-red-300 bg-[length:_400%_400%] p-1 [animation-duration:_6s]">
            <p className={"border px-6 sm:px-10 py-2 sm:py-3 " + fugaz.className}>{text}</p>
        </button>
    )
}
