'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu, X, ChevronDown, User, CreditCard, Mail, LogOut, LayoutDashboard, Building2, Briefcase, TrendingUp, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Search Bar Component
const SearchBar = ({ className = "" }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`relative w-full max-w-xl ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search stocks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 bg-secondary/50 border-border focus-visible:ring-primary"
      />
    </div>
  );
};

// User Menu Component
const UserMenu = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/user.jpg" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAdmin && (
          <>
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard Access</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Subscription & Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          <span>Email Alerts</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// More Menu Component
const MoreMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-1">
          More
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Building2 className="mr-2 h-4 w-4" />
          <span>About Us</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Briefcase className="mr-2 h-4 w-4" />
          <span>Careers</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TrendingUp className="mr-2 h-4 w-4" />
          <span>Investment Framework</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Mode Toggle Component
const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Notification Bell Component
const NotificationBell = () => {
  const [hasNotifications] = useState(true);

  return (
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="h-5 w-5" />
      {hasNotifications && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
      )}
    </Button>
  );
};

// Main Navbar Component
interface NavbarProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
}

const Navbar = ({ isLoggedIn = false, isAdmin = false }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Button variant="ghost" className="text-xl font-bold text-primary hover:text-primary/90">
              Simply Alpha
            </Button>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchBar />
          </div>

          {/* Right: Navigation Items (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="ghost">Newsfeed</Button>
                <Button variant="ghost">Discover</Button>
                <Button variant="ghost">Watchlist</Button>
                <MoreMenu />
                <NotificationBell />
                <ModeToggle />
                <UserMenu isAdmin={isAdmin} />
              </>
            ) : (
              <>
                <Button variant="ghost">Login</Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              {/* Mobile Search */}
              <div className="mt-6 mb-6">
                <SearchBar />
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/avatars/user.jpg" alt="User" />
                        <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@example.com</p>
                      </div>
                    </div>

                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      Newsfeed
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      Discover
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      Watchlist
                    </Button>
                    
                    <div className="my-2 border-t border-border" />
                    
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Building2 className="mr-2 h-4 w-4" />
                      About Us
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Briefcase className="mr-2 h-4 w-4" />
                      Careers
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Investment Framework
                    </Button>
                    
                    <div className="my-2 border-t border-border" />
                    
                    {isAdmin && (
                      <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard Access
                      </Button>
                    )}
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Subscription & Billing
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email Alerts
                    </Button>
                    
                    <div className="my-2 border-t border-border" />
                    
                    <Button 
                      variant="ghost" 
                      className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                    <Button 
                      className="justify-start bg-primary text-primary-foreground hover:bg-primary/90" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// Demo Component
export default function NavbarDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      
      {/* Demo Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Navbar Demo Controls</h2>
            <p className="text-muted-foreground mb-6">
              Toggle between different states to see how the navbar adapts.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">User Status</label>
                <Button
                  variant={isLoggedIn ? "default" : "outline"}
                  onClick={() => setIsLoggedIn(!isLoggedIn)}
                >
                  {isLoggedIn ? "Logged In" : "Logged Out"}
                </Button>
              </div>
              
              {isLoggedIn && (
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Admin Access</label>
                  <Button
                    variant={isAdmin ? "default" : "outline"}
                    onClick={() => setIsAdmin(!isAdmin)}
                  >
                    {isAdmin ? "Admin" : "Regular User"}
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Fully responsive with mobile menu</li>
                <li>Guest vs. Logged-in states</li>
                <li>Admin-specific menu items</li>
                <li>Search bar with icon</li>
                <li>Notification bell with indicator</li>
                <li>User avatar dropdown</li>
                <li>More menu with company links</li>
                <li>Clean fintech aesthetics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}