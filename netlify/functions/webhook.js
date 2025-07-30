// Netlify Function: Send form data to Discord and Telegram
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { name, email, message } = JSON.parse(event.body || '{}');
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing fields' })
    };
  }

  // Discord webhook
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
  // Telegram
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  let discordResult = null;
  let telegramResult = null;

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

  return {
    statusCode: 200,
    body: JSON.stringify({ discord: discordResult, telegram: telegramResult })
  };
};
