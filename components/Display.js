'use client'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { demoData } from "@/utils";
import CardList from "./CardList";
import Panel from "./Panel";

export default function Display(props) {
    
    // Init name for Panel
    const demoUser = {firstName: "Liang", lastName: "Chow", src: "https://liangchow.github.io/assets/img/profile/lchow.jpg"}
    const {currentUser} = useAuth()

    const { stats } = props

    if (currentUser){
        return (
            <p>{currentUser}</p>
        )
    }

        return (
            <>
                <Panel demo stats={stats} user={demoUser} />
                <CardList demo todos={demoData} />
            </>
        )
}
