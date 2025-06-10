"use client";

import * as React from "react";

// @components
import {
  Button,
  Navbar,
  Collapse,
  IconButton,
  Typography,
} from "@material-tailwind/react";

// @icons
import { Menu, Xmark } from "iconoir-react";

const NAV_LIST = ["Newsfeed", "Discover","Watchlist", "About Us", "Privacy Policy", "Terms of Service"];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-6 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {NAV_LIST.map((label) => (
        <li key={label}>
          <Typography as="a" href="#" className="p-1">
            {label}
          </Typography>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar10() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    }

    window.addEventListener("resize", () => handleResize);

    return () => {
      window.removeEventListener("resize", () => handleResize);
    };
  }, []);

  return (
    <Navbar
      variant="ghost"
      className="rounded-none py-3 border-0 bg-transparent"
    >
      <div className="container mx-auto">
        <div className="flex items-center relative">
          <Typography
            as="a"
            href="#"
            type="lead"
            className="block py-1 font-semibold"
          >
            Simply Alpha
          </Typography>
          <div className="hidden lg:block  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavList />
          </div>
          <Button
            color="secondary"
            className="hidden lg:ml-auto lg:inline-block"
          >
            Sign In
          </Button>
          <IconButton
            color="secondary"
            className="ml-auto grid lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <Button isFullWidth color="secondary" className="mt-4">
            Sign In
          </Button>
        </Collapse>
      </div>
    </Navbar>
  );
}