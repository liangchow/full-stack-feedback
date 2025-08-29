import { Fugaz_One} from "next/font/google";
import React from 'react'
import CallToAction from "./CallToAction";
import Display from "./Display";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Hero() {

  return (
    <div className="flex flex-col py-4 md:py-8 gap-8 sm:gap-10">
      <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}><span className="textGradient">Feedback</span> tracks your 
        <span className="textGradient"> feedback</span> from others!</h1>
      <p className="max-w-[500px] w-full mx-auto text-lg sm:text-xl md:text-2xl text-center">Your feedback, your <span className="font-semibold">superpowers!</span></p>

      <div className="flex flex-col p-2 gap-8 sm:p-4 md:p-8 ">
        <CallToAction />
        <Display />
      </div>
    </div>
  )
}
