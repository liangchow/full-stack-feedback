import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                   <div className="px-2 ">{todo.peer}:</div>
                   <div className="px-2 ">{todo.comment}</div> 
                </Card>
            )
        })}
    </ul>
  )
}
