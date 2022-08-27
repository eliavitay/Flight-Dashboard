import axios from "axios";

export async function getWeather(date:Date, latitude:string, longitude:string, elevation:string){
    try{
        const res = await axios.get(`https://ariel_amar:ZfX9oh48Fq@api.meteomatics.com/${date.toISOString()}/t_${elevation}m:C/${latitude},${longitude}/json`)
        return res.data.data[0].coordinates[0].dates[0].value
    }catch(e){
        throw e
    }
}