import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpBot from "@/components/features/HelpBot";

const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const MyTech = lazy(() => import("@/pages/MyTech"));
const BuildPC = lazy(() => import("@/pages/BuildPC"));
const Services = lazy(() => import("@/pages/Services"));
const Contact = lazy(() => import("@/pages/Contact"));
const BookConsultation = lazy(() => import("@/pages/BookConsultation"));
const ITSupport = lazy(() => import("@/pages/ITSupport"));
const OnSiteServices = lazy(() => import("@/pages/OnSiteServices"));
const DeviceSetup = lazy(() => import("@/pages/DeviceSetup"));
const BuyReadyComputer = lazy(() => import("@/pages/BuyReadyComputer"));
const SoftwareFixes = lazy(() => import("@/pages/SoftwareFixes"));
const BusinessIT = lazy(() => import("@/pages/BusinessIT"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/book-consultation" component={BookConsultation} />
        <Route path="/it-support" component={ITSupport} />
        <Route path="/on-site-services" component={OnSiteServices} />
        <Route path="/device-setup" component={DeviceSetup} />
        <Route path="/buy-ready-computer" component={BuyReadyComputer} />
        <Route path="/software-fixes" component={SoftwareFixes} />
        <Route path="/business-it" component={BusinessIT} />
        <Route path="/my-tech" component={MyTech} />
        <Route path="/my-tech/build-pc" component={BuildPC} />
        <Route path="/build-pc" component={BuildPC} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
          <Header />
          {/* Spacer for sticky header height (h-24 = 96px, adjust if header height changes) */}
          <div className="h-24 md:h-24" aria-hidden="true" />
          <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1} aria-label="Main content">
            <Router />
          </main>
          <Footer />
          <Toaster />
          <HelpBot />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
