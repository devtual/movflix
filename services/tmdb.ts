import { ApiCall } from "@/helpers/apicall";

export class TMDB {
    private static instance: TMDB;
    private readonly apicall: ApiCall;

    private constructor(){
        this.apicall = ApiCall.getInstance();

        // if (TMDB.instance) {
        //     throw new Error("Error: Instantiation failed: Use UserOrders.getInstance() instead of new.");
        // }
    }

    public static getInstance(): TMDB{

        if(!TMDB.instance){
            TMDB.instance = new TMDB();
        }

        return TMDB.instance;
    }

    public async fetchMovies(query:string) {
        try {
            const endpoint = query ? `search/movie?query=${encodeURIComponent(query)}` : `discover/movie?sort_by=popularity.desc`
            const response = await this.apicall.get(endpoint);
            return response?.results || [];
        } catch (error) {
            console.error("Failed to fetch popular movies:", error);
            return [];
        }
    }

    public async fetchTopRatedMovies(page:number = 1) {
        try {
            const response = await this.apicall.get(`movie/upcoming?language=en-US&page=${page}`);
            return response?.results || [];
        } catch (error) {
            console.error("Failed to fetch popular movies:", error);
            return [];
        }
    }

    public async fetchTrendingMovies() {
        try {
            const response = await this.apicall.get('trending/movie/day?language=en-US');
            return response?.results || [];
        } catch (error) {
            console.error("Failed to fetch trending movies:", error);
            return [];
        }
    }

}