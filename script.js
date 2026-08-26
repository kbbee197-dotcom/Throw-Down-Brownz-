/* ============================================================
   THROW DOWN BROWNZ — script.js
   ============================================================
   HOW TO UPDATE THE TRUCK'S LOCATION (do this every time you move):
   1. Edit the CURRENT_LOCATION object directly below.
   2. Save the file, then commit + push to GitHub (Vercel will
      redeploy automatically in under a minute).
   That's it — every page pulls from this one spot.
   ============================================================ */

const CURRENT_LOCATION = {
  // "live"  = truck is currently parked and serving
  // "off"   = truck is off the road right now
  status: "live",

  // Short line shown in the black bar on every page
  address: "Downtown Fort Myers — Centennial Park, 2000 W 1st St",

  // City/state shown under the address
  cityState: "Fort Myers, FL 33901",

  // Today's serving hours at this spot
  hours: "Serving today 11:00 AM – 7:00 PM",

  // Plain text used to build the Google Map (no API key needed)
  mapQuery: "Centennial Park, Fort Myers, FL",

  // Optional: when you last updated this, shown as a timestamp
  lastUpdated: "Updated Aug 26, 2026 at 9:40 AM"
};

/* ============================================================
   Nothing below this line needs to be edited to move the truck
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  paintLocation();
  wireNavToggle();
  wireOrderForm();
  setYear();
});

function paintLocation(){
  const liveEls = document.querySelectorAll("[data-location-status]");
  const addrEls = document.querySelectorAll("[data-location-address]");
  const cityEls = document.querySelectorAll("[data-location-city]");
  const hoursEls = document.querySelectorAll("[data-location-hours]");
  const updatedEls = document.querySelectorAll("[data-location-updated]");
  const mapFrames = document.querySelectorAll("[data-location-map]");

  const isLive = CURRENT_LOCATION.status === "live";

  liveEls.forEach(el => {
    el.textContent = isLive ? "LIVE NOW" : "OFF THE ROAD";
    el.parentElement && el.parentElement.classList.toggle("is-off", !isLive);
  });
  addrEls.forEach(el => el.textContent = isLive ? CURRENT_LOCATION.address : "Check back soon or follow our socials for the next stop.");
  cityEls.forEach(el => el.textContent = CURRENT_LOCATION.cityState);
  hoursEls.forEach(el => el.textContent = isLive ? CURRENT_LOCATION.hours : "");
  updatedEls.forEach(el => el.textContent = CURRENT_LOCATION.lastUpdated);

  mapFrames.forEach(frame => {
    const q = encodeURIComponent(CURRENT_LOCATION.mapQuery);
    frame.src = `https://www.google.com/maps?q=${q}&output=embed`;
  });
}

function wireNavToggle(){
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.textContent = nav.classList.contains("open") ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.textContent = "☰";
  }));
}

function setYear(){
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ============================================================
   ORDER FORM — live running total + $100 delivery minimum
   ============================================================ */
function wireOrderForm(){
  const form = document.getElementById("order-form");
  if(!form) return;

  const itemInputs = form.querySelectorAll("[data-price]");
  const totalDisplay = document.getElementById("order-total-amount");
  const deliveryRadios = form.querySelectorAll('input[name="fulfillment"]');
  const deliveryWarning = document.getElementById("delivery-warning");
  const deliveryFields = document.getElementById("delivery-fields");
  const submitBtn = document.getElementById("order-submit-btn");
  const hiddenSummary = document.getElementById("order-summary-hidden");

  function calcTotal(){
    let total = 0;
    let lines = [];
    itemInputs.forEach(input => {
      const qty = parseInt(input.value, 10) || 0;
      const price = parseFloat(input.dataset.price) || 0;
      if(qty > 0){
        total += qty * price;
        lines.push(`${qty} x ${input.dataset.name} ($${price.toFixed(2)} ea) = $${(qty*price).toFixed(2)}`);
      }
    });
    return { total, lines };
  }

  function isDelivery(){
    const checked = form.querySelector('input[name="fulfillment"]:checked');
    return checked && checked.value === "delivery";
  }

  function refresh(){
    const { total, lines } = calcTotal();
    if(totalDisplay) totalDisplay.textContent = `$${total.toFixed(2)}`;
    if(hiddenSummary) hiddenSummary.value = lines.length ? lines.join(" | ") + ` | TOTAL: $${total.toFixed(2)}` : "No items selected";

    const delivery = isDelivery();
    if(deliveryFields) deliveryFields.style.display = delivery ? "block" : "none";

    if(delivery && total < 100){
      if(deliveryWarning) deliveryWarning.style.display = "block";
      if(submitBtn){ submitBtn.disabled = true; submitBtn.style.opacity = 0.5; submitBtn.style.cursor = "not-allowed"; }
    } else {
      if(deliveryWarning) deliveryWarning.style.display = "none";
      if(submitBtn){ submitBtn.disabled = false; submitBtn.style.opacity = 1; submitBtn.style.cursor = "pointer"; }
    }
  }

  itemInputs.forEach(input => input.addEventListener("input", refresh));
  deliveryRadios.forEach(r => r.addEventListener("change", refresh));

  refresh();
}
