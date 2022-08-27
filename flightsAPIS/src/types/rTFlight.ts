import { getStatus } from "../utils/utils";
import { RowDataRTFlight, RTFlightInterface, Status } from "./interfaces";

export class RTFlight implements RTFlightInterface{
    flightNumber: string;
    departureCountry: string;
    arrivalCountry: string;
    aircraftGeoLatitude: number;
    aircraftGeoLongitude: number;
    aircraftElevation: number;
    diraction: number;
    status: Status;
    constructor(rowDataRTFlight: RowDataRTFlight){
        this.flightNumber = rowDataRTFlight.flight_number;
        this.departureCountry = rowDataRTFlight.dep_iata;
        this.arrivalCountry = rowDataRTFlight.arr_iata;
        this.aircraftGeoLatitude = rowDataRTFlight.lat;
        this.aircraftGeoLongitude = rowDataRTFlight.lng;
        this.aircraftElevation = rowDataRTFlight.alt;
        this.diraction = rowDataRTFlight.dir;
        this.status = getStatus(rowDataRTFlight.status);
    }
    
}