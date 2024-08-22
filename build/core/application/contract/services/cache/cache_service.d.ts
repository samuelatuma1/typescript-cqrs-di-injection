export default interface ICacheService {
    addAsync(key: string, value: object, durationInSeconds: number): Promise<boolean>;
    getAsync<T>(key: string): Promise<T | null>;
}
export declare const IICacheService = "ICacheService";
