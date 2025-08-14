import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeftIcon, CircleCheck, CircleX } from "lucide-react";
import BackButton from "../../components/BackButton";
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const post = await getPost(slug)
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);
  const postInfo = await res.json();

  return (
    <div>
      <Card style={{ width: "30%" }}>
        <CardHeader>
          <CardTitle className="text-lg">User {postInfo.id}</CardTitle>
          <CardDescription>{postInfo.body}</CardDescription>
          <CardAction >
            Status {" "}
            {postInfo.completed ? (
              <CircleCheck style={{ color: "green" }} />
            ) : (
              <CircleX style={{ color: "red" }} />
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>{postInfo.title}</p>
        </CardContent>
        <CardFooter>
          <BackButton />
        </CardFooter>
      </Card>
    </div>
  );
}
