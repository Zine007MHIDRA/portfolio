export interface ProjectOverride {
  displayTitle?: string;
  summary?: string;
  liveUrl?: string;
  category?: string;
}

export interface PortfolioConfig {
  githubUsername: string;
  displayName: string;
  heroTitleLines: string[];
  heroOutlineLine: string;
  navNameLines: string[];
  role: string;
  stackLabel: string;
  tagline: string;
  collaborationNote: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  heroVideo: string | null;
  heroPoster: string | null;
  featuredOrder: string[];
  secondaryOrder: string[];
  hiddenRepos: string[];
  projectOverrides: Record<string, ProjectOverride>;
}

export const portfolioConfig: PortfolioConfig = {
  githubUsername: "Zine007MHIDRA",
  displayName: "Zine El Abidine MHIDRA",
  heroTitleLines: ["ZINE EL", "ABIDINE", "MHIDRA"],
  heroOutlineLine: "BUILDS SYSTEMS.",
  navNameLines: ["ZINE", "EL", "ABIDINE", "MHIDRA"],
  role: "AI & Full-Stack Developer",
  stackLabel: "AI, SIMULATION & FULL-STACK DEVELOPER",
  tagline:
    "Building AI systems, physics simulations, and full-stack web apps in Python and TypeScript.",
  collaborationNote:
    "Open to AI engineering, physics simulation, and full-stack TypeScript or Python builds. Reach out directly by email or LinkedIn.",
  email: "zine.mhidra@gmail.com",
  githubUrl: "https://github.com/Zine007MHIDRA",
  linkedinUrl: "https://www.linkedin.com/in/zine-el-abidine-mhidra-bbb805374/",
  heroVideo: "/media/hero.mp4",
  heroPoster: "/media/hero-poster.jpg",
  featuredOrder: ["F1LapStratSim", "HoneyGrid", "aether-audiophile", "Noir"],
  secondaryOrder: [
    "Ecom",
    "InteractiveShowRoom",
    "ECHO",
    "Flow",
    "TideCaller",
    "healthcare-data-cleaning",
  ],
  hiddenRepos: ["portfolio"],
  projectOverrides: {
    F1LapStratSim: {
      category: "Simulation / Python",
    },
    HoneyGrid: {
      category: "Web App / Python",
    },
    "aether-audiophile": {
      category: "Web App / TypeScript",
    },
    Noir: {
      category: "Web App / TypeScript",
    },
  },
};
