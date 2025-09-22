'use client'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Fugaz_One } from 'next/font/google'
import CardList from '@/components/CardList'
import Panel from '@/components/Panel'
import Loading from '@/components/Loading'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function SharedTodosPage({ params }) {
  const [sharedData, setSharedData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSharedData() {
      try {
        const token = params.token
        const shareDocRef = doc(db, 'sharedTodos', token)
        const shareDoc = await getDoc(shareDocRef)
        
        if (!shareDoc.exists()) {
          setError('Shared link not found or has expired')
          return
        }
        
        const data = shareDoc.data()
        
        // Check if link has expired
        const now = new Date()
        const expiresAt = data.expiresAt.toDate()
        
        if (now > expiresAt) {
          setError('This shared link has expired')
          return
        }
        
        setSharedData(data)
      } catch (err) {
        console.error('Error fetching shared data:', err)
        setError('Failed to load shared feedback')
      } finally {
        setLoading(false)
      }
    }
    
    fetchSharedData()
  }, [params.token])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className={'text-4xl text-red-500 ' + fugaz.className}>Error</h1>
        <p className="text-lg text-gray-600">{error}</p>
      </div>
    )
  }

  if (!sharedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className={'text-4xl text-gray-500 ' + fugaz.className}>No Data Found</h1>
      </div>
    )
  }

  // Calculate stats for the shared data
  function countValues(todos) {
    let sumOfRating = todos.filter(todo => todo.status == true).map(todo => todo.rating).reduce((sumOfRating, rating) => sumOfRating + rating, 0)
    let numReviews = todos.filter(todo => todo.status == true).length

    return {
      num_reviews: numReviews,
      average_rating: numReviews > 0 ? (sumOfRating / numReviews).toFixed(1) : '0.0',
    }
  }

  const stats = countValues(sharedData.todos || [])

  return (
    <div className="flex flex-col flex-1 gap-10 sm:gap-14 md:gap-20 p-4 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className={'text-4xl sm:text-5xl md:text-6xl mb-4 ' + fugaz.className}>
          {sharedData.userData?.firstName}'s Feedback
        </h1>
        <p className="text-lg text-gray-600">Shared feedback dashboard (Read-only)</p>
      </div>
      
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(stats).map((stat, statIndex) => {
          return (
            <div key={statIndex} className='flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-base sm:text-lg truncate'>{stat.replaceAll('_', ' ')}</p>
              <p className={'text-lg sm:text-xl truncate ' + fugaz.className}>
                {stat === 'average_rating' ? '⭐ ' : ''}{stats[stat]}{stat === 'num_reviews' ? ' 🔥' : ''}
              </p>
            </div>
          )
        })}
        <Panel user={sharedData.userData} />
      </div>
      
      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + fugaz.className}>
        What did colleagues <span>say</span> about {sharedData.userData?.firstName}?
      </h4>
      
      <div className=''>
        <CardList readOnly todos={sharedData.todos || []} />
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        <p>This is a read-only view of shared feedback.</p>
        <p>Created on {sharedData.createdAt?.toDate().toLocaleDateString()}</p>
      </div>
    </div>
  )
}