'use client'
import React from 'react'
import Image from 'next/image'

export default function Card(props) {

    const { children, handleToggleShow, index, demo } = props

    if (demo) {
        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
                {children}
            </li>  
        )
    }

        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
                <div className="flex ml-2"> 
                    {/* {headshot(index)} */}
                    <div className="flex flex-col ml-2"> <span className="font-medium text-black">Tamaara Suiale</span> <span className="text-sm text-gray-400 truncate w-32">Are you going to business trip next week</span> </div>
                </div>
                <div className='flex flex-col items-center p-2 gap-2 '>
                     {/* Show and NoShow button */}
                    <button onClick={() => handleToggleShow(index)}><i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition " + (" fa-solid fa-eye-slash")}></i></button>
                </div>
            </li>
        )

        // https://bbbootstrap.com/snippets/tailwind-css-chat-list-template-search-75579288
        // return (
        //     <li className='max-w-[1000px] w-full mx-auto flex justify-between items-center rounded-3xl mt-2 p-2 border-2 border-solid border-indigo-300 '>
        //         {children}
        //         <div className='flex p-2 gap-2 '>
        //             {/* Show and NoShow button */}
        //             <button onClick={() => handleToggleShow(index)}><i className={"text-indigo-600 hover:text-indigo-400 " + (" fa-solid fa-eye-slash")}></i></button>
        //         </div>
        //     </li>
        // )
}
