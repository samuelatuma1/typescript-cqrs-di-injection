import { Types } from "mongoose";

export default class ProductExtra {
    public _id?: Types.ObjectId
    public title: string;
    public body: string;
}