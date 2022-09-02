const  { getWeather } = require("./out/weather_api");
const express = require('express');


const app = express();

app.use('/assets', express.static('assets'));

app.get('/*/*/*', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const listParms = req.originalUrl.split('/');
    const date = new Date();
    const lalt = listParms[1];
    const longt = listParms[2];
    const ela = listParms[3];
    const weatherRes = await getWeather(date, lalt, longt, ela);
    res.status(200).json({"data": weatherRes});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: weather');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});


