import React from 'react'
import Image from 'next/image'


function renderAvatar(src, firstName, lastName){
    if (src && typeof src === 'string'){
        return (
            <div>
                <Image className='rounded-full shadow-lg shadow-indigo-500/50' src={src} width={100} height={100} style={{objectFit: "contain"}} alt="pp" />
            </div>
        )
    } else if (firstName || lastName) {
        return (
            <div className='size-[100px] rounded-full bg-indigo-400 flex items-center justify-center'>
                <p className='w-fit text-3xl text-indigo-50 '>{firstName[0]}{lastName[0]}</p>
            </div>
        )
    }
}

export default function Avatar(props) {

  const {src, firstName, lastName} = props

  return (
    renderAvatar(src, firstName, lastName)
  )
}
