import { PortableText } from "@portabletext/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import urlBuilder from "@sanity/image-url";
import { SanityImage } from "~/components/sanity.image";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { POST_QUERY } from "~/sanity/queries";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "~/sanity/projectDetails";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<SanityDocument>(POST_QUERY, params);

  return { initial, query: POST_QUERY, params };
};

type LoaderReturnType = Awaited<ReturnType<typeof loader>>;

export const meta: MetaFunction<LoaderReturnType> = ({ data }) => {
  const post = (data as LoaderReturnType)?.initial?.data;

  const keywords = post.keywords
    .map((tag: any) => tag.name)
    .join(", ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "");

  const description = `Read about ${keywords} on this insightful post titled "${
    post.title
  }" published on ${new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}.`;

  console.log("image", post.mainImage);
  return [
    { title: post.title },
    { name: "description", content: description },
    { property: "og:title", content: post.title },
    { property: "og:description", content: description },
    {
      property: "og:image",
      content: urlBuilder({ projectId, dataset })
        .image(post.mainImage)
        .width(1200)
        .url(),
    },
    { property: "og:type", content: "article" },
    { property: "article:published_time", content: post.publishedAt },
    {
      tagName: "link",
      rel: "canonical",
      href: `https://robertmartin.dev/blog/${post.slug.current}`,
    },
    {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        image: post.mainImage.url,
        genre: keywords,
        publishedDate: post.publishedAt,
        description: description,
      }),
    },
  ];
};

const SampleImageComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);
  return (
    <img
      src={urlBuilder({ projectId, dataset })
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url()}
      alt={value.alt || " "}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? "inline-block" : "block",

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  );
};

export default function PostRoute() {
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

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  };

  return (
    <div className="w-full h-full mt-20 lg:mt-0">
      {data?.mainImage ? (
        <SanityImage
          image={data.mainImage}
          maxWidth={1396}
          alt={data.title}
          className="h-[50vh] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-col md:flex-row relative border-b border-neutral-300">
        <div className="md:w-1/3 px-6 md:px-12 border-b md:border-b-0 md:border-r border-neutral-300">
          <div className="sticky top-20 lg:top-0 py-6 md:py-12 ">
            <p className="text-md md:text-lg mb-2">
              Published on{" "}
              {new Date(data.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="py-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {data.keywords &&
                  data.keywords.map((tag: any) => (
                    <span
                      className="text-xs md:text-base font-medium text-primary-800 bg-primary-100 px-4 py-1 rounded-full"
                      key={tag.name}
                    >
                      {tag.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-6 md:p-12 h-fit">
          <article className="prose text-lg md:text-xl text-neutral-600 leading-relaxed">
            <PortableText value={data.body} components={components} />
          </article>
        </div>
      </div>
    </div>
  );
}
