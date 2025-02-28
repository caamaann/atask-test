import { apiSearchUser, apiSearchUserRepository } from "@/lib/api";
import httpRequest from "@/lib/httpRequest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/httpRequest", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("API Service Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("apiSearchUser", () => {
    it("calls the correct endpoint with search parameters", async () => {
      const mockResponseData = {
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            id: 1,
            login: "user1",
            avatar_url: "https://avatars.githubusercontent.com/user1",
          },
          {
            id: 2,
            login: "user2",
            avatar_url: "https://avatars.githubusercontent.com/user2",
          },
        ],
      };

      vi.mocked(httpRequest.get).mockResolvedValueOnce({
        data: mockResponseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const params = { q: "testuser", per_page: 5 };
      const result = await apiSearchUser(params);

      expect(httpRequest.get).toHaveBeenCalledTimes(1);
      expect(httpRequest.get).toHaveBeenCalledWith("/search/users", { params });

      expect(result).toEqual(mockResponseData);
      expect(result.items).toHaveLength(2);
      expect(result.items[0].login).toBe("user1");
      expect(result.items[1].login).toBe("user2");
    });

    it("propagates errors from the HTTP request", async () => {
      const mockError = new Error("Network error");
      vi.mocked(httpRequest.get).mockRejectedValueOnce(mockError);

      await expect(apiSearchUser({ q: "testuser" })).rejects.toThrow(
        "Network error"
      );

      expect(httpRequest.get).toHaveBeenCalledTimes(1);
      expect(httpRequest.get).toHaveBeenCalledWith("/search/users", {
        params: { q: "testuser" },
      });
    });
  });

  describe("apiSearchUserRepository", () => {
    it("calls the correct endpoint with the username", async () => {
      const mockRepositories = [
        {
          id: 101,
          name: "repo1",
          description: "First repo",
          stargazers_count: 10,
          html_url: "https://github.com/testuser/repo1",
        },
        {
          id: 102,
          name: "repo2",
          description: "Second repo",
          stargazers_count: 20,
          html_url: "https://github.com/testuser/repo2",
        },
      ];

      vi.mocked(httpRequest.get).mockResolvedValueOnce({
        data: mockRepositories,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const result = await apiSearchUserRepository("testuser");

      expect(httpRequest.get).toHaveBeenCalledTimes(1);
      expect(httpRequest.get).toHaveBeenCalledWith("/users/testuser/repos", {
        params: undefined,
      });

      expect(result).toEqual(mockRepositories);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("repo1");
      expect(result[1].name).toBe("repo2");
    });

    it("calls the endpoint with additional parameters when provided", async () => {
      const mockRepositories = [
        {
          id: 101,
          name: "repo1",
          description: "First repo",
          stargazers_count: 10,
          html_url: "https://github.com/testuser/repo1",
        },
      ];

      vi.mocked(httpRequest.get).mockResolvedValueOnce({
        data: mockRepositories,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      const params = { per_page: 1, sort: "stars" };
      const result = await apiSearchUserRepository("testuser", params);

      expect(httpRequest.get).toHaveBeenCalledTimes(1);
      expect(httpRequest.get).toHaveBeenCalledWith("/users/testuser/repos", {
        params,
      });

      expect(result).toEqual(mockRepositories);
      expect(result).toHaveLength(1);
    });

    it("propagates errors from the HTTP request", async () => {
      const mockError = new Error("Repository not found");
      vi.mocked(httpRequest.get).mockRejectedValueOnce(mockError);

      await expect(apiSearchUserRepository("nonexistentuser")).rejects.toThrow(
        "Repository not found"
      );

      expect(httpRequest.get).toHaveBeenCalledTimes(1);
      expect(httpRequest.get).toHaveBeenCalledWith(
        "/users/nonexistentuser/repos",
        { params: undefined }
      );
    });
  });
});
