import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";

interface CountryInit {
     name: string;
     code: string;
}

interface StateInit {
    name: string;
    code: string;
    countryCode: string;
}

interface CityInit {
    name: string;
    code: string;
    state: Types.ObjectId;
}
export class Country extends BaseEntity<Types.ObjectId>{
    public name: string;
    public code: string;

    public constructor(init: CountryInit){
        super(new Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
    }
}

export class State extends BaseEntity<Types.ObjectId>{
    public name: string;
    public code: string;
    public countryCode: string | Country 

    public constructor(init: StateInit){
        super(new Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
        this.countryCode = init.countryCode;
    }
}
export class City extends BaseEntity<Types.ObjectId>{
    public name: string;
    public code: string;
    public state: Types.ObjectId | State
    public constructor(init: CityInit){
        super(new Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
        this.state = init.state;
    }
}

export default class Address extends BaseEntity<Types.ObjectId>{
    public streetNo: number;
    public street: string;
    public city: Types.ObjectId | City;
    public extraDetails: string = "";
    public phone: string = "";

}