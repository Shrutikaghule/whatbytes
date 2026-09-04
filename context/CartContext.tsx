'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { Product } from '@/types/product';
import { CartItem, CartContextType } from '@/types/cart';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'whatbytes_cart';
const EMPTY_CART: CartItem[] = [];

const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

function emitCartChange() {
  listeners.forEach((listener) => listener());
}

function parseCart(raw: string | null): CartItem[] {
  if (!raw) return EMPTY_CART;
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function getCartSnapshot(): CartItem[] {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  cachedItems = parseCart(raw);
  return cachedItems;
}

function getServerCartSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeCart(items: CartItem[]) {
  const raw = JSON.stringify(items);
  localStorage.setItem(CART_STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedItems = items;
  emitCartChange();
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const { triggerToast } = useToast();

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      const existing = cartItems.find((item) => item.id === product.id);
      const next = existing
        ? cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...cartItems, { ...product, quantity }];
      writeCart(next);
      triggerToast(`Added ${quantity}x "${product.name}" to cart`);
    },
    [cartItems, triggerToast],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      writeCart(cartItems.filter((item) => item.id !== productId));
      triggerToast('Item removed from cart');
    },
    [cartItems, triggerToast],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      writeCart(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [cartItems, removeFromCart],
  );

  const clearCart = useCallback(() => {
    writeCart(EMPTY_CART);
  }, []);

  const totalItems = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
