import { Fugaz_One} from "next/font/google";
import React from 'react'
import Avatar from "./Avatar";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Panel(props) {

  const { user, stats, demo } = props
  
  if (demo) {
    return (
      <div className="flex flex-col flex-1 items-center gap-1">
          <Avatar user={user} />
          <h2 className={"text-shadow-lg/10 text-indigo-500 items-center uppercase " + fugaz.className}>{user?.firstName} {user?.lastName}</h2>
          <h2 className={"text-indigo-500 items-center " + fugaz.className}>⭐{stats?.average_rating}/5</h2>
      </div>
    )
  }


    return (
      <div className="flex flex-col flex-1 items-center gap-4">
          <Avatar user={user} />
          <h2 className={"text-shadow-lg/10 text-indigo-500 items-center uppercase " + fugaz.className}>{user?.firstName} {user?.lastName}</h2>
      </div>
    )
}
