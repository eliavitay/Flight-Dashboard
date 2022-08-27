import Holidays from "date-holidays";

(async function (){
    let holidays = new Holidays("il", "9", '', {
        languages: "en",
        types: ["public"]
      });
      const date = new Date();
      console.log(holidays.isHoliday(date));
})();
