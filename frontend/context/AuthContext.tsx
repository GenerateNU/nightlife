import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    user_id: string;
    first_name: string;
    username: string;
    email: string;
    age: number;
    location?: { latitude: number; longitude: number };
    profile_picture_url: string;
    pronouns?: string;
    biography?: string;
    instagram_url?: string;
    tik_tok_url?: string;
    twitter_url?: string;
    phone?: string;
    privacy?: boolean;
    created_at: string;
    updated_at?: string;
}

interface AuthContextType {
    accessToken: string | null;
    user: UserProfile | null;
    login: (token: string) => void;
    logout: () => void;
    setUserAsync: (user: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: null,
    login: () => {},
    logout: () => {},
    setUserAsync: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                setAccessToken(token);
            }
        };
        const loadUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                setUser(JSON.parse(user));
            }
        }
        loadToken();
        loadUser();
    }, []);

    const login = async (token: string) => {
        setAccessToken(token);
        await AsyncStorage.setItem('accessToken', token);
    };

    const setUserAsync = async (user: UserProfile) => {
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
    }

    const logout = async () => {
        setAccessToken(null);
        setUser(null);
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ accessToken, user, login, logout, setUserAsync }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
