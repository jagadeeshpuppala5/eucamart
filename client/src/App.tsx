
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartCheckout from "./pages/CartCheckout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BulkOrders from "./pages/BulkOrders";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/shop" component={Shop} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={CartCheckout} />
          <Route path="/order-confirmation" component={OrderConfirmation} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bulk-orders" component={BulkOrders} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
        <WhatsAppWidget />
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
