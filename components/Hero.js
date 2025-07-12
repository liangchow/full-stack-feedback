import { Fugaz_One} from "next/font/google";
import { demoData } from "@/utils";
import React from 'react'
import Button from "./Button";
import CardList from "./CardList";
import Panel from "./Panel";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

// Init name for Panel
const demoUser = {firstName: "Liang", lastName: "Chow", src: "https://liangchow.github.io/assets/img/profile/lchow.jpg"}


export default function Hero() {
  return (
    <div className="flex flex-col py-4 md:py-8 gap-8 sm:gap-10">
      <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}><span className="textGradient">EndorseMe</span> helps you track your 
        <span className="textGradient"> feedback</span> !</h1>
      <p className="max-w-[500px] w-full mx-auto text-lg sm:text-xl md:text-2xl text-center">Create your mood record and see how you feel <span className="font-semibold">every day.</span></p>
      <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
        <Button glow text="Sign Up" />
        <Button text="Login" />
      </div>
      <div className="flex flex-col p-2 sm:p-4 md:p-8 ">
        {/* Demo data */}
        <Panel user={demoUser} />
        <CardList demo todos={demoData} />
      </div>
    </div>
  )
}
