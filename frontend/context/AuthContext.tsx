import React, {createContext, useState, useContext, PropsWithChildren} from 'react';

interface AuthContextType {
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (token: string) => {
        setAccessToken(token);
    };

    const logout = () => {
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
