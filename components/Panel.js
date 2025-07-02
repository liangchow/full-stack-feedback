import { Fugaz_One} from "next/font/google";
import Image from 'next/image'
import React from 'react'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Panel(props) {

  const { name } = props
  

  return (
    <div className="flex flex-col flex-1 items-center gap-4 p-4">
        <Image className='rounded-full shadow-lg shadow-indigo-500/50' src="https://liangchow.github.io/assets/img/profile/lchow.jpg" width={100} height={100} alt="dp" />
        <h2 className={"text-shadow-lg/10 text-indigo-500 items-center uppercase " + fugaz.className}>{name}</h2>
    </div>
  )
}
