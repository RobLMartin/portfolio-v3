import { useState } from "react";
import { NavLink } from "@remix-run/react";
import {
  TwitterLogoIcon,
  GitHubLogoIcon,
  TextAlignRightIcon,
  Cross1Icon, // Import Cross1Icon
} from "@radix-ui/react-icons";
import Logo from "./logo";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle closing the menu
  const handleClose = () => setIsOpen(false);

  return (
    <div className="absolute top-0 left-0 right-0 lg:hidden z-50">
      <div className="border-b border-neutral-300 fixed w-full sm:bg-white/30 bg-white/60 backdrop-blur-lg">
        <div className="flex justify-between p-6">
          <NavLink className="block z-50" to="/" onClick={handleClose}>
            <Logo />
          </NavLink>
          <p className="text-2xl font-semibold z-50">Robert Martin</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <TextAlignRightIcon height={30} width={30} />
          </button>
        </div>
        <div
          className={`flex justify-between flex-col fixed inset-0 bg-neutral-100 z-40 overflow-y-auto transition-all duration-300 ease-in-out ${
            isOpen ? "h-screen" : "h-0"
          }`}
        >
          <div className="flex justify-end p-6">
            <button onClick={handleClose}>
              <Cross1Icon height={30} width={30} />
            </button>
          </div>

          <nav className="text-xl p-6 mb-20">
            <ul className="grid gap-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "text-primary-500" : ""}`
                  }
                  to="/"
                  onClick={handleClose}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "text-primary-500" : ""}`
                  }
                  to="/about"
                  onClick={handleClose}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "text-primary-500" : ""}`
                  }
                  to="/portfolio"
                  onClick={handleClose}
                >
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "text-primary-500" : ""}`
                  }
                  to="/blog"
                  onClick={handleClose}
                >
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? "text-primary-500" : ""}`
                  }
                  to="/contact"
                  onClick={handleClose}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <a
                  className="flex gap-2 items-center py-2"
                  href="https://github.com/RobLMartin"
                >
                  <GitHubLogoIcon height={28} width={28} />
                  <span>RobLMartin</span>
                </a>
              </li>
              <li>
                <a
                  className="flex gap-2 items-center py-2"
                  href="https://twitter.com/focused_morning"
                >
                  <TwitterLogoIcon height={28} width={28} />
                  <span>@focused_morning</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
