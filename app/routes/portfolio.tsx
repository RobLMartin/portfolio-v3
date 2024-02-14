import { Link2Icon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { SanityImage } from "~/components/sanity.image";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { PORTFOLIO_QUERY } from "~/sanity/queries";

export const loader = async () => {
  const initial = await loadQuery<SanityDocument[]>(PORTFOLIO_QUERY);

  return { initial, query: PORTFOLIO_QUERY, params: {} };
};

export default function PortfolioPage() {
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

  // `data` should contain the initial data from the loader
  // `loading` will only be true when Visual Editing is enabled
  if (loading && !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full border-b border-t border-neutral-300 mt-20 lg:mt-0 relative">
      <div className="md:w-1/3 px-6 md:px-12 border-b md:border-b-0 md:border-r border-neutral-300">
        <h1 className="font-semibold text-2xl py-6 md:py-12 leading-[45px] sticky top-20 lg:top-0">
          Portfolio
        </h1>
      </div>
      <div className="md:w-2/3 grid xl:grid-cols-2 border-neutral-300">
        {data.map((project) => (
          <Link
            key={project.post.slug.current}
            to={`/blog/${project.post.slug.current}`}
            className="flex flex-col items-start justify-start border-neutral-300 hover:bg-neutral-50 transition-colors duration-300 ease-in-out border-b md:border-r md:h-[563.64px]"
          >
            <div className="w-full overflow-hidden border-neutral-300 md:border-b-0">
              <SanityImage
                image={project.post.mainImage}
                maxWidth={507}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>

            <div className="p-6 mb-12">
              <h2 className="font-semibold text-lg md:text-xl mb-1">
                {project.title}
              </h2>
              <p className="text-neutral-600 text-md md:text-lg mb-1">
                {project.description}
              </p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="items-center mb-3 flex hover:underline"
              >
                <Link2Icon />
                <span className="ml-2">{project.link}</span>
              </a>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(({ name }: any) => (
                  <span
                    key={name}
                    className="text-xs md:text-base font-medium text-primary-800 bg-primary-100 px-4 py-1 rounded-full"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end w-full p-6">
              <ArrowRightIcon height={28} width={28} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
