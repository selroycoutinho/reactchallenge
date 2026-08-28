'use client'

import { useState } from 'react'

export default function PostActions() {
  const [liked, setLiked] = useState(false)

  return (
    <section>
      <button
        type="button"
        onClick={() => setLiked((current) => !current)}
      >
        {liked ? 'Unlike Post' : 'Like Post'}
      </button>

      <p>
        {liked ? 'You liked this post.' : 'You have not liked this post yet.'}
      </p>
    </section>
  )
}