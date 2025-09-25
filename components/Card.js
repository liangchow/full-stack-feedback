'use client'
import React from 'react'

export default function Card(props) {

    const { todo, index, handleToggleStatus, readOnly=false, demo=false } = props

    // Get initials for avatar if no image is provided
    const getInitials = (firstName, lastName) => {
      return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
    }

    // Card content
    const cardContent = (
        <>
          <div className={'flex w-full items-center gap-1 text-indigo-600 '}>
            <div className="flex ml-1 w-15">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center text-white font-semibold text-lg">
                {todo.src ? (
                  <img 
                    src={todo.src} 
                    alt={`${todo.firstName} ${todo.lastName}`}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span style={{ display: todo.src ? 'none' : 'flex' }}>
                  {getInitials(todo.firstName, todo.lastName)}
                </span>
              </div>
            </div>

            <div className="flex flex-col ml-1 w-full">
                <div className={`${!todo.status && !readOnly ? 'opacity-50' : ''}`}>
                  <h3 className="font-semibold text-gray-900 text-lg">{todo.firstName} {todo.lastName}</h3>
                  <p className="text-gray-700 leading-relaxed mb-0.5">{todo.comment}</p>
                </div>
            </div>

            <div className='flex p-1 ml-1 text-nowrap text-gray-900 '>⭐ {todo.rating}/5</div>
          </div>
        </>
      )

    // If demo, only return {chidlren}. No status toggle button.
    if (demo) {
        return (
            <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300">
                {cardContent}
            </li>  
        )
    }

    // Return Card with {chidlren} and the status toggle button.
    return (
        <li className="max-w-[1000px] w-full mx-auto flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded-3xl border-2 border-solid border-indigo-300"> 
            {cardContent}
            {!readOnly && handleToggleStatus && (
            <div className='flex flex-col items-center p-2 gap-2'>
              <button onClick={() => handleToggleStatus(todo)}>
                <i className={"text-indigo-600 hover:text-indigo-400 cursor-pointer transition " + (todo.status == false ? " fa-solid fa-eye-slash" : " fa-solid fa-eye")}></i>
              </button>
            </div>
      )}
        </li>
    )

}