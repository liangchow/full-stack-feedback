'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { auth, db, functions } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { query, collection, where, getDocs, doc, getDoc, setDoc, orderBy} from 'firebase/firestore'
import { httpsCallable } from "firebase/functions"

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
    async function signup(email, password, firstName, lastName){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                lastName: lastName,
                src: "",
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return userCredential 
        } catch(err){
            console.log(err)
            throw err
        }
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        // Clear user data on logout
        setUserDataObj(null)
        setCurretUser(null)
        setUserFeedbackData(null)
        return signOut(auth)
    }

    function resetPasswordEmail(email){
        return sendPasswordResetEmail(auth, email)
    }

    async function generateShareLinkForTodos(){
        if (!currentUser){
            throw new Error("User must be authenticated to generate a share link")
        }

        try {
            // Generate a unique token using timestamp and user ID
            const timestamp = Date.now()
            const randomSuffix = Math.random().toStrong(36).substring(2,15)
            const shareToken = `${currentUser.uid}_${timestamp}_${randomSuffix}`
            
            // Store the share token in Firestore with user's todos data
            const shareDocRef = doc(db, 'sharedTodos', shareToken)
            
            // Get current user's todos
            const q = query(collection(db, "todos"), where("userID", "==", currentUser.uid))
            const querySnapshot = await getDocs(q)
            let todosArr = []
            
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            })
            
            // Store the shared data
            await setDoc(shareDocRef, {
                userID: currentUser.uid,
                todos: todosArr,
                userData: userDataObj,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days expiry
            })
            
            console.log('Share token generated:', shareToken)
            return shareToken
        } catch(err) {
            console.log('Error generating share link:', err)
            throw err
        }
    }

    // Listen to auth state changes. Read user data from firebase.
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

            } catch(err){
                console.log(err)
                setUserDataObj(null)
                setUserFeedbackData(null)
                setCurretUser(null)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    // Function to refetch user feedback data
    async function refetchUserFeedbackData() {
        if (!currentUser) {
            console.log('No current user to refetch data for')
            return
        }

        try {
            console.log('Refetching user feedback data...')
            const q = query(collection(db, "todos"), where("userID", "==", currentUser.uid))
            const querySnapshot = await getDocs(q)
            let todosArr = []

            if (querySnapshot) {
                console.log('Found updated feedback data')
                querySnapshot.forEach((doc) => {
                    todosArr.push({...doc.data(), id: doc.id})
                })
            }
            
            setUserFeedbackData(todosArr)
        } catch(err) {
            console.log('Error refetching user feedback data:', err)
        }
    }

    const value = {
        currentUser,
        userDataObj,
        userFeedbackData,
        loading,
        signup,
        logout,
        login,
        resetPasswordEmail,
        generateShareLinkForTodos,
        refetchUserFeedbackData
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}