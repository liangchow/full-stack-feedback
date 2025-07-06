import { Fugaz_One} from "next/font/google";
import React from 'react'
import Avatar from "./Avatar";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Panel(props) {

  const { src, firstName, lastName } = props
  

  return (
    <div className="flex flex-col flex-1 items-center gap-4 p-4">
        <Avatar src={src} firstName={firstName} lastName={lastName} />
        <h2 className={"text-shadow-lg/10 text-indigo-500 items-center uppercase " + fugaz.className}>{firstName} {lastName}</h2>
    </div>
  )
}
