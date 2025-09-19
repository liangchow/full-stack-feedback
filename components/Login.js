'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Login({ isRegister: initialIsRegister = false }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(initialIsRegister)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const {login, signup} = useAuth()

  // Define signup and login criteria
  const cantAuth =  !email.includes('@') || password.length < 6

  async function handleSubmit(){
    // Check if email is legit and password is acceptable
    if (cantAuth){
      return
    }
    setIsAuthenticating(true)

    try {
      if (isRegister){
        // If not registered (default to false), then we need to register a user
        console.log('Signing up a new user')
        await signup(email, password, firstName, lastName)
      } else {
        // If registered, send them to login
        console.log('Logging in an user')
        await login(email, password)
      }

    } catch(err) {
      console.log(err) 
    } finally {
      setIsAuthenticating(false)
    }
  }


  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+fugaz.className}>{isRegister ? 'Create An Account' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>

      <div className={isRegister ? 'grid grid-cols-2 gap-4 max-w-[400px] ' : " visibility: hidden"}>
        <input className='w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
          value={firstName} onChange={(e) => {setFirstName(e.target.value)}} placeholder="First Name" type="text" />
        <input className='w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
          value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder="Last Name" type="text" />
      </div>
      

      <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
        value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" type="text" />
      <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
        value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" type="password" />
      
      <div className='max-w-[400px] w-full mx-auto'>
        <Button full clickHandler={handleSubmit} disabled={cantAuth || isAuthenticating} text={isAuthenticating ? 'Submiting...' : 'Submit'}/>
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} 
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600 cursor-pointer '>{isRegister ? 'Log In' : 'Sign Up'}</button>
      </p>
    </div>
  )
}
