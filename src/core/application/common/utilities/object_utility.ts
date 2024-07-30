export default class ObjectUtility {
    static areListsEqual = (list1: string[] | number[] | boolean[], list2: string[] | number[] | boolean[] ) => {
        if(list1.length !== list2.length)
            return false;
        
        for(let idx = 0; idx < list1.length; idx++){
            const itemAtIdx1 = list1[idx];
            const itemAtIdx2 = list2[idx];

            if(itemAtIdx1 !== itemAtIdx2){
                return false;
            }
        }

        return true;
    }

    static objectSize = (obj: {[key: string]: any}): number => {
        return Object.keys(obj).length;
    }

    static removeNullOrUndefinedValuesFromObject<T>(obj: T) : T {
        let response : {[key: string]: any}= {}
        for (let [key, value] of Object.entries(obj)){
            if(value === null || value === undefined){

            }
            else{
                response[key] = value
            }
        }
        return response as T;
    }
}