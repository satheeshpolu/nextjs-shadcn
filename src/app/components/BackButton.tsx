"use client"; // must be the first line
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  const back = () => router.back();

  return (
    <Button variant="destructive" onClick={back}>
      <ChevronLeftIcon /> Back
    </Button>
  );
}
