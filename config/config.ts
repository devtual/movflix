
export class AppSettings {
    public static isStagingEnv = process.env.EXPO_PUBLIC_IS_STAGING_ENV === "true";
    public static apiEndpoint = process.env.EXPO_PUBLIC_API_ENDPOINT;
    public static apiKey = process.env.EXPO_PUBLIC_API_KEY
}