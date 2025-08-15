import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="h-screen w-full relative">
      {/* Background with Diagonal Split */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-900 to-wheat"
        style={{
          clipPath: "circle(50% at 50% 50%)",
        }}
      >
        {/* Unique curved clip-path */}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <Card className="rounded-2xl shadow-lg max-w-2xl w-full backdrop-blur-sm bg-white/50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Home</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to our website! We’re passionate about crafting
              exceptional digital experiences using Next.js, TailwindCSS, and
              modern frontend tools. Our goal is to make the web faster,
              prettier, and more enjoyable.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
