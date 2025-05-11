export default function handler(req, res) {
  if (req.method === 'POST') {
    // handle POST request
    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
