import { createStore, createEvent, createEffect } from 'effector';
import api from '@shared/api/client';
import type { User, NewUser } from '@entities/user';

// ---- Events ----
export const setUsers = createEvent<User[]>();
export const addUserToList = createEvent<User>();
export const resetUsers = createEvent();

// ---- Effects ----
export const fetchUsersFx = createEffect<void, User[], Error>({
    handler: async () => {
        const { data } = await api.get<User[]>('/users');
        return data;
    },
});

export const createUserFx = createEffect<NewUser, User, Error>({
    handler: async (newUser) => {
        const { data } = await api.post<User>('/users', newUser);
        return data;
    },
});

// ---- Stores ----
export const $users = createStore<User[]>([])
    .on(setUsers, (_, users) => users)
    .on(addUserToList, (state, user) => [...state, user])
    .on(fetchUsersFx.done, (_, { result }) => result)
    .on(createUserFx.done, (state, { result }) => [...state, result])
    .reset(resetUsers);

export const $usersLoading = createStore(false)
    .on(fetchUsersFx.pending, (_, pending) => pending)
    .on(createUserFx.pending, (_, pending) => pending);
