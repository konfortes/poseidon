export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  telegram: {
    botToken: process.env.BOT_TOKEN,
    webhook: {
      secretPath: process.env.SECRET_WEBHOOK_PATH,
      domain: process.env.WEBHOOK_DOMAIN,
    },
  },
})
