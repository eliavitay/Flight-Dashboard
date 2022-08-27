import { IsraelFlightsDataRetriver } from "../retriver/israelFlightsDataRetriver";
import { FlightDataInterface, FlightsDataRetriverInterface, IsraelFlightDataProviderInterface, RTFlightInterface } from "../types/interfaces";

export class IsraelFlightDataProvider implements IsraelFlightDataProviderInterface{
    apiKey: string;
    flightsDataRetriver: FlightsDataRetriverInterface;
    constructor(apiKey: string){
        this.apiKey = apiKey;
        this.flightsDataRetriver = new IsraelFlightsDataRetriver(apiKey);
    }
    
    async getRTDataFlights(): Promise< RTFlightInterface[]> {
        try{
            return await this.flightsDataRetriver.retriveRTDataFilght();
        }
        catch(e){
            if (e instanceof Error){
                e.message = `${e.message}, failed in getRTDataFlights function`
            }
            throw e;
        }
    }

    async getFlightsData(): Promise<FlightDataInterface []> {
        try{
            return await this.flightsDataRetriver.retriveFlightData();
        }
        catch(e){
            if (e instanceof Error){
                e.message = `${e.message}, failed in getFlightsData function`
            }
            throw e;
        }
    }

}