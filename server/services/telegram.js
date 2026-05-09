const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Start komandasi uchun handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    `Assalomu alaykum, <b>${msg.from.first_name}</b>!\n\n` +
    `<b>TAMUR Men's Wear</b> rasmiy botiga xush kelibsiz.\n\n` +
    `Pastdagi tugma orqali katalogimizni ko'rishingiz va buyurtma berishingiz mumkin. 👇`, 
    {
      parse_mode: 'HTML',
      reply_markup: {
        keyboard: [
          [{ text: "🛍 Katalog / Buyurtma", web_app: { url: "https://shohjaxon16.github.io/tamur-uz-bot/" } }]
        ],
        resize_keyboard: true
      }
    }
  );
});

async function sendOrderToChannel(order) {
  const { orderId, name, phone, region, address, note, items, totalPrice, delivery } = order;

  const date = new Date().toLocaleString('uz-UZ', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const itemLines = items.map(i =>
    `• <b>${i.name}</b>  ${i.size} · ${i.colors[i.colorIndex]?.name || ''}\n` +
    `   <b>${(i.price * i.qty).toLocaleString()} so'm</b>  ×${i.qty}`
  ).join('\n');

  const text =
`🛍 <b>YANGI BUYURTMA</b>
<b>#${orderId}</b> · <i>${date}</i>

👤 <b>Mijoz:</b> ${name}
📞 <b>Telefon:</b> <code>${phone}</code>
📍 <b>Manzil:</b> ${region}, ${address}
${note ? `💬 <b>Izoh:</b> ${note}\n` : ''}
<b>━━━━━━━━━━━━━━━━━━━</b>
${itemLines}
<b>━━━━━━━━━━━━━━━━━━━</b>
🚚 <b>Yetkazib berish:</b> ${delivery.toLocaleString()} so'm
💰 <b>JAMI TO'LOV: ${(totalPrice + delivery).toLocaleString()} so'm</b>`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '✅ Qabul qildim', callback_data: `accept_${orderId}` },
        { text: '❌ Rad etish',    callback_data: `reject_${orderId}` }
      ],
      [
        { text: `📞 ${phone}`,     url: `tel:${phone}` },
        { text: '🚚 Yo\'lda',      callback_data: `shipping_${orderId}` }
      ]
    ]
  };

  const msg = await bot.sendMessage(process.env.CHANNEL_ID, text, {
    parse_mode: 'HTML',
    reply_markup: keyboard
  });

  // Callback handler
  bot.on('callback_query', async (query) => {
    const [action, id] = query.data.split('_');
    if (id !== orderId) return;
    const statusMap = {
      accept:   '✅ QABUL QILINDI',
      reject:   '❌ RAD ETILDI',
      shipping: '🚚 YO\'LDA'
    };
    if (statusMap[action]) {
      await bot.answerCallbackQuery(query.id, { text: statusMap[action] });
      await bot.sendMessage(process.env.CHANNEL_ID,
        `${statusMap[action]} — #${orderId}`,
        { reply_to_message_id: msg.message_id }
      );
    }
  });

  return msg;
}

module.exports = { sendOrderToChannel };
