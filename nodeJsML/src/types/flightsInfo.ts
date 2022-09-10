import { DateInfo, FlightInfoInterFace, RawFlightInfo } from "../interfaces/interfaces";
import { Connectivity } from "./connectivity";
let myhash: IHash = {};
export interface IHash {
    [details: string] : DateInfo;
} 
export class FlightInfo implements FlightInfoInterFace{
    date: string;
    airLineCompany: string;
    departureCountry: string;
    arrivalCountry: string;
    flightType: number;
    flightNumber: string;
    arrivalStatus?: 1 | 2 | 3;
    day?: number | undefined;
    month?: number | undefined;
    isHoliday?: boolean | undefined;
    isSummer?: boolean | undefined;
    constructor(rawFlightInfo: RawFlightInfo){
        this.flightNumber = rawFlightInfo.flightNumber;
        this.flightType = rawFlightInfo.flightType
        this.arrivalCountry = rawFlightInfo.arrivalCountry;
        this.departureCountry = rawFlightInfo.departureCountry;
        this.airLineCompany = rawFlightInfo.airLineCompany;
        const date = rawFlightInfo.departureDateUTC.split("T")[0];
        if(date){
            this.date = date;
        }
        else{
            this.date = new Date().toString();
        }
        if(rawFlightInfo.arrivalStatus){
            this.arrivalStatus = rawFlightInfo.arrivalStatus;
        }
    }
    async init(){
        let dateInfo: DateInfo | undefined = myhash[this.date]
        if(!dateInfo){
            dateInfo = (await Connectivity.getdateInfo(this.date))["data"]["data"]["data"];
            if(!dateInfo){
                console.log("Cannot find date info");
                return;
            }
            myhash[this.date] = dateInfo;
        }
        this.day = dateInfo["day"];
        this.month = dateInfo["month"];
        this.isHoliday = dateInfo["isHoliday"];
        this.isSummer = dateInfo["isSummer"];
    }
}