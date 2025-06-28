import { Fugaz_One} from "next/font/google";
import React from 'react'
import Button from "./Button";
import CardList from "./CardList";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function Hero() {
  return (
    <div className="flex flex-col py-4 md:py-10 gap-4 sm:gap-8">
      <h1 className={"text-4xl sm:text-5xl md:text-6xl text-center " + fugaz.className}><span className="textGradient">Feedback</span> helps you track your 
        <span className="textGradient"> daily</span> mood!</h1>
      <p className="max-w-[600px] w-full mx-auto text-lg sm:text-xl md:text-2xl text-center">Create your mood record and see how you feel <span className="font-semibold">every day.</span></p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button text="Sign Up" />
        <Button text="Login" />
      </div>
      <CardList />
    </div>
  )
}
