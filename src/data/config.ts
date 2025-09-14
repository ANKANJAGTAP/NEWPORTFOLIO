const config = {
  title: "Ankan Jagtap | Full-Stack Developer",
  description: {
    long: "Explore the portfolio of Ankan, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let's build something amazing together!",
    short:
      "Discover the portfolio of Ankan, a full-stack developer creating interactive web experiences and innovative projects.",
  },
  keywords: [
    "Ankan",
    "portfolio",
    "full-stack developer",
    "creative technologist",
    "web development",
    "3D animations",
    "interactive websites",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Ankan Jagtap",
  email: "ankanjagtap.2005@gmail.com",
  site: "https://ankan-portfolio-smoky.vercel.app/",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/AnkanJagtap",
    linkedin: "https://www.linkedin.com/in/ankan-jagtap-0633ab28a/",
    instagram: "https://www.instagram.com/ankanjagtap/",
    facebook: "https://www.facebook.com/profile.php?id=61563241667818",
    github: "https://github.com/ANKANJAGTAP",
  },
};
export { config };
