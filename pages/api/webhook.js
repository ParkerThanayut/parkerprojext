import { middleware, Client } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    middleware(config)(req, res, () => {
      const events = req.body.events;
      Promise
        .all(events.map(event => handleEvent(event)))
        .then(result => res.json(result))
        .catch(err => {
          console.error(err);
          res.status(500).end();
        });
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const replyMessage = { type: 'text', text: `คุณพิมพ์ว่า: ${event.message.text}` };
    return client.replyMessage(event.replyToken, replyMessage);
  }
  return Promise.resolve(null);
}
