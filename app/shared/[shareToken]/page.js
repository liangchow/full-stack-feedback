// app/shared/[shareToken]/page.js
import SharedFeedbackPage from '@/components/SharedFeedbackPage'

export default function SharedPage({ params }) {
  return <SharedFeedbackPage />
}

// Optional: Add metadata for better SEO
export async function generateMetadata({ params }) {
  return {
    title: 'Shared Feedback - View and Add Feedback',
    description: 'View colleague feedback and add your own thoughts',
    robots: 'noindex, nofollow', // Prevent search engines from indexing shared links
  }
}