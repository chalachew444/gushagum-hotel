"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  guestName: z.string().min(2).optional().or(z.literal("")),
  tableNumber: z.string().optional().or(z.literal("")),
  roomNumber: z.string().optional().or(z.literal("")),
  items: z.string().min(1),
});

export async function placeOrderAction(formData: FormData) {
  const raw = {
    guestName: formData.get("guestName")?.toString() ?? "",
    tableNumber: formData.get("tableNumber")?.toString() ?? "",
    roomNumber: formData.get("roomNumber")?.toString() ?? "",
    items: formData.get("items")?.toString() ?? "[]",
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Order details are incomplete.",
    };
  }

  let cartItems: Array<{ id: string; quantity: number }> = [];

  try {
    cartItems = JSON.parse(parsed.data.items) as Array<{ id: string; quantity: number }>;
  } catch {
    return {
      success: false,
      message: "Cart data could not be processed.",
    };
  }

  const validItems = cartItems.filter((item: { id: string; quantity: number }) => item.id && Number(item.quantity) > 0);

  if (!validItems.length) {
    return {
      success: false,
      message: "Please add something to the cart before placing the order.",
    };
  }

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: validItems.map((item) => item.id),
      },
    },
  });

  const itemsWithPrices = validItems
    .map((item) => {
      const recipe = menuItems.find((entry: { id: string }) => entry.id === item.id);

      if (!recipe) {
        return null;
      }

      return {
        menuItemId: recipe.id,
        quantity: item.quantity,
        unitPrice: Number(recipe.price),
      };
    })
    .filter(Boolean) as Array<{ menuItemId: string; quantity: number; unitPrice: number }>;

  if (!itemsWithPrices.length) {
    return {
      success: false,
      message: "One or more menu items are unavailable.",
    };
  }

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
  const totalAmount = itemsWithPrices.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  const order = await prisma.restaurantOrder.create({
    data: {
      orderNumber,
      guestName: parsed.data.guestName || "Guest",
      tableNumber: parsed.data.tableNumber || null,
      roomNumber: parsed.data.roomNumber || null,
      totalAmount: totalAmount.toFixed(2),
      items: {
        create: itemsWithPrices.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toFixed(2),
          totalPrice: (item.unitPrice * item.quantity).toFixed(2),
        })),
      },
    },
    include: {
      items: true,
    },
  });

  revalidatePath("/menu");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    message: `Order ${order.orderNumber} has been placed successfully.`,
    orderNumber: order.orderNumber,
  };
}
