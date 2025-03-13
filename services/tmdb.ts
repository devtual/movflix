import { ApiCall } from "@/helpers/apicall";
import { IMovie, IMovieDetails } from "@/helpers/types";

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
        const endpoint = query 
            ? `search/movie?query=${encodeURIComponent(query)}`
            : `discover/movie?page=${page}&sort_by=popularity.desc`;
            
            const response = await this.apiCall.get(endpoint);
            
            if(!response.Status) {
                console.error("Error fetching movies:", response.Message);
                return [];
            }

            return response?.Result?.results.filter((movie: IMovie) => movie.poster_path) || [];
    }

    public async getUpcomingMovies(page: number = 1): Promise<IMovie[]> {
        const response = await this.apiCall.get(`movie/upcoming?language=en-US&page=${page}`);

        if (!response.Status) {
            console.error("Error fetching upcoming movies:", response.Message);
            return [];
        }
    
        return response.Result?.results || [];
    }

    public async getTrendingMovies(): Promise<IMovie[]> {
        const response = await this.apiCall.get('trending/movie/day?language=en-US');

        if (!response.Status) {
            console.error("Error fetching trending movies:", response.Message);
            return [];
        }
    
        return response.Result?.results || [];
        
    }

    public async getMovieDetails(id: string): Promise<IMovieDetails | null> {
        const response = await this.apiCall.get(`movie/${id}`);

        if (!response.Status) {
            console.error("Error fetching movie details:", response.Message);
            return null;
        }
    
        return response.Result;
    }
    
}
