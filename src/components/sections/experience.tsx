"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AnimatedBackground from "../animated-background"; // <- uses your splinetool code (don't change that file)

type Experience = {
  role: string;
  company: string;
  range: string;
  bullets: string[];
  stack?: string[];
};

const experiences: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Acme Corp",
    range: "2023 — Present",
    bullets: [
      "Led UI architecture and component library for marketing and dashboard apps.",
      "Improved bundle size by 30% through route-level code splitting and tree-shaking.",
      "Mentored 4 engineers; introduced design tokens & accessible patterns.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "Cypress"],
  },
  {
    role: "Fullstack Engineer",
    company: "Bright Studio",
    range: "2020 — 2023",
    bullets: [
      "Built performant dashboards with real-time updates.",
      "Owned API design, auth, and deployment pipelines (Docker + CI).",
    ],
    stack: ["Node.js", "GraphQL", "Postgres", "Redis"],
  },
  {
    role: "Frontend Engineer",
    company: "Indie Labs",
    range: "2018 — 2020",
    bullets: [
      "Converted legacy pages to a component-driven system.",
      "Added end-to-end tests and automated visual regression checks.",
    ],
    stack: ["React", "Jest", "Storybook"],
  },
];

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-md bg-black/10 dark:bg-white/6 text-black/80 dark:text-white/90 mr-2 mt-2">
    {children}
  </span>
);

const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => {
  return (
    <article className="mb-6 p-4 rounded-lg bg-white/60 dark:bg-black/60 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{exp.role}</h3>
          <div className="text-sm text-muted-foreground">{exp.company}</div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">{exp.range}</div>
      </div>

      <ul className="mt-3 text-sm space-y-2 text-gray-700 dark:text-gray-200">
        {exp.bullets.map((b, i) => (
          <li key={i} className="leading-relaxed">
            • {b}
          </li>
        ))}
      </ul>

      {exp.stack && (
        <div className="mt-3 flex flex-wrap">
          {exp.stack.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      )}
    </article>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen max-w-7xl mx-auto relative px-4">
      <h2
        className={cn(
          "bg-clip-text text-4xl text-center text-transparent md:text-6xl pt-16",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
        )}
      >
        EXPERIENCE
      </h2>

      {/*
        Layout notes:
        - On md+ screens use a two-column grid where the right column is a fixed width
          holding the keyboard Spline scene so it stays on the right side of the viewport.
        - On small screens the keyboard is hidden to avoid layout issues.
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_520px] gap-8 items-start mt-10 md:mt-16 z-[9999]">
        {/* LEFT: Experience timeline card (takes fluid space) */}
        <div className="w-full">
          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl p-0 overflow-visible">
            <CardHeader>
              <CardTitle className="text-3xl">Where I've Worked</CardTitle>
              <CardDescription>
                Selected roles, projects and responsibilities. Hover cards for more detail.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp.role + exp.company} exp={exp} />
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Want the full resume?{" "}
                <a className="underline" href="/resume.pdf" target="_blank" rel="noreferrer">
                  Download
                </a>
              </div>
              <div className="text-xs text-gray-500">Updated — {new Date().getFullYear()}</div>
            </CardFooter>
          </Card>
        </div>

        {/* RIGHT: Keyboard area (fixed width on md+, hidden on small screens) */}
        
      </div>
    </section>
  );
};

export default ExperienceSection;
