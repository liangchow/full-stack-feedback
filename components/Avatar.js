import React from 'react'
import Image from 'next/image'


function renderAvatar(src, name){
    if (src && typeof src === 'string'){
        return (
            <div>
                <Image className='rounded-full shadow-lg shadow-indigo-500/50' src={src} width={100} height={100} alt="pp" />
            </div>
        )
    } else if (name) {
        return (
            <div className=''>
                <Image className='rounded-full shadow-lg' src="/blue-profile-icon.png" width={100} height={100} alt="pp" />
            </div>
        )
    }
}

export default function Avatar(props) {

  const {src, name} = props

  return (
    renderAvatar(src, name)
  )
}
