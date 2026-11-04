import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, MapPin, Sparkles, Star, UtensilsCrossed, Wifi } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { amenityHighlights, galleryImages } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-800">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-wine-700 text-lg font-bold text-white shadow-xl shadow-wine-700/25">
            G
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[0.2em] text-wine-700">GUSHA GUM</div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Hotel & Dining</div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/">Home</Link>
          <Link href="/rooms">Rooms</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/admin/dashboard">Dashboard</Link>
        </nav>

        <Link href="/rooms">
          <Button>Reserve Now</Button>
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-8">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-wine-200 bg-white px-4 py-2 text-sm font-medium text-wine-700 shadow-sm">
            <Sparkles size={16} /> Elegant wine-country hospitality
          </div>

          <h1 className="max-w-xl text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
            Your private retreat in the heart of Addis Ababa.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Gusha Gum Hotel blends refined Ethiopian warmth, modern luxury, and exceptional dining into one unforgettable destination for leisure and business travel.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/rooms">
              <Button size="lg">Book Your Stay <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" size="lg">Explore Dining</Button>
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { value: "4.9/5", label: "Guest Rating" },
              { value: "120+", label: "Luxury Rooms" },
              { value: "24/7", label: "Concierge Service" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-wine-100 bg-white p-4 shadow-luxury">
                <div className="text-2xl font-bold text-wine-700">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-12 h-28 w-28 rounded-full bg-gold-200/70 blur-3xl" />
          <div className="absolute -right-8 bottom-14 h-32 w-32 rounded-full bg-wine-200/70 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-wine-100 bg-white p-3 shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
              alt="Grand hotel exterior"
              width={800}
              height={1000}
              priority
              className="h-[640px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/90 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Signature stay</div>
                  <div className="mt-1 text-xl font-semibold text-slate-900">Presidential Suite</div>
                </div>
                <div className="rounded-full bg-gold-50 px-3 py-2 text-sm font-semibold text-gold-700">From $420</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Exceptional Amenities</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Comfort shaped for refined living</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
          {[
            { icon: BedDouble, title: "Luxury Rooms", description: "Comfort-first elegance with curated suites." },
            { icon: Wifi, title: "High-Speed Wi‑Fi", description: "Seamless connection for work and leisure." },
            { icon: UtensilsCrossed, title: "Fine Dining", description: "Signature Ethiopian and international cuisine." },
            { icon: Star, title: "Spa & Wellness", description: "Restorative rituals in a serene setting." },
            { icon: MapPin, title: "Prime Location", description: "Easy access to city hotspots and transport." },
            { icon: Sparkles, title: "Concierge Care", description: "Tailored experiences for every guest." },
          ].map(({ icon: Icon, title, description }) => (
            <Card key={title} className="group h-full border-wine-100 bg-white/90">
              <CardContent className="space-y-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-wine-50 text-wine-700 transition group-hover:scale-105">
                  <Icon size={22} />
                </div>
                <div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription className="mt-2">{description}</CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Our Gallery</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">A glimpse of the experience</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div key={image} className={`overflow-hidden rounded-[1.5rem] border border-wine-100 bg-white p-2 shadow-luxury ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <Image
                src={image}
                alt={`Gusha Gum Hotel view ${index + 1}`}
                width={1000}
                height={800}
                className={`w-full rounded-[1.2rem] object-cover ${index === 0 ? "h-[420px]" : "h-[200px]"}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-wine-100 bg-gradient-to-r from-wine-700 to-wine-900 p-8 text-white shadow-luxury lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-200">Location</p>
              <h2 className="mt-3 text-3xl font-bold">Find us in the city’s most refined neighborhood.</h2>
              <p className="mt-4 max-w-lg text-base text-wine-100">
                Situated close to Addis Ababa’s business district and cultural heart, Gusha Gum Hotel offers premium access to restaurants, shopping, and landmark attractions.
              </p>
            </div>

            <div className="rounded-[1.6rem] bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3 text-gold-200">
                <MapPin className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.2em]">Address</span>
              </div>
              <div className="space-y-3 text-sm text-white/90">
                <div>Gusha Gum Hotel, Addis Ababa</div>
                <div>Near Bole International Road</div>
                <div>5 minutes from the airport and 10 minutes from central business hubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-wine-100 bg-white p-8 shadow-luxury">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-wine-700">Why guests return</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Every stay is crafted with care.</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {amenityHighlights.map((highlight) => (
                <span key={highlight} className="rounded-full border border-gold-200 bg-gold-50 px-4 py-2 text-sm font-medium text-gold-700">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
