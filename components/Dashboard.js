'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CardList from './CardList'
import Panel from './Panel'
import Login from './Login'
import Loading from './Loading'
import { useAuth } from '@/context/AuthContext'
import {db} from '@/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import Button from './Button'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Dashboard() {

  // Auth
  const {currentUser, userDataObj, userFeedbackData, loading, generateShareLinkForTodos, refetchUserFeedbackData } = useAuth()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const [data, setData] = useState({})
  const [shareLink, setShareLink] = useState('')
  const [linkGenerating, setLinkGenerating] = useState(false)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  // States
  const [todos, setTodos] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)
  const [status, setStatus] = useState(true)

  useEffect(() => {
    if (!currentUser || !userDataObj){
      return
    }
    setData(userDataObj)
    
    if (userFeedbackData) {
      setTodos(userFeedbackData)
    }

    }, [currentUser, userDataObj, userFeedbackData])

    if (loading){
      return <Loading />
    }

    if (!currentUser){
      return <Login isRegister={mode === 'signup'} />
  }

  // States
  function countValues(todos){
    let sumOfRating = todos.filter(todo => todo.status == true).map(todo => todo.rating).reduce((sumOfRating,rating) => sumOfRating + rating, 0)
    let numReviews = todos.filter(todo => todo.status == true).length

    return {
      num_reviews: numReviews,
      average_rating: numReviews > 0 ? (sumOfRating/numReviews).toFixed(1) : '0.0',
    }
  }

  const stats = {
      ...countValues(todos)
  }

  // Toggle show or hide comment button on Card. Update todo.status in firebase.
  async function handleToggleStatus(todo){
    try {
      const todoRef = doc(db, "todos", todo.id)
      await updateDoc(todoRef, {
        status: !todo.status
      })

    const updatedTodos = todos.map(item => {
      if (item.id === todo.id){
        return {...item, status: !item.status}
      }
      return item
    })
    setTodos(updatedTodos)
    await refetchUserFeedbackData()
  } catch(err) {
    console.log(err)
  }}  

  // handleGenerateShareLink
  async function handleGenerateShareLink() {
    console.log("Share button clicked!")
    setLinkGenerating(true)
    setShareLinkCopied(false)
    try {
      console.log("Calling generateShareLinkForTodos...")
      const shareToken = await generateShareLinkForTodos()
      console.log("Share token received:", shareToken)
      const generatedLink = `${window.location.origin}/shared/${shareToken}`
      console.log("Generated link:", generatedLink)
      setShareLink(generatedLink)
      console.log("Share link set successfully!")
    } catch (err) {
      console.error("Error generating share link:", err)
      alert(`Failed to generate share link: ${err.message || 'An unknown error occurred.'}`)
    } finally {
      setLinkGenerating(false)
    }
  }

  // Copy link to clipboard
  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareLink)
      setShareLinkCopied(true)
      setTimeout(() => setShareLinkCopied(false), 3000) // Reset after 3 seconds
    } catch (err) {
      console.error('Failed to copy link:', err)
      alert('Failed to copy link to clipboard')
    }
  }

  return (
    <div className='flex flex-col flex-1 gap-10 sm:gap-14 md:gap-20'>
      <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4'>
        {Object.keys(stats).map((stat, statIndex) => {
          return (
          <div key={statIndex} className='flex flex-col gap-1 sm:gap-2'>
            <p className='font-medium capitalize text-base sm:text-lg truncate'>{stat.replaceAll('_',' ')}</p>
            <p className={'text-lg sm:text-xl truncate ' + fugaz.className}>{stat === 'average_rating' ? '⭐ ': '' }{stats[stat]}{stat === 'num_reviews' ? ' 🔥': '' }</p>
          </div>
          )})}
      <Panel user={userDataObj} />
      
      {/* Enhanced Share Section */}
      <div className="flex flex-col gap-3">
        <Button  
          onClick={handleGenerateShareLink} 
          disabled={linkGenerating}
          className="w-full"
        >
          {linkGenerating ? 'Generating Link...' : 'Generate Shareable Link'}
        </Button>
        
        {shareLink && (
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-green-800 mb-3">🎉 Your shareable link is ready!</p>
            <div className="flex items-center gap-2 mb-3">
              <input 
                type="text" 
                value={shareLink} 
                readOnly 
                className="flex-1 p-2 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleCopyLink}
                className={`px-4 py-2 text-sm rounded font-medium transition-all ${
                  shareLinkCopied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {shareLinkCopied ? '✓ Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📤 Share this link with colleagues so they can view your feedback and add their own!</p>
              <p className="font-medium text-gray-700">⏰ Link expires in 7 days</p>
            </div>
          </div>
        )}
      </div>
      </div>
      
      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + fugaz.className}>
        What did your colleague <span>say</span> about you?
      </h4>
      
      <div className=''>
        <CardList todos={todos} handleToggleStatus={handleToggleStatus} />
      </div>
    </div>
  )
}