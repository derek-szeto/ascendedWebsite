# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Ascend-Ed store checkout

The store uses Stripe-hosted Checkout through Netlify Functions. The existing store UI sends only product IDs, sizes, and quantities; `netlify/functions/create-checkout-session.js` validates those values against `src/data/storeProducts.js` and supplies the trusted prices to Stripe.

Stripe redirects successful payments back to `/store`. The site verifies the Checkout Session with `get-checkout-session.js` before clearing the buyer's cart. The signed `stripe-webhook.js` function receives durable payment events. Stripe Dashboard is the order record until a separate order database is added.

### Netlify environment variables

In **Netlify → Project configuration → Environment variables**, add these values with Functions access. Mark the secret values as sensitive and use test values until launch.

| Variable | Value |
| --- | --- |
| `STRIPE_API_KEY` | A restricted Stripe test key while testing, then the matching live restricted key. |
| `STRIPE_WEBHOOK_SECRET` | The signing secret from the Stripe webhook endpoint below. |
| `SITE_URL` | `https://ascend-ed.org` |
| `STRIPE_LIVE_CHECKOUT_ENABLED` | `false` while testing; change to exactly `true` only when live checkout is approved. |

Never put either Stripe secret in a `VITE_` variable, source code, Git, screenshots, or chat. Local placeholders are documented in `.env.example`, which is safe to commit; real `.env` files are ignored.

### Stripe webhook

Create a Stripe webhook endpoint at:

```text
https://ascend-ed.org/.netlify/functions/stripe-webhook
```

Subscribe it to:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Copy that endpoint's signing secret into Netlify as `STRIPE_WEBHOOK_SECRET`, then trigger a new Netlify deploy so the environment changes take effect.

### Store settings

Names, prices, sizes, copy, and static stock limits live in `src/data/storeProducts.js`. Prices are stored in cents. Product galleries remain in `src/pages/Store.jsx` so the existing design and image cycles stay unchanged.

Fulfillment is currently shown as free local delivery or pickup. Stripe collects a U.S. delivery address and displays a local-service notice, but does not reject non-local ZIP codes. Add an explicit service-area check after Ascend-Ed defines eligible ZIP codes.

Automatic tax is intentionally disabled. Confirm Ascend-Ed's registration and collection obligations before enabling live payments. The webhook currently records paid orders in Stripe/Netlify logs; inventory updates, order emails, refunds workflow, and fulfillment automation remain external follow-up work.

Run the integration checks with:

```bash
npm test
npm run lint
npm run build
```
