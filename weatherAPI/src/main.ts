import { getWeather } from "./weather_api";

(async function (){
    try{
        let lalt = "35.710316"
        let longt = "26.828905"
        let ela = "12192"
        let temp = await getWeather(new Date(), lalt, longt, ela);
        console.log(`${temp} Cesius`);
    }catch(e){
        console.log(e)
    }
})();
