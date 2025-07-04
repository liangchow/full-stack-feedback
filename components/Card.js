'use client'
import React from 'react'

export default function Card(props) {

    const { children, handleDeleteTodo, index, demo } = props

    return (
        <li className='max-w-[800px] w-full mx-auto flex justify-between rounded-3xl p-3 border-2 border-solid border-indigo-300 '>
            {children}
            <div className={'flex p-2 gap-2 ' + (demo ? ' invisible' : '')}>
                {/* Hide button */}
                <button onClick={() => handleDeleteTodo(index)}><i className="fa-solid fa-eye-slash  text-indigo-600 hover:text-indigo-400"></i></button>
                {/* Edit button */}
                <button onClick={() => handleEditTodo(index)}><i className="fa-solid fa-pen-to-square text-indigo-600 hover:text-indigo-400"></i></button>
            </div>
        </li>
    )
}
