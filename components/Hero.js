import { Fugaz_One} from "next/font/google";
import { demoData } from "@/utils";
import React from 'react'
import Button from "./Button";
import CardList from "./CardList";
import Panel from "./Panel";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

// Init name for Panel
const demoUser = {firstName: "Liang", lastName: "Chow", src: "https://liangchow.github.io/assets/img/profile/lchow.jpg"}

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
    ...countValues(demoData)
}

export default function Hero() {
  return (
    <div className="flex flex-col py-4 md:py-8 gap-8 sm:gap-10">
      <h1 className={"text-5xl sm:text-6xl md:text-7xl text-center " + fugaz.className}><span className="textGradient">Feedback</span> tracks your 
        <span className="textGradient"> feedback</span> from others!</h1>
      <p className="max-w-[500px] w-full mx-auto text-lg sm:text-xl md:text-2xl text-center">Your feedback, your <span className="font-semibold">superpowers!</span></p>

      <div className="flex flex-col p-2 gap-8 sm:p-4 md:p-8 ">
        {/* Demo data */}
        <CallToAction />
        <Panel demo stats={stats} user={demoUser} />
        <CardList demo todos={demoData} />
      </div>
    </div>
  )
}
