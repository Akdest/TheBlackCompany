
"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/app/data/prod";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus } from "lucide-react";

export default function ProductDetails() {
  const { slug } = useParams();
  const router = useRouter();
 const product = products.find((p) => p.slug === slug);

const [cart, setCart] = useState<CartItem[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (product) setMainImage(product.image);

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);

          const match = parsed.find((item) => item.slug === product?.slug);
          if (match) {
            setSelectedSize(match.size);
            setQuantity(match.quantity);
          }
        }
      } catch {
        setCart([]);
      }
    }
  }, [product]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!selectedSize && Array.isArray(product?.sizes) && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </main>
    );
  }
   type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
};

  

  const isInCart = cart.some((item) => item.slug === product.slug && item.size === selectedSize);

 const syncCartWithLocalStorage = (updatedCart: CartItem[]) => {
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

  const addToCart = () => {
    if (!selectedSize) return;
    const exists = cart.find((item) => item.slug === product.slug && item.size === selectedSize);
    if (exists) {
      const updatedCart = cart.map((item) =>
        item.slug === product.slug && item.size === selectedSize
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      syncCartWithLocalStorage(updatedCart);
    } else {
      const newItem = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        size: selectedSize,
      };
      syncCartWithLocalStorage([...cart, newItem]);
    }
  };

  const removeFromCart = () => {
    const updatedCart = cart.filter(
      (item) => item.slug !== product.slug || item.size !== selectedSize
    );
    syncCartWithLocalStorage(updatedCart);
  };

  const handleCheckout = () => {
    router.push("/pages/Checkout");
  };

  return (
    <div>
      <Navbar />
      <title>{product.name} | The Black Company</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    

      <div className=" text-white px-6 py-20 min-h-screen flex flex-col lg:flex-row gap-10">
        <div className="absolute inset-0 -z-10">
          {mainImage ? (
              <Image src={mainImage} alt={product.name} fill 
            className="object-cover opacity-10"
            priority
          />  ) : null}
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="w-full h-[500px] relative  overflow-hidden border border-white/10">
            {mainImage ? (
              <Image src={mainImage} alt={product.name} fill className="object-cover" />
            ) : null}
          </div>
          <div className="flex gap-4 flex-wrap">
            {[product.image, ...(product.images || [])].map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 cursor-pointer border ${mainImage === img ? "border-white" : "border-white/20"}`}
              >
                <Image src={img} alt={product.name} width={80} height={80} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6 bg-white/10 backdrop-blur-lg p-6 border-2 border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wide">{product.name}</h2>
            <button
              onClick={() => router.back()}
              className="bg-white/10 hover:bg-white/20 p-2"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <p className="text-white/60 text-sm">Category: {product.category}</p>
          <p className="text-white text-2xl font-mono">₹{product.price.toLocaleString()}</p>
          <p className="text-white/70 text-sm leading-relaxed">{product.description}</p>

          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div>
              <h4 className="text-xs text-white/60 uppercase">Sizes</h4>
              <div className="flex gap-3 mt-1">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-3 py-1 text-sm cursor-pointer transition ${
                      selectedSize === size
                        ? "bg-white text-black"
                        : "border-white/20 hover:bg-white hover:text-black"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}
{!product.inStock || !product.quantityInStock ? (
  <p className="text-red-500 text-sm mt-4">Currently Out of Stock</p>
) : (
  <div className="flex items-center gap-4 mt-4">
    <span className="text-sm text-white/60">Quantity:</span>
    <div className="flex items-center gap-2">
      <button
        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        className="w-8 h-8 border border-white flex items-center justify-center"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={() => setQuantity((q) => q + 1)}
        disabled={quantity >= product.quantityInStock}
        className="w-8 h-8 border border-white flex items-center justify-center disabled:opacity-30"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
)}

          <div className="flex flex-row items-center gap-6 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isInCart ? removeFromCart : addToCart}
              className={`flex-1 py-3  font-semibold flex items-center justify-center gap-2 transition-all ${
                isInCart ? "bg-white text-black" : "bg-black border border-white text-white"
              }`}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="flex-1 py-3  border border-white text-white hover:bg-white hover:text-black font-semibold flex items-center justify-center gap-2 transition"
            >
              Buy Now
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}