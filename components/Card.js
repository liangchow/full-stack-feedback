'use client'
import React from 'react'

export default function Card(props) {

    const { children, handleToggleShow, show, index, demo } = props

    return (
        <li className='max-w-[1000px] w-full mx-auto flex justify-between rounded-3xl p-3 border-2 border-solid border-indigo-300 '>
            {children}
            <div className={'flex p-2 gap-2 ' + (demo ? ' invisible' : '')}>
                {/* Show and NoShow button */}
                <button onClick={() => handleToggleShow(index)}><i className={"text-indigo-600 hover:text-indigo-400 " + (show==true ? " fa-solid fa-eye-slash" : " fa-solid fa-eye")}></i></button>
            </div>
        </li>
    )
}
