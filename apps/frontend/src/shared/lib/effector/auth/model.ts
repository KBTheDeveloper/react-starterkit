import { createStore, createEvent, createEffect, sample } from "effector";

import type { User } from "@entities/user";
import api from "@shared/api/client";

// ---- Events ----
export const setUser = createEvent<User | null>();
export const setLoading = createEvent<boolean>();
export const resetAuth = createEvent();

// ---- Effects (async operations) ----
export const loginFx = createEffect<
  { email: string; password: string },
  User,
  Error
>({
  handler: async ({ email, password }) => {
    const { data } = await api.post<User>("/auth/login", { email, password });
    return data;
  },
});

export const registerFx = createEffect<
  { name: string; email: string; password: string; captchaToken: string },
  User,
  Error
>({
  handler: async ({ name, email, password, captchaToken }) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      captchaToken,
    });
    return data;
  },
});

export const logoutFx = createEffect<void, void, Error>({
  handler: async () => {
    await api.post("/auth/logout");
  },
});

export const checkAuthFx = createEffect<void, User | null, Error>({
  handler: async () => {
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch {
      return null;
    }
  },
});

// ---- Stores ----
export const $user = createStore<User | null>(null)
  .on(setUser, (_, user) => user)
  .on(loginFx.done, (_, { result }) => result)
  .on(registerFx.done, (_, { result }) => result)
  .reset(resetAuth);

export const $isLoading = createStore<boolean>(true)
  .on(setLoading, (_, loading) => loading)
  .on(
    [
      loginFx.pending,
      registerFx.pending,
      logoutFx.pending,
      checkAuthFx.pending,
    ],
    (_, pending) => pending
  )
  .reset(resetAuth);

// ---- Side effects (sample) ----
// When login/register succeeds, reset loading? Already handled.
// When logout succeeds, reset stores.
sample({
  clock: logoutFx.done,
  target: resetAuth,
});

// On app start, check auth
sample({
  clock: checkAuthFx.doneData,
  target: setUser,
});

// Set loading true when effects start, false when done (handled via .pending)
