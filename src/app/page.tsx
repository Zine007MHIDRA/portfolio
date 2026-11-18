import { StickyNav } from "@/components/StickyNav";
import { EditorialHero } from "@/components/EditorialHero";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { GitHubActivityGrid } from "@/components/GitHubActivityGrid";
import { ContactMarqueeFooter } from "@/components/ContactMarqueeFooter";
import { getPortfolioData } from "@/lib/github";

export const revalidate = 3600;

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <StickyNav login={data.profile.login} />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <EditorialHero
          login={data.profile.login}
          bio={data.profile.bio}
          publicRepos={data.profile.publicRepos}
          liveDeployments={data.profile.liveDeployments}
          profileUrl={data.profile.profileUrl}
          hasHeroVideo={data.hasHeroVideo}
          hasHeroPoster={data.hasHeroPoster}
          source={data.source}
        />

        <ProjectsShowcase
          displayName={data.profile.name}
          publicRepos={data.profile.publicRepos}
          liveDeployments={data.profile.liveDeployments}
          profileUrl={data.profile.profileUrl}
          featuredProjects={data.featuredProjects}
          additionalProjects={data.additionalProjects}
        />

        <GitHubActivityGrid
          publicRepos={data.profile.publicRepos}
          totalStars={data.profile.totalStars}
          liveDeployments={data.profile.liveDeployments}
          followers={data.profile.followers}
          following={data.profile.following}
          languages={data.languages}
          topStarred={data.topStarred}
        />
      </main>

      <ContactMarqueeFooter login={data.profile.login} profileUrl={data.profile.profileUrl} />
    </div>
  );
}
