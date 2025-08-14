import Link from "next/link";
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const post = await getPost(slug)

  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const posts = await res.json();

  return (
    <div>
      {posts.map((post) => (
        <h3>
          <Link href={`/blog/${post.id}`}>
            {post.id} - {post.title}
          </Link>
        </h3>
      ))}
    </div>
  );
}
