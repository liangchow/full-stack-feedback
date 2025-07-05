import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className='flex w-full justify-between gap-0.5 '>
                    <div className='flex'>{todo.peer}:</div>
                    <div className='flex text-left'>{todo.comment}</div>
                    <div className='flex'>{todo.rating}</div>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
