import React, { useCallback, useEffect, useMemo, useState } from "react";
import { parseJwt } from "./helpers";

interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
    setUserFromToken: (token: string) => void;
    isLoading: boolean;
}

interface User {
    id: string;
    username: string;
    isAdmin: boolean;
    loginTime: string;
    registerTime: string
}

export const UserContext = React.createContext<UserContextValue>({
    user: null, setUser: () => undefined, isLoading: true, setUserFromToken: () => undefined,
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

    const contextValue = useMemo(() => ({
        user,
        setUser,
        isLoading: isLoadingUserData,
        setUserFromToken
    }), [user, isLoadingUserData, setUserFromToken]);

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