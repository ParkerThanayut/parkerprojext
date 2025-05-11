from flask import Flask, request
import requests
import openai

app = Flask(__name__)

# ใส่ token ของ LINE และ GPT API
LINE_ACCESS_TOKEN = 'ใส่ Channel access token ตรงนี้'
OPENAI_API_KEY = 'ใส่ GPT API key ตรงนี้'

openai.api_key = OPENAI_API_KEY

@app.route("/webhook", methods=["POST"])
def webhook():
    data = request.json
    user_message = data['events'][0]['message']['text']
    reply_token = data['events'][0]['replyToken']

    # ใช้ GPT ประมวลผลคำถาม
    gpt_reply = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "คุณคือหมอดูที่ให้คำแนะนำด้วยความเมตตาและอบอุ่น"},
            {"role": "user", "content": user_message}
        ]
    )["choices"][0]["message"]["content"]

    # ตอบกลับไปยัง LINE
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {LINE_ACCESS_TOKEN}"
    }

    body = {
        "replyToken": reply_token,
        "messages": [{"type": "text", "text": gpt_reply}]
    }

    requests.post("https://api.line.me/v2/bot/message/reply", json=body, headers=headers)
    return "OK"
