// /data/prod.ts
export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  quantityInStock?: number;
  category: string;
  image: string;
  images?: string[];
  inStock: boolean;
  sizes: string[];
  tags: string[];
};

export const products: Product[] = [
  // 🔥 Hoodies
  {
    id: 1,
    name: "Black Hooded Reaper",
    slug: "black-hooded-reaper",
    description: "Oversized fleece-lined hoodie. Built for shadows and street. Made from 100% organic cotton and pre-shrunk for comfort. Street-style essential.",
    price: 2499,
    quantityInStock: 5,
    category: "Hoodies",
    image: "/prod/tshirt.jpg",
    images: ["/prod/hoodie.jpg", "/prod/tshirt2.jpg", "/prod/tshirt3.jpg"],
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    tags: ["streetwear", "hoodie", "black"],
  },
  {
    id: 2,
    name: "Midnight Phantom Hoodie",
    slug: "midnight-phantom-hoodie",
    description: "A soft, shadow-tinted hoodie with contrast sleeve detailing. Dual-layered fabric and breathable mesh lining.",
    price: 2699,
    category: "Hoodies",
    image: "/products/midnight-phantom.jpg",
    images: ["/products/midnight-phantom.jpg", "/products/midnight-phantom-2.jpg"],
    inStock: true,
    sizes: ["M", "L", "XL"],
    tags: ["dark", "urban", "hoodie"],
  },

  // 👕 T-Shirts
  {
    id: 3,
    name: "Void Statement Tee",
    slug: "void-statement-tee",
    description: "Minimal black tee with bold white typography. No light. No lies. Lightweight, ultra-soft cotton for all-day wear.",
    price: 1299,
    category: "T-Shirts",
    image: "/products/void-tee.jpg",
    images: ["/products/void-tee.jpg", "/products/void-tee-2.jpg"],
    inStock: true,
    sizes: ["S", "M", "L"],
    tags: ["tee", "minimal", "blackout"],
  },
  {
    id: 4,
    name: "Glitchcore Oversized Tee",
    slug: "glitchcore-oversized-tee",
    description: "Pixel-ruined design. Dystopian aesthetic. Full drip certified. Slightly oversized for relaxed fit.",
    price: 1499,
    category: "T-Shirts",
    image: "/products/glitchcore-tee.jpg",
    images: ["/products/glitchcore-tee.jpg", "/products/glitchcore-tee-2.jpg"],
    inStock: true,
    sizes: ["M", "L", "XL"],
    tags: ["cyber", "glitch", "oversized"],
  },

  // 🧥 Jackets
  {
    id: 5,
    name: "Carbon Layered Jacket",
    slug: "carbon-layered-jacket",
    description: "Tactical techwear jacket in matte finish. Functional + fierce. Water-resistant with zip pockets and breathable vents.",
    price: 4999,
    category: "Jackets",
    image: "/products/carbon-jacket.jpg",
    images: ["/products/carbon-jacket.jpg", "/products/carbon-jacket-2.jpg"],
    inStock: true,
    sizes: ["L", "XL"],
    tags: ["techwear", "jacket", "outerwear"],
  },
  {
    id: 6,
    name: "Neon Core Puffer",
    slug: "neon-core-puffer",
    description: "Black puffer jacket with hidden neon liner and stealth zips. Fully insulated and windproof.",
    price: 5599,
    category: "Jackets",
    image: "/products/neon-puffer.jpg",
    images: ["/products/neon-puffer.jpg", "/products/neon-puffer-2.jpg"],
    inStock: false,
    sizes: ["M", "L", "XL"],
    tags: ["winter", "puffer", "neon"],
  },

  // 👖 Bottomwear
  {
    id: 7,
    name: "Shadowline Cargo Pants",
    slug: "shadowline-cargo",
    description: "Multi-pocket joggers with drawcords and tactical zips. Stretchable and breathable fabric for agility.",
    price: 2299,
    category: "Bottomwear",
    image: "/products/shadowline-cargo.jpg",
    images: ["/products/shadowline-cargo.jpg", "/products/shadowline-cargo-2.jpg"],
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    tags: ["cargos", "bottomwear", "tactical"],
  },
  {
    id: 8,
    name: "Ash Drift Joggers",
    slug: "ash-drift-joggers",
    description: "Ash grey minimal joggers. Perfect for movement and mood. Ultra-soft fleece inner lining.",
    price: 1999,
    category: "Bottomwear",
    image: "/products/ash-drift.jpg",
    images: ["/products/ash-drift.jpg", "/products/ash-drift-2.jpg"],
    inStock: true,
    sizes: ["M", "L"],
    tags: ["joggers", "casual", "athleisure"],
  },

  // 👟 Sneakers
  {
    id: 9,
    name: "Nightfall Sneakers",
    slug: "nightfall-sneakers",
    description: "Chunky monochrome sole with mesh upper. Urban legend certified. Padded tongue and heel for comfort.",
    price: 3999,
    category: "Sneakers",
    image: "/products/nightfall-sneakers.jpg",
    images: ["/products/nightfall-sneakers.jpg", "/products/nightfall-sneakers-2.jpg"],
    inStock: true,
    sizes: ["7", "8", "9", "10", "11"],
    tags: ["sneakers", "black", "urban"],
  },
  {
    id: 10,
    name: "Hollow Fade Runners",
    slug: "hollow-fade-runners",
    description: "Gradient runners for late-night runs and rogue missions. Lightweight sole with energy return technology.",
    price: 4299,
    category: "Sneakers",
    image: "/products/hollow-fade.jpg",
    images: ["/products/hollow-fade.jpg", "/products/hollow-fade-2.jpg"],
    inStock: true,
    sizes: ["8", "9", "10"],
    tags: ["runners", "sneakers", "fade"],
  },
];
