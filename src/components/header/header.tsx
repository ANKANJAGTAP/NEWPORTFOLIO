// src/components/header/Header.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname() ?? "/home";
  const link = settings.isSplash ? "/splash" : "/home";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/#skills", label: "Skills" },
    { to: "/#experience", label: "Experience" },
    { to: "/#projects", label: "Projects" },
    { to: "/#education", label: "Education" },
    { to: "/#contact", label: "Contact Me" },
  ];

  const isActive = (to: string) => (to === "/home" ? pathname === "/" || pathname === "/home" : pathname.startsWith(to));

  const onMouseEnter = (event: React.MouseEvent<HTMLElement>, color: string) => {
    (event.currentTarget as HTMLElement).style.backgroundColor = color;
  };
  const onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    (event.currentTarget as HTMLElement).style.backgroundColor = "transparent";
  };

  const containerVariants = {
    hidden: { y: -18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.65 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <SeoHeader />

      {/* Fixed transparent navbar */}
      <header className="fixed top-0 left-0 right-0 z-50" aria-label="Primary Navigation">
        {/* Transparent glass panel: no opaque tint, but keep blur */}
        <div
          className="max-w-[90%] mx-auto py-3 md:py-4 px-3 md:px-0 rounded-b-md flex items-center justify-between backdrop-blur-sm"
          style={{
            backgroundColor: "transparent", // fully transparent
            color: "#ffffff",
            // keep subtle border to help separation on some backgrounds (optional)
            // borderBottom: "1px solid rgba(255,255,255,0.04)"
          }}
        >
          {/* Logo */}
          <Link href={link} className="flex items-center gap-2 no-underline">
            <span className="text-lg font-medium" style={{ color: "#ffffff" }}>
              &lt;
            </span>
            <span className="text-lg font-bold" style={{ color: "#ffffff" }}>
              {greeting.logo_name}
            </span>
            <span className="text-lg font-medium" style={{ color: "#ffffff" }}>
              /&gt;
            </span>
          </Link>

          {/* Hamburger (mobile) */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setOpen((s) => !s)}
            style={{ color: "#ffffff" }}
          >
            <div className="w-5 h-5 relative">
              <span
                className={`block absolute left-0 right-0 h-[2px] top-1 transition-transform duration-200 ${open ? "rotate-45 top-2.5" : ""}`}
                style={{ background: "#ffffff" }}
              />
              <span
                className={`block absolute left-0 right-0 h-[2px] top-2.5 transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
                style={{ background: "#ffffff" }}
              />
              <span
                className={`block absolute left-0 right-0 h-[2px] top-4 transition-transform duration-200 ${open ? "-rotate-45 top-2.5" : ""}`}
                style={{ background: "#ffffff" }}
              />
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-3 list-none m-0">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className={`px-4 py-2 block rounded ${isActive(item.to) ? "font-semibold" : "font-medium"} text-white`}
                    onMouseEnter={(e: any) => onMouseEnter(e, theme.highlight)}
                    onMouseLeave={(e: any) => onMouseOut(e)}
                    style={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
          <div className="max-w-[90%] mx-auto py-2">
            <ul className="list-none m-0 p-0">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    href={item.to}
                    className={`block px-4 py-3 rounded ${isActive(item.to) ? "font-semibold" : "font-medium"} text-white`}
                    onMouseEnter={(e: any) => onMouseEnter(e, theme.highlight)}
                    onMouseLeave={(e: any) => onMouseOut(e)}
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
