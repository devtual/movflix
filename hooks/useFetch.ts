import { useState, useEffect } from "react";

export const useFetch = <T>(fetchFunction: () => Promise<T>, dependencies: any[] = []) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction();
                setData(result);
                
            } catch (error) {
                setError(error as Error);
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
}
