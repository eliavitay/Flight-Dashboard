import { DateStatistic } from "./interfaces";
import Holidays from "date-holidays";

const holidays = new Holidays("il", "9", '', {
    languages: "en",
    types: ["public"]
  });
const JUN = 6;
const SEP = 9;
export function getDateStatistic(date: Date): DateStatistic{
    return {
        day: date.getDay()+1,
        month: date.getMonth()+1,
        isHoliday: isHoliday(date),
        isSummer: isSummer(date)
    }
}

function isHoliday(date:Date): boolean{
    const res = holidays.isHoliday(date)
    if(res){
        return true;
    }
    return res;
}
function isSummer(date:Date): boolean{
    const month = date.getMonth()+1;
    if(JUN <= month && month<= SEP){
        return true;
    }
    return false;
}