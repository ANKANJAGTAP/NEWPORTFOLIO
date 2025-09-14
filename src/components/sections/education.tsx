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
import AnimatedBackground from "../animated-background"; // <- keep this file unchanged

type Education = {
  degree: string;
  institution: string;
  range: string;
  bullets: string[];
  subjects?: string[];
  grade?: string;
};

const educationList: Education[] = [
  {
    degree: "S.S.C. (10th)",
    institution: "ABC High School, Pune",
    range: "2014 — 2016",
    bullets: [
      "Completed secondary education with a strong foundation in Mathematics and Science.",
      "Board: State Board — Percentage: 92% (example)",
    ],
    subjects: ["Mathematics", "Science", "English"],
    grade: "92%",
  },
  {
    degree: "H.S.C. (12th)",
    institution: "ABC Junior College, Pune",
    range: "2016 — 2018",
    bullets: [
      "Focused on Computer Science and Mathematics stream.",
      "Participated in inter-college coding competitions and tech fests.",
    ],
    subjects: ["Computer Science", "Mathematics", "Physics"],
    grade: "88%",
  },
  {
    degree: "B.Tech — Computer Science",
    institution: "Walchand College of Engineering, Sangli",
    range: "2023 — Present",
    bullets: [
      "Courses: Data Structures, Algorithms, Operating Systems, DBMS.",
      "Active in college tech clubs and open-source contributions.",
    ],
    subjects: ["Data Structures", "Algorithms", "Databases", "OS"],
    grade: "CGPA: 9.0 (example)",
  },
];

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block text-[10px] px-2 py-0.5 rounded-md bg-black/10 dark:bg-white/6 text-black/80 dark:text-white/90 mr-2 mt-2">
    {children}
  </span>
);

const EducationCardItem: React.FC<{ edu: Education }> = ({ edu }) => {
  // compact summary: join bullets to save vertical space
  const compactBullets = edu.bullets.join("  •  ");
  return (
    <article className="mb-0 p-3 rounded-lg bg-white/60 dark:bg-black/60 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="text-sm md:text-base font-semibold truncate">{edu.degree}</h3>
          <div className="text-xs text-muted-foreground truncate">{edu.institution}</div>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-300 ml-3">{edu.range}</div>
      </div>

      <p className="mt-2 text-xs md:text-sm text-gray-700 dark:text-gray-200 leading-snug">
        {compactBullets}
      </p>

      {edu.subjects && (
        <div className="mt-3 flex flex-wrap">
          {edu.subjects.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      )}

      {edu.grade && (
        <div className="mt-2 text-xs text-muted-foreground">{edu.grade}</div>
      )}
    </article>
  );
};

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="min-h-screen max-w-7xl mx-auto relative px-4">
      <h2
        className={cn(
          "bg-clip-text text-4xl text-center text-transparent md:text-6xl pt-16",
          "bg-gradient-to-b from-black/80 to-black/50",
          "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
        )}
      >
        EDUCATION
      </h2>

      {/**
       * Layout notes:
       * - On md+ screens use a two-column grid where the RIGHT column is a fixed width
       *   holding the education Card so the education content sits at the rightmost side.
       * - Right column widened to 720px on md and 820px on lg for a roomier card.
       */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_720px] lg:grid-cols-[1fr_820px] gap-8 items-start mt-6 md:mt-12 z-[9999]">
        {/* LEFT: decorative area (animated background / Spline) — hidden on small screens */}
        <div className="hidden md:block w-full h-full">
          <div className="h-full rounded-xl overflow-hidden">
            
          </div>
        </div>

        {/* RIGHT: Education card (fixed width on md+, full width on small screens) */}
        <div className="w-full">
          <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl p-0 overflow-visible">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl md:text-3xl">Academic History</CardTitle>
              <CardDescription className="text-sm">
                Key qualifications, institutions and highlights — compact view.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-5">
              {/* FLOW DIAGRAM / STRIP (compact) */}
              <div className="mb-4 flex items-center justify-center gap-2 px-2">
                {educationList.map((edu, idx) => (
                  <React.Fragment key={edu.degree}>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-black/5 dark:bg-white/6">
                        {edu.degree.split(" — ")[0]}
                      </div>
                    </div>
                    {idx !== educationList.length - 1 && (
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path d="M5 12h14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* COMPACT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {educationList.map((edu) => (
                  <EducationCardItem
                    key={edu.degree + edu.institution}
                    edu={edu}
                  />
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center px-6 py-4">
              <div className="text-sm text-muted-foreground">
                Want transcripts?{" "}
                <a className="underline" href="/transcript.pdf" target="_blank" rel="noreferrer">
                  Download
                </a>
              </div>
              <div className="text-xs text-gray-500">Updated — {new Date().getFullYear()}</div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
