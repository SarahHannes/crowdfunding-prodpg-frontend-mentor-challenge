import { useState, useRef } from "react";

import crowdfundLogo from "/logo.svg";
import heroDesktop from "/image-hero-desktop.jpg";
import heroMobile from "/image-hero-mobile.jpg";
import menuOpenIcon from "/icon-hamburger.svg";
import menuCloseIcon from "/icon-close-menu.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navMobile = useRef(null);

  function showMenu() {
    setMenuOpen((prev) => {
      if (prev === false) {
        // now showing
        if (navMobile.current !== null) {
          navMobile.current.classList.remove("invisible");
          navMobile.current.classList.add("visible");
        }
      } else {
        // now closing
        if (navMobile.current !== null) {
          navMobile.current.classList.add("invisible");
          navMobile.current.classList.remove("visible");
        }
      }
      return !prev;
    });

    console.log("menu is clicked. now:", menuOpen ? "opened" : "closed");
  }

  return (
    <header className="pb-8">
      <div className="absolute">
        <picture>
          {/* desktop >= 770px */}
          <source
            media="(min-width: 600px)"
            srcSet={heroDesktop}
            alt="Desktop computer on a Bamboo Monitor Riser"
          />

          {/* Mobile */}
          <img
            className="object-cover"
            src={heroMobile}
            alt="moibleDesktop computer on a Bamboo Monitor Riser"
          />
        </picture>
      </div>

      <nav className="relative">
        <div className="p-5 pb-0 flex flex-wrap justify-between mx-auto md:items-center">
          <a href="#">
            <img src={crowdfundLogo} alt="Crowdfund Logo" />
          </a>

          <button
            onClick={showMenu}
            data-collapse-toggle="navbar-default"
            className="inline-flex md:hidden"
            type="button"
            aria-controls="navbar-default"
            aria-expanded="false">
            <img
              className="hover:cursor-pointer object-cover"
              src={menuOpen ? menuCloseIcon : menuOpenIcon}
              alt="Open main menu"
            />
          </button>

          <div
            ref={navMobile}
            className="z-40 shadow-[0_100px_100px_50px_rgba(0,0,0,0.3)] md:shadow-none bg-white invisible rounded w-full my-2 mb-0 md:block md:visible md:w-auto md:mx-20 md:bg-transparent"
            id="navbar-default">
            <ul className="flex flex-col justify-center md:flex-row md:space-x-4 md:text-white">
              <li className="hover:cursor-pointer p-4 font-semibold border-b-1 border-(--color-dark-gray)/30 md:border-0">
                <a href="#">About</a>
              </li>
              <li className="hover:cursor-pointer p-4 font-semibold border-b-1 border-(--color-dark-gray)/30 md:border-0">
                <a href="#">Discover</a>
              </li>
              <li className="hover:cursor-pointer p-4 font-semibold">
                <a href="#">Get Started</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
