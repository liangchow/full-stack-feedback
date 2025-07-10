import { Fugaz_One} from "next/font/google";
import React from 'react'
import Image from 'next/image'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

function renderAvatar(user){
    if (user.src && typeof user.src === 'string'){
        return (
            <div>
                <Image className='rounded-full shadow-lg shadow-indigo-500/50' src={user.src} width={100} height={100} style={{objectFit: "contain"}} alt="pp" />
            </div>
        )
    } else if (user.firstName || user.lastName){
        return (
            <div className='size-[100px] rounded-full bg-indigo-400 flex items-center justify-center'>
                <p className={'text-4xl text-indigo-50 '+fugaz.className}>{user.firstName[0]}{user.lastName[0]}</p>
            </div>
        )
    }
}

export default function Avatar(props) {

  const {user} = props

  return (
    renderAvatar(user)
  )
}
