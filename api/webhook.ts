// Vercel Serverless Function: Send form data to Discord and Telegram
type Req = { method: string; body: { name: string; email: string; message: string } };
type Res = { status: (code: number) => { json: (data: unknown) => void } };
export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  let discordResult: string | null = null;
  let telegramResult: string | null = null;

  if (discordWebhook) {
    try {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `New form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        })
      });
      discordResult = 'ok';
    } catch {
      discordResult = 'error';
    }
  }

  if (telegramToken && telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `New form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
        })
      });
      telegramResult = 'ok';
    } catch {
      telegramResult = 'error';
    }
  }

  res.status(200).json({ discord: discordResult, telegram: telegramResult });
}
