import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  // const post = await getPost(slug)

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      {posts.map((post: {id: number, title: string}) => (
        <Card
          key={post.id}
          className="hover:bg-secondary transition-colors duration-200 flex flex-col gap-2 w-[30%] mb-4"
        >
          <CardHeader>
            <CardTitle>
              {post.id} - {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link href={`/blog/${post.id}`}>
              <Button variant="outline">
                Read More <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
