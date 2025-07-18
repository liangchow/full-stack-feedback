import { Fugaz_One, Open_Sans } from "next/font/google";
import React from 'react'

const opensans = Open_Sans({subsets: ["latin"]})
const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Button(props) {

    const {text, dark, full, glow, clickHandler } = props

    return (
        <button onClick={clickHandler} className={(glow ? "rounded-full overflow-hidden p-0.5 animate-background bg-conic/[from_var(--angle)] from-indigo-500 from-10% via-red-500 via-50% to-teal-500 to-90% hover:opacity-60 " 
            : "rounded-full overflow-hidden duration-200 border-2 border-solid border-indigo-600 hover:opacity-60 ") +
            (dark ? "text-white bg-indigo-600 " : "text-indigo-600") + 
            (full ? "grid place-items-center w-full text-indigo-600" : "")
            }>
            <p className={"px-5 sm:px-10 py-2 sm:py-3 rounded-full whitespace-nowrap bg-white cursor-pointer " + fugaz.className}>{text}</p>
        </button>
    )
}
