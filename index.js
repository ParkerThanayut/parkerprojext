const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log(req.body); // แสดงข้อมูลที่ LINE ส่งมา
  res.sendStatus(200);   // ตอบกลับว่า OK
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
