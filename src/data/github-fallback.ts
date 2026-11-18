export interface GitHubUserRaw {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepoRaw {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  topics: string[];
}

// Verified GitHub API snapshot for Zine007MHIDRA (used only if live API is rate-limited or offline).
export const fallbackUser: GitHubUserRaw = {
  login: "Zine007MHIDRA",
  name: "Zine El Abidine MHIDRA",
  bio: null,
  public_repos: 10,
  followers: 0,
  following: 0,
  html_url: "https://github.com/Zine007MHIDRA",
};

export const fallbackRepos: GitHubRepoRaw[] = [
  {
    name: "aether-audiophile",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    homepage: "https://privatestudio-puce.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/aether-audiophile",
    fork: false,
    archived: false,
    pushed_at: "2026-11-01T19:15:26Z",
    topics: [],
  },
  {
    name: "HoneyGrid",
    description: null,
    language: "Python",
    stargazers_count: 1,
    forks_count: 0,
    homepage: "https://honeygrid.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/HoneyGrid",
    fork: false,
    archived: false,
    pushed_at: "2026-11-01T17:53:14Z",
    topics: [],
  },
  {
    name: "Noir",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    homepage: "https://noir-peach.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/Noir",
    fork: false,
    archived: false,
    pushed_at: "2026-10-04T14:36:45Z",
    topics: [],
  },
  {
    name: "TideCaller",
    description: null,
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    html_url: "https://github.com/Zine007MHIDRA/TideCaller",
    fork: false,
    archived: false,
    pushed_at: "2026-09-28T19:51:08Z",
    topics: [],
  },
  {
    name: "Flow",
    description: null,
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    html_url: "https://github.com/Zine007MHIDRA/Flow",
    fork: false,
    archived: false,
    pushed_at: "2026-09-28T09:21:02Z",
    topics: [],
  },
  {
    name: "Ecom",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    homepage: "https://ecom-zine2.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/Ecom",
    fork: false,
    archived: false,
    pushed_at: "2026-09-13T21:46:37Z",
    topics: [],
  },
  {
    name: "F1LapStratSim",
    description:
      "A point-mass vehicle dynamics simulator for F1 lap times, tyre degradation, and pit strategy optimization built for Monza, structured so any track can be added.",
    language: "Python",
    stargazers_count: 2,
    forks_count: 0,
    homepage: "https://f1simulator.streamlit.app/",
    html_url: "https://github.com/Zine007MHIDRA/F1LapStratSim",
    fork: false,
    archived: false,
    pushed_at: "2026-09-12T15:05:47Z",
    topics: ["formula1", "simulator"],
  },
  {
    name: "InteractiveShowRoom",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    homepage: "https://interactiveshowroom.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/InteractiveShowRoom",
    fork: false,
    archived: false,
    pushed_at: "2026-09-03T12:51:06Z",
    topics: [],
  },
  {
    name: "ECHO",
    description: null,
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    homepage: "https://echo-zine2.vercel.app",
    html_url: "https://github.com/Zine007MHIDRA/ECHO",
    fork: false,
    archived: false,
    pushed_at: "2026-09-02T20:56:29Z",
    topics: [],
  },
  {
    name: "healthcare-data-cleaning",
    description: null,
    language: null,
    stargazers_count: 0,
    forks_count: 0,
    homepage: null,
    html_url: "https://github.com/Zine007MHIDRA/healthcare-data-cleaning",
    fork: false,
    archived: false,
    pushed_at: "2026-08-13T11:59:33Z",
    topics: [],
  },
];
