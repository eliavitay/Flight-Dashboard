
const express = require('express');
const  { getDateStatistic } = require("./out/dateInformation");

const app = express();

app.use('/assets', express.static('assets'));

app.get('*', async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const listParms = req.originalUrl.split('/').slice();
    const date = new Date(listParms[1]);
    const dateStatisticRes =  getDateStatistic(date);
    res.status(200).json({"data": dateStatisticRes});
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error: date-statistics');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Hello from Cloud Run! The container started successfully and is listening for HTTP requests on ${PORT}`
  );
});


