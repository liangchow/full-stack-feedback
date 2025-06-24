import { Open_Sans } from "next/font/google";
import React from 'react'

const opensans = Open_Sans({subsets: ["latin"]})

export default function Hero() {
  return (
    <div className="flex flex-col py-4 md:py-10 gap-4 sm:gap-8">
      <h1 className={"text-4xl sm:text-5xl md:text-6xl text-center " + opensans.className}><span className="textGradient">Feedback</span> helps you track your 
        <span className="textGradient"> daily</span> mood!</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center">Create your mood record and see how you feel <span className="font-medium">every day.</span></p>
    </div>
  )
}
