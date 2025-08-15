import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites built with Next.js, TailwindCSS, and modern tools.",
  },
  {
    title: "UI/UX Design",
    description:
      "Beautiful, user-focused designs for web and mobile applications.",
  },
  {
    title: "SEO Optimization",
    description:
      "Improve your search rankings and reach more customers online.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative h-screen">
      {/* Background with Curved Wave Shape */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-wheat clip-path-wave"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-center text-white">Our Services</h1>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
