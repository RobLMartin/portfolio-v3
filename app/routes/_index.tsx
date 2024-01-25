import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import profileImage from "~/images/profile_image.jpeg";
import { ContactForm } from "~/components/ContactForm";

export const meta: MetaFunction = () => {
  return [
    { title: "Robert Martin" },
    {
      name: "description",
      content: "Robert Martin software engineer portfolio site",
    },
  ];
};

export default function Index() {
  return (
    <div className="">
      <div className="min-h-screen flex flex-col items-center justify-center space-y-8 container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <img
          src={profileImage}
          alt="Profile"
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full mx-auto"
        />
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Rob Martin
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl">
            Software Engineer
            {/* <Link to="https://virtu.studio" className="text-emerald-400">
              virtu.studio
            </Link> */}
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg">
            Crafting Software That Reshapes the World Through Digital Innovation
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link to="https://github.com/RobLMartin" className="text-emerald-400">
            GitHub
          </Link>
          <Link
            to="https://www.linkedin.com/in/roblmartin/"
            className="text-emerald-400"
          >
            LinkedIn
          </Link>
          <Link
            to="https://twitter.com/focused_morning"
            className="text-emerald-400"
          >
            Twitter
          </Link>
        </div>
      </div>
      <div className="flex justify-center mb-4 -mt-20">
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 text-emerald-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
      <div className="bg-zinc-900">
        <div className="mt-10 p-8 flex flex-col sm:flex-row w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center w-full sm:w-1/2 grid place-content-center">
            Contact Me
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
