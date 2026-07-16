import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/developer",
  "/security",
  "/ai-data",
  "/teaching",
  "/projects",
  "/experience",
  "/skills",
  "/certifications",
  "/achievements",
  "/resume",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${site.url}${route}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const projectPages = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}/`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...projectPages];
}
