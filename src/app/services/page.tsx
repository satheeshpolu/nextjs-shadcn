import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TitleHighlight from "../components/TitleHighlight";

const services = [
  {
    title: "UI/UX Design",
    description:
      "Beautiful, user-focused designs for web and mobile applications.",
  },
  {
    title: "Web Development",
    description:
      "Custom websites built with Next.js, TailwindCSS, and modern tools.",
  },
  {
    title: "Mobile Development",
    description:
      "Cross-platform mobile applications for iOS and Android built with React Native for a seamless user experience.",
  },
  {
    title: "Backend Development",
    description:
      "Robust and scalable APIs built with Node.js, Express, and databases like PostgreSQL or MongoDB.",
  },
  {
    title: "DevOps & Cloud",
    description:
      "CI/CD pipelines, containerization with Docker, and cloud deployments on AWS, GCP, or Azure.",
  },
  {
    title: "System Design & Architecture",
    description:
      "High-level architecture design for scalable, secure, and maintainable software systems.",
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
      
        
          <TitleHighlight
              title="Our Services"
              fromGradient="from-emerald-300"
              viaGradient="via-teal-300"
              toGradient="to-cyan-300"
            />
        
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
