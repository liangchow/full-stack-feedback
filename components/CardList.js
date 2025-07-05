import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className='grid grid-cols-5 gap-4 '>
                    <div className='col-span-1'>{todo.peer}:</div>
                    <div className='col-span-full'>{todo.comment}</div>
                    <div className='col-span-1 justify-items-end'>{todo.rating}</div>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
