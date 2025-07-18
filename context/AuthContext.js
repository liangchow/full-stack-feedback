'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider(props){

    const { children } = props

    const [currentUser, setCurretUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState({})
    const [loading, setLoading] = useState(true)

    // Auth Handlers
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserDataObj({})
        setCurretUser(null)
        return signOut(auth)
    }

    function resetPasswordEmail(email){
        return sendPasswordResetEmail(auth, email)
    }

    // Listen to auth state changes
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async user => {
    
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurretUser(user)

                // if no user exists, return
                if (!user){
                    console.log('No user found')
                    return
                }
                // If user exists, fetch data from firebase db
                console.log('Fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()){
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }
                setUserDataObj(firebaseData)

            } catch(err){
                console.log(err.message)
            } finally {
                setLoading(false)
            }

        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
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