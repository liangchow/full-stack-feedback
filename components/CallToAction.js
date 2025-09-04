'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {
    const {currentUser} = useAuth()

    // If user is logged in, display Return to Dashboard button.
    if (currentUser){
        return(
            <div className='mx-w-[600px] mx-auto w-full'>
                <Link href={'/dashboard'}>
            <Button full text='Return to Dashboard' />
        </Link>
            </div>
        )
    }

    // Otherwise, show Sign Up and Login buttons.
  return (
    <div className='grid grid-cols-2 gap-4 p-2 w-fit mx-auto'>
        <Link href={'/dashboard'}>
            <Button glow text='Sign Up' />
        </Link>
        <Link href={'/dashboard'}>
            <Button text='Login' />
        </Link>
    </div>
  )
}