export default class SerializationUtility{
    static serializeJson = (data: object): string | null => {
        try{
            return JSON.stringify(data);
        }
        catch(ex){
            console.log(ex);
            return null;
        }
    }

    static deserializeJson<T>(data: string): T | null {
        try{
            return JSON.parse(data) as T; 
        }
        catch(ex){
            console.log(ex);
            return null
        }
    }
}