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

      // เช็คว่าผู้ใช้พิมพ์ว่า "บริการดูดวง"
      if (msg.includes("บริการดูดวง")) {
        replyMessage(replyToken, getFortune());
      }
    }
  });

  res.status(200).send("OK");
});

function replyMessage(replyToken, message) {
  const axios = require("axios");
  const LINE_ACCESS_TOKEN = "NPzUCIZn/Csbc85XbJsAQHPlLQUH3gmLW8ns5pW80SpMXvoew6YUfDqPTwcuTIQF2xCjit0GkdV6DW7mLH2/etiYWe2brqA4so68tSpaWOoOw124M4BLlkE/4OPDPj2LLI0LQAAkvN94ek1mLaA3ngdB04t89/1O/w1cDnyilFU=";

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
