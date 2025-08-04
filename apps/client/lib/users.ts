import { User } from "@shared/types/user";
import { apiGet, apiPost, apiDelete } from "./api";

export const fetchRandomUsers = async (count = 4) => {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`);

  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();

  return data.results;
};

export const fetchSavedUsers = async () => {
  return apiGet("/users");
};

export const saveUser = async (user: User) => {
  return apiPost("/users", user);
};

export const deleteUser = (id: string) => {
  return apiDelete(`/users/${id}`);
};
