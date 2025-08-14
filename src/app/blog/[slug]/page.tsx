export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // const post = await getPost(slug)
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${slug}`);
  const postInfo = await res.json();
 
  return (
    <div>
      <h1>User: {postInfo.userId}</h1>
      <h1>Title: {postInfo.title}</h1>
      <h1>Status: {postInfo.completed}</h1>
    </div>
  )
}