"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PortfolioIamges from "../../../public/assets/projects-screenshots/landing.png"
import ActionImage from "../../../public/assets/projects-screenshots/ActionArena.png"
import Luxride from "../../../public/assets/projects-screenshots/LuxRide.png"
import OutFyld from "../../../public/assets/projects-screenshots/outfyld.png"
import GhostChart from "../../../public/assets/projects-screenshots/ghostchat/1.png"
import JUNTA from "../../../public/assets/projects-screenshots/jra/1.png"

// Hardcoded projects
const projects = [
  {
    title: "Action Arena",
    category: "Feild Booking Platform",
    src: ActionImage,
    live: "https://action-arena.vercel.app/",
    github: "https://github.com/ANKANJAGTAP/ActionArena",
  },
  {
    title: "LuxRide",
    category: "Luxury Car Rental",
    src: Luxride,
    live: "https://lux-ridez.vercel.app/",
    github: "https://github.com/ANKANJAGTAP/LuxRidez",
  },
  {
    title: "OutFyld",
    category: "E-Sports Booking Platform",
    src: OutFyld,
    live: "hhttps://www.outfyld.in/",
    github: "https://github.com/ANKANJAGTAP/OUTFYLD",
  },
  {
    title: "My Portfolio",
    category: "Portfolio",
    src: PortfolioIamges,
    live: "https://ankan-portfolio-smoky.vercel.app/",
    github: "https://github.com/ANKANJAGTAP/NEWPORTFOLIO",
  },
  {
    title: "GhostChat",
    category: "Anonymous chat",
    src: GhostChart,
    live: "https://ghostchat.com",
    github: "https://github.com/ankan/ghostchat",
  },
  {
    title: "JNTUA Results Analyzer",
    category: "Result analyzer",
    src: JUNTA,
    live: "https://jntua-analyzer.com",
    github: "https://github.com/ankan/jntua",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto md:h-[130vh]">
      <a href="#projects">
        <h2
          className={cn(
            "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
            "bg-gradient-to-b from-black/80 to-black/50",
            "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-32"
          )}
        >
          Projects
        </h2>
      </a>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative w-[400px] rounded-lg overflow-hidden shadow-xl flex flex-col"
        style={{ aspectRatio: "3/2" }}
      >
        {/* background image */}
        <div className="relative flex-grow">
          <Image
            className="absolute w-full h-full top-0 left-0 object-cover transition-transform duration-400 ease-in-out hover:scale-[1.05]"
            src={project.src}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {/* dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

          {/* bottom info */}
          <div className="absolute left-0 bottom-4 w-full px-6">
            <div className="flex flex-col items-start justify-end">
              <div className="text-lg text-left text-white drop-shadow-md font-semibold">
                {project.title}
              </div>
              <div className="text-xs bg-white/90 text-black rounded-lg w-fit px-2 mt-2">
                {project.category}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons always visible at bottom */}
        <div className="flex items-center justify-center gap-4 bg-neutral-900/80 dark:bg-neutral-100/80 py-3">
          <Link
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium border border-black/20 hover:opacity-90"
          >
            Live
          </Link>
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium border border-black/20 hover:opacity-90"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
