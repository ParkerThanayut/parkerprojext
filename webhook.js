export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log('Message from LINE:', req.body);
    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
