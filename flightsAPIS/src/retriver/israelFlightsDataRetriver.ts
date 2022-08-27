import { Connectivity } from "../connectivity";
import { FlightData } from "../types/flightData";
import { FlightsDataRetriverInterface, RowDataFlight, RowDataRTFlight } from "../types/interfaces";
import { RTFlight } from "../types/rTFlight";
const TLV_DEP = "dep_iata=TLV";
const TLV_ARR = "arr_iata=TLV";
const FROM_ISRAEL_RT_FLIGHT_URL = `http://airlabs.co/api/v9/flights?${TLV_DEP}&api_key=`;
const TO_ISRAEL_RT_FLIGHT_URL = `http://airlabs.co/api/v9/flights?${TLV_ARR}&api_key=`;
const FROM_ISRAEL_FLIGHT_URL = `http://airlabs.co/api/v9/schedules?${TLV_DEP}&api_key=`;
const TO_ISRAEL_FLIGHT_URL = `http://airlabs.co/api/v9/schedules?${TLV_ARR}&api_key=`;

export class IsraelFlightsDataRetriver implements FlightsDataRetriverInterface{
    apiKey: string;

    constructor(apiKey:string){
        this.apiKey = apiKey;
    }
    
    async retriveRTDataFilght(): Promise<RTFlight[]>{
        const config = Connectivity.getConfig();

        const fromIsraelUrl = `${FROM_ISRAEL_RT_FLIGHT_URL}${this.apiKey}`
        const fromIsraelRes = await Connectivity.getRequest(fromIsraelUrl, config);
        const rowsFromIsraeDataRTFlight: RowDataRTFlight[] = fromIsraelRes.data.response;
        
        const fromIsraelRT = rowsFromIsraeDataRTFlight.map((rowDataRTFlight) => new RTFlight(rowDataRTFlight));

        const toIsraelUrl = `${TO_ISRAEL_RT_FLIGHT_URL}${this.apiKey}`
        const toIsraelRes = await Connectivity.getRequest(toIsraelUrl, config);
        const rowstoIsraeDataRTFlight: RowDataRTFlight[] = toIsraelRes.data.response;
        
        const toIsraelRT = rowstoIsraeDataRTFlight.map((rowDataRTFlight) => new RTFlight(rowDataRTFlight));
        
        const israelRTFlights = [...fromIsraelRT,...toIsraelRT];
        return israelRTFlights;  
    };

    async retriveFlightData(): Promise<FlightData[]>{
        const config = Connectivity.getConfig();

        const fromIsraelUrl = `${FROM_ISRAEL_FLIGHT_URL}${this.apiKey}`
        const fromIsraelRes = await Connectivity.getRequest(fromIsraelUrl, config);
        const rowsFromIsraeDataFlight: RowDataFlight[] = fromIsraelRes.data.response;
        
        const fromIsraelFilghtsData = rowsFromIsraeDataFlight.map((rowDataFlight) => new FlightData(rowDataFlight));

        const toIsraelUrl = `${TO_ISRAEL_FLIGHT_URL}${this.apiKey}`
        const toIsraelRes = await Connectivity.getRequest(toIsraelUrl, config);
        const rowstoIsraeDataFlight: RowDataFlight[] = toIsraelRes.data.response;
        
        const toIsraelFlightsData = rowstoIsraeDataFlight.map((rowDataFlight) => new FlightData(rowDataFlight));
        
        const israelFlightsData = [...fromIsraelFilghtsData,...toIsraelFlightsData];
        return israelFlightsData;
    };

}