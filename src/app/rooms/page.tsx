"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, MapPin, Users, UtensilsCrossed } from "lucide-react";

import { createBooking } from "@/actions/booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { roomSeed } from "@/lib/data";

const filterOptions = ["ALL", "SINGLE", "DOUBLE", "SUITE", "VIP"] as const;
type RoomFilter = (typeof filterOptions)[number];

export default function RoomsPage() {
  const [activeFilter, setActiveFilter] = useState<RoomFilter>("ALL");
  const [selectedRoomId, setSelectedRoomId] = useState(roomSeed[0]?.id ?? "");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredRooms = useMemo(() => {
    if (activeFilter === "ALL") {
      return roomSeed;
    }

    return roomSeed.filter((room) => room.type === activeFilter);
  }, [activeFilter]);

  const selectedRoom =
    filteredRooms.find((room) => room.id === selectedRoomId) ?? roomSeed.find((room) => room.id === selectedRoomId) ?? roomSeed[0];

  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("roomId", selectedRoom.id);

    const result = await createBooking(formData);
    setStatusMessage(result.success ? result.message : result.message);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Stay in luxury</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">Room Collection</h1>
        </div>
        <div className="rounded-full border border-wine-200 bg-white px-4 py-2 text-sm text-slate-600">
          Curated comfort for business, leisure, and celebration.
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-wine-700 text-white shadow-lg shadow-wine-700/20"
                : "border border-wine-200 bg-white text-wine-700 hover:bg-wine-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className={`overflow-hidden transition duration-200 ${
                selectedRoom.id === room.id ? "ring-2 ring-gold-400" : "hover:shadow-xl"
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={room.imageUrl} alt={room.name} className="h-full w-full object-cover" />
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-wine-700">{room.type}</p>
                    <CardTitle>{room.name}</CardTitle>
                  </div>
                  <div className="rounded-full bg-wine-50 px-3 py-1 text-sm font-semibold text-wine-700">
                    ${room.pricePerNight}/night
                  </div>
                </div>
                <p className="text-sm text-slate-600">{room.description}</p>
                <div className="flex flex-wrap gap-2">
                  {room.features.map((feature) => (
                    <span key={feature} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users size={16} /> {room.capacity} Guests
                  </div>
                  <Button variant={selectedRoom.id === room.id ? "secondary" : "default"} onClick={() => setSelectedRoomId(room.id)}>
                    {selectedRoom.id === room.id ? "Selected" : "Choose Room"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit sticky top-6 overflow-hidden">
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-wine-700">Booking</p>
              <CardTitle className="mt-2 text-2xl">{selectedRoom.name}</CardTitle>
              <CardDescription className="mt-2">{selectedRoom.description}</CardDescription>
            </div>

            <div className="grid gap-3 rounded-2xl border border-wine-100 bg-wine-50 p-4 text-sm text-slate-700">
              <div className="flex items-center gap-2"><MapPin size={16} className="text-wine-700" /> Room {selectedRoom.number}</div>
              <div className="flex items-center gap-2"><CalendarDays size={16} className="text-wine-700" /> {selectedRoom.type} room</div>
              <div className="flex items-center gap-2"><UtensilsCrossed size={16} className="text-wine-700" /> Breakfast included</div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Check-in
                  <input name="checkIn" type="date" required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0 transition focus:border-wine-700" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Check-out
                  <input name="checkOut" type="date" required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0 transition focus:border-wine-700" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Guests
                  <input name="guestCount" type="number" min={1} max={6} defaultValue={2} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none ring-0 transition focus:border-wine-700" />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Payment
                  <select name="paymentMethod" defaultValue="PAY_AT_HOTEL" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700">
                    <option value="PAY_AT_HOTEL">Pay at Hotel</option>
                    <option value="TELEBIRR">Telebirr</option>
                    <option value="CHAPA">Chapa</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Guest Name
                <input name="guestName" type="text" placeholder="Your full name" required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block space-y-2 text-sm font-medium text-slate-700">
                  Email
                  <input name="guestEmail" type="email" placeholder="you@example.com" required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
                </label>
                <label className="block space-y-2 text-sm font-medium text-slate-700">
                  Phone
                  <input name="guestPhone" type="tel" placeholder="+251 ..." required className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
                </label>
              </div>

              <label className="block space-y-2 text-sm font-medium text-slate-700">
                Notes
                <textarea name="notes" rows={3} placeholder="Any special requests?" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-wine-700" />
              </label>

              <Button type="submit" className="w-full" size="lg">
                <Check className="h-4 w-4" /> Confirm Reservation
              </Button>
            </form>

            {statusMessage ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {statusMessage}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
