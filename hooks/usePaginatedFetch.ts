import { useState, useEffect } from "react";

export const usePaginatedFetch = <T>(fetchFunction: () => Promise<T>, setLoadingState: (val: boolean) => void, dependencies: any[] = []) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction();
                setData((prevData) => {
                    if (Array.isArray(result) && Array.isArray(prevData)) {
                        return [...prevData, ...result] as T;
                    }
                    return result;
                });                
            } catch (error) {
                setError(error as Error);
                console.error("Error fetching data:", error);
            } finally {
                setLoadingState(false)
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
}
