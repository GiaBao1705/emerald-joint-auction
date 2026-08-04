import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import PropertyDetail from "./pages/PropertyDetail.tsx";
import Recruitment from "./pages/Recruitment.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminFull from "./pages/AdminFull.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminFull />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
