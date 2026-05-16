import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@shared/api/client';
import type { User, NewUser } from '@entities/user';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters: any) => [...userKeys.lists(), filters] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: number) => [...userKeys.details(), id] as const,
};

// Fetch all users
const fetchUsers = async (): Promise<User[]> => {
    const { data } = await api.get('/users');
    return data;
};

export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.all,
        queryFn: fetchUsers,
    });
};

// Create user
const createUser = async (newUser: NewUser): Promise<User> => {
    const { data } = await api.post('/users', newUser);
    return data;
};

const deleteUser = async (userId: number): Promise<void> => {
    await api.delete(`/users/${userId}`);
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            // Invalidate users list (if any)
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: (newUser) => {
            // Invalidate and refetch users list
            queryClient.invalidateQueries({ queryKey: userKeys.all });
            // Or update cache directly:
            // queryClient.setQueryData<User[]>(userKeys.all, (old) => [...(old || []), newUser]);
        },
    });
};