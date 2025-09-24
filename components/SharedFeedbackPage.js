'use client'
import { Fugaz_One } from 'next/font/google'
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CardList from '@/components/CardList'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import { db } from '@/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const fugaz = Fugaz_One({subsets: ["latin"], weight: ["400"]})

export default function SharedFeedbackPage() {
  const params = useParams()
  const router = useRouter()
  const { shareToken } = params

  const [loading, setLoading] = useState(true)
  const [sharedData, setSharedData] = useState(null)
  const [todos, setTodos] = useState([])
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  
  // Form states for adding new feedback
  const [showAddForm, setShowAddForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    fetchSharedData()
  }, [shareToken])

  async function fetchSharedData() {
    try {
      setLoading(true)
      const shareDocRef = doc(db, 'sharedTodos', shareToken)
      const shareDocSnap = await getDoc(shareDocRef)

      if (!shareDocSnap.exists()) {
        setError('This shared link is invalid or has expired.')
        return
      }

      const shareData = shareDocSnap.data()
      
      // Check if link has expired
      const now = new Date()
      const expiresAt = shareData.expiresAt.toDate()
      if (now > expiresAt) {
        setError('This shared link has expired.')
        return
      }

      if (!shareData.isActive) {
        setError('This shared link has been deactivated.')
        return
      }

      setSharedData(shareData)
      setTodos(shareData.todos || [])
      setUserData(shareData.userData)
      
    } catch (err) {
      console.error('Error fetching shared data:', err)
      setError('Failed to load shared feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function countValues(todos) {
    const visibleTodos = todos.filter(todo => todo.status === true)
    let sumOfRating = visibleTodos.map(todo => todo.rating).reduce((sum, rating) => sum + rating, 0)
    let numReviews = visibleTodos.length

    return {
      num_reviews: numReviews,
      average_rating: numReviews > 0 ? (sumOfRating / numReviews).toFixed(1) : '0.0',
    }
  }

  async function handleSubmitFeedback(e) {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim() || !comment.trim() || rating === 0) {
      alert('Please fill in all fields and provide a rating.')
      return
    }

    if (!sharedData?.userID) {
      alert('Unable to submit feedback. Invalid share link.')
      return
    }

    setSubmitting(true)
    
    try {
      // Add new feedback to the todos collection using your original structure
      const newTodo = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        comment: comment.trim(),
        rating: rating,
        status: true,
        src: '', // Default empty profile image
        userID: sharedData.userID,
        createdAt: serverTimestamp(),
        addedViaShare: true // Flag to identify feedback added via share link
      }

      await addDoc(collection(db, 'todos'), newTodo)
      
      // Reset form
      setFirstName('')
      setLastName('')
      setComment('')
      setRating(0)
      setHover(null)
      setShowAddForm(false)
      
      // Refresh the shared data to show the new feedback
      await fetchSharedData()
      
      alert('Thank you! Your feedback has been submitted successfully.')
      
    } catch (err) {
      console.error('Error submitting feedback:', err)
      alert('Failed to submit feedback. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="max-w-md">
          <h2 className={`text-3xl mb-4 text-red-600 ${fugaz.className}`}>
            Oops! 😔
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push('/')} className="bg-blue-500 hover:bg-blue-600 text-white">
            Go to Homepage
          </Button>
        </div>
      </div>
    )
  }

  const stats = countValues(todos)

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl mb-4 ${fugaz.className}`}>
              <span className="text-indigo-600">{userData?.firstName}</span>'s Feedback
            </h1>
            <p className="text-lg text-gray-600">
              View feedback and add your own thoughts!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 bg-indigo-50 text-indigo-500 rounded-lg p-6 gap-6 mb-8">
            <div className="text-center">
              <p className="font-medium text-lg mb-2">Number of Reviews</p>
              <p className={`text-2xl ${fugaz.className}`}>
                {stats.num_reviews} 🔥
              </p>
            </div>
            <div className="text-center">
              <p className="font-medium text-lg mb-2">Average Rating</p>
              <p className={`text-2xl ${fugaz.className}`}>
                ⭐ {stats.average_rating}
              </p>
            </div>
          </div>

          {/* Add Feedback Button */}
          <div className="text-center mb-8">
            {!showAddForm ? (
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg"
              >
                ✨ Add Your Feedback
              </Button>
            ) : (
              <Button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3"
              >
                Cancel
              </Button>
            )}
          </div>

          {/* Add Feedback Form */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-2 border-green-200">
              <h3 className={`text-2xl mb-6 text-center text-green-700 ${fugaz.className}`}>
                Share Your Feedback
              </h3>
              
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your first name"
                      maxLength="50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter your last name"
                      maxLength="50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`text-3xl transition-colors ${
                          star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(null)}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600 self-center">
                      {rating > 0 && `${rating}/5`}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback *
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Share your thoughts and feedback..."
                    maxLength="1000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.length}/1000 characters
                  </p>
                </div>

                <div className="flex gap-4 justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Feedback List */}
          <div className="mb-8">
            <h3 className={`text-2xl mb-6 text-center ${fugaz.className}`}>
              What colleagues say about {userData?.firstName}
            </h3>
            
            {todos.filter(todo => todo.status === true).length > 0 ? (
              <CardList 
                todos={todos.filter(todo => todo.status === true)} 
                handleToggleStatus={null} // Visitors can't toggle status
                readOnly={true}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">No feedback to display yet.</p>
                <p className="text-gray-400 text-sm mt-2">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4">
              Want to collect feedback like this?
            </p>
            <Button
              onClick={() => router.push('/')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Create Your Own Feedback Page
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  )
}