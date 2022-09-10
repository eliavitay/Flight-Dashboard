./start-kafka.sh &
sleep 20
npm run start:producer &
sleep 20
npm run start:consumer &