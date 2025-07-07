import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
  const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className='flex w-full justify-between items-center gap-1 text-indigo-600 '>
                    <p className='flex p-2 text-nowrap '>{todo.firstName} {todo.lastName}:</p>
                    <p className='flex p-2 '>{todo.comment}</p>
                    <p className='flex p-2 '>{todo.rating}</p>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
