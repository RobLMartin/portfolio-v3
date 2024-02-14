import type { MetaFunction } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { HOME_QUERY } from "~/sanity/queries";
import { useLoaderData } from "@remix-run/react";
import { SanityImage } from "~/components/sanity.image";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { dataset, projectId } from "~/sanity/projectDetails";

type LoaderReturnType = Awaited<ReturnType<typeof loader>>;

export const meta: MetaFunction<LoaderReturnType> = ({ data }) => {
  const home = (data as LoaderReturnType)?.initial?.data;

  return [
    { title: home.headline },
    {
      name: "description",
      content: "Robert Martin software engineer portfolio site",
    },
    {
      property: "og:image",
      content: urlBuilder({ projectId, dataset })
        .image(home.mainImage)
        .width(1200)
        .url(),
    },
  ];
};

export const loader = async () => {
  const initial = await loadQuery<SanityDocument>(HOME_QUERY);

  return { initial, query: HOME_QUERY, params: {} };
};

export default function About() {
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

  return (
    <div className="w-full h-full mt-20 lg:mt-0">
      {data?.mainImage ? (
        <SanityImage
          image={data.mainImage}
          maxWidth={2000}
          alt={data.headline}
          className="h-[50vh] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-col md:flex-row relative border-b border-neutral-300">
        <div className="md:w-1/3 px-6 md:px-12 border-b md:border-b-0 md:border-r border-neutral-300">
          <h1 className="font-semibold text-2xl py-6 md:py-12 leading-[45px] sticky top-20 lg:top-0">
            {data.title ? data.title : "No title"}
          </h1>
        </div>
        <div className="md:w-2/3 py-6 md:py-12 h-fit">
          <p className="font-semibold text-2xl leading-[45px] px-6 md:px-12">
            {data.headline ? data.headline : "No headline"}
          </p>
          <div className="prose text-lg md:text-xl text-neutral-600 leading-relaxed p-6 md:p-12">
            <PortableText value={data.summary} />
          </div>
          <p className="font-semibold text-2xl leading-[45px] p-6 md:p-12 border-b border-t border-neutral-300">
            Skills
          </p>
          <div className="p-6 md:p-12 flex gap-2 flex-wrap">
            {data.skills
              ? data.skills.map((skill: string) => (
                  <span
                    className="text-xs md:text-base font-medium text-primary-800 bg-primary-100 px-4 py-1 rounded-full"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))
              : null}
          </div>
          <p className="font-semibold text-2xl leading-[45px] p-6 md:p-12 border-b border-t md:border-b-0 border-neutral-300">
            Experience
          </p>
          <div className="md:border-t border-neutral-300">
            {data?.workHistory
              ? data?.workHistory?.map((job: any) => (
                  <div
                    key={job.company}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 md:p-12 border-b border-neutral-300"
                  >
                    <div className="md:col-span-1">
                      <h2 className="text-xl font-semibold">{job.company}</h2>
                      <p className="text-lg text-neutral-500">{job.duration}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-lg font-medium">{job.position}</p>
                      {job.description && (
                        <div className="mt-2 text-neutral-600 text-base">
                          <PortableText value={job.description} />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
