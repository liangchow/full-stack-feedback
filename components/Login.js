'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState } from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
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
        await signup(email, password)
      } else {
        // If registered, send them to login
        console.log('Logging in an user')
        await login(email, password)
      }

    } catch(error) {
      console.log(error.message) 
    } finally {
      setIsAuthenticating(false)
    }
  }


  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl '+fugaz.className}>{isRegister ? 'Create An Account' : 'Log In'}</h3>
      <p>You&#39;re one step away!</p>

      <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
        value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" type="text" />
      <input className='max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none ' 
        value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Password" type="password" />
      
      <div className='max-w-[400px] w-full mx-auto'>
        <Button onClick={handleSubmit} disabled={cantAuth || isAuthenticating} text={isAuthenticating ? 'Submiting...' : 'Submit'} full />
      </div>
      <p className='text-center'>
        {isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} 
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600 cursor-pointer '>{isRegister ? 'Log In' : 'Sign Up'}</button>
      </p>
    </div>
  )
}
