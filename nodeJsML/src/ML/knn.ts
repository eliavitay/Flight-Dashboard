import { FlightInfo } from "../types/flightsInfo";

export class Knn{
    flightsInfo: FlightInfo[];
    k: number;
    constructor(k: number){
        this.flightsInfo = []
        this.k = k
    }

    fit(flightsInfo: FlightInfo[]){
        this.flightsInfo = [...flightsInfo, ...this.flightsInfo];
    }
    
    predict(flightsInfo: FlightInfo){

        this.flightsInfo.sort((flightA, flightB) => (this.getDistance(flightA, flightsInfo) > this.getDistance(flightB, flightsInfo)) ? 1 :  -1)
        const nearestNeighborsCounter = {1: 0, 2: 0, 3: 0};
        let arrivalStatus = 2;
        let maxClouserNeighbor = 0
        for(let i =0; i<this.k; i++){
            if(i >= this.k){
                break;
            }
            let tempArrivalStatus = this.flightsInfo[i]?.arrivalStatus;
            if(!tempArrivalStatus){
                continue;
            }
            nearestNeighborsCounter[tempArrivalStatus] += 1;
            if(maxClouserNeighbor < nearestNeighborsCounter[tempArrivalStatus]){
                maxClouserNeighbor = nearestNeighborsCounter[tempArrivalStatus];
                arrivalStatus = tempArrivalStatus;
            }
        }
        return arrivalStatus;
    }
    
    getDistance(landedFlight: FlightInfo, notLandedFlight: FlightInfo ) {
        let distance = 0;
        (Object.keys(notLandedFlight) as Array<keyof FlightInfo>).forEach((key: keyof FlightInfo) => {
            if(key === "flightNumber" || key === "date"){
                return;
            }
            if(landedFlight[key] !== notLandedFlight[key]){
                distance++;
            }
        });
        return distance;
    }
}
