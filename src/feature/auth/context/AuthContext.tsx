import { createContext, ReactNode, useMemo, useState } from "react";
import { IUser } from "@/src/feature/user/interface/IUser";

interface IAuthContext {
    email: string | null;
    fullName: string | null;
    setUser: (user: IUser) => void;
    clearUser: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUserState] = useState<IUser | null>(null);

    const setUser = (newUser: IUser) => {
        setUserState(newUser);
    };

    const clearUser = () => {
        setUserState(null);
    };

    const value = useMemo(
        () => ({
            email: user?.email ?? null,
            fullName: user?.fullName ?? null,
            setUser,
            clearUser,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
