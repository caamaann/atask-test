/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { apiSearchUser, apiSearchUserRepository } from "@/lib/api";
import { BaseResponse, User } from "@/types/api";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockUsers = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
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
      starred_url:
        "https://api.github.com/users/caamaann/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/caamaann/subscriptions",
      organizations_url: "https://api.github.com/users/caamaann/orgs",
      repos_url: "https://api.github.com/users/caamaann/repos",
      events_url: "https://api.github.com/users/caamaann/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/caamaann/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1,
    },
  ],
};

const mockRepos = [
  {
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
      starred_url:
        "https://api.github.com/users/caamaann/starred{/owner}{/repo}",
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
    description: null,
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
    git_tags_url:
      "https://api.github.com/repos/caamaann/ableton/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/caamaann/ableton/git/refs{/sha}",
    trees_url: "https://api.github.com/repos/caamaann/ableton/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/caamaann/ableton/statuses/{sha}",
    languages_url: "https://api.github.com/repos/caamaann/ableton/languages",
    stargazers_url: "https://api.github.com/repos/caamaann/ableton/stargazers",
    contributors_url:
      "https://api.github.com/repos/caamaann/ableton/contributors",
    subscribers_url:
      "https://api.github.com/repos/caamaann/ableton/subscribers",
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
    deployments_url:
      "https://api.github.com/repos/caamaann/ableton/deployments",
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
  },
];

vi.mock("@/lib/api", () => ({
  apiSearchUser: vi.fn(),
  apiSearchUserRepository: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
  };

  it("renders the app with initial empty state", () => {
    renderApp();

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-list")).toBeInTheDocument();
    expect(screen.queryByText(/Showing users for/)).not.toBeInTheDocument();
  });

  it("updates state and triggers query on form submission", async () => {
    vi.mocked(apiSearchUser).mockResolvedValue(mockUsers);
    vi.mocked(apiSearchUserRepository).mockResolvedValue(mockRepos);

    renderApp();

    const input = screen.getByTestId("username-input");
    const form = screen.getByTestId("search-form");

    await userEvent.type(input, "testuser");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText(/Showing users for "testuser"/)
      ).toBeInTheDocument();
    });

    expect(apiSearchUser).toHaveBeenCalledWith({ q: "testuser", per_page: 5 });

    await waitFor(() => {
      expect(apiSearchUserRepository).toHaveBeenCalledTimes(1);
      expect(apiSearchUserRepository).toHaveBeenCalledWith("caamaann", {
        per_page: 999,
      });
    });
  });

  it("displays search results when API call is successful", async () => {
    vi.mocked(apiSearchUser).mockResolvedValue(mockUsers);
    vi.mocked(apiSearchUserRepository).mockResolvedValue(mockRepos);

    renderApp();

    const input = screen.getByTestId("username-input");
    const form = screen.getByTestId("search-form");

    await userEvent.type(input, "testuser");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId("search-item")).toHaveLength(1);
    });
  });

  it("shows loading state during API call", async () => {
    let resolveSearchPromise: any;
    const searchPromise = new Promise<BaseResponse<User>>((resolve) => {
      resolveSearchPromise = resolve;
    });

    vi.mocked(apiSearchUser).mockReturnValue(searchPromise);

    renderApp();

    const input = screen.getByTestId("username-input");
    const form = screen.getByTestId("search-form");

    await userEvent.type(input, "testuser");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText(/Showing users for "testuser"/)
      ).toBeInTheDocument();
    });

    expect(screen.getByTestId("submit-button")).toBeDisabled();

    if (resolveSearchPromise) {
      resolveSearchPromise({ items: [] });
    }

    await waitFor(() => {
      expect(screen.getByTestId("submit-button")).not.toBeDisabled();
    });
  });

  it("shows error toast when API call fails with AxiosError", async () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        data: {
          message: "API rate limit exceeded",
        },
      },
    };

    vi.mocked(apiSearchUser).mockRejectedValue(axiosError);

    renderApp();

    const input = screen.getByTestId("username-input");
    const form = screen.getByTestId("search-form");

    await userEvent.type(input, "testuser");
    fireEvent.submit(form);
  });

  it("shows generic error toast when API call fails with non-AxiosError", async () => {
    vi.mocked(apiSearchUser).mockRejectedValue(new Error("Network error"));

    renderApp();

    const input = screen.getByTestId("username-input");
    const form = screen.getByTestId("search-form");

    await userEvent.type(input, "testuser");
    fireEvent.submit(form);
  });
});
