"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, Sparkles } from "lucide-react";

import { placeOrderAction } from "@/actions/menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { menuSeed } from "@/lib/data";

const categories = ["ALL", "BREAKFAST", "TRADITIONAL_DISHES", "FAST_FOOD", "DRINKS"] as const;
type CategoryFilter = (typeof categories)[number];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("ALL");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderMessage, setOrderMessage] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "ALL") {
      return menuSeed;
    }

    return menuSeed.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const cartItems = menuSeed.filter((item) => cart[item.id]);
  const total = cartItems.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);

  const addToCart = (menuId: string) => {
    setCart((current) => ({
      ...current,
      [menuId]: (current[menuId] ?? 0) + 1,
    }));
  };

  const updateQuantity = (menuId: string, delta: number) => {
    setCart((current) => {
      const nextValue = (current[menuId] ?? 0) + delta;

      if (nextValue <= 0) {
        const { [menuId]: _removed, ...rest } = current;
        return rest;
      }

      return { ...current, [menuId]: nextValue };
    });
  };

  const handleOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = cartItems.map((item) => ({
      id: item.id,
      quantity: cart[item.id] ?? 0,
    }));

    formData.set("items", JSON.stringify(payload));
    const result = await placeOrderAction(formData);
    setOrderMessage(result.success ? result.message : result.message);

    if (result.success) {
      setCart({});
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Restaurant & Bar</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">Chef’s Menu</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm text-gold-700">
          <Sparkles size={16} /> Seasonal tasting experience
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? "bg-wine-700 text-white"
                : "border border-wine-200 bg-white text-wine-700 hover:bg-wine-50"
            }`}
          >
            {category.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {filteredItems.map((item) => {
            const quantity = cart[item.id] ?? 0;

            return (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-wine-700">{item.category}</p>
                      <CardTitle>{item.name}</CardTitle>
                    </div>
                    <div className="text-lg font-bold text-wine-700">${item.price}</div>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} className="rounded-full p-1 text-slate-600 hover:bg-slate-200">
                        <Minus size={14} />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-slate-700">{quantity}</span>
                      <button type="button" onClick={() => addToCart(item.id)} className="rounded-full p-1 text-slate-600 hover:bg-slate-200">
                        <Plus size={14} />
                      </button>
                    </div>
                    <Button variant="secondary" onClick={() => addToCart(item.id)}>Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="h-fit sticky top-6">
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-wine-700">Current Order</p>
                <CardTitle>Cart summary</CardTitle>
              </div>
              <div className="rounded-full bg-wine-50 p-2 text-wine-700"><ShoppingCart size={18} /></div>
            </div>

            <form onSubmit={handleOrder} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Guest name
                  <input name="guestName" type="text" placeholder="Guest or room holder" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Table / Room
                  <input name="roomNumber" type="text" placeholder="T-05 or R-203" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
                </label>
              </div>

              <input type="hidden" name="tableNumber" value="" />
              <input type="hidden" name="items" value="[]" />

              {cartItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                  Your cart is empty. Add a few flavorful items to begin your order.
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                      <div>
                        <div className="font-medium text-slate-800">{item.name}</div>
                        <div className="text-xs text-slate-500">Qty {cart[item.id] ?? 0}</div>
                      </div>
                      <div className="font-semibold text-wine-700">${(item.price * (cart[item.id] ?? 0)).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="rounded-2xl border border-wine-100 bg-wine-50 px-4 py-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total</span>
                  <span className="text-2xl font-bold text-wine-700">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">Place Order</Button>
            </form>

            {orderMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {orderMessage}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
