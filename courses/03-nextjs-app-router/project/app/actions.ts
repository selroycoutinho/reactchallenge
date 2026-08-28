'use server'

import { revalidatePath } from 'next/cache'

export async function addPost(formData: FormData) {
  const title = formData.get('title')
  const body = formData.get('body')

  if (
    typeof title !== 'string' ||
    typeof body !== 'string' ||
    !title.trim() ||
    !body.trim()
  ) {
    throw new Error('Title and body are required')
  }

  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
      userId: 1,
    }),
  })

  revalidatePath('/posts')
}