import React from 'react'
import Card from './Card'

export default function CardList({ todos, handleToggleStatus, readOnly = false }) {
  
  // Filter to only show todos with status = true for public view
  const visibleTodos = readOnly ? todos.filter(todo => todo.status === true) : todos

  if (visibleTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {readOnly ? 'No feedback to show yet' : 'No feedback yet'}
          </h3>
          <p className="text-gray-500">
            {readOnly 
              ? 'Be the first to share your feedback!' 
              : 'Your feedback will appear here once colleagues start sharing their thoughts.'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      {visibleTodos.map((todo, index) => (
        <Card 
          key={todo.id || index} 
          todo={todo} 
          index={index}
          handleToggleStatus={readOnly ? null : handleToggleStatus}
          readOnly={readOnly}
        />
      ))}
    </div>
  )
}