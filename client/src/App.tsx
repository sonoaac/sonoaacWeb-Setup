import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import HelpBot from "@/components/features/HelpBot";
import { ThemeProvider } from "@/context/ThemeContext";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { DesktopRightPanel } from "@/components/layout/DesktopRightPanel";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const MyTech = lazy(() => import("@/pages/MyTech"));
const BuildPC = lazy(() => import("@/pages/BuildPC"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const ServiceAgreement = lazy(() => import("@/pages/ServiceAgreement"));
const KnowledgeBase = lazy(() => import("@/pages/KnowledgeBase"));

// Redirect old routes to consolidated pages
function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(to); }, [to]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        {/* Primary routes */}
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/my-tech" component={MyTech} />
        <Route path="/my-tech/build-pc" component={BuildPC} />
        <Route path="/contact" component={Contact} />
        <Route path="/knowledge-base" component={KnowledgeBase} />
        <Route path="/service-agreement" component={ServiceAgreement} />

        {/* Legacy redirects */}
        <Route path="/it-support"><RedirectTo to="/services" /></Route>
        <Route path="/on-site-services"><RedirectTo to="/services" /></Route>
        <Route path="/device-setup"><RedirectTo to="/services" /></Route>
        <Route path="/software-fixes"><RedirectTo to="/services" /></Route>
        <Route path="/business-it"><RedirectTo to="/services" /></Route>
        <Route path="/book-consultation"><RedirectTo to="/contact" /></Route>
        <Route path="/buy-ready-computer"><RedirectTo to="/my-tech" /></Route>
        <Route path="/build-pc"><RedirectTo to="/my-tech/build-pc" /></Route>

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col bg-black text-green-200 antialiased overflow-x-hidden">
            <ScrollProgress />
            <Header />
            {/* Spacer for sticky header */}
            <div className="h-16 md:h-20" aria-hidden="true" />
            {/* 3-column layout on xl screens */}
            <div className="flex flex-1 w-full">
              <DesktopSidebar />
              <main
                id="main-content"
                className="flex-1 min-w-0 focus:outline-none"
                tabIndex={-1}
                aria-label="Main content"
              >
                <Router />
              </main>
              <DesktopRightPanel />
            </div>
            <Footer />
            <Toaster />
            <HelpBot />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
