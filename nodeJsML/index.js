
const express = require('express');
const  { DB } = require("./out/DB/DB");
const  { Knn } = require("./out/ML/knn");
const  { Connectivity } = require("./out/types/connectivity");
const  { FlightInfo } = require("./out/types/flightsInfo");

const app = express();

app.use('/assets', express.static('assets'));
app.get('/*', async (req, res) => {
  try{
    res.header("Access-Control-Allow-Origin", "*");
    const listParms = req.originalUrl.split('/').slice();
    const flightNumber = listParms[1];
    if(!flightNumber){
      res.status(200).json({"data": -1});
    }
    let flightInfo = db.isFlightInDB(flightNumber);
    if(flightInfo){
      res.status(200).json({"data": knn.predict(flightInfo)});
    }
    else{
      const rawFlightInfoList = (await Connectivity.getFlightData())["data"]["data"]["data"];
      const flightInfoList = rawFlightInfoList.map((rawFlightInfo) => new FlightInfo(rawFlightInfo));
      for(let i = 0; i< flightInfoList.length; i++){
        await flightInfoList[i].init();
      }
      db.loadDB(flightInfoList);
      knn.fit(db.getAllLandedFlightInfoAsList());
      flightInfo = db.isFlightInDB(flightNumber);
      if(flightInfo){
        res.status(200).json({"data": knn.predict(flightInfo)});
      }
      else{
        res.status(200).json({"data": -1});
      }
    }
  }
  catch(error){
    res.status(200).json({"data": errorHendeler()});
  };

});
const db = new DB();
const knn = new Knn(10);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});


function errorHendeler(){
    return Math.floor(Math.random() * max) + 1;
}


