type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const { id } = params

  return (
    <main>
      <h1>Post {id}</h1>
      <p>This page is for post ID: {id}</p>
    </main>
  )
}