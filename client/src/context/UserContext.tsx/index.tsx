import React, { useEffect, useMemo, useState } from "react";
import { parseJwt } from "./helpers";

interface UserContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
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
    user: null, setUser: () => undefined, isLoading: true,
});

interface Props {
    children: React.ReactNode
}

export function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<null | User>(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        isLoading: isLoadingUserData,
    }), [user, isLoadingUserData]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoadingUserData(true);
            const decoded = parseJwt(token as string) as User;
            setUser(decoded);
            setIsLoadingUserData(false);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider
            value={contextValue}
        >
            {children}
        </UserContext.Provider>
    );
}