"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import ToggleMode from "./toggle-mode";
import { Input } from "@/components/ui/input";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from "@clerk/nextjs";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user) return;

      const res = await fetch("/api/user-role");
      const data = await res.json();
      setRole(data.role);
    };

    fetchRole();
  }, [user]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  simply
                </span>
                <span className="text-foreground">alpha</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
               {isSignedIn && (
                <>
              <Link
                href="/newsfeed"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Newsfeed
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Articles
              </Link>
              <Link
                href="/discover"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Discover
              </Link>
              <Link
                href="/watchlist"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Watchlist
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About Us
              </Link>
               </>)}
              {role === "admin" && (
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <SearchInput />

            {/* Theme Toggle */}
            <ToggleMode />

            {/* User Actions */}
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/newsfeed"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsfeed
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/discover"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Discover
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
