import Logo from "./logo";
import { NavLink } from "@remix-run/react";
import { TwitterLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
  return (
    <div className="bg-neutral-50 h-full fixed w-1/4 pr-[54px]">
      <div className="border-r border-neutral-300 py-12 h-full font-medium text-2xl leading-10 flex flex-col justify-between">
        <div className="px-[54px]">
          <NavLink className="w-full block py-2" to="/">
            <Logo />
          </NavLink>
        </div>
        <nav className="mb-[70px] font-thin">
          <ul className="grid">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `w-full px-[54px] block py-2 ${
                    isActive ? "text-primary-500" : ""
                  }`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `w-full px-[54px] block py-2 ${
                    isActive ? "text-primary-500" : ""
                  }`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `w-full px-[54px] block py-2 ${
                    isActive ? "text-primary-500" : ""
                  }`
                }
                to="/portfolio"
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `w-full px-[54px] block py-2 ${
                    isActive ? "text-primary-500" : ""
                  }`
                }
                to="/blog"
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `w-full px-[54px] block py-2 ${
                    isActive ? "text-primary-500" : ""
                  }`
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="grid gap-2 px-[54px]">
          <a
            className="cursor-pointer flex gap-2 items-center"
            href="https://github.com/RobLMartin?tab=overview&from=2024-02-01&to=2024-02-11"
          >
            <GitHubLogoIcon height={28} width={28} />
            <span className="text-base text-neutral-500 font-light">
              RobLMartin
            </span>
          </a>
          <a
            className="cursor-pointer flex gap-2 items-center"
            href="https://twitter.com/focused_morning"
          >
            <TwitterLogoIcon height={28} width={28} />
            <span className="text-base text-neutral-500 font-light">
              @focused_morning
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
