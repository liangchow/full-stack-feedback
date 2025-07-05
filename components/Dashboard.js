'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import CardList from './CardList'
import Panel from './Panel'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

// Init name for Panel
let name = "Hello!"

export default function Dashboard() {

  const statuses = {
    num_reviews: 14,
    time_remaining: '13:14:26',
  }

  const [todos, setTodos] = useState([
    {peer: "Joe Doe", comment: "You are awesome!", rating: 5, show: true},
    {peer: "Jane Luwid", comment: "You're the best ;) I have not met people like you. I am wishing you the best in your future endeavors", rating: 5, show: true},
  ])

  const [show, setShow] = useState(true)

  // Toggle show or hide comment button on Card
  function handleToggleShow(){
    setShow(!show)
  }

  return (
    <div className='flex flex-col flex-1 gap-10 sm:gap-14 md:gap-20'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
          <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
            <p className='font-medium capitalize text-base sm:text-lg truncate'>{status.replaceAll('_',' ')}</p>
            <p className={'text-base sm:text-lg truncate '+fugaz.className}>{statuses[status]}{status === 'num_reviews'? ' 🔥': '' }</p>
          </div>
          )})}
      <Panel name={name} />  
      </div>
      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + fugaz.className}>
        What did your colleague <span>say</span> about you?
      </h4>
      <div className=''>
        
        <CardList todos={todos} handleToggleShow={handleToggleShow} show={show} />
      </div>
    </div>
  )
}
