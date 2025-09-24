import React from 'react'

export default function Card({ todo, index, handleToggleStatus, readOnly = false }) {
  
  // Render stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ⭐
      </span>
    ))
  }

  // Get initials for avatar if no image is provided
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    
    let date
    if (timestamp.seconds) {
      // Firestore timestamp
      date = new Date(timestamp.seconds * 1000)
    } else if (timestamp.toDate) {
      // Firestore timestamp object
      date = timestamp.toDate()
    } else {
      // Regular date
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 ${
      readOnly ? '' : 'hover:border-indigo-300'
    }`}>
      
      {/* Header with user info and toggle */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {todo.src ? (
              <img 
                src={todo.src} 
                alt={`${todo.firstName} ${todo.lastName}`}
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <span style={{ display: todo.src ? 'none' : 'flex' }}>
              {getInitials(todo.firstName, todo.lastName)}
            </span>
          </div>
          
          {/* Name and rating */}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">
              {todo.firstName} {todo.lastName}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(todo.rating)}
              <span className="text-sm text-gray-600 ml-2">
                ({todo.rating}/5)
              </span>
            </div>
          </div>
        </div>

        {/* Toggle button - only show for non-readonly mode */}
        {!readOnly && handleToggleStatus && (
          <button
            onClick={() => handleToggleStatus(todo)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              todo.status
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {todo.status ? 'Visible' : 'Hidden'}
          </button>
        )}
      </div>

      {/* Comment content - only show if status is true or if it's the owner viewing */}
      {(todo.status || !readOnly) && (
        <div className={`${!todo.status && !readOnly ? 'opacity-50' : ''}`}>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">
              "{todo.comment}"
            </p>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              {todo.addedViaShare && (
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  📤 Added via share link
                </span>
              )}
              {todo.createdAt && (
                <span className="text-gray-500">
                  📅 {formatDate(todo.createdAt)}
                </span>
              )}
            </div>
            
            {!readOnly && (
              <span className={`font-medium ${
                todo.status ? 'text-green-600' : 'text-gray-400'
              }`}>
                {todo.status ? '👁️ Public' : '🙈 Hidden'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Hidden state message for owners */}
      {!todo.status && !readOnly && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-3xl mb-2">🙈</div>
          <p className="font-medium">This feedback is hidden from public view</p>
          <p className="text-sm">Click "Hidden" above to make it visible</p>
        </div>
      )}
    </div>
  )
}