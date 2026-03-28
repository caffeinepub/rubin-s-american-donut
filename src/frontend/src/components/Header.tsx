import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

interface HeaderProps {
  onCartOpen: () => void;
}

export function Header({ onCartOpen }: HeaderProps) {
  const { totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white text-lg animate-float">
            🍩
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="font-display font-bold text-sm tracking-tight text-foreground">
              RUBIN'S
            </p>
            <p className="text-xs font-semibold text-brand-pink tracking-widest">
              AMERICAN DONUT
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {["Menu", "Flavors", "Our Story", "Locations"].map((link) => (
            <a
              key={link}
              href="/#menu"
              data-ocid="nav.link"
              className="text-sm font-semibold text-foreground hover:text-brand-pink transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            data-ocid="nav.primary_button"
            onClick={() => navigate({ to: "/order" })}
            className="hidden sm:flex bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full font-bold px-5"
          >
            Order Now
          </Button>
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <User className="w-5 h-5 text-foreground" />
          </button>
          <button
            type="button"
            data-ocid="nav.toggle"
            onClick={onCartOpen}
            className="relative p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-pink text-white text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          {subtotal > 0 && (
            <span className="hidden sm:block text-sm font-bold text-brand-teal">
              ₹{(subtotal / 100).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
