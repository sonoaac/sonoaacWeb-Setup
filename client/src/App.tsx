import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MyTech from "@/pages/MyTech";
import BuildPC from "@/pages/BuildPC";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import BookConsultation from "@/pages/BookConsultation";
import ITSupport from "@/pages/ITSupport";
import OnSiteServices from "@/pages/OnSiteServices";
import DeviceSetup from "@/pages/DeviceSetup";
import BuyReadyComputer from "@/pages/BuyReadyComputer";
import SoftwareFixes from "@/pages/SoftwareFixes";
import BusinessIT from "@/pages/BusinessIT";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased selection:bg-green-100 selection:text-green-900">
          <Header />
          <main id="main-content" className="flex-1 w-full focus:outline-none" tabIndex={-1} aria-label="Main content">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
