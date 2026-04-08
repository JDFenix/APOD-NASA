import { useContext } from "react";
import { AuthContext } from "@/src/feature/auth/context/AuthContext";

export default function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must use into a AuthProvider");
    }

    return context;
}
