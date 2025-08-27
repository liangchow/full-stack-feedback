import React from 'react'
import Card from './Card'
import Image from 'next/image'

export default function CardList(props) {
  
  const { todos } = props
  
  function headshot(peer){
      return (
        <div className='size-[40px] rounded-full bg-indigo-500 inline-flex items-center justify-center '>
            <p className={'text-base text-indigo-50 uppercase '}>{peer.firstName[0]}{peer.lastName[0]}</p>
        </div>
      )
    }
  

  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.length == 0 ? <p className='text-indigo-600 text-center'>You have 0 feedback. Send request to your peer!</p> : todos.map((todo, todoIndex) => {
            return(
                <Card {...props} key={todoIndex} index={todoIndex} >
                  <div className={'flex w-full justify-between items-center gap-1 text-indigo-600 ' + (todo.status == true ? '' : 'opacity-50')}>
                    <div className='flex ml-1 w-15'>
                      {headshot(todo)}
                    </div>
                    <div className='flex flex-col ml-1 w-full'>     
                      <span className='text-lg sm:text-xl text-indigo-700 font-semibold capitalize '>{todo.firstName} {todo.lastName}</span>
                      <span className='text-base sm:text-lg capitalize '>{todo.comment}</span>
                    </div>
                    <div className='flex p-2 ml-1 text-nowrap '>⭐ {todo.rating}/5</div>
                  </div>
                </Card>
            )
        })}
    </ul>
  )
}
