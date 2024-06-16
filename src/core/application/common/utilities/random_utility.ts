import {v4} from "uuid";
export default class RandomUtility {
    static newGuid = (): string => {
        return v4()
    }
}