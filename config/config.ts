export class AppSettings {
    public static isStagingEnv =  process.env.IS_STAGING_ENV === "true";
    public static apiEndpoint = process.env.API_ENDPOINT;
    public static socketEndpoint = process.env.SOCKET_ENDPOINT;
}