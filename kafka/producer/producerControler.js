import Kafka from 'node-rdkafka';
import {uiFromMl, uiFromCloudServices, mlFromUi, mlFromcloudServices, cloudServicesFromUi, cloudServicesFromMl} from '../eventType.js';
import express from 'express';
import axios from "axios";
import {uiFromMlUrl, uiFromCloudServices, UiToMlUrl} from "../urls.js";
const app = express();
const uiFromMlStream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'uiFromMl'
});

const uiFromCloudServicesStream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'uiFromCloudServices'
});

const UiToMlStream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'UiToMl'
});

app.get("/MlToUi/*",async (req) =>{
  const relativeUrl = req.relativeUrl;
  const res = await axios.get(`${uiFromMlUrl}${relativeUrl}`)["data"];
  const success = uiFromMlStream.write(uiFromMl.toBuffer(res));     
  if (success) {
    console.log(`message queued (${JSON.stringify(res)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
});

app.get("/UiToMl/*",async (req) =>{
  const relativeUrl = req.relativeUrl;
  const res = await axios.get(`${UiToMlUrl}${relativeUrl}`)["data"];
  const success = UiToMlStream.write(UiToMlStream.toBuffer(res));     
  if (success) {
    console.log(`message queued (${JSON.stringify(res)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
});

app.get("/CloudServicesToUi/*",async (req) =>{
  const relativeUrl = req.relativeUrl;
  const res = await axios.get(`${uiFromCloudServices}${relativeUrl}`)["data"];
  const success = uiFromCloudServicesStream.write(uiFromCloudServicesStream.toBuffer(res));     
  if (success) {
    console.log(`message queued (${JSON.stringify(res)})`);
  } else {
    console.log('Too many messages in the queue already..');
  }
});