"use client";

import { type ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { FilterProvider } from "./FilterContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
      <FilterProvider>{children}</FilterProvider>
      </CartProvider>
    </ToastProvider>
  );
}
