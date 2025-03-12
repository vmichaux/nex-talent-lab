
import { Outlet, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fromOnboarding = queryParams.get('from') === 'onboarding';
  
  return <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left sidebar with branding and illustration - Hide if coming from onboarding */}
      {!fromOnboarding && (
        <div className="w-full md:w-1/2 bg-gradient-to-br from-primary to-purple-900 text-white p-8 md:p-12 flex flex-col bg-[#ce8aef]/[0.17]">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-1">
              <span className="font-bold text-2xl">NexTalent</span>
              <span className="text-white font-bold text-2xl">Lab</span>
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Connect, Collaborate, Create</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join a community of creative professionals and innovative project builders.
            </p>
            
            {/* Decorative illustration or graphics */}
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">01</span>
                  </div>
                  <div>
                    <p className="font-medium">Create your profile</p>
                    <p className="text-sm opacity-80">Showcase your skills and experience</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">02</span>
                  </div>
                  <div>
                    <p className="font-medium">Find perfect matches</p>
                    <p className="text-sm opacity-80">AI-powered matching for your skills</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">03</span>
                  </div>
                  <div>
                    <p className="font-medium">Collaborate seamlessly</p>
                    <p className="text-sm opacity-80">Work together using built-in tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to homepage</span>
            </Link>
          </div>
        </div>
      )}
      
      {/* Right side with form content - Take full width if coming from onboarding */}
      <div className={`w-full ${!fromOnboarding ? 'md:w-1/2' : ''} bg-white p-8 md:p-12 flex items-center justify-center`}>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>;
}
