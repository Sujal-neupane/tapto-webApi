"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Zap,
  Shield,
  Sparkles,
  Smartphone,
  ArrowRight,
  ChevronRight,
  Laptop,
  Check,
  ShoppingBag,
  CreditCard,
  Globe
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden selection:bg-primary-100 selection:text-primary-900">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo1.png"
                alt="TAPTO Logo"
                width={48}
                height={48}
                className="h-10 w-10"
              />
              <div>
                <span className="text-2xl font-bold font-heading text-gray-900 tracking-tight">TAPTO</span>
              </div>
            </Link>

            {/* Nav Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="hidden sm:inline-flex px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all shadow-lg shadow-primary-500/20"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Section with Web + Mobile Mockups ── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto mb-20 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-8">
              <Sparkles className="w-3 h-3" />
              <span className="relative">
                The All-In-One Commerce Platform
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-200"></span>
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold font-heading text-gray-900 tracking-tight leading-[0.95] mb-8">
              Shop anywhere. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Sync everywhere.</span>
            </h1>

            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Seamlessly switch between your phone and desktop.
              Your cart, favorites, and drops follow you across the web.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-10 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/20 hover:-translate-y-1"
              >
                Start Tapping
              </Link>
              <span className="text-sm text-gray-400 font-medium">No app download needed</span>
            </div>
          </div>

          {/* ── Mockup Composition ── */}
          <div className="relative mt-20 h-[500px] md:h-[600px] w-full max-w-7xl mx-auto perspective-1000 flex items-center justify-center">

            {/* Laptop Mockup (Left, Angled Right) */}
            <div className="relative w-[60%] md:w-[600px] aspect-[16/10] bg-white rounded-t-xl shadow-2xl border-[12px] border-gray-900 z-10 transform -rotate-y-12 translate-x-10 hover:-translate-x-4 transition-all duration-700 ease-out origin-right">
              {/* Screen Header */}
              <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              {/* Screen Content */}
              <div className="h-full w-full bg-gray-50 p-4 relative overflow-hidden">
                <div className="flex gap-4 h-full">
                  <div className="w-1/4 h-full bg-white rounded-lg shadow-sm"></div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg shadow-sm h-32"></div>
                    <div className="bg-white rounded-lg shadow-sm h-32"></div>
                    <div className="bg-white rounded-lg shadow-sm h-32"></div>
                    <div className="bg-white rounded-lg shadow-sm h-32"></div>
                  </div>
                </div>
                {/* Overlay UI */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-lg border border-gray-100">
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary-600" />
                    tapto.com
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup (Right, Angled Left - Back to Back feel) */}
            <div className="relative w-48 md:w-64 aspect-[9/19] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-gray-900 z-20 transform rotate-y-12 -translate-x-10 hover:translate-x-4 transition-all duration-700 ease-out origin-left">
              <div className="h-full w-full bg-white relative rounded-[2rem] overflow-hidden">
                {/* Mobile Header */}
                <div className="absolute top-0 inset-x-0 h-12 bg-white/90 backdrop-blur z-10 flex items-center justify-center">
                  <span className="font-bold text-primary-600 text-sm">TAPTO</span>
                </div>
                {/* Mobile Content */}
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Mobile" />
                {/* Floating Elements on Phone */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 uppercase font-bold">New Drop</span>
                      <span className="text-sm font-bold text-gray-900">NPR 1290.00</span>
                    </div>
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sync Badge */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-5 py-3 rounded-full shadow-2xl border border-gray-100 z-30 flex items-center gap-3 animate-float-delayed">
              <div className="p-1.5 bg-green-100 rounded-full text-green-600">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                Desktop <span className="text-gray-400">&harr;</span> Mobile
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Breakdown (Z-Pattern) ── */}
      <section className="bg-gray-50 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">

          {/* Feature 1: Universal Cart */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex items-center justify-center overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

                {/* Visual: Laptop and Phone syncing */}
                <div className="relative flex items-center gap-4">
                  {/* Laptop Icon Rep */}
                  <div className="w-32 h-24 bg-gray-900 rounded-lg flex items-center justify-center relative">
                    <div className="w-24 h-16 bg-white rounded flex items-center justify-center text-xs text-gray-400">TAPTO Web</div>
                    <div className="absolute -bottom-2 w-40 h-2 bg-gray-800 rounded-b-lg"></div>
                  </div>

                  {/* Sync Particles */}
                  <div className="flex gap-1 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-600"></div>
                  </div>

                  {/* Phone Icon Rep */}
                  <div className="w-16 h-28 bg-white border-4 border-gray-900 rounded-2xl flex items-center justify-center relative shadow-lg">
                    <div className="w-10 h-16 bg-gray-50 rounded flex items-center justify-center text-[8px] text-gray-400">App</div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-8 right-8 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-bounce">
                  <Check className="w-4 h-4" /> Synced
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                <Globe className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900">
                Start here. <br /> <span className="text-primary-600">Finish there.</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Add to cart on your morning commute. Checkout on your desktop at work.
                Your shopping bag follows you everywhere you go, instantly.
              </p>
              <ul className="space-y-3 pt-4">
                {['Real-time cart synchronization', 'Cross-device wishlist', 'Shared history'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2: Instant Checkout */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl p-8 flex items-center justify-center overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                {/* Blur effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/20 rounded-full blur-3xl"></div>

                {/* Visual: Checkout Card */}
                <div className="relative w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-bold text-lg">Checkout</span>
                    <span className="text-xs text-gray-400">Tapto Pay</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Total</div>
                      <div className="font-bold text-xl">NPR 1420.50</div>
                    </div>
                  </div>
                  <div className="h-12 bg-primary-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary-600/30 cursor-pointer hover:bg-primary-500 transition-colors">
                    Pay Now
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="w-14 h-14 bg-secondary-100 rounded-2xl flex items-center justify-center text-secondary-600">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900">
                Checkout in <br /> <span className="text-secondary-500">Seconds.</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Skip the forms. Our one-tap checkout remembers your preferences
                so you can secure that limited drop before it's gone.
              </p>
            </div>
          </div>

          {/* Feature 3: Security */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-[#F9FAFB] pattern-grid-lg opacity-50"></div>

                {/* Visual: Shield Concept */}
                <div className="relative z-10">
                  <div className="w-40 h-48 bg-gradient-to-b from-gray-100 to-white border border-gray-200 rounded-[3rem] flex items-center justify-center shadow-lg transform group-hover:rotate-y-12 transition-transform duration-700 perspective-1000">
                    <Shield className="w-20 h-20 text-gray-300 group-hover:text-primary-600 transition-colors duration-500" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 whitespace-nowrap">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-gray-900">256-bit Encrypted</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900">
                <Shield className="w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900">
                Ironclad <br /> <span className="text-gray-400">Protection.</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We take security seriously. Every transaction is encrypted,
                monitored, and insured. Shop without a second thought.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Big Impact CTA ── */}
      <section className="py-32 relative bg-gray-900 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight">
            Your new favorite <br /> way to shop.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="px-12 py-5 bg-white text-gray-900 rounded-full font-bold text-xl hover:scale-105 transition-transform"
            >
              Get Started Free
            </Link>
            <Link
              href="/auth/login"
              className="px-12 py-5 border border-white/20 text-white rounded-full font-bold text-xl hover:bg-white/10 transition-colors"
            >
              Browser Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-heading text-gray-900">TAPTO</span>
          </div>
          <div className="flex gap-8">
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer">
              <Globe className="w-4 h-4" />
            </span>
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-pointer">
              <Smartphone className="w-4 h-4" />
            </span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 Tapto Inc.
          </div>
        </div>
      </footer>
    </main>
  );
}
