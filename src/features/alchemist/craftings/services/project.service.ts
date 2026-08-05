import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";
import { getMockProjects, getMockProjectBySlug } from "../constants/mock-projects";

export const getPublicProjects = async (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
): Promise<Project[]> => {
  return getMockProjects(lang, type, featured);
};

export const getPublicProjectBySlug = async (slug: string, lang: string): Promise<Project> => {
  return getMockProjectBySlug(slug, lang);
};

