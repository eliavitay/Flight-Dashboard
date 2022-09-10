import { FlightInfoInterFace } from "../interfaces/interfaces"


export class DB{
    landedDataInfoCach: FlightInfoInterFace[]
    notLandedDataInfoCach: FlightInfoInterFace[]
    constructor(){
        this.landedDataInfoCach = [];
        this.notLandedDataInfoCach = []
    }
    
    getAllLandedFlightInfoAsList(): FlightInfoInterFace[]{
        return this.landedDataInfoCach;
    }
    getAllNotLandedFlightInfoAsList(): FlightInfoInterFace[]{
        return this.notLandedDataInfoCach;
    }
    isFlightInDB(flightNumber: string): FlightInfoInterFace| undefined{
        let flight = this.notLandedDataInfoCach.find((flightInfo) => flightInfo.flightNumber === flightNumber);
        if(flight){
            return flight
        }
        return this.landedDataInfoCach.find((flightInfo) => flightInfo.flightNumber === flightNumber);
    }

    loadDB(flightsDataInfo: FlightInfoInterFace[]){
        flightsDataInfo.forEach(flightInfo => {
            if(flightInfo.arrivalStatus){
                this.landedDataInfoCach.push(flightInfo)
            }
            else{
                this.notLandedDataInfoCach.push(flightInfo)
            }
        });
    }
 }