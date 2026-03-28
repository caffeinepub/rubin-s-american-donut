import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Loader2, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DonutPlaceholder } from "../components/DonutPlaceholder";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

const DELIVERY_FEE = 2.99;

export function OrderPage() {
  const { items, subtotal, clearCart } = useCart();
  const { mutateAsync: placeOrder, isPending } = usePlaceOrder();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState<bigint | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = subtotal / 100 + (items.length > 0 ? DELIVERY_FEE : 0);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    try {
      const orderItems: Array<[bigint, bigint]> = items.map((i) => [
        i.donut.id,
        BigInt(i.quantity),
      ]);
      const id = await placeOrder({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        items: orderItems,
      });
      setOrderId(id);
      clearCart();
      toast.success("Order placed successfully! 🍩");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (orderId !== null) {
    return (
      <main className="min-h-screen bg-muted flex items-center justify-center p-4">
        <motion.div
          data-ocid="order.success_state"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-donut"
        >
          <div className="w-20 h-20 bg-brand-soft-pink rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-brand-teal" />
          </div>
          <h1 className="font-display font-black text-3xl text-foreground mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your order, {form.name}!
          </p>
          <div className="bg-brand-soft-pink rounded-2xl p-4 mb-6">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-display font-black text-2xl text-brand-pink">
              #{String(orderId)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            We'll send a confirmation to <strong>{form.email}</strong>. Your
            donuts will be ready shortly!
          </p>
          <Link to="/" data-ocid="order.link">
            <Button className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-full py-6">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          data-ocid="order.link"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-brand-pink transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-xs mb-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-5 h-5 text-brand-pink" />
                <h2 className="font-display font-bold text-xl">
                  Order Summary
                </h2>
              </div>
              {items.length === 0 ? (
                <div
                  data-ocid="order.empty_state"
                  className="text-center py-12"
                >
                  <p className="text-6xl mb-4">🍩</p>
                  <p className="text-muted-foreground font-medium">
                    Your cart is empty
                  </p>
                  <Link to="/">
                    <Button variant="outline" className="mt-4 rounded-full">
                      Browse Menu
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div
                      key={String(item.donut.id)}
                      data-ocid={`order.item.${idx + 1}`}
                      className="flex items-center gap-4 py-3"
                    >
                      <DonutPlaceholder
                        category={item.donut.category}
                        name={item.donut.name}
                        index={idx}
                        className="w-14 h-14 shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.donut.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.donut.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brand-pink">
                          ₹
                          {(
                            (Number(item.donut.price) * item.quantity) /
                            100
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ×{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{(subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>₹{DELIVERY_FEE.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-brand-pink">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl p-6 shadow-xs"
            >
              <h2 className="font-display font-bold text-xl mb-6">
                Your Details
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="order.panel"
              >
                <div>
                  <Label htmlFor="name" className="font-semibold mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    data-ocid="order.input"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, name: e.target.value }));
                      setErrors((p) => ({ ...p, name: "" }));
                    }}
                    className={`rounded-xl ${errors.name ? "border-destructive" : ""}`}
                  />
                  {errors.name && (
                    <p
                      data-ocid="order.error_state"
                      className="text-destructive text-xs mt-1"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    data-ocid="order.input"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, email: e.target.value }));
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    className={`rounded-xl ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && (
                    <p
                      data-ocid="order.error_state"
                      className="text-destructive text-xs mt-1"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold mb-1.5 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    data-ocid="order.input"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, phone: e.target.value }));
                      setErrors((p) => ({ ...p, phone: "" }));
                    }}
                    className={`rounded-xl ${errors.phone ? "border-destructive" : ""}`}
                  />
                  {errors.phone && (
                    <p
                      data-ocid="order.error_state"
                      className="text-destructive text-xs mt-1"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  data-ocid="order.submit_button"
                  disabled={isPending || items.length === 0}
                  className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-bold rounded-full py-6 text-base mt-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Place Order 🍩"
                  )}
                </Button>
                {isPending && (
                  <div
                    data-ocid="order.loading_state"
                    className="text-center text-sm text-muted-foreground"
                  >
                    Processing your delicious order...
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
