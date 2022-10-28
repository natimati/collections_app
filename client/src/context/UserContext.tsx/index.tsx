import React, { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "./helpers";

interface UserContextValue {
    user: User | null;
    isAdmin: boolean;
    setUser: (user: User | null) => void;
    setUserFromToken: (token: string) => void;
    isLoading: boolean;
    logout: () => void;
}

interface User {
    id: string;
    username: string;
    isAdmin: boolean;
    loginTime: string;
    registerTime: string
}

export const UserContext = React.createContext<UserContextValue>({
    user: null,
    isAdmin: false,
    setUser: () => undefined,
    isLoading: true,
    setUserFromToken: () => undefined,
    logout: () => undefined,
});

interface Props {
    children: React.ReactNode
}

export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<null | User>(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    const setUserFromToken = useCallback((token: string) => {
        const decoded = parseJwt(token) as User;
        setUser(decoded);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null)
    }, [])

    const contextValue = useMemo(() => ({
        user,
        isAdmin: user?.isAdmin || false,
        setUser,
        isLoading: isLoadingUserData,
        setUserFromToken,
        logout
    }), [user, isLoadingUserData, setUserFromToken, logout]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoadingUserData(true);
            setUserFromToken(token);
            setIsLoadingUserData(false);
        } else {
            setUser(null);
        }
    }, [setUserFromToken]);

    return (
        <UserContext.Provider
            value={contextValue}
        >
            {children}
        </UserContext.Provider>
    );
}