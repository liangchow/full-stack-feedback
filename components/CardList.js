import React from 'react'
import Card from './Card'

export default function CardList(props) {
    
    const { todos } = props

  return (
    <ul className=''>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                   <p>{todo}</p> 
                </Card>
            )
        })}
    </ul>
  )
}
