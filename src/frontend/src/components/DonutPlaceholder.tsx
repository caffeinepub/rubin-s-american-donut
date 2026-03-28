const categoryColors: Record<string, string> = {
  Classic: "bg-pink-300",
  Chocolate: "bg-amber-800",
  Fruit: "bg-rose-400",
  Seasonal: "bg-violet-400",
  Filled: "bg-yellow-400",
  "Sugar Coated": "bg-orange-300",
  "White Chocolate": "bg-amber-100",
};

const nameImages: Record<string, string> = {
  "Boston Cream":
    "/assets/generated/boston-cream-donut-transparent.dim_400x400.png",
  "Pineapple Glazed":
    "/assets/uploads/image-019d3546-83cb-72d5-a006-2a541453dabd-1.png",
  "Strawberry Dream":
    "/assets/generated/donut-strawberry-sprinkle.dim_400x400.png",
  "Milk Chocolate Bliss":
    "/assets/uploads/image-019d3542-7e0a-759a-a03e-55e2f004f760-1.png",
  "White Chocolate Dream":
    "/assets/generated/white-chocolate-donut-transparent.png",
};

const donutImages: Record<string, string> = {
  Classic: "/assets/generated/donut-classic.dim_400x400.png",
  Chocolate: "/assets/generated/donut-chocolate.dim_400x400.png",
  Fruit: "/assets/generated/donut-strawberry-sprinkle.dim_400x400.png",
  Seasonal: "/assets/generated/donut-blueberry.dim_400x400.png",
  Filled: "/assets/generated/donut-caramel.dim_400x400.png",
  "Sugar Coated": "/assets/generated/donut-lemon.dim_400x400.png",
  "White Chocolate": "/assets/generated/white-chocolate-donut-transparent.png",
};

const fallbackImages = [
  "/assets/generated/donut-classic.dim_400x400.png",
  "/assets/generated/donut-chocolate.dim_400x400.png",
  "/assets/generated/donut-strawberry-sprinkle.dim_400x400.png",
  "/assets/generated/donut-lemon.dim_400x400.png",
  "/assets/generated/donut-blueberry.dim_400x400.png",
  "/assets/generated/donut-caramel.dim_400x400.png",
];

interface DonutPlaceholderProps {
  category: string;
  name: string;
  index?: number;
  className?: string;
}

export function DonutPlaceholder({
  category,
  name,
  index = 0,
  className = "",
}: DonutPlaceholderProps) {
  const imgSrc =
    nameImages[name] ||
    donutImages[category] ||
    fallbackImages[index % fallbackImages.length];
  const fallbackColor = categoryColors[category] || "bg-pink-200";

  return (
    <div
      className={`relative rounded-full overflow-hidden flex items-center justify-center ${fallbackColor} ${className}`}
    >
      <img
        src={imgSrc}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
