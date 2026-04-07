import { useState } from "react";
import { IApodResponse } from "../interface/IApodResponse";
import { AxiosError } from "axios";
import { api } from "@/src/service/ApiClient";

export default function useApod() {
    const [apod, setApod] = useState<IApodResponse>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState<string | null>(null)



    const getApod = async () => {
        initializeRequest()
        try {
            const response = await api.get(`/planetary/apod`);
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
                return "Invalid date format or date out of range.";
            case 403:
                return "Invalid or missing API key.";
            case 429:
                return "Request limit exceeded (rate limit).";
            case 500:
                return "NASA server internal error.";
            default:
                return "Unexpected error while loading APOD data.";
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


    return { getApod, loading, apod, message }

}