# Throw Down Brownz — Website

A 4-page static website for the Throw Down Brownz food truck (Fort Myers, FL).

## What's included

- `index.html` — Homepage: hero, live location banner + map, menu preview, reviews preview
- `menu.html` — Full menu: combos, all 9 flavors, sides, $5 special, kids menu, drinks
- `order.html` — Online ordering form (pickup any size, delivery on $100+ orders)
- `reviews.html` — Sample reviews + a form for customers to submit their own review
- `styles.css` — All site styling (colors/fonts pulled from your logo)
- `script.js` — Live location logic, mobile menu toggle, order total calculator
- Logo (`logo.png`) and all food photos (`.jpg` files) — matched to the correct menu items, sitting in the same folder as the HTML files (no subfolder needed)

No build step, no frameworks — just plain HTML/CSS/JS, so it deploys on Vercel exactly like your other sites.

## 1. Deploy (GitHub → Vercel, same as your other projects)

1. Create a new GitHub repo (e.g. `throwdown-brownz`).
2. Upload every file in this zip straight into the repo root — there's no `images` subfolder to worry about, everything (HTML, CSS, JS, logo, photos) sits together in one flat list.
3. In Vercel, import that GitHub repo. No build command or output directory needed — it's a static site.
4. Vercel will give you a live URL. You can add a custom domain later if you get one.

## 2. Turn on the order & review forms (FormSubmit)

Both `order.html` and `reviews.html` send submissions using **FormSubmit** — the same free, no-backend form service used on your other builds.

Right now they point to placeholder addresses:
- `orders@throwdownbrownz.com` (in `order.html`)
- `reviews@throwdownbrownz.com` (in `reviews.html`)

**To activate them:**
1. Open `order.html` and `reviews.html`, find the line `action="https://formsubmit.co/..."`, and replace the placeholder email with the real email you want orders/reviews sent to.
2. The first time someone submits each form, FormSubmit will email that address asking to confirm — click the confirmation link once and it's live from then on.
3. Both forms already have spam protection turned on (a hidden honeypot field + disabled captcha for a smoother mobile experience).

If you'd rather have orders and reviews land in a shared inbox, you can point both forms at the same email address.

## 3. Update the truck's live location (do this every time you move)

Everything showing "where's the truck right now" — the black banner on every page, the homepage map, and the "Get Directions" button — pulls from **one place**: the top of `script.js`.

Open `script.js` and edit this block:

```js
const CURRENT_LOCATION = {
  status: "live",              // "live" or "off"
  address: "Downtown Fort Myers — Centennial Park, 2000 W 1st St",
  cityState: "Fort Myers, FL 33901",
  hours: "Serving today 11:00 AM – 7:00 PM",
  mapQuery: "Centennial Park, Fort Myers, FL",
  lastUpdated: "Updated Aug 26, 2026 at 9:40 AM"
};
```

- Change `address`, `hours`, and `mapQuery` to wherever you're parked.
- Set `status` to `"off"` on days the truck isn't running — the banner will switch to "OFF THE ROAD" automatically and hide the map pin details.
- Save, commit, and push to GitHub — Vercel redeploys automatically in under a minute.

No app, no login, no third-party tracker needed — just this one file.

## 4. Menu & pricing

The menu was rebuilt from your handwritten notes into the following structure. Prices are set based on typical food-truck wing/tender pricing — adjust any of them directly in `menu.html` and `order.html` (search for the `$` amount and the matching `data-price` attribute in the order form).

| Item | Price |
|---|---|
| 5-Piece Wings/Tenders Combo (+ side, any flavor) | $10.00 |
| 10-Piece Wings/Tenders Combo (+ side, any flavor) | $15.00 |
| $5 Daily Special (5 wings, no side) | $5.00 |
| Fries | $4.50 |
| Tater Tots | $5.00 |
| Curly Fries | $5.50 |
| Wedges | $5.50 |
| Kids: 5 Nuggets + Fries | $7.00 |
| Kids: Mac & Cheese Bowl + Fries | $7.00 |
| Kids: 3 Tenders + Fries | $7.50 |
| Drinks (soda, Fanta, tea, water) | $1.50 – $2.00 |

**Flavors (choose one per combo):** Lemon Pepper, Root Beer BBQ, Honey Mustard, Sweet & Hot Asian, Honey BBQ, Honey, Hot Buffalo, Curry, Honey Parmesan.

## 5. Order form logic

- Customers set quantities for each menu item; a running total updates live.
- They choose **Pickup** (any order size, at the current live location) or **Delivery**.
- If Delivery is selected and the total is under $100.00, the Submit button is disabled and a warning appears until they add more items or switch to pickup.
- Flavor and side choices are collected in a notes field since each combo can have a different flavor/side pick.

## 6. Editing images or menu items later

- All photos live in the main folder alongside the HTML files. To swap one out, upload a new file with the same name (or update the `<img src="...">` path in `menu.html`).
- To add a new menu item, copy one of the existing `<div class="card">` blocks in `menu.html` and edit the text/image/price.
- To add it to the order form, copy one of the `<input type="number" data-price="..." data-name="...">` rows in `order.html`.

## Sample reviews

`reviews.html` ships with six realistic sample reviews so the page doesn't launch empty. Swap them for real customer reviews as they come in — each is a `.review-card` block you can copy, edit, or delete.
