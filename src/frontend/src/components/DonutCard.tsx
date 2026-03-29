import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import type { Donut } from "../backend.d";
import { useCart } from "../context/CartContext";
import { DonutPlaceholder } from "./DonutPlaceholder";

interface DonutCardProps {
  donut: Donut;
  index: number;
}

export function DonutCard({ donut, index }: DonutCardProps) {
  const { addToCart, items } = useCart();
  const cartItem = items.find((i) => i.donut.id === donut.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-brand-soft-pink rounded-3xl overflow-hidden flex flex-col group hover:shadow-donut transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative pt-6 px-6 flex justify-center">
        {donut.imageUrl ? (
          <img
            src={donut.imageUrl}
            alt={donut.name}
            className="w-40 h-40 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <DonutPlaceholder
            category={donut.category}
            name={donut.name}
            index={index}
            className="w-40 h-40 group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {donut.category && (
          <span className="absolute top-4 right-4 bg-white/80 backdrop-blur text-xs font-bold px-2 py-1 rounded-full text-brand-pink">
            {donut.category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          {donut.name}
        </h3>
        <p className="text-sm text-muted-foreground flex-1 line-clamp-2 mb-3">
          {donut.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-2xl text-brand-pink">
            ₹{Number(donut.price).toFixed(2)}
          </span>
          <Button
            data-ocid={`menu.item.${index + 1}`}
            onClick={() => addToCart(donut)}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white rounded-full font-bold flex items-center gap-1.5 px-4"
          >
            {qty > 0 ? (
              <>
                <Plus className="w-4 h-4" />
                <span>{qty} in cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
