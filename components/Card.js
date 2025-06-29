import React from 'react'

export default function Card(props) {

    const { children, handleDeleteTodo, index } = props

    return (
        <li className=''>
            {children}
            <div className=''>
                {/* Edit button */}
                <button onClick={() => handleEditTodo(index)}><i className="fa-solid fa-pen-to-square"></i></button>

                {/* Delete button */}
                <button onClick={() => handleDeleteTodo(index)}><i className="fa-solid fa-trash"></i></button>
                    
            </div>
        </li>
    )
}
