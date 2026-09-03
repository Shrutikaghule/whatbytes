"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } =
    useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const discount = discountApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const grandTotal = Math.max(0, subtotal - discount + shipping + tax);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoCode.trim().toLowerCase() === "whatbytes" ||
      promoCode.trim().toLowerCase() === "save10"
    ) {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1500);
  };

  if (checkoutSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8 text-sm">
          Thank you for your purchase. We have dispatched your confirmation and
          tracking invoice.
        </p>
        <button
          onClick={() => {
            setCheckoutSuccess(false);
            router.push("/");
          }}
          className="bg-[#0052b4] hover:bg-[#003d8a] text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8 text-sm">
          Looks like you haven&apos;t added any gear yet. Check out our latest
          products and pick your favorites!
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-[#0052b4] hover:bg-[#003d8a] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
        >
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-blue-600 flex items-center text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Continue Shopping</span>
          </button>
          <span className="text-gray-300">/</span>
          <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm"
            >
              <div
                onClick={() => router.push(`/product/${item.id}`)}
                className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50 rounded-lg p-2 flex items-center justify-center flex-shrink-0 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3
                  onClick={() => router.push(`/product/${item.id}`)}
                  className="font-bold text-gray-900 text-base sm:text-lg hover:text-blue-600 cursor-pointer"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-blue-600 font-semibold uppercase mt-0.5">
                  {item.category}
                </p>
                <div className="text-base font-extrabold text-gray-900 mt-2">
                  ${item.price} each
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900 text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 text-gray-600 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="w-20 text-right font-black text-gray-900 text-base">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">
              Order Summary
            </h2>

            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter 'WHATBYTES'"
                  className="flex-1 text-sm bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gray-900 hover:bg-black text-white px-4 py-2 text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <p className="text-xs text-emerald-600 font-semibold mt-1.5 flex items-center">
                  <Check className="w-3 h-3 mr-1" /> 10% discount applied!
                </p>
              )}
            </form>

            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Special Promo Discount (10%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-gray-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-gray-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100">
                <span>Order Total</span>
                <span className="text-xl text-blue-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full mt-6 bg-[#0052b4] hover:bg-[#003d8a] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-75"
            >
              {isCheckingOut ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
