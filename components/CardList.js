import React from 'react'
import Card from './Card'
import Image from 'next/image'

export default function CardList(props) {
  
  const { todos } = props
  
  // function headshot(peer){
  //   if (peer.src) {
  //     return (
  //       <Image className='rounded-full border border-solid border-indigo-500 ' src={peer.src} width={40} height={40} style={{objectFit: "contain"}} alt="pp" />
  //   )} else {
  //     return (
  //       <div className='size-[40px] rounded-full bg-indigo-500 inline-flex items-center justify-center'>
  //           <p className={'text-base text-indigo-50 '}>{peer.firstName[0]}{peer.lastName[0]}</p>
  //       </div>
  //     )
  //   }
  // }


  return (
    <ul className='flex flex-col flex-1 gap-1 p-4'>
        {todos.map((todo, todoIndex) => {
            return (
              <Card {...props} key={todoIndex} index={todoIndex} />
            )

            // return(
            //     <Card {...props} key={todoIndex} index={todoIndex} >
            //       <div className='flex w-full justify-between items-center gap-1 text-indigo-600 '>
            //         <div className='flex ml-2'>
            //           {headshot(todo)}     
            //           <p className='flex flex-col p-2 font-medium '>{todo.firstName} {todo.lastName}:</p>
            //         </div>
            //         <p className='flex flex-col p-2 '>{todo.comment}</p>
            //         <p className='flex flex-col p-2 text-nowrap'>⭐ {todo.rating}/5</p>
            //       </div>
            //     </Card>
            // )
        })}
    </ul>
  )
}
