# Poseidon

A telegram bot to reveal sea and waves information.

## Knex

### New Migration

```bash
node_modules/.bin/knex  migrate:make --migrations-directory ./migrations create_users_table
```

## Telegram Bot

### Run

`BOT_TOKEN` env var must be provided when running

### Webhook Subscribe

The app subscribes itself on startup.  
It should be provided with 2 env vars:

- `WEBHOOK_DOMAIN`=my.domain.com (use ngrok in dev)
- `SECRET_WEBHOOK_PATH`=/zR23Q54Ho26q

### Webhook Info

```bash
https://api.telegram.org/botxxxxxxxxxxxxxxx/getWebhookInfo
```

### Puppeteer + Heroku

[See this guide](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-puppeteer-on-heroku)