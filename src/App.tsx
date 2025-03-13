
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import ExploreProjectsPage from "./pages/ExploreProjectsPage";
import ExploreTalentsPage from "./pages/ExploreTalentsPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import PricingPage from "./pages/PricingPage";
import OurStoryPage from "./pages/OurStoryPage";
import DashboardPage from "./pages/DashboardPage";
import MessagesPage from "./pages/MessagesPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ApplyProjectPage from "./pages/ApplyProjectPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ContactSalesPage from "./pages/ContactSalesPage";
import { DashboardOnboarding } from "./components/DashboardOnboarding";
import { ChatWidget } from "./components/ChatWidget";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { TestProfileIndicator } from "@/components/TestProfileIndicator";

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/explore-projects" element={<ExploreProjectsPage />} />
                <Route path="/explore-talents" element={<ExploreTalentsPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path="/apply-project/:id" element={<ApplyProjectPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<OurStoryPage />} />
                <Route path="/contact-sales" element={<ContactSalesPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/onboarding" element={<DashboardOnboarding />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ScrollToTopButton />
              <ChatWidget />
              <TestProfileIndicator />
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
