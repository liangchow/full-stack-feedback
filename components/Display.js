'use client'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { demoData } from "@/utils";
import CardList from "./CardList";
import Panel from "./Panel";

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

export default function Display() {
    
    const {currentUser, userDataObj, userFeedbackData} = useAuth()

    if (currentUser){
      const stats = {...countValues(userFeedbackData)}
    }

    return (
        <>
            <Panel demo stats={stats} user={currentUser ? userDataObj: demoUser} />
            <CardList demo todos={currentUser ? userFeedbackData: demoData} />
        </>
    )
}
