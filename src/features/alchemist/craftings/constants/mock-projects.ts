import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";

export const MOCK_PROJECTS: Project[] = [
  {
    _id: "proj-1",
    slug: "the-alchemist",
    name: "The Alchemist",
    description:
      "An interactive 3D digital grimoire portfolio powered by Next.js 15, R3F, GSAP, and custom SVG filters.",
    thumbnail: "/images/projects/alchemist.jpg",
    images: ["/images/projects/alchemist-1.jpg"],
    tech: [{ name: "Next.js" }, { name: "Three.js" }, { name: "GSAP" }, { name: "Tailwind CSS" }],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.is-a.dev",
    repo: "https://github.com/trhgatu/the-alchemist",
    featured: true,
    downloads: 128,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "proj-2",
    slug: "auto-wp-publisher",
    name: "Auto WP Publisher",
    description: "Automated content generation and publishing pipeline for WordPress platforms.",
    thumbnail: "/images/projects/auto-wp.jpg",
    images: [],
    tech: [{ name: "NestJS" }, { name: "TypeScript" }, { name: "WordPress API" }],
    category: "Backend",
    projectStatus: "In Progress",
    status: "published",
    featured: true,
    downloads: 45,
    year: 2025,
    publishedAt: "2025-11-15T00:00:00.000Z",
  },
  {
    _id: "proj-3",
    slug: "celestial-vault",
    name: "Celestial Vault",
    description: "A decentralized Web3 artifact storage and visualization engine.",
    thumbnail: "/images/projects/celestial.jpg",
    images: [],
    tech: [{ name: "React" }, { name: "Solidity" }, { name: "Ethers.js" }],
    category: "Full-Stack",
    projectStatus: "Completed",
    status: "published",
    featured: false,
    downloads: 92,
    year: 2025,
    publishedAt: "2025-08-20T00:00:00.000Z",
  },
];

export const getMockProjects = async (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
): Promise<Project[]> => {
  let result = [...MOCK_PROJECTS];
  if (featured !== undefined) {
    result = result.filter((p) => p.featured === featured);
  }
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMockProjectBySlug = async (slug: string, _lang?: string): Promise<Project> => {
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project with slug '${slug}' not found.`);
  }
  return project;
};
