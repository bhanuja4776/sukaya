"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LocalCartAdapter } from "@/lib/commerce/local-cart-adapter";
import { getUnitPrice } from "@/lib/commerce/purchasability";
import { CART_LOAD_ERROR_MESSAGE } from "@/lib/commerce/messages";
import type { Cart, CartLine, CommerceProductRef } from "@/lib/commerce/types";
import { NEEDS_VERIFICATION, getProductBySlug } from "@/content/products";

/**
 * Cart state layer — Phase 6 (docs/phase-6-commerce-layer-report.md §2).
 * Wraps a `CommerceAdapter` (currently `LocalCartAdapter` — see that file's
 * header) and enriches raw cart lines with live product data pulled from
 * `content/products.ts` at render time. Cart lines never store their own
 * copy of name/price/image — that would create a second source of truth
 * that could drift from the content layer.
 */

export interface EnrichedCartLine extends CartLine {
  /** False when the referenced product no longer exists in the catalog. */
  productExists: boolean;
  displayName: string;
  image: string | null;
  category: string;
  unitPrice: ReturnType<typeof getUnitPrice> | null;
}

interface CartContextValue {
  status: "loading" | "ready";
  error: string | null;
  lines: EnrichedCartLine[];
  itemCount: number;
  /** Formatted subtotal, or null if the cart is empty or a line's price can't be resolved. */
  subtotalDisplay: string | null;
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  openCart: () => void;
  closeCart: () => void;
  addItem: (ref: CommerceProductRef, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  announcement: string;
}

const CartContext = createContext<CartContextValue | null>(null);

function enrichLines(cart: Cart): EnrichedCartLine[] {
  return cart.lines.map((line) => {
    const product = getProductBySlug(line.slug);
    if (!product) {
      return {
        ...line,
        productExists: false,
        displayName: line.variantName ?? line.slug,
        image: null,
        category: "",
        unitPrice: null,
      };
    }
    return {
      ...line,
      productExists: true,
      displayName: line.variantName ?? product.name,
      image: product.image,
      category: product.category,
      unitPrice: getUnitPrice(product, line.sizeLabel),
    };
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [adapter] = useState(() => new LocalCartAdapter());

  const [cart, setCart] = useState<Cart>({ lines: [] });
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let cancelled = false;
    adapter.getCart().then((result) => {
      if (cancelled) return;
      if (result.status === "ok") setCart(result.data);
      else if (result.status === "error") setError(CART_LOAD_ERROR_MESSAGE);
      setStatus("ready");
    });
    return () => {
      cancelled = true;
    };
  }, [adapter]);

  const addItem = useCallback(async (ref: CommerceProductRef, quantity: number) => {
    const result = await adapter.addToCart(ref, quantity);
    if (result.status === "ok") {
      setCart(result.data);
      const product = getProductBySlug(ref.slug);
      setAnnouncement(`Added ${ref.variantName ?? product?.name ?? ref.slug} to cart.`);
    } else if (result.status === "error") {
      setError(CART_LOAD_ERROR_MESSAGE);
    }
  }, [adapter]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    const result = await adapter.updateCartItem(lineId, quantity);
    if (result.status === "ok") {
      setCart(result.data);
      setAnnouncement("Cart quantity updated.");
    } else if (result.status === "error") {
      setError(CART_LOAD_ERROR_MESSAGE);
    }
  }, [adapter]);

  const removeItem = useCallback(async (lineId: string) => {
    const result = await adapter.removeFromCart(lineId);
    if (result.status === "ok") {
      setCart(result.data);
      setAnnouncement("Item removed from cart.");
    } else if (result.status === "error") {
      setError(CART_LOAD_ERROR_MESSAGE);
    }
  }, [adapter]);

  const lines = useMemo(() => enrichLines(cart), [cart]);
  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);

  const subtotalDisplay = useMemo(() => {
    if (lines.length === 0) return null;
    let amount = 0;
    for (const line of lines) {
      if (!line.productExists || line.unitPrice === null || line.unitPrice === NEEDS_VERIFICATION) {
        return null;
      }
      amount += line.unitPrice.amount * line.quantity;
    }
    return `$${amount.toFixed(2)}`;
  }, [lines]);

  const value: CartContextValue = {
    status,
    error,
    lines,
    itemCount,
    subtotalDisplay,
    isOpen,
    triggerRef,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateQuantity,
    removeItem,
    announcement,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
