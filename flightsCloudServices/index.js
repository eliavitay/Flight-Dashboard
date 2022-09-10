
const mysql = require("mysql");
const express = require('express');
const axios = require("axios");

const pool = mysql.createPool( {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
});

const app = express();

app.use('/assets', express.static('assets'));

app.get('/real-time', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const rTRes = await axios.get("https://flights-apis-kmmcg3tjaq-uc.a.run.app/real-time");
    updateDB(serviceTypes.realTime);
    res.status(200).json({"data": rTRes.data});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: real-time');
  }
});

app.get('/scheduled', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const scheduledRes = await axios.get("https://flights-apis-kmmcg3tjaq-uc.a.run.app/scheduled");
    updateDB(serviceTypes.scheduled);
    res.status(200).json({"data": scheduledRes.data});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: scheduled');
  }
});


app.get('/weather/*/*/*', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const listParms = req.originalUrl.split('/').slice(2);
    const lalt = listParms[0];
    const longt = listParms[1];
    const ela = listParms[2];
    const weatherUrl = `https://weather-api-kmmcg3tjaq-uc.a.run.app/${lalt}/${longt}/${ela}`;
    const scheduledRes = await axios.get(weatherUrl);
    updateDB(serviceTypes.weather);
    res.status(200).json({"data": scheduledRes.data});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: weather');
  }
});

app.get('/date-statistics/*', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const listParms = req.originalUrl.split('/').slice(2);
    const date = listParms[0];
    const  calendarUrl = `https://calendar-api-kmmcg3tjaq-uc.a.run.app/${date}`;
    const dateStatisticRes = await axios.get(calendarUrl);
    updateDB(serviceTypes.datetatistics);
    res.status(200).json({"data": dateStatisticRes.data});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: date-statistics');
  }
});
app.get('/sql-test', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    try{
    const query = "show tables"
    pool.query(query, (error, res1)=>{
      if(res1){
        res.status(200).json({res1});
      }
      else{
        res.status(200).json({error: error.message});
      }
    });
    }
    catch(e){res.status(200).json({"end":"end"});}
    
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: real-time');
  }
});

app.get('/', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const APICalls = {
      "weather/Date/lalt/longt/ela": " weather/35.710316/26.828905/12192",
      "date-statistics/Date": "date-statistics/2022-09-27",
      "/scheduled": "/scheduled",
      "/real-time": "/real-time"
    };
    updateDB(serviceTypes.menu);
    res.status(200).json({APICalls});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});

function updateDB(serviceType){
  const query = `INSERT INTO FILGHTS_RECORD(year, month, day, hour, serviceType) VALUES (YEAR(CURDATE()), MONTH(CURDATE()), DAYOFWEEK(NOW()), HOUR(NOW()), "'${serviceType}'")`
  pool.query(query, (error) => {
    console.log(`insert new  row to DB failed with error message: ${error.message}`);
  });
}

const serviceTypes = {
	dateStatistics: "date-statistics",
	weather: "weather",
	realTime: "real-time",
	scheduled: "scheduled",
  menu: "menu"
}