"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { Calendar24 } from "../components/Calendar24";
import TitleHighlight from "../components/TitleHighlight";
import { useState } from "react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.msg.trim()) {
      newErrors.msg = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed ❌", errors);
      return;
    }
    setFormSubmitted(true);
    console.log("Form submitted ✅", formData);
  };

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
            {!formSubmitted && (
              <form className="space-y-4" onSubmit={submitForm}>
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Textarea
                    name="msg"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.msg}
                    onChange={handleChange}
                  />
                  {errors.msg && (
                    <p className="text-red-400 text-sm mt-1">{errors.msg}</p>
                  )}
                </div>

                <Button type="submit" className="w-full rounded-xl">
                  Send Message
                </Button>
              </form>
            )}

            {formSubmitted && (
              <>
                
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
                  <h2 className="font-bold mb-2 text-center">Form is Submitted{" "}</h2>
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Message:</strong> {formData.msg}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
