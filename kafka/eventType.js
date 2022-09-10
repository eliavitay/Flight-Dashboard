import avro from 'avsc';

export const uiFromMl = avro.Type.forSchema({
  type: "res",
  fields: Number
});
export const uiFromCloudServices = avro.Type.forSchema({
  type: "flightRtInfo",
  fields: {
    flightNumber: String,
    departureCountry: String,
    arrivalCountry: String,
    aircraftGeoLatitude: Number,
    aircraftGeoLongitude: Number,
    aircraftElevation: Number,
    diraction: Number
  }
});

export const mlFromUi = avro.Type.forSchema({
  type: "flightNumber",
  fields: Number
});
export const mlFromcloudServices = avro.Type.forSchema({
  type: "flightInfo",

  fields:  {
  flightNumber: String,
  departureCountry: String,
  arrivalCountry: String,
  airLineCompany: String,
  flightType: Number,
  departureDateUTC: Date,
  arrivalStatus: Number
  }
});

export const cloudServicesFromUi = avro.Type.forSchema({
  type: "serviceType",
  fields: String
});

export const cloudServicesFromMl = avro.Type.forSchema({
  type: "serviceType",
  fields: String
});