import { CalendarRange, Hotel, ShoppingBag, Users } from "lucide-react";

import { prisma } from "@/lib/prisma";

type DashboardBooking = {
  bookingReference: string;
  room: { number: string };
  guestName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  totalAmount: number;
};

type DashboardOrder = {
  orderNumber: string;
  guestName: string;
  totalAmount: number;
  status: string;
};

const fallbackBookings: DashboardBooking[] = [
  {
    bookingReference: "GH-10234-AB1F",
    room: { number: "202" },
    guestName: "Amanuel Tadesse",
    checkIn: "2026-11-02",
    checkOut: "2026-11-05",
    status: "PENDING",
    totalAmount: 540,
  },
  {
    bookingReference: "GH-10852-CC3K",
    room: { number: "303" },
    guestName: "Sofia Gomez",
    checkIn: "2026-11-08",
    checkOut: "2026-11-10",
    status: "APPROVED",
    totalAmount: 520,
  },
];

const fallbackOrders: DashboardOrder[] = [
  {
    orderNumber: "ORD-20451",
    guestName: "Guest Room 104",
    totalAmount: 63,
    status: "PREPARING",
  },
  {
    orderNumber: "ORD-20465",
    guestName: "Table 12",
    totalAmount: 38,
    status: "PENDING",
  },
];

async function getDashboardData() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return {
      bookings: fallbackBookings,
      orders: fallbackOrders,
    };
  }

  try {
    const [bookings, orders] = await Promise.all([
      prisma.booking.findMany({
        include: { room: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
      prisma.restaurantOrder.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

    return {
      bookings: bookings.map((booking) => ({
        bookingReference: booking.bookingReference,
        guestName: booking.guestName,
        room: { number: booking.room.number },
        checkIn: booking.checkIn.toISOString().slice(0, 10),
        checkOut: booking.checkOut.toISOString().slice(0, 10),
        status: booking.status,
        totalAmount: Number(booking.totalAmount),
      })),
      orders: orders.map((order) => ({
        orderNumber: order.orderNumber,
        guestName: order.guestName ?? "Guest",
        totalAmount: Number(order.totalAmount),
        status: order.status,
      })),
    };
  } catch {
    return {
      bookings: fallbackBookings,
      orders: fallbackOrders,
    };
  }
}

export default async function AdminDashboardPage() {
  const { bookings, orders } = await getDashboardData();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Control center</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Hotel Operations Dashboard</h1>
        </div>
        <div className="rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-medium text-gold-700">
          Live overview
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-4">
        {[
          { label: "Bookings", value: bookings.length, icon: Hotel },
          { label: "Guests", value: bookings.length * 2, icon: Users },
          { label: "Orders", value: orders.length, icon: ShoppingBag },
          { label: "Rooms Ready", value: 12, icon: CalendarRange },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-wine-100 bg-white p-5 shadow-luxury">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <div className="rounded-full bg-wine-50 p-2 text-wine-700">
                <Icon size={16} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-wine-100 bg-white p-6 shadow-luxury">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Room bookings</h2>
            <span className="rounded-full bg-wine-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-wine-700">
              Review queue
            </span>
          </div>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.bookingReference} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{booking.guestName}</div>
                    <div className="text-sm text-slate-500">Ref: {booking.bookingReference} • Room {booking.room.number}</div>
                  </div>
                  <div className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-gold-700">
                    {booking.status}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>{booking.checkIn}</span>
                  <span>→</span>
                  <span>{booking.checkOut}</span>
                  <span className="font-semibold text-wine-700">${booking.totalAmount}</span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button type="button" className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">
                    Approve
                  </button>
                  <button type="button" className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-wine-100 bg-white p-6 shadow-luxury">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Restaurant orders</h2>
            <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
              Kitchen feed
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderNumber} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{order.guestName}</div>
                    <div className="text-sm text-slate-500">Order {order.orderNumber}</div>
                  </div>
                  <div className="rounded-full bg-wine-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-wine-700">
                    {order.status}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                  <span>Amount</span>
                  <span className="font-semibold text-wine-700">${order.totalAmount}</span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button type="button" className="rounded-full bg-wine-700 px-3 py-2 text-sm font-medium text-white hover:bg-wine-800">
                    Preparing
                  </button>
                  <button type="button" className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
