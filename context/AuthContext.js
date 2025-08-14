'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import {query, collection, where, addDoc, getDocs, doc, getDoc, updateDoc} from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props){

    const { children } = props

    const [currentUser, setCurretUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [userFeedbackData, setUserFeedbackData] = useState(null)
    const [loading, setLoading] = useState(true)

    // Auth Handlers
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserDataObj(null)
        setCurretUser(null)
        return signOut(auth)
    }

    function resetPasswordEmail(email){
        return sendPasswordResetEmail(auth, email)
    }

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            
            console.log('Authenticating user...')
    
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurretUser(user)

                // Guard clause: If no user exists, return 'No user found'
                if (!user){
                    throw error('No user found')
                }
                // If user exists, fetch data from firebase db
                console.log('Fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let userData = {}
                if (docSnap.exists()){
                    console.log('Found user data')
                    userData = docSnap.data()
                    console.log(userData)
                }
                setUserDataObj(userData)

                // Fetch user feedback data
                const q = query(collection(db, "todos"), where("userID", "==", user.uid))
                const querySnapshot = await getDocs(q)
                let todosArr = []

                if (querySnapshot){
                console.log('Found feedback data')
                querySnapshot.forEach((doc) => {
                    todosArr.push({...doc.data(), id: doc.id})
                })}
                
                setUserFeedbackData(todosArr)
                console.log(userFeedbackData)

            } catch(err){
                console.log(err)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        userFeedbackData,
        loading,
        signup,
        logout,
        login,
        resetPasswordEmail
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}