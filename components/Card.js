'use client'
import React from 'react'
import Image from 'next/image'

export default function Card(props) {

    const { children, handleToggleShow, status, index, demo } = props

    if (demo) {
        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
                {children}
            </li>  
        )
    }

        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300"> 
                {children}
                <div className='flex flex-col items-center p-2 gap-2 '>
                     {/* Show and NoShow button */}
                    <button onClick={() => handleToggleStatus(index)}><i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition " + (status == true ? "fa-solid fa-eye-slash" : "fa-solid fa-eye")}></i></button>
                </div>
            </li>
        )

}
