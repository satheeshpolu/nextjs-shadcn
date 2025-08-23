"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar24 } from "../components/Calendar24";
import TitleHighlight from "../components/TitleHighlight";

export default function ContactPage() {
  return (
    <main className="h-screen relative">
      {/* Background with Diagonal Split - White and Yellow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-yellow-400 clip-path-diagonal"></div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12">
        <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-6">
          <CardHeader>
            <TitleHighlight
              title="Contact Us"
              fromGradient="from-white-300"
              viaGradient="via-yellow-300"
              toGradient="to-white-300"
            />
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Calendar24 />
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full rounded-xl">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
