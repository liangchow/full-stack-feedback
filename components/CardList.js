import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos, demo } = props

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex}>
                   <p>{todo}</p> 
                </Card>
            )
        })}
    </ul>
  )
}
