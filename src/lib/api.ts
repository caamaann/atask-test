import httpRequest from "./httpRequest";
import { BaseParams, BaseResponse, Repository, User } from "@/types/api";

export const apiSearchUser = async (params: BaseParams<{ q: string }>) => {
  const response = await httpRequest.get<BaseResponse<User>>(`/search/users`, {
    params,
  });
  return response.data;
};

export const apiSearchUserRepository = async (
  user: string,
  params?: BaseParams
) => {
  const response = await httpRequest.get<Repository[]>(`/users/${user}/repos`, {
    params,
  });
  return response.data;
};
