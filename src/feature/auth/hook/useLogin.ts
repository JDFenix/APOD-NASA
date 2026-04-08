import { useState } from "react";
import useAuth from "@/src/feature/auth/hook/useAuth";

export default function useLogin() {
    const { setUser, clearUser } = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)


    const login = async (): Promise<boolean> => {
        initializeRequest()
        try {
            const isValidCredentials = validateCretentials();
            if (!isValidCredentials) {
                return false
            }

            if (email === "usuario@nasa.gov" && password === "123456") {
                setUser({ email: email, fullName: "Oscar Mata" })
                return true

            } else {
                setMessageUI(true, "Credenciales invalidas")
                return false
            }

        } catch {
            setMessageUI(true, "Error interno del servidor");
            return false

        } finally {
            endRequest();
        }
    }


    const logout = () => {
        clearUser()
    }


    const validateCretentials = (): boolean => {
        if (email.length === 0 || password.length === 0) {
            setMessageUI(true, "Complete todos los campos")
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^\d{6}$/;

        const isValidEmail = emailRegex.test(email.trim());
        const isValidPassword = passwordRegex.test(password);

        if (!isValidEmail || !isValidPassword) {
            setMessageUI(true, "Credenciales con formato invalido")
            return false
        }

        return true

    }




    const initializeRequest = () => {
        setLoading(true);
        setMessage(null);
        setError(false);
    }

    const endRequest = () => {
        setLoading(false);

        setTimeout(() => {
            setMessage(null);
            setError(false);
        }, 5500)
    }

    const setMessageUI = (error: boolean, message: string) => {
        setError(error);
        setMessage(message);
    }


    return { login, loading, message, error, email, password, setPassword, setEmail, logout }

}