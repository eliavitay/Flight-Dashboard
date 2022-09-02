const { IsraelFlightDataProvider } = require("./out/providers/israelFlightDataProvider");
const express = require('express');

const API_KEY = "964e64b0-ecec-42d0-9db8-dd2e5e059f07";
const israelFlightDataProvider = new IsraelFlightDataProvider(API_KEY);

const app = express();

app.use('/assets', express.static('assets'));

app.get('/real-time', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const israelFlightDataProvider = new IsraelFlightDataProvider(API_KEY)
    const rTRes = await (israelFlightDataProvider.getRTDataFlights())
    res.status(200).json({"data": rTRes});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: real-time');
  }
});

app.get('/scheduled', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const scheduledRes = await (israelFlightDataProvider.getFlightsData());
    res.status(200).json({"data": scheduledRes});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: scheduled');
  }
});

app.get('/', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const APICalls = {
      "/scheduled": "/scheduled",
      "/real-time": "/real-time"
    }
    res.status(200).json({APICalls});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: real-time');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});


