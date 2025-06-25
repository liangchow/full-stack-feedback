import { Open_Sans } from "next/font/google";
import React from 'react'

const opensans = Open_Sans({subsets: ["latin"]})

export default function Button(props) {

    const {text, dark} = props

    return (
        <button className={"rounded-full overflow-hidden duration-200 border-2 border-solid border-indigo-600 hover:opacity-60 " + 
        (dark ? "text-white bg-indigo-600 " : "text-indigo-600")}>
            <p className={"px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 "+opensans.className}>
            {text}
            </p>
        </button>
    )
}
