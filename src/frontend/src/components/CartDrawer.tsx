import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";
import { DonutPlaceholder } from "./DonutPlaceholder";

const DELIVERY_FEE = 2.99;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } =
    useCart();
  const navigate = useNavigate();

  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  const handleCheckout = () => {
    onClose();
    navigate({ to: "/order" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-5 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-brand-pink" />
                <h2 className="font-display text-xl font-bold">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-brand-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                type="button"
                data-ocid="cart.close_button"
                onClick={onClose}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div data-ocid="cart.empty_state" className="text-center py-16">
                  <div className="text-6xl mb-4">🍩</div>
                  <p className="text-muted-foreground font-medium">
                    Your cart is empty!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add some delicious donuts
                  </p>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={String(item.donut.id)}
                    data-ocid={`cart.item.${idx + 1}`}
                    className="flex items-center gap-3"
                  >
                    <DonutPlaceholder
                      category={item.donut.category}
                      name={item.donut.name}
                      index={idx}
                      className="w-14 h-14 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {item.donut.name}
                      </p>
                      <p className="text-brand-pink text-sm font-bold">
                        ₹{Number(item.donut.price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.donut.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-brand-soft-pink transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.donut.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-brand-soft-pink transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                      onClick={() => removeFromCart(item.donut.id)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    ₹{DELIVERY_FEE.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-brand-pink">₹{total.toFixed(2)}</span>
                </div>
                <Button
                  data-ocid="cart.primary_button"
                  onClick={handleCheckout}
                  className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold rounded-full py-6 text-base"
                >
                  View Cart &amp; Checkout
                </Button>
                <div className="flex gap-2 justify-center mt-2">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/20" />
                  <div className="w-8 h-8 rounded-full bg-brand-yellow/40" />
                  <div className="w-8 h-8 rounded-full bg-brand-pink/20" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
