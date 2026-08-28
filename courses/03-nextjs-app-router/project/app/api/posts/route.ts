type Post = {
  id: number
  title: string
  body: string
}

const posts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the first post.',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second post.',
  },
  {
    id: 3,
    title: 'Third Post',
    body: 'This is the third post.',
  },
]

export async function GET() {
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body: Omit<Post, 'id'> = await request.json()

  const newPost: Post = {
    id: posts.length + 1,
    title: body.title,
    body: body.body,
  }

  posts.push(newPost)

  return Response.json(newPost, { status: 201 })
}