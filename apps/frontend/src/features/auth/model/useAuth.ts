import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@shared/api/client';
import type { User } from '@entities/user';

interface AuthState {
    user: User | null;
    loading: boolean;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<User>;
    register: (name: string, email: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
}

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<User>('/auth/me')
            .then(res => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        const { data } = await api.post<User>('/auth/login', { email, password });
        setUser(data);
        return data;
    };

    const register = async (name: string, email: string, password: string) => {
        const { data } = await api.post<User>('/auth/register', { name, email, password });
        setUser(data);
        return data;
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value= {{ user, loading, login, register, logout }
}>
    { children }
    < /AuthContext.Provider>
  );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
