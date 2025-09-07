'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import CardList from './CardList'
import Panel from './Panel'
import Login from './Login'
import Loading from './Loading'
import { useAuth } from '@/context/AuthContext'
import {db} from '@/firebase'
import { updateDoc, doc } from 'firebase/firestore'
import Button from './Button'


const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

// Init user name for Panel
// const user = {firstName: "Hello", lastName: "World", src: ""}

export default function Dashboard() {

  // Auth
  const {currentUser, userDataObj, userFeedbackData, loading, generateShareLinkForTodos } = useAuth()
  const [data, setData] = useState({})
  const [shareLink, setShareLink] = useState('')
  const [linkGenerating, setLinkGenerating] = useState(false)
  // const [feedbackData, setFeedbackData] = useState({})

  // States
  const [todos, setTodos] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)
  const [status, setStatus] = useState(true) //Check this

  // Fake data
  // const [todos, setTodos] = useState([
  //   {firstName: "Joe", lastName: "Doe", comment: "You are awesome!", rating: 4, status: true, src: "https://liangchow.github.io/assets/img/profile/lchow.jpg"},
  //   {firstName: "Simone", lastName: "Ming", comment: "You're the best ;) I have not met people like you. I am wishing you the best in your future endeavors", rating: 5, status: true, src: ""},
  //   ])

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
      return <Login />
  }

  // States
  function countValues(todos){

    let sumOfRating = todos.filter(todo => todo.status == true).map(todo => todo.rating).reduce((sumOfRating,rating) => sumOfRating + rating, 0)
    let numReviews = todos.filter(todo => todo.status == true).length

    return {
      num_reviews: numReviews,
      average_rating: (sumOfRating/numReviews).toFixed(1),
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
  } catch(err) {
    console.log(err)
  }}  

  // handleGenerateShareLink
  async function handleGenerateShareLink() {
    setLinkGenerating(true); // Start loading state for button
    try {
      // The generateShareLinkForTodos function in AuthContext already handles
      // checking for currentUser. If not authenticated, it will throw an error.
      const shareToken = await generateShareLinkForTodos();
      const generatedLink = `${window.location.origin}/shared/${shareToken}`;
      setShareLink(generatedLink);
    } catch (err) {
      console.error("Error generating share link:", err); // Log the full error
      alert(`Failed to generate share link: ${err.message || 'An unknown error occurred.'}`); // Inform user
    } finally {
      setLinkGenerating(false); // End loading state
    }
  } 

    // function handleToggleStatus(index){
    //   setStatus(!status)
    //   console.log(status)
    //   todos[index].status == status;
    //   console.log(todos[index].status)
    // }



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
      {/* <Button glow text='Preview'/> */}
      <Button dark text='Share' onClick={handleGenerateShareLink} disabled={linkGenerating}>
          {linkGenerating ? 'Generating...' : 'Generate Shareable Link'}
      </Button> 
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
