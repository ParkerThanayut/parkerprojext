export default function handler(req, res) {
  res.status(200).json({ message: "Webhook working!" });
}
if (event.message.text === 'สวัสดีค่ะ 🙏 แม่หมอ Foxy Mystique ค่ะ') {
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'สวัสดีค่ะ 🙏 ต้องการดูดวงเรื่องไหนคะ?',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'message',
            label: '💖 ความรัก',
            text: 'ดูดวงความรัก',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '💰 การเงิน',
            text: 'ดูดวงการเงิน',
          },
        },
        {
          type: 'action',
          action: {
            type: 'message',
            label: '💼 การงาน',
            text: 'ดูดวงการงาน',
          },
        },
      ],
    },
  });
}
