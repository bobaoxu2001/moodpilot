"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const NAV: NavItem[] = [
  { href: "/", label: "Overview", icon: <HomeIcon /> },
  { href: "/onboarding", label: "Onboarding", icon: <SparkIcon /> },
  { href: "/companion", label: "Companion", icon: <ChatIcon /> },
  { href: "/history", label: "History", icon: <ClockIcon /> },
  { href: "/memory", label: "Memory & privacy", icon: <ShieldIcon /> },
  { href: "/case-study", label: "Case study", icon: <BookIcon /> },
  { href: "/portfolio", label: "JD fit", icon: <BriefcaseIcon /> },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-cream-100 bg-aurora">
      <div className="mx-auto flex max-w-[1340px] flex-col gap-6 px-4 py-5 lg:flex-row lg:px-8 lg:py-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-8">
            <Link href="/" className="mb-8 inline-flex">
              <Logo />
            </Link>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white text-lavender-700 shadow-soft"
                      : "text-ink-soft hover:bg-white/60 hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-xl transition-colors",
                      isActive(item.href)
                        ? "bg-lavender-100 text-lavender-600"
                        : "text-ink-faint group-hover:text-lavender-500"
                    )}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 rounded-3xl border border-lavender-100 bg-white/70 p-4">
              <p className="text-xs font-semibold text-lavender-700">Demo mode</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                The companion calls a local structured-analysis API. No external model call is claimed.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-white text-lavender-700 shadow-soft"
                    : "bg-white/50 text-ink-soft"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1v-8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3v-3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 5h7v14H6a1 1 0 0 1-1-1V5zM12 5h7v13a1 1 0 0 1-1 1h-6V5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4" y="7" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M10 12v2h4v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
