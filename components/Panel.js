import { Fugaz_One} from "next/font/google";
import React from 'react'
import Avatar from "./Avatar";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Panel(props) {

  const { currentUser } = props
  

  return (
    <div className="flex flex-col flex-1 items-center gap-4">
        <Avatar currentUser={currentUser} />
        <h2 className={"text-shadow-lg/10 text-indigo-500 items-center uppercase " + fugaz.className}>{currentUser.firstName} {currentUser.lastName}</h2>
    </div>
  )
}
