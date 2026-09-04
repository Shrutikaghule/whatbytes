"use client";

import { Suspense, type ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import { FilterProvider } from "./FilterContext";

function FilterTree({ children }: { children: ReactNode }) {
  return <FilterProvider>{children}</FilterProvider>;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <Suspense fallback={null}>
          <FilterTree>{children}</FilterTree>
        </Suspense>
      </CartProvider>
    </ToastProvider>
  );
}
