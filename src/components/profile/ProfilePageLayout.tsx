
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface ProfilePageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isProfileCompleted?: boolean;
}

export const ProfilePageLayout = ({
  children,
  title,
  subtitle,
  isProfileCompleted = false
}: ProfilePageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative overflow-hidden bg-white">
          <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 to-primary/5 blur-3xl" />
          
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
              <div className="mb-6 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {isProfileCompleted ? "Account Management" : "Profile Setup"}
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl custom-gradient-text">
                {title}
              </h1>
              
              <p className="text-lg text-gray-600 md:text-xl max-w-3xl mb-8">
                {subtitle}
              </p>
            </div>
            
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
