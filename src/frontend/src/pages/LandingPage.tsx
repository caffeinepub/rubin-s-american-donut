import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  MapPin,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { DonutCard } from "../components/DonutCard";
import { useCart } from "../context/CartContext";
import { useGetAllDonuts } from "../hooks/useQueries";

const STATIC_DONUTS = [
  {
    id: BigInt(1),
    name: "Strawberry Dream",
    description:
      "Fluffy ring donut glazed with fresh strawberry frosting and rainbow sprinkles",
    price: BigInt(80),
    category: "Fruit",
    imageUrl: "/assets/generated/donut-strawberry-rainbow.dim_400x400.png",
  },
  {
    id: BigInt(2),
    name: "Midnight Chocolate",
    description: "Rich dark chocolate glaze with chocolate sprinkle",
    price: BigInt(80),
    category: "Chocolate",
    imageUrl: "",
  },
  {
    id: BigInt(3),
    name: "Classic Glazed",
    description:
      "Our signature original – perfectly fried dough with our secret sweet glaze",
    price: BigInt(80),
    category: "Classic",
    imageUrl: "/assets/generated/donut-classic-glazed.dim_400x400.png",
  },
  {
    id: BigInt(5),
    name: "Milk Chocolate Bliss",
    description:
      "Smooth milk chocolate glaze drizzled over a soft ring donut with a rich creamy finish",
    price: BigInt(80),
    category: "Filled",
    imageUrl:
      "/assets/uploads/image-019d3542-7e0a-759a-a03e-55e2f004f760-1.png",
  },
  {
    id: BigInt(7),
    name: "White Chocolate Dream",
    description:
      "Velvety white chocolate glaze over a soft pillowy donut with a delicate sweet finish",
    price: BigInt(80),
    category: "White Chocolate",
    imageUrl: "/assets/generated/white-chocolate-donut-transparent.png",
  },
  {
    id: BigInt(8),
    name: "Pineapple Glazed",
    description: "Tropical pineapple glazed donut with a bright, fruity finish",
    price: BigInt(80),
    category: "Fruit",
    imageUrl:
      "/assets/uploads/image-019d3546-83cb-72d5-a006-2a541453dabd-1.png",
  },
];

const PACKS = [
  {
    id: BigInt(101),
    name: "Party Donut Box",
    desc: "24 Donuts – Perfect for parties & celebrations",
    price: "₹1399",
    priceNum: 1399,
    color: "bg-pink-50",
    emoji: "🎉",
  },
  {
    id: BigInt(102),
    name: "Party Donut Box",
    desc: "50 Donuts – Ideal for large gatherings",
    price: "₹2899",
    priceNum: 2899,
    color: "bg-amber-50",
    emoji: "🍩",
  },
  {
    id: BigInt(103),
    name: "Mini Donut Party Pack",
    desc: "50 pcs – Perfect for birthdays & events",
    price: "₹1499",
    priceNum: 1499,
    color: "bg-yellow-50",
    emoji: "🎂",
  },
  {
    id: BigInt(104),
    name: "Mini Donut Party Pack",
    desc: "100 pcs – Grand celebration special",
    price: "₹2899",
    priceNum: 2899,
    color: "bg-rose-50",
    emoji: "🎊",
  },
];

const CAKE_TOWERS = [
  { donuts: 12, price: "₹1399", priceNum: 1399 },
  { donuts: 18, price: "₹1999", priceNum: 1999 },
  { donuts: 24, price: "₹2499", priceNum: 2499 },
  { donuts: 45, price: "₹4499", priceNum: 4499 },
];

const CAKE_TOWER_GALLERY = [
  {
    src: "/assets/uploads/images_2-019d356e-e949-74ef-9fe0-6c5e06f7ec60-1.jpg",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/3d84050d5cd9e491db14217cde4bbb99-019d356e-e94a-77ca-a82d-d2c53261ec9e-2.jpg",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/images-019d356e-e958-737a-8f1a-eac571190ce8-3.jpg",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/11_2c485880-b0c4-482d-a7eb-5711ba0a2e46-019d356e-e977-754f-9304-c45bb7af4846-4.webp",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/whatsapp-image-2025-01-02-at-13.57.52_8eca99a8-768x1024-019d356e-ea28-74f5-ab30-e59053510073-5.jpg",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/lg_pink_-white-019d356e-ebaf-7351-bcc3-2a1d19e21cf1-6.jpg",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/1capture-019d356e-ec51-74a3-bda4-835274d35262-7.png",
    alt: "Donut Cake Tower",
  },
  {
    src: "/assets/uploads/chatgpt_image_mar_28_2026_10_38_29_pm-019d356e-ef8b-734c-991f-494227a39d5b-8.png",
    alt: "Donut Cake Tower",
  },
];

const PROMO_IMGS = [
  "/assets/generated/donut-classic.dim_400x400.png",
  "/assets/generated/donut-chocolate.dim_400x400.png",
  "/assets/generated/donut-strawberry-sprinkle.dim_400x400.png",
];

export function LandingPage() {
  const { isLoading } = useGetAllDonuts();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const displayDonuts = STATIC_DONUTS;

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#F04E8A" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-300 text-yellow-300"
                />
              ))}
            </div>
            <h1 className="font-display font-black text-white text-5xl sm:text-6xl md:text-8xl leading-none tracking-tight mb-4">
              RUBIN'S
              <br />
              AMERICAN
              <br />
              DONUT
            </h1>
            <p className="text-white/90 text-lg sm:text-xl max-w-lg mx-auto mb-8">
              Handcrafted with love, glazed to perfection. Every bite is a
              little piece of heaven.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                data-ocid="hero.primary_button"
                onClick={() => navigate({ to: "/order" })}
                className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold rounded-full px-8 py-6 text-base"
              >
                Order Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-pink font-bold rounded-full px-8 py-6 text-base"
              >
                View Menu
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="/assets/generated/donut-hero-collage.dim_1200x400.png"
              alt="Assorted donuts"
              className="w-full object-cover h-48 sm:h-64"
            />
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <p className="text-brand-pink font-bold text-sm tracking-widest uppercase mb-1">
              Fresh Daily
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground">
              Today's Favorites
            </h2>
          </motion.div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  data-ocid="menu.loading_state"
                  className="rounded-3xl overflow-hidden"
                >
                  <Skeleton className="h-52 w-full" />
                  <div className="p-5 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDonuts.map((donut, idx) => (
                <DonutCard key={String(donut.id)} donut={donut} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Packs */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-brand-teal font-bold text-sm tracking-widest uppercase mb-1">
              Bundle &amp; Save
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground">
              Popular Packs
            </h2>
          </motion.div>

          {/* Party packages reference image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 rounded-3xl overflow-hidden shadow-md"
          >
            <img
              src="/assets/uploads/updated_menu-019d2df4-dbd2-7579-bd92-0bdaf1024263-1.png"
              alt="Party Packages Menu"
              className="w-full object-cover max-h-80"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKS.map((pack, i) => (
              <motion.div
                key={`${pack.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`packs.item.${i + 1}`}
                className={`${pack.color} rounded-3xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 border border-white shadow-sm`}
              >
                <span className="text-5xl mb-4">{pack.emoji}</span>
                <h3 className="font-display font-bold text-lg mb-2 leading-snug">
                  {pack.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {pack.desc}
                </p>
                <span className="font-display font-black text-2xl text-brand-pink mb-4">
                  {pack.price}
                </span>
                <Button
                  data-ocid={`packs.primary_button.${i + 1}`}
                  className="w-full rounded-full font-bold text-sm"
                  style={{ background: "#F04E8A" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: pack.id,
                      name: pack.name,
                      description: pack.desc,
                      price: BigInt(pack.priceNum),
                      category: "Pack",
                      imageUrl: "",
                    });
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Banner */}
      <section className="py-6 px-4" style={{ background: "#F04E8A" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-white text-center"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="font-bold text-sm tracking-wide">
                Name Stickers on Boxes
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/40" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="font-bold text-sm tracking-wide">
                Theme-Based Packaging
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/40" />
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="font-bold text-sm tracking-wide">
                Special Party Orders
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donut Cake Tower */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-3"
          >
            <p className="text-brand-pink font-bold text-sm tracking-widest uppercase mb-1">
              Customized with Name &amp; Theme
            </p>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-foreground">
              Donut Cake Tower
            </h2>
          </motion.div>

          {/* Cake tower photo gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
            {CAKE_TOWER_GALLERY.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-md aspect-square cursor-pointer group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {CAKE_TOWERS.map((tier, i) => (
              <motion.div
                key={tier.donuts}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`cake_tower.item.${i + 1}`}
                className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-amber-100 hover:scale-105 transition-transform duration-300 hover:shadow-md"
              >
                <span className="text-4xl mb-3">🎂</span>
                <h3 className="font-display font-black text-2xl text-foreground mb-1">
                  {tier.donuts}
                  <span className="text-base font-medium text-muted-foreground ml-1">
                    donuts
                  </span>
                </h3>
                <span className="font-display font-black text-xl text-brand-pink mb-4">
                  {tier.price}
                </span>
                <Button
                  data-ocid={`cake_tower.primary_button.${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: BigInt(200 + i + 1),
                      name: `Donut Cake Tower – ${tier.donuts} Donuts`,
                      description: `Donut Cake Tower with ${tier.donuts} donuts, customized with name & theme`,
                      price: BigInt(tier.priceNum),
                      category: "Cake Tower",
                      imageUrl: "",
                    });
                  }}
                  className="w-full rounded-full text-sm font-bold"
                  style={{ background: "#F04E8A" }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground font-medium text-sm"
          >
            🌟 Only Premium Quality Donuts. Perfect for Birthdays &amp; Parties.
          </motion.p>
        </div>
      </section>

      {/* Social / Visit */}
      <section className="bg-brand-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-black text-3xl mb-4">Follow Us</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {PROMO_IMGS.map((src) => (
                <div
                  key={src}
                  className="rounded-2xl overflow-hidden aspect-square"
                >
                  <img
                    src={src}
                    alt="donut"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-display font-black text-3xl mb-4">
              Visit Us Today
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">123 Sugar Lane, Sweet District</p>
                  <p className="text-white/80 text-sm">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Mon–Fri: 7am – 8pm</p>
                  <p className="text-white/80 text-sm">Sat–Sun: 8am – 10pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-4 gap-8 mb-10">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-brand-pink flex items-center justify-center text-white">
                  🍩
                </div>
                <div>
                  <p className="font-display font-bold text-sm">RUBIN'S</p>
                  <p className="text-xs text-brand-pink font-semibold tracking-widest">
                    AMERICAN DONUT
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Handcrafted donuts baked fresh every morning with love and the
                finest ingredients.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                Site Links
              </h4>
              <ul className="space-y-2">
                {[
                  "Menu",
                  "Our Story",
                  "Flavors",
                  "Locations",
                  "Order Online",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="/"
                      data-ocid="footer.link"
                      className="text-sm text-muted-foreground hover:text-brand-pink transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                Socials
              </h4>
              <ul className="space-y-2">
                {["Instagram", "Facebook", "Twitter", "TikTok"].map((l) => (
                  <li key={l}>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid="footer.link"
                      className="text-sm text-muted-foreground hover:text-brand-pink transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
                Newsletter Sign Up
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get exclusive deals and sweet updates!
              </p>
              <div className="flex gap-2">
                <Input
                  data-ocid="footer.input"
                  placeholder="Your email"
                  className="rounded-full text-sm"
                />
                <Button
                  data-ocid="footer.submit_button"
                  className="rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white px-4"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
            <span>rubinsamericandonut.com</span>
            <span>
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                className="underline hover:text-brand-pink"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
