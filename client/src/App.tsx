import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
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
const BookConsultation = lazy(() => import("@/pages/BookConsultation"));
const ITSupport = lazy(() => import("@/pages/ITSupport"));
const OnSiteServices = lazy(() => import("@/pages/OnSiteServices"));
const DeviceSetup = lazy(() => import("@/pages/DeviceSetup"));
const BuyReadyComputer = lazy(() => import("@/pages/BuyReadyComputer"));
const SoftwareFixes = lazy(() => import("@/pages/SoftwareFixes"));
const BusinessIT = lazy(() => import("@/pages/BusinessIT"));
const ServiceAgreement = lazy(() => import("@/pages/ServiceAgreement"));

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
        <Route path="/service-agreement" component={ServiceAgreement} />
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
