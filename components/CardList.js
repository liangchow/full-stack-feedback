import React from 'react'
import Card from './Card'
import Image from 'next/image'

export default function CardList(props) {
  
  const { todos } = props
  
  function headshot(peer){
    if (peer.src) {
      return (
        <Image className='rounded-full border border-solid border-indigo-500 ' src={peer.src} size={50} style={{objectFit: "contain"}} alt="pp" />
    )} else {
      return (
        <div className='size-[50px] rounded-full bg-indigo-500 flex items-center justify-center'>
            <p className={'text-base text-indigo-50 '}>{peer.firstName[0]}{peer.lastName[0]}</p>
        </div>
      )
    }
  }


  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className='flex w-full justify-between items-center gap-1 text-indigo-600 '>
                    <div>
                      {headshot(todo)}     
                      <p className='flex p-2 '>{todo.firstName} {todo.lastName}:</p>
                    </div>
                    <p className='flex p-2 '>{todo.comment}</p>
                    <p className='flex p-2 text-nowrap'>⭐ {todo.rating}/5</p>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
