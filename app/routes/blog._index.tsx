import { Link, useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { POSTS_QUERY } from "~/sanity/queries";
import { SanityImage } from "~/components/sanity.image";

export const loader = async () => {
  const initial = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  return { initial, query: POSTS_QUERY, params: {} };
};

export default function Index() {
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
          Blog
        </h1>
      </div>
      <div className="md:w-2/3 border-neutral-300">
        {data.map((post) => (
          <Link
            key={post.slug.current}
            to={`/blog/${post.slug.current}`}
            className="flex items-center justify-between border-b border-neutral-300 hover:bg-neutral-100 transition-colors duration-300 ease-in-out"
          >
            <div className="flex flex-col md:flex-row flex-1 space-x-4">
              <div className="flex-shrink-0 md:w-1/3 overflow-hidden md:border-r border-b md:border-b-0 border-neutral-300">
                <SanityImage
                  image={post.mainImage}
                  maxWidth={507}
                  alt={post.title}
                  className="w-full h-full object-cover md:transition-transform duration-500 md:ease-in-out md:hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0 p-2 md:p-4 mb-12 md:mb-0">
                <h2 className="font-semibold text-lg sm:text-xl overflow-hidden text-ellipsis">
                  {post.title}
                </h2>
                <p className="font-light text-neutral-600 mb-2">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.keywords.map(({ name }: any) => (
                    <span
                      key={name}
                      className="text-xs md:text-base font-medium text-primary-800 bg-primary-100 px-4 py-1 rounded-full"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <p className="text-md sm:text-lg text-neutral-700 overflow-hidden text-ellipsis">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
