import { useState } from "react";
import { IApodResponse } from "../interface/IApodResponse";
import { AxiosError } from "axios";
import { api } from "@/src/service/ApiClient";

export default function useApod() {
    const [apod, setApod] = useState<IApodResponse>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)



    const getApod = async (age: number, month: number, day: number) => {
        initializeRequest()
        try {
            const formattedMonth = String(month).padStart(2, "0");
            const formattedDay = String(day).padStart(2, "0");
            const response = await api.get(`/planetary/apod?date=${age}-${formattedMonth}-${formattedDay}`);
            if (response.status === 200) {
                setApod(response.data)
            }

        } catch (error) {
            const status = (error as AxiosError).response?.status;
            setMessageUI(true, resolveApodErrorMessage(status));
        } finally {
            endRequest();
        }
    }

    const resolveApodErrorMessage = (status?: number): string => {
        switch (status) {
            case 400:
                return "Fecha con formato inválido o fuera de rango.";
            case 403:
                return "API Key inválida o no proporcionada.";
            case 429:
                return "Límite de requests excedido (rate limit).";
            case 500:
                return "Error interno del servidor de NASA.";
            default:
                return "Error inesperado al cargar los datos de APOD.";
        }
    }


    const initializeRequest = () => {
        setLoading(true);
        setMessage(null)
        setError(false)
    }

    const endRequest = () => {
        setLoading(false);

        setTimeout(() => {
            setMessage(null)
            setError(false)
        }, 5500)
    }

    const setMessageUI = (error: boolean, message: string) => {
        setError(error)
        setMessage(message)
    }


    return { getApod, loading, apod, message, error }

}