import { IsraelFlightDataProvider } from "./providers/israelFlightDataProvider";
(async function (){
    console.log("hello");
    const apiKey = "964e64b0-ecec-42d0-9db8-dd2e5e059f07";
    const israelFlightDataProvider = new IsraelFlightDataProvider(apiKey);
    const rTRes = await (israelFlightDataProvider.getRTDataFlights());
    console.log(rTRes)
    const scheduledRes = await (israelFlightDataProvider.getFlightsData());
    console.log(scheduledRes)
})();
