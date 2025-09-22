'use client'
import React from 'react'

export default function Card(props) {

    const { children, handleToggleStatus, todo, demo, readOnly } = props

    // If demo or readOnly, only return {children}. No status toggle button.
    if (demo || readOnly) {
        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
                {children}
            </li>  
        )
    }

    // Return Card with {children} and the status toggle button.
    return (
        <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300"> 
            {children}
            <div className='flex flex-col items-center p-2 gap-2 '>
                <button onClick={() => handleToggleStatus(todo)}><i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition " + (todo.status==false ? " fa-solid fa-eye-slash" : " fa-solid fa-eye")}></i></button>
            </div>
        </li>
    )

}
