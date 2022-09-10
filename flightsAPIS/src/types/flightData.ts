import { ArrivalStatus, FlightDataInterface, flightTypes, RowDataFlight, Status } from "../types/interfaces";
import { getStatus } from "../utils/utils";

const HOUR = 60;
const QUARTER_HOUR = 15;
const MINUTES = 1000;
const AIRPLANE_SPEED = 850;
const SHORT = 1500;
const MEDIUM = 3500;

export class FlightData implements FlightDataInterface{
    flightNumber: string;
    departureDateUTC: Date;
    departureCountry: string;
    arrivalCountry: string;
    airLineCompany: string;
    flightType: flightTypes;
    status: Status;
    arrivalEstimatedDateUTC: Date;
    arrivalStatus?: ArrivalStatus;
    arrivalDateUTC?: Date;
    constructor(rowFlight: RowDataFlight){
        this.flightNumber = rowFlight.flight_number;
        this.departureCountry = rowFlight.dep_iata;
        this.arrivalCountry = rowFlight.arr_iata;
        this.airLineCompany = rowFlight.airline_iata;
        this.departureDateUTC = (rowFlight.dep_estimated_utc)? new Date(rowFlight.dep_estimated_utc) : new Date(rowFlight.dep_time_utc);
        this.arrivalEstimatedDateUTC = new Date(rowFlight.arr_estimated_utc);
        if(rowFlight.arr_actual_utc){
            this.arrivalDateUTC = new Date(rowFlight.arr_actual_utc);
            this.arrivalStatus = this.calculateArrivalStatus(this.arrivalDateUTC, this.arrivalEstimatedDateUTC);
        }
        this.flightType = this.calculateflightType(rowFlight.duration);
        this.status = getStatus(rowFlight.status);
    }


    calculateflightType(duration: number): flightTypes {
        if(!this.status){
            return flightTypes.medium
        }
        const km = (duration/HOUR) * AIRPLANE_SPEED;
        if(km < SHORT){
            return flightTypes.short;
        }
        if(km < MEDIUM){
            return flightTypes.medium;
        }
        return flightTypes.long;
    }
    
    calculateArrivalStatus(arrivalDateUTC: Date, arrivalEstimatedDateUTC: Date): ArrivalStatus {
        const msBetweenDates  = arrivalDateUTC.getTime() - arrivalEstimatedDateUTC.getTime();
        const minBetweenDates = msBetweenDates/ (HOUR * MINUTES);
        if(minBetweenDates < QUARTER_HOUR){ 
            return ArrivalStatus.inTime
        }
        else if(minBetweenDates <= HOUR){
            return ArrivalStatus.delayed
        }
        return ArrivalStatus.highlyDelayed
    }
}




