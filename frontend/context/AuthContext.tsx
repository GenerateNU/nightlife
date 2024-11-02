import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface UserProfile {
    userId: string;
    first_name: string;
    username: string;
    email: string;
    age: number;
    location?: { latitude: number; longitude: number };
    profile_picture_url: string;
    created_at: string;
    updated_at?: string;
}

interface AuthContextType {
    accessToken: string | null;
    user: UserProfile | null;
    login: (token: string) => void;
    logout: () => void;
    setUser: (user: UserProfile) => void; // to update user after fetching
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

    // Store accessToken after login
    const login = (token: string) => {
        setAccessToken(token);
    };

    // Clear token and user on logout
    const logout = () => {
        setAccessToken(null);
        setUser(null); 
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
