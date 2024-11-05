import React, { createContext, useState, useContext, useEffect, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    userId: string;
    first_name: string;
    username: string;
    email: string;
    age: number;
    location?: { latitude: number; longitude: number };
    profile_picture: string;
    created_at: string;
    updated_at?: string;
}

interface AuthContextType {
    accessToken: string | null;
    user: UserProfile | null;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: null,
    login: () => {},
    logout: () => {},
    setUser: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    // Load token from AsyncStorage on initial render
    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            if (token) {
                setAccessToken(token);
            }
        };
        loadToken();
    }, []);

    // Store accessToken after login
    const login = async (token: string) => {
        setAccessToken(token);
        await AsyncStorage.setItem('accessToken', token);
    };

    // Clear token and user on logout
    const logout = async () => {
        setAccessToken(null);
        setUser(null);
        await AsyncStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ accessToken, user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
