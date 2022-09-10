import axios from "axios"

export class Connectivity{
    static FlightsCloudControlerAPIsDataUrl = "https://flights-cloud-services-kmmcg3tjaq-uc.a.run.app"
    static async getFlightData(){
        return await axios.get(`${this.FlightsCloudControlerAPIsDataUrl}/scheduled`);
    }
    static async getdateInfo(date: string){
        const res = await axios.get(`${this.FlightsCloudControlerAPIsDataUrl}/date-statistics/${date}`)
        return res;
    }
}
