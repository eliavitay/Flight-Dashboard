import { FlightData } from "./flightData"
import { RTFlight } from "./rTFlight"

export enum Status {
    scheduled = "scheduled",
    enRoute= "en-route",
    landed = "landed",
    cancelled = "cancelled",
    active = "active"
}

//dep mean Departure, arr mean Arrival
export interface RowDataFlight{
        flight_number: string,
        dep_iata: string,//dep airport name
        dep_time_utc: string,
        dep_estimated_utc: string,
        arr_estimated_utc: string,
        arr_actual_utc:string
        arr_iata: string,//arr airport name
        airline_iata: string
        duration: number// Estimated flight time (in minutes).
        status: string
}

//dep mean Departure, arr mean Arrival
export interface RowDataRTFlight{
    flight_number: string,
    lat: number,//dep airport name
    lng: number,
    alt: number,
    dir: number,
    dep_iata: string,//arr airport name
    arr_iata: string,
    status: string
}

export enum flightTypes{
    short = 1,
    medium = 2,
    long = 3
}

export interface FlightDataInterface{
    flightNumber: string,// flight_number -> flightNumber
    departureDateUTC: Date,// dep_actual_utc||dep_time_utc||dep_estimated_utc -> departureDateUTC
    arrivalEstimatedDateUTC: Date,// arr_estimated_utc -> arrivalEstimatedDateUTC
    departureCountry: string,// dep_iata -> departureCountry
    arrivalCountry: string,// dep_iata -> arrivalCountry
    airLineCompany: string,// airLineCompany -> airline_iata
    flightType: flightTypes,
    status: Status,
    arrivalDateUTC?: Date// arr_actual_utc -> arrivalEstimatedDateUTC

}

export interface RTFlightInterface{
    flightNumber: string, //flight_number -> flightNumber
    departureCountry: string,//dep_iata -> departureCountry
    arrivalCountry: string, //arr_iata -> arrivalCountry
    aircraftGeoLatitude: number// lat -> aircraftGeoLatitude
    aircraftGeoLongitude: number// lng -> aircraftGeoLongitude
    aircraftElevation: number // alt -> aircraftElevation//Aircraft elevation for now (meters)
    diraction: number // dir -> diraction
    status: Status
}

export interface IsraelFlightDataProviderInterface {
    apiKey: string
    getRTDataFlights(): Promise<RTFlightInterface[]>,
    getFlightsData(): Promise<FlightDataInterface[]>,
}

export interface FlightsDataRetriverInterface {
    apiKey: string
    retriveRTDataFilght(): Promise<RTFlight[]>;
    retriveFlightData(): Promise<FlightData[]>;
}