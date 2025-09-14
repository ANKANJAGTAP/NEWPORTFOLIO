// src/components/header/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/*
  Transparent fixed navbar:
  - backgroundColor: 'transparent'
  - keeps backdrop-blur for subtle blur of background content
  - white text for links (keep contrast in mind)
  - preserves behavior: active-route, hover highlight, mobile menu, SEO JSON-LD
*/

type Theme = {
  text?: string;
  body?: string;
  highlight?: string;
};

const defaultTheme: Required<Theme> = {
  text: "#ffffff",
  body: "transparent",
  highlight: "rgba(255,255,255,0.06)",
};

/* Minimal data used for header + SEO */
const settings = { isSplash: false };
const greeting = { title: "ANKAN JAGTAP", logo_name: "ANKAN JAGTAP" };
const seo = { title: "Portfolio", description: "A short portfolio description.", og: { title: "Portfolio", url: "" } };

const socialMediaLinks = [{ name: "Gmail", link: "mailto:you@example.com" }];
function SeoHeader() {
  const mailObj = socialMediaLinks.find((m) => m.link.startsWith("mailto"));
  const mail = mailObj ? mailObj.link.replace(/^mailto:/, "") : "";

  const data = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: greeting.title,
    email: mail,
    sameAs: socialMediaLinks.filter((m) => !m.link.startsWith("mailto") && !m.link.startsWith("tel")).map((m) => m.link),
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}

interface Props {
  theme?: Theme;
}

const Header: React.FC<Props> = ({ theme: providedTheme }) => {
  const theme = { ...defaultTheme, ...(providedTheme ?? {}) };
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";
  const link = settings.isSplash ? "/splash" : "/";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/#skills", label: "Skills" },
    { to: "/#experience", label: "Experience" },
    { to: "/#projects", label: "Projects" },
    { to: "/#education", label: "Education" },
    { to: "/#contact", label: "Contact Me" },
  ];

  const [currentHash, setCurrentHash] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash || "");
      const onHashChange = () => setCurrentHash(window.location.hash || "");
      window.addEventListener("hashchange", onHashChange);
      return () => window.removeEventListener("hashchange", onHashChange);
    }
  }, []);

  const isActive = (to: string) => {
    if (to === "/") {
      return pathname === "/" || pathname === "/home";
    }
    if (to.includes("#")) {
      const anchor = to.split("#")[1] ? `#${to.split("#")[1]}` : "";
      return currentHash === anchor;
    }
    return pathname === to || pathname.startsWith(to);
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>, color: string) => {
    const el = event.currentTarget as HTMLElement;
    // only subtle hover bg (keeps it consistent) — it's not the "active" white anymore
    if (!el.classList.contains("force-no-active")) el.style.backgroundColor = color;
  };
  const onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget as HTMLElement;
    if (!el.classList.contains("force-no-active")) el.style.backgroundColor = "transparent";
  };

  const containerVariants = {
    hidden: { y: -18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const BottomGradient = () => (
    <>
      <span className="block transition duration-500 opacity-0 group-hover:opacity-100 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </>
  );

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <SeoHeader />

      {/* Fixed transparent navbar */}
      <header className="fixed top-0 left-0 right-0 z-50" aria-label="Primary Navigation">
        {/* Transparent glass panel: no opaque tint, but keep blur */}
        <div
          className="max-w-[90%] mx-auto py-3 md:py-4 px-3 md:px-0 rounded-b-md flex items-center justify-between backdrop-blur-sm"
          style={{
            backgroundColor: "transparent",
            color: theme.text,
          }}
        >
          {/* Logo */}
         <Link href={link} className="flex items-center gap-2 no-underline"> <span className="text-lg font-medium" style={{ color: "#ffffff" }}> &lt; </span> <span className="text-lg font-bold" style={{ color: "#ffffff" }}> {greeting.logo_name} </span> <span className="text-lg font-medium" style={{ color: "#ffffff" }}> /&gt; </span> </Link>

          {/* Hamburger (mobile) */}
          <Button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setOpen((s) => !s)}
            style={{ color: theme.text }}
          >
            <div className="w-6 h-5 relative">
              <span
                className={`block absolute left-0 right-0 h-[2px] top-1 transition-transform duration-200 ${open ? "rotate-45 top-2.5" : ""}`}
                style={{ background: theme.text }}
              />
              <span
                className={`block absolute left-0 right-0 h-[2px] top-2.5 transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
                style={{ background: theme.text }}
              />
              <span
                className={`block absolute left-0 right-0 h-[2px] top-4 transition-transform duration-200 ${open ? "-rotate-45 top-2.5" : ""}`}
                style={{ background: theme.text }}
              />
            </div>
          </Button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4 md:gap-6 m-0 p-0 list-none">
              {navItems.map((item) => {
                const active = isActive(item.to);
                const sharedRounded = "rounded transition-transform duration-150 select-none";
                const normalClasses = "font-medium text-white hover:-translate-y-0.5";
                 return (
                  <li key={item.to}>
                    <Link href={item.to} legacyBehavior>
                      <a
                        onMouseEnter={(e) => onMouseEnter(e as any, theme.highlight)}
                        onMouseLeave={(e) => onMouseOut(e as any)}
                        className="no-underline"
                      >
                        <Button
                          variant={"outline"}
                          // larger padding and keep consistent visual style for all items
                          className={`${sharedRounded} ${normalClasses} px-5 py-2`}
                        >
                          {item.label}
                        </Button>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Mobile collapsible menu (transparent) */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-200 mt-0`}
          style={{
            maxHeight: open ? "420px" : "0px",
            backgroundColor: "transparent",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <div className="max-w-[75%] mx-auto py-2">
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {navItems.map((item) => {
                return (
                  <li key={item.to}>
                    <Link href={item.to} legacyBehavior>
                      <a onClick={() => setOpen(false)}>
                        <Button
                          variant={"outline"}
                          className="w-full text-left px-4 py-3 rounded text-white"
                          onMouseEnter={(e) => onMouseEnter(e as any, theme.highlight)}
                          onMouseLeave={(e) => onMouseOut(e as any)}
                        >
                          {item.label}
                        </Button>
                      </a>
                    </Link>
                  </li>
                );
              })}

              {/* Hire Me (mobile) */}
              <li>
                <Link href="/#contact" legacyBehavior>
                  <a onClick={() => setOpen(false)}>
                    <Button variant={"outline"} className="w-full px-4 py-3">
                      Hire Me
                    </Button>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* NOTE: Because the header is fixed, ensure your page content includes top padding so it is not hidden:
          Example (in your layout or page): <div className="pt-20" /> or adjust to match header height. */}
    </motion.div>
  );
};

export default Header;
