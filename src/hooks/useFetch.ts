import { useState, useEffect } from "react";

const localCache: Record<string, any> = {};
interface FetchDataState<T> {
    resp: T | null;
    loading: boolean;
    hasError: boolean;
    error: string | null;
    status: boolean | null;
}

export const useFetch = <T>(url: string): FetchDataState<T> => {
    const [data, setData] = useState<FetchDataState<T>>({
        resp: null,
        loading: true,
        hasError: false,
        error: null,
        status: null,
    });

    useEffect(() => {
        setData(prev => ({ ...prev, loading: true }));
        fetchData();
    }, [url]);

    const fetchData = async () => {
        if (localCache[url]) {
            setData({
                resp: localCache[url],
                loading: false,
                hasError: false,
                error: null,
                status: true,
            });
            return;
        }

        const resp = await fetch(url);
        const data = await resp.json();

        if (!resp.ok) {
            setData({
                resp: null,
                loading: false,
                hasError: true,
                error: data.message || "Error fetching data",
                status: false,
            });
            return;
        }

        setData({
            resp: data,
            loading: false,
            hasError: false,
            error: null,
            status: true,
        });

        localCache[url] = data;
    };

    return {
        ...data,
    };
};
