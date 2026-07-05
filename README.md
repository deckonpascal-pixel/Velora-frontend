# Velora — Frontend

The Velora storefront: React + Tailwind CSS + Vite. This talks to a separate backend
(see the `velora-backend` folder / zip) for real accounts, orders, and payments.

## What's included

- Home, Shop, Services, About, and Contact pages
- Cart and wishlist
- Real sign-up / login (calls the backend, stores a session token in your browser)
- Checkout — creates an order on the backend, then shows OPay bank transfer details and a
  WhatsApp link for the customer to send payment proof (no payment gateway required)
- Admin dashboard with its own login, showing live orders and products from the backend,
  with a one-click status dropdown (pending / paid / shipped / delivered / cancelled) for
  marking orders paid once you've confirmed the transfer

## Run it locally

```bash
npm install
cp .env.example .env      # then edit if your backend runs somewhere other than localhost:4000
npm run dev
```

Open the printed URL (usually http://localhost:5173). Note: the storefront still works
without the backend running — products fall back to a built-in list — but sign-up, login,
checkout, and the admin dashboard all need the backend to be running and reachable.

## Deploy to Vercel or Netlify

1. Push this folder to a GitHub repository.
2. Import it on Vercel (vercel.com/new) or Netlify (app.netlify.com).
   Build command: `npm run build`. Output/publish directory: `dist`.
3. **Set the environment variable** `VITE_API_URL` in your hosting dashboard to your deployed
   backend's URL (e.g. `https://velora-api.onrender.com/api`) — do this *before* deploying,
   since Vite bakes env vars in at build time.
4. Deploy. You'll get a live URL.

## Payments — currently manual (OPay transfer)

Checkout doesn't use Paystack right now — it shows your OPay account details and a WhatsApp
link, since Paystack/Flutterwave both require a BVN to activate. To update the account details
shown at checkout, search for `PAYMENT_INFO` near the top of `src/App.jsx`.

Once you're able to get a BVN (see the backend README for how OPay can generate one via your
NIN), switching back to automatic Paystack checkout just means restoring the old checkout
button — the Paystack routes are still live on the backend, unused but ready.

## Editing content

- Products, categories, prices: `src/App.jsx` (the `PRODUCTS`/`CATEGORIES` arrays — these are
  only a fallback now; the real product list comes from the backend once it's seeded).
- Contact details, colors, fonts: also in `src/App.jsx`, near the top.

## Backend

See the `velora-backend` project for the API, database, and Paystack integration this site
depends on for real functionality. It needs to be deployed and reachable at the URL you set
in `VITE_API_URL` above.
