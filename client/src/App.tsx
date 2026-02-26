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
import SectionScroll from './components/layout/SectionScroll';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
  const [location] = useLocation();
  const isHomePage = location === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white text-gray-900 font-sans antialiased selection:bg-green-100 selection:text-green-900">
          <SectionScroll />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
