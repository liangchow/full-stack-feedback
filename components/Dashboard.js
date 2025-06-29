'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import CardList from './CardList'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Dashboard() {

  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
  }

  const [todos, setTodos] = useState({
    1 : {comment: "You are awesome!", rating: 5},
    2 : {comment: "You're the best ;)", rating: 4},
  })

  return (
    <div className='flex flex-col flex-1 gap-10 sm:gap-14 md:gap-20'>
      <div className='grid grid-cols-1 sm:grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="p-4 flex flex-col gap-1 sm:gap-2">
              <p className="font-medium uppercase text-xs sm:text-sm">
                {status.replaceAll('_', '')}</p>
              <p className={'text-base sm:text-lg ' + fugaz.className}>
                {statuses[status]}</p>
            </div>)
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + fugaz.className}>
        How do you <span>feel</span> today?
      </h4>
      <CardList />
    </div>
  )
}
