import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className='grid grid-cols-3 justify-items-start gap-0.5 '>
                    <div className='col-span-1'>{todo.peer}:</div>
                    <div className='...'>{todo.comment}</div>
                    <div className='col-span-1'>{todo.rating}</div>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
