import { ApiCall } from "@/helpers/apicall";
import { IMovie } from "@/helpers/types";

export class TMDB {
    private static instance: TMDB;
    private readonly apiCall: ApiCall;

    private constructor() {
        this.apiCall = ApiCall.getInstance();
    }

    public static getInstance(): TMDB {
        if (!TMDB.instance) {
            TMDB.instance = new TMDB();
        }
        return TMDB.instance;
    }

    public async getMovies(query: string = "", page: number = 1): Promise<IMovie[]> {
        try {
            const endpoint = query 
                ? `search/movie?query=${encodeURIComponent(query)}`
                : `discover/movie?page=${page}&sort_by=popularity.desc`;
                
                const response = await this.apiCall.get(endpoint);
            return response?.results?.filter((movie: IMovie) => movie.poster_path) || [];
        } catch (error) {
            console.error("Error fetching movies:", error);
            return [];
        }
    }

    public async getUpcomingMovies(page: number = 1): Promise<IMovie[]> {
        try {
            
            const response = await this.apiCall.get(`movie/upcoming?language=en-US&page=${page}`);
            return response?.results || [];
        } catch (error) {
            console.error("Error fetching upcoming movies:", error);
            return [];
        }
    }

    public async getTrendingMovies(): Promise<IMovie[]> {
        try {
            const response = await this.apiCall.get('trending/movie/day?language=en-US');
            return response?.results || [];
        } catch (error) {
            console.error("Error fetching trending movies:", error);
            return [];
        }
    }
}
