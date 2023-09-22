export const telegramConstant = {
  telegramBaseUrl(token: string) {
    return `https://api.telegram.org/bot${token}/`;
  },
  method: {
    setWebhook: 'setWebhook',
    sendMessage: 'sendMessage',
  },
};
