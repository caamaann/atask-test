import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RepositoryItem from "@/components/repository-item";

vi.mock("lucide-react", () => ({
  Star: () => <div data-testid="star-icon">Star Icon</div>,
}));

const mockRepos = {
  id: 820438675,
  node_id: "R_kgDOMObmkw",
  name: "ableton",
  full_name: "caamaann/ableton",
  private: false,
  owner: {
    login: "caamaann",
    id: 36650325,
    node_id: "MDQ6VXNlcjM2NjUwMzI1",
    avatar_url: "https://avatars.githubusercontent.com/u/36650325?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/caamaann",
    html_url: "https://github.com/caamaann",
    followers_url: "https://api.github.com/users/caamaann/followers",
    following_url:
      "https://api.github.com/users/caamaann/following{/other_user}",
    gists_url: "https://api.github.com/users/caamaann/gists{/gist_id}",
    starred_url: "https://api.github.com/users/caamaann/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/caamaann/subscriptions",
    organizations_url: "https://api.github.com/users/caamaann/orgs",
    repos_url: "https://api.github.com/users/caamaann/repos",
    events_url: "https://api.github.com/users/caamaann/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/caamaann/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
  },
  html_url: "https://github.com/caamaann/ableton",
  description: "description",
  fork: false,
  url: "https://api.github.com/repos/caamaann/ableton",
  forks_url: "https://api.github.com/repos/caamaann/ableton/forks",
  keys_url: "https://api.github.com/repos/caamaann/ableton/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/caamaann/ableton/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/caamaann/ableton/teams",
  hooks_url: "https://api.github.com/repos/caamaann/ableton/hooks",
  issue_events_url:
    "https://api.github.com/repos/caamaann/ableton/issues/events{/number}",
  events_url: "https://api.github.com/repos/caamaann/ableton/events",
  assignees_url:
    "https://api.github.com/repos/caamaann/ableton/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/caamaann/ableton/branches{/branch}",
  tags_url: "https://api.github.com/repos/caamaann/ableton/tags",
  blobs_url: "https://api.github.com/repos/caamaann/ableton/git/blobs{/sha}",
  git_tags_url: "https://api.github.com/repos/caamaann/ableton/git/tags{/sha}",
  git_refs_url: "https://api.github.com/repos/caamaann/ableton/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/caamaann/ableton/git/trees{/sha}",
  statuses_url: "https://api.github.com/repos/caamaann/ableton/statuses/{sha}",
  languages_url: "https://api.github.com/repos/caamaann/ableton/languages",
  stargazers_url: "https://api.github.com/repos/caamaann/ableton/stargazers",
  contributors_url:
    "https://api.github.com/repos/caamaann/ableton/contributors",
  subscribers_url: "https://api.github.com/repos/caamaann/ableton/subscribers",
  subscription_url:
    "https://api.github.com/repos/caamaann/ableton/subscription",
  commits_url: "https://api.github.com/repos/caamaann/ableton/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/caamaann/ableton/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/caamaann/ableton/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/caamaann/ableton/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/caamaann/ableton/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/caamaann/ableton/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/caamaann/ableton/merges",
  archive_url:
    "https://api.github.com/repos/caamaann/ableton/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/caamaann/ableton/downloads",
  issues_url: "https://api.github.com/repos/caamaann/ableton/issues{/number}",
  pulls_url: "https://api.github.com/repos/caamaann/ableton/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/caamaann/ableton/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/caamaann/ableton/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/caamaann/ableton/labels{/name}",
  releases_url: "https://api.github.com/repos/caamaann/ableton/releases{/id}",
  deployments_url: "https://api.github.com/repos/caamaann/ableton/deployments",
  created_at: "2024-06-26T13:19:11Z",
  updated_at: "2024-06-26T13:19:16Z",
  pushed_at: "2024-06-26T13:19:13Z",
  git_url: "git://github.com/caamaann/ableton.git",
  ssh_url: "git@github.com:caamaann/ableton.git",
  clone_url: "https://github.com/caamaann/ableton.git",
  svn_url: "https://github.com/caamaann/ableton",
  homepage: null,
  size: 104,
  stargazers_count: 0,
  watchers_count: 0,
  language: "TypeScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 0,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: null,
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 0,
  open_issues: 0,
  watchers: 0,
  default_branch: "master",
  permissions: {
    admin: true,
    maintain: true,
    push: true,
    triage: true,
    pull: true,
  },
};
describe("RepositoryItem Component", () => {
  it("renders repository with description correctly", () => {
    render(<RepositoryItem data={mockRepos} />);

    expect(screen.getByText("ableton")).toBeInTheDocument();

    expect(screen.getByText("description")).toBeInTheDocument();

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
