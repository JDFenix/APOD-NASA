import { useState } from "react";
import { IUser } from "@/src/feature/user/interface/IUser";
import useAuth from "@/src/feature/auth/hook/useAuth";

export default function useLogin() {
    const { setUser } = useAuth()

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)


    const login = async (): Promise<boolean> => {
        initializeRequest()
        try {
            if (email.length === 0 || password.length === 0) {
                setMessageUI(true, "Complete todos los campos")
                return false
            }

            //usuario@nasa.gov
            //123456
            if (email === "1" && password === "1") {
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


    return { login, loading, message, error, email, password, setPassword, setEmail }

}