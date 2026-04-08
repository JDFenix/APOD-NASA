import { useState } from "react";
import { AxiosError } from "axios";
import { api } from "@/src/service/ApiClient";

export default function useLogin() {


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

            if (email === "usuario@nasa.com" && password === "123456") {
                return true;

            } else {
                setMessageUI(true, "Credenciales invalidas")
                return false
            }

        } catch (error) {
            const status = (error as AxiosError).response?.status;
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