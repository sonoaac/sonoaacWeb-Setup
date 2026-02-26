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
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/book-consultation" component={require('./pages/BookConsultation').default} />
      <Route path="/it-support" component={require('./pages/ITSupport').default} />
      <Route path="/on-site-services" component={require('./pages/OnSiteServices').default} />
      <Route path="/device-setup" component={require('./pages/DeviceSetup').default} />
      <Route path="/buy-ready-computer" component={require('./pages/BuyReadyComputer').default} />
      <Route path="/software-fixes" component={require('./pages/SoftwareFixes').default} />
      <Route path="/business-it" component={require('./pages/BusinessIT').default} />
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
