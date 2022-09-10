import Kafka from 'node-rdkafka';
import {uiFromCloudServices} from '../eventType.js';
import axios from 'axios';
//TODO: add url
const POST_URL = ""
var consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'localhost:9092',
}, {});

consumer.connect();
var resualt;
consumer.on('ready', () => {
  consumer.subscribe(['uiFromCloudServices']);
  consumer.consume();
}).on('data', function(data) {
  resualt = data.value;
  console.log(`received message: ${uiFromCloudServices.fromBuffer(data.value)}`);
  axios.post(POST_URL, {data: data.value});
});
