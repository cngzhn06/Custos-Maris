const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');  

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'my-group-' + Date.now() }); // her seferinde yeni bir groupId

let messages = [];

app.use(cors());  

const run = async () => {
  await consumer.connect();
  console.log('Consumer connected');

  await consumer.subscribe({ topic: 'topic2', fromBeginning: true });
  console.log('Subscribed to topic: topic');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Processing message...');
      const messageContent = message.value.toString();
      console.log(`Received message: ${messageContent}`);

      try {
        const jsonMessage = JSON.parse(messageContent);
        messages.push(jsonMessage);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    },
  });
};


app.get('/messages', (req, res) => {
  res.json(messages);  
});

run().catch(console.error);

app.listen(port, () => {
  console.log(`API is running on http://localhost:${port}`);
});
