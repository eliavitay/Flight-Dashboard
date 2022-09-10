import Kafka from 'node-rdkafka';
import mlFromcloudServices from '../eventType.js';
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
  console.log('consumer ready..')
  consumer.subscribe(['mlFromcloudServices']);
  consumer.consume();
}).on('data', function(data) {
  resualt = data.value;
  console.log(`received message: ${mlFromcloudServices.fromBuffer(data.value)}`);
  axios.post(POST_URL, {data: data.value});
});
