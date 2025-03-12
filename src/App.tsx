
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
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
import ProfileEditPage from "./pages/ProfileEditPage";
import { DashboardOnboarding } from "./components/DashboardOnboarding";
import { ChatWidget } from "./components/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore-projects" element={<ExploreProjectsPage />} />
            <Route path="/explore-talents" element={<ExploreTalentsPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<OurStoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* Special route for onboarding without Navbar */}
            <Route path="/onboarding" element={<DashboardOnboarding />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatWidget />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
