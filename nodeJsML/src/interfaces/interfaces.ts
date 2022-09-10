
export interface FlightInfoInterFace{
        date: string
        airLineCompany: string,
        departureCountry: string,
        arrivalCountry: string,
        flightType: number,
        flightNumber: string,
        arrivalStatus?: 1 | 2 | 3,
}

export interface RawFlightInfo{
    flightNumber: string,
    departureDateUTC: string,
    departureCountry: string,
    arrivalCountry: string,
    airLineCompany: string,
    flightType: number,
    arrivalStatus?: 1 | 2 | 3
}

export interface DateInfo{
    day: number,
    month: number,
    isHoliday: boolean,
    isSummer: boolean
}