import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TitleHighlight from "../components/TitleHighlight";

export default function AboutPage() {
  return (
    <main className="h-screen w-full relative">
      {/* Background with Gray and Teal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-100 to-teal-10 clip-path-circle">
        {/* Clip-path diagonal split */}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <Card className="rounded-2xl shadow-lg max-w-2xl w-full backdrop-blur-sm bg-white/0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-gray-700 leading-relaxed">
              Welcome to our website! We’re passionate about crafting exceptional
              digital experiences using Next.js, TailwindCSS, and modern frontend
              tools. Our goal is to make the web faster, prettier, and more
              enjoyable.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
