import { Link, useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { LANDING_QUERY } from "~/sanity/queries";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export const loader = async () => {
  const initial = await loadQuery<SanityDocument>(LANDING_QUERY);

  return { initial, query: LANDING_QUERY, params: {} };
};

export default function Home() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const initialDataAdjusted = {
    ...initial,
    sourceMap: {
      mappings: {}, // Your mappings here
      documents: [], // Your documents here
      paths: [], // Your paths here
    },
  };

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: initialDataAdjusted,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("data", data);

  return (
    <div className="mt-20 lg:mt-0 border-t border-neutral-300 border-r">
      <div className="lg:w-2/3 lg:border-r border-neutral-300">
        <div className="p-6 md:p-12 py-[15vh] md:py-[25vh]">
          <h1 className="text-6xl sm:text-7xl md:text-8xl">{data.headline}</h1>
          <p className="md:leading-[3rem] text-lg sm:text-xl md:text-2xl tracking-wider text-neutral-600 max-w-xl lg:max-w-3xl">
            {data.subtitle}
          </p>
          <div className="inline-flex mt-3 md:mt-6">
            <Link
              to="/contact"
              className="font-medium py-3 px-6 md:py-6 md:px-12 bg-neutral-950 hover:bg-primary-400 hover:text-neutral-950 rounded-full text-white text-md md:text-xl transition-colors duration-300 ease-in-out"
            >
              {data.cta}
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-5xl px-6 border-neutral-300 border-y  p-6 md:p-12">
          {data.servicesTitle}
        </h2>
        <div className="grid md:grid-cols-3 border-b border-neutral-300">
          {data.services.map((service: any, index: number) => (
            <div
              key={index}
              className="last:border-r-0 last:border-b-0 border-b md:border-b-0 md:border-r border-neutral-300 p-6 md:p-12"
            >
              <span className="text-3xl md:text-5xl text-neutral-500 mb-6 md:mb-12 block">
                {"0" + (index + 1)}
              </span>
              <div className="grid gap-1">
                <h2 className="font-medium text-2xl">{service.service}</h2>
                <p className="text-xl">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl px-6 border-neutral-300 border-b p-6 md:p-12">
          {data.featuredProjectsTitle}
        </h2>
        <div>
          {data.featuredProjects.map((project: any, index: number) => (
            <a
              key={index}
              href={project.link}
              className="grid grid-cols-1 p-6 md:p-12 border-b border-neutral-300 cursor-pointer hover:bg-neutral-950 hover:text-neutral-100 transition-colors duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center">
                <div className="grid gap-1">
                  <h2 className="font-medium text-2xl">{project.title}</h2>
                  <p className="text-xl">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <ArrowRightIcon height={40} width={40} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="border-neutral-300 border-b px-6 pt-6 md:px-12 md:pt-12 pb-20 flex xl:items-center xl:justify-between flex-col xl:flex-row items-left gap-6">
        <h2 className="text-3xl md:text-4xl max-w-2xl">
          {data.secondHeadline}
        </h2>
        <div className="inline-block">
          <Link
            to="/contact"
            className="font-medium py-3 px-6 md:py-6 md:px-12 bg-neutral-950 text-white hover:bg-primary-400 hover:text-neutral-950 rounded-full text-md md:text-xl transition-colors duration-300 ease-in-out inline-block whitespace-nowrap"
          >
            {data.secondCta}
          </Link>
        </div>
      </div>
    </div>
  );
}
