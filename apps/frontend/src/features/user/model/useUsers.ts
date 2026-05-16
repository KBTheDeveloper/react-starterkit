import { useUnit } from 'effector-react';
import {
    $users,
    $usersLoading,
    fetchUsersFx,
    createUserFx,
} from '@shared/lib/effector/users';
import { useCallback } from 'react';
import type { NewUser, User } from '@entities/user';

export const useUsers = () => {
    const [users, loading] = useUnit([$users, $usersLoading]);
    const fetchUsers = useUnit(fetchUsersFx);
    const createUser = useUnit(createUserFx);

    const addUser = useCallback(
        async (userData: NewUser): Promise<User> => {
            const result = await createUser(userData);
            return result;
        },
        [createUser]
    );

    const refetch = useCallback(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        addUser,
        refetch,
    };
};
