import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { CartDrawer } from "./components/CartDrawer";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { LandingPage } from "./pages/LandingPage";
import { OrderPage } from "./pages/OrderPage";

function RootLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header onCartOpen={() => setCartOpen(true)} />
        <Outlet />
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
      <Toaster richColors />
    </CartProvider>
  );
}

const rootRoute = createRootRoute({ component: RootLayout });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});
const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  component: OrderPage,
});

const routeTree = rootRoute.addChildren([indexRoute, orderRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
