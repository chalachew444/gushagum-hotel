"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { RoomStatus } from "@prisma/client";

const bookingSchema = z.object({
  roomId: z.string().min(1),
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(7),
  guestCount: z.coerce.number().int().min(1).max(6),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  paymentMethod: z.enum(["TELEBIRR", "CHAPA", "PAY_AT_HOTEL"]),
  notes: z.string().optional().default(""),
});

export async function generateBookingReference() {
  const timestamp = Date.now().toString().slice(-6);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 5; i += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return `GH-${timestamp}-${code}`;
}

export async function createBooking(formData: FormData) {
  const raw = {
    roomId: formData.get("roomId")?.toString() ?? "",
    guestName: formData.get("guestName")?.toString() ?? "",
    guestEmail: formData.get("guestEmail")?.toString() ?? "",
    guestPhone: formData.get("guestPhone")?.toString() ?? "",
    guestCount: formData.get("guestCount")?.toString() ?? "1",
    checkIn: formData.get("checkIn")?.toString() ?? "",
    checkOut: formData.get("checkOut")?.toString() ?? "",
    paymentMethod: formData.get("paymentMethod")?.toString() ?? "PAY_AT_HOTEL",
    notes: formData.get("notes")?.toString() ?? "",
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete all booking details correctly.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { roomId, guestName, guestEmail, guestPhone, guestCount, checkIn, checkOut, paymentMethod, notes } = parsed.data;

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || endDate <= startDate) {
    return {
      success: false,
      message: "Check-in and check-out dates must be valid and the check-out must be later than check-in.",
    };
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      bookings: {
        where: {
          status: {
            in: ["PENDING", "APPROVED", "CHECKED_IN"],
          },
        },
      },
    },
  });

  if (!room) {
    return {
      success: false,
      message: "Selected room is not available.",
    };
  }

  if (room.status === RoomStatus.CLEANING) {
    return {
      success: false,
      message: "This room is currently under cleaning and cannot be booked.",
    };
  }

  const hasConflict = room.bookings.some((booking) => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);

    return startDate < bookingEnd && endDate > bookingStart;
  });

  if (hasConflict) {
    return {
      success: false,
      message: "This room is already booked for the selected dates.",
    };
  }

  const nights = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
  const totalAmount = Number(room.pricePerNight) * nights;

  const bookingReference = await generateBookingReference();

  const booking = await prisma.booking.create({
    data: {
      bookingReference,
      guestName,
      guestEmail,
      guestPhone,
      guestCount,
      checkIn: startDate,
      checkOut: endDate,
      totalAmount: totalAmount.toFixed(2),
      paymentMethod: paymentMethod,
      status: "PENDING",
      notes: notes || null,
      roomId: room.id,
    },
    include: {
      room: true,
    },
  });

  revalidatePath("/rooms");
  revalidatePath("/admin/dashboard");

  return {
    success: true,
    message: `Booking request created successfully. Reference: ${booking.bookingReference}`,
    bookingReference: booking.bookingReference,
    roomName: booking.room.name,
  };
}
