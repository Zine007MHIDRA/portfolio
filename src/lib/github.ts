import fs from "node:fs";
import path from "node:path";
import { portfolioConfig } from "@/data/portfolio-config";
import {
  fallbackRepos,
  fallbackUser,
  type GitHubRepoRaw,
  type GitHubUserRaw,
} from "@/data/github-fallback";

export interface PortfolioProject {
  name: string;
  displayTitle: string;
  summary: string | null;
  language: string;
  stars: number;
  forks: number;
  repoUrl: string;
  liveUrl: string | null;
  pushedYear: string;
  topics: string[];
  category: string;
}

export interface LanguageStat {
  name: string;
  count: number;
}

export interface PortfolioData {
  source: "live" | "fallback";
  syncedAt: string;
  hasHeroVideo: boolean;
  hasHeroPoster: boolean;
  profile: {
    login: string;
    name: string;
    bio: string;
    publicRepos: number;
    followers: number;
    following: number;
    totalStars: number;
    liveDeployments: number;
    profileUrl: string;
  };
  featuredProjects: PortfolioProject[];
  additionalProjects: PortfolioProject[];
  allVisibleProjects: PortfolioProject[];
  languages: LanguageStat[];
  topStarred: PortfolioProject[];
}

function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function mapRepo(repo: GitHubRepoRaw): PortfolioProject {
  const override = portfolioConfig.projectOverrides[repo.name];
  const language = repo.language ?? "Repository";
  const pushedDate = new Date(repo.pushed_at);
  const pushedYear = Number.isNaN(pushedDate.getTime())
    ? ""
    : String(pushedDate.getUTCFullYear());

  return {
    name: repo.name,
    displayTitle: override?.displayTitle ?? repo.name,
    summary: override?.summary ?? repo.description ?? null,
    language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    repoUrl: repo.html_url,
    liveUrl: normalizeUrl(override?.liveUrl ?? repo.homepage),
    pushedYear,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    category: override?.category ?? language,
  };
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "zine-editorial-portfolio",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchGitHubLive(username: string): Promise<{
  user: GitHubUserRaw;
  repos: GitHubRepoRaw[];
} | null> {
  const headers = buildHeaders();

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=100`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return null;
    }

    const user = (await userRes.json()) as GitHubUserRaw;
    const repos = (await reposRes.json()) as GitHubRepoRaw[];

    if (!user?.login || !Array.isArray(repos)) {
      return null;
    }

    return { user, repos };
  } catch {
    return null;
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const live = await fetchGitHubLive(portfolioConfig.githubUsername);
  const source: "live" | "fallback" = live ? "live" : "fallback";
  const user = live ? live.user : fallbackUser;
  const rawRepos = live ? live.repos : fallbackRepos;

  const hidden = new Set(portfolioConfig.hiddenRepos.map((r) => r.toLowerCase()));
  const eligible = rawRepos
    .filter((repo) => !repo.fork && !repo.archived && !hidden.has(repo.name.toLowerCase()))
    .map(mapRepo);

  const byName = new Map(eligible.map((item) => [item.name.toLowerCase(), item]));

  const featuredProjects: PortfolioProject[] = [];
  const used = new Set<string>();

  for (const name of portfolioConfig.featuredOrder) {
    const found = byName.get(name.toLowerCase());
    if (found) {
      featuredProjects.push(found);
      used.add(found.name.toLowerCase());
    }
  }

  // Fill up to 4 featured slots by stars then recency if fewer configured names matched.
  if (featuredProjects.length < 4) {
    const remaining = eligible
      .filter((item) => !used.has(item.name.toLowerCase()))
      .sort((a, b) => b.stars - a.stars);
    for (const item of remaining) {
      if (featuredProjects.length >= 4) break;
      featuredProjects.push(item);
      used.add(item.name.toLowerCase());
    }
  }

  const additionalProjects: PortfolioProject[] = [];
  for (const name of portfolioConfig.secondaryOrder) {
    const found = byName.get(name.toLowerCase());
    if (found && !used.has(found.name.toLowerCase())) {
      additionalProjects.push(found);
      used.add(found.name.toLowerCase());
    }
  }

  for (const item of eligible) {
    if (!used.has(item.name.toLowerCase())) {
      additionalProjects.push(item);
      used.add(item.name.toLowerCase());
    }
  }

  const languageCounts = new Map<string, number>();
  let totalStars = 0;
  let liveDeployments = 0;

  for (const repo of rawRepos) {
    totalStars += repo.stargazers_count;
    if (normalizeUrl(repo.homepage)) {
      liveDeployments += 1;
    }
    if (repo.language) {
      languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }
  }

  const languages: LanguageStat[] = [...languageCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const topStarred = [...eligible]
    .sort((a, b) => b.stars - a.stars || Number(Boolean(b.liveUrl)) - Number(Boolean(a.liveUrl)))
    .slice(0, 6);

  const mediaDir = path.join(process.cwd(), "public", "media");
  const hasHeroVideo = fs.existsSync(path.join(mediaDir, "hero.mp4"));
  const hasHeroPoster =
    fs.existsSync(path.join(mediaDir, "hero-poster.jpg")) ||
    fs.existsSync(path.join(mediaDir, "hero-poster.png"));

  return {
    source,
    syncedAt: new Date().toISOString(),
    hasHeroVideo,
    hasHeroPoster,
    profile: {
      login: user.login,
      name: user.name?.trim() || portfolioConfig.displayName,
      bio: user.bio?.trim() || portfolioConfig.tagline,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      liveDeployments,
      profileUrl: user.html_url || portfolioConfig.githubUrl,
    },
    featuredProjects,
    additionalProjects,
    allVisibleProjects: [...featuredProjects, ...additionalProjects],
    languages,
    topStarred,
  };
}
