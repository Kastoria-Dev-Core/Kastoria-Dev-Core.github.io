// What the organisation has been doing, read from GitHub's API at build time: the latest releases of the
// apps and the pull requests merged lately. Only public repositories, so nothing private ends up here.
// CI passes GITHUB_TOKEN for a higher rate limit; without it (or offline) the sections are just left out.

const ORG = "Kastoria-Dev-Core";

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "kastoria-dev-core.github.io",
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, { headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface Release {
  tag: string;
  date: string;
  url: string;
}

export async function latestRelease(repo: string): Promise<Release | null> {
  const r = await api<{ tag_name: string; published_at: string; html_url: string }>(`/repos/${ORG}/${repo}/releases/latest`);
  return r ? { tag: r.tag_name, date: r.published_at, url: r.html_url } : null;
}

export interface MergedPR {
  title: string;
  repo: string;
  number: number;
  date: string;
  url: string;
}

export interface Activity {
  recent: MergedPR[];
  totalMerged: number;
}

/** The latest merged pull requests, leaving out the repositories in `exclude` */
export async function recentActivity(count = 8, exclude: string[] = []): Promise<Activity | null> {
  const q = encodeURIComponent(`org:${ORG} is:pr is:merged is:public ${exclude.map((r) => `-repo:${ORG}/${r}`).join(" ")}`);
  const r = await api<{
    total_count: number;
    items: { title: string; number: number; html_url: string; closed_at: string; repository_url: string }[];
  }>(`/search/issues?q=${q}&sort=updated&order=desc&per_page=${count}`);
  if (!r) return null;
  return {
    totalMerged: r.total_count,
    recent: r.items
      .map((i) => ({
        title: i.title,
        repo: i.repository_url.split("/").pop() ?? "",
        number: i.number,
        date: i.closed_at,
        url: i.html_url,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)),
  };
}
