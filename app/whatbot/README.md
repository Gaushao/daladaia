# Dalama Whatbot

Chatbot that integrates Llama.cpp with Facebook's WhatsApp platform. It provides real-time conversation capabilities and allows users to interact with the bot through WhatsApp. This README provides instructions on how to set up and configure the bot.

## Register

Before getting started with Dalama Whatbot, you need to ensure that your browser is authenticated with Facebook. You can access the registration page and follow the instructions provided to register your account. For more information, refer to the [Facebook registration documentation](https://developers.facebook.com/docs/development/register).

- make sure your browser is authenticated with Facebook

- access [registration](https://developers.facebook.com/async/registration)

[read more](https://developers.facebook.com/docs/development/register)

## Two-Factor

follow the instructions at [Facebook Help](https://www.facebook.com/help/148233965247823) to enable two-factor authentication

## Create App

1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Click on `Create App`
3. Select the `Business` type and follow the prompts on the screen.
4. Choose `Other` as the use case, then select `Business` when asked to choose a use case.

[read more](https://developers.facebook.com/docs/development/create-an-app/)

## add products to the app

### WhatsApp

1. from the [App Dashboard](https://developers.facebook.com/apps/), click on the app you want to connect to WhatsApp
2. scroll down to find the "WhatsApp" product and click Set up
3. select an existing `Business Manager` or let the onboarding process create one for you.
4. this associates your app with the `Business Manager`, generating a `WhatsApp Business Account`, and generating a test business phone number
5. config `.env` file with WhatsApp credentials

   > - copy the Temporary Access Token to `CLOUD_API_ACCESS_TOKEN`
   > - copy the Phone Number ID to `WA_PHONE_NUMBER_ID`

   ```
   WA_PHONE_NUMBER_ID=<...>
   CLOUD_API_ACCESS_TOKEN=<...>
   ```

### Webhooks

- setup an [endpoint](https://developers.facebook.com/docs/graph-api/webhooks/getting-started#create-endpoint)
  - must to be public, if need exposure [integrate with ngrok](https://ngrok.com/docs/integrations/whatsapp/webhooks/#setup-webhook)
    - install [ngrok](https://ngrok.com/download)
    - command `ngrok http 3000`
    - copy the forwarding url (`https://<ngrok_forwarding_id>.ngrok-free.app`)
    - in the `.env` file: paste the forwarding url pathing to `/webhook` as value of `WEBHOOK_ENDPOINT`
      ```
      WEBHOOK_ENDPOINT=https://<ngrok_forwarding_url>.ngrok-free.app/webhook
      ```
- [config webhook](https://developers.facebook.com/docs/graph-api/webhooks/getting-started#configure-webhooks-product)

  - go to [apps](https://developers.facebook.com/apps/) and select the wanted
  - add and configure for configuring `Webhooks` product
  - select the input to `WhatsApp Business Account` and `Subscribe` it
  - edit the subscription `Callback URL` with the same value of `WEBHOOK_ENDPOINT`
  - subscription `Verify token` must have the same value of `WEBHOOK_VERIFICATION_TOKEN` in `.env` file
    ```
    WEBHOOK_VERIFICATION_TOKEN=SAME_VALUE_OF_VERIFY_TOKEN
    ```
  - with the properly configured `.env` command `yarn dev` run the `whatbot`
  - then click `Verify and save`
  - after the verification `test` and `subscribe` for [messages](https://developers.facebook.com/docs/graph-api/webhooks/reference/whatsapp_business_account/#messages)

[read more](https://developers.facebook.com/docs/graph-api/webhooks)

## Run

from `app/whatbot`

- tunnel if need public exposure
  ```sh
      $ yarn rok
  ```
- run dev
  ```sh
      $ yarn dev
  ```

## WhatsApp docs

[WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started)

[WhatsApp Documentation](https://developers.facebook.com/docs/whatsapp/)
