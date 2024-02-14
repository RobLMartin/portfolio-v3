import groq from "groq";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)]{
  title,
  mainImage,
  slug,
  publishedAt,
  excerpt,
  "keywords": keywords[]->{name}
} | order(_createdAt desc)`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug]{..., "keywords": keywords[]->{name}}[0]`;

export const HOME_QUERY = groq`*[_type == "home"][0]`;

export const PORTFOLIO_QUERY = groq`*[_type == "portfolio"]{..., "technologies": technologies[]->{name}, post->{slug, title, mainImage}}[]`;

export const LANDING_QUERY = groq`*[_type == "landing" ]{..., "featuredProjects": featuredProjects[]->{
  title, 
  description,
  link,
  post->{mainImage}
}}[0]`;
