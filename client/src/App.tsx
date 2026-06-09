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

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const MyTech = lazy(() => import("@/pages/MyTech"));
const BuildPC = lazy(() => import("@/pages/BuildPC"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const ServiceAgreement = lazy(() => import("@/pages/ServiceAgreement"));
const KnowledgeBase = lazy(() => import("@/pages/KnowledgeBase"));
const TradeIn = lazy(() => import("@/pages/TradeIn"));
const TrackTicket = lazy(() => import("@/pages/TrackTicket"));
const AdminTickets = lazy(() => import("@/pages/AdminTickets"));

function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(to); }, [to]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/my-tech" component={MyTech} />
        <Route path="/my-tech/build-pc" component={BuildPC} />
        <Route path="/contact" component={Contact} />
        <Route path="/knowledge-base" component={KnowledgeBase} />
        <Route path="/trade-in" component={TradeIn} />
        <Route path="/service-agreement" component={ServiceAgreement} />
        <Route path="/track/:token" component={TrackTicket} />
        <Route path="/admin/tickets" component={AdminTickets} />

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
            {/* Spacer: utility bar (40px) + main nav on md+ (48px) = 88px */}
            <div className="h-10 md:h-[88px]" aria-hidden="true" />
            <main
              id="main-content"
              className="flex-1 min-w-0 focus:outline-none"
              tabIndex={-1}
              aria-label="Main content"
            >
              <Router />
            </main>
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
