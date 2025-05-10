const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ตัวอย่างคำตอบดูดวงเบื้องต้น
const getFortune = () => {
  const fortunes = [
    "วันนี้อาจมีเรื่องน่าประหลาดใจรออยู่ 🌟",
    "ใช้สัญชาตญาณของคุณในการตัดสินใจ 🦊",
    "อย่าลืมดูแลตัวเองเป็นอันดับแรกนะคะ 💖",
    "มีโอกาสดีเข้ามา อย่าปล่อยให้หลุดมือ ✨"
  ];
  return fortunes[Math.floor(Math.random() * fortunes.length)];
};

app.post("/webhook", (req, res) => {
  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    return res.status(200).send("No events");
  }

  events.forEach((event) => {
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken;
      const msg = event.message.text;

      // เช็คว่าผู้ใช้พิมพ์ว่า "ดูดวง"
      if (msg.includes("ดูดวง")) {
        replyMessage(replyToken, getFortune());
      }
    }
  });

  res.status(200).send("OK");
});

function replyMessage(replyToken, message) {
  const axios = require("axios");
  const LINE_ACCESS_TOKEN = "2007395156";

  axios.post(
    "https://api.line.me/v2/bot/message/reply",
    {
      replyToken: replyToken,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
      },
    }
  );
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
