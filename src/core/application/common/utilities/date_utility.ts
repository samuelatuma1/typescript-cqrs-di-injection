export default class DateUtility{
    static getUTCNow = (): Date => {
        return new Date(new Date().toISOString());
    }
}