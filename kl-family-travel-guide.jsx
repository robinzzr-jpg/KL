import { useState } from "react";

/* ─── BOOKING LINKS ── */
const BOOKING = {
  petronas: { official: "https://eticket.petronastwintowers.com.my", klook: "https://www.klook.com/en-MY/activity/2750-petronas-twin-towers-kuala-lumpur/", headout: "https://www.headout.com/petronas-twin-towers-tickets-c-2581/" },
  petrosains: { official: "https://eticket.petrosains.com.my", klook: "https://www.klook.com/en-MY/activity/26203-petrosains-discovery-centre-ticket-kuala-lumpur/", headout: "https://www.headout.com/petrosains-discovery-centre-tickets-in-kl/timed-entry-tickets-to-petrosains-the-discovery-centre-in-kuala-lumpur-e-21023/", combo: "https://www.headout.com/petronas-twin-towers-tickets/combo-petrosains-the-discovery-centre-petronas-twin-towers-skip-the-line-tickets-e-22280/" },
  superpark: { official: "https://www.superpark.com.my/tickets/", klook: "https://www.klook.com/en-MY/activity/26494-superpark-indoor-playland-ticket-kuala-lumpur/", headout: "https://www.headout.com/super-park-malaysia/entry-tickets-superpark-malaysia-e-19403/" },
  berjaya: { official: "https://berjayatimessquarethemeparkkl.com/buy-online/", klook: "https://www.klook.com/en-MY/search/?query=berjaya+times+square+theme+park", headout: "https://www.headout.com/berjaya-times-square-tickets/berjaya-times-square-theme-park-e-18068/" },
  birdpark: { official: "https://www.klbirdpark.com/plan-your-visit/", klook: "https://www.klook.com/en-MY/activity/9188-kl-bird-park-one-way-transfer-kuala-lumpur/", headout: "https://www.headout.com/kuala-lumpur-bird-park/entry-tickets-to-kuala-lumpur-bird-park-e-19005/" },
  kidzania: { klook: "https://www.klook.com/en-MY/search/?query=kidzania+kuala+lumpur" },
};

/* ─── WEATHER DATA ── */
const weatherDays = [
  { date: "Sun 31 May", label: "Day 1 — Arrival", high: 31, low: 22, emoji: "⛅", feel: "Hot & partly cloudy", rain: "Low", tip: "Morning likely sunny. Afternoon showers possible after 3pm — but you're checking in and heading to Berjaya Times Square (indoors). Jalan Alor evening is fine.", alert: null },
  { date: "Mon 1 Jun", label: "Day 2 — Public Holiday! 👑", high: 31, low: 23, emoji: "🌦️", feel: "Hot, humid, afternoon showers likely", rain: "Medium", tip: "⚠️ Public holiday rain risk is higher — see wet weather backup plan below. Plan Batu Caves for early morning (7:30–9am) while it's dry. Afternoon at SuperPark (indoor) is the smart call regardless.", alert: "👑 Yang di-Pertuan Agong's Birthday — Public Holiday. Petrosains OPEN today (public holiday hours: 9:30am–6:30pm)! Malls and attractions will be busier than a normal Monday." },
  { date: "Tue 2 Jun", label: "Day 3 — KLCC Day", high: 32, low: 23, emoji: "☀️", feel: "Warm, mostly sunny", rain: "Low–Medium", tip: "June is one of KL's drier months. Morning KLCC visit should be fine. Any rain typically rolls in late afternoon (3–5pm). Plan to be at Petrosains 11am–2pm (fully indoor). KLCC Park wading pool open after 3pm — pack swimwear.", alert: null },
  { date: "Wed 3 Jun", label: "Day 4 — Departure Day", high: 32, low: 22, emoji: "⛅", feel: "Hot, partly cloudy", rain: "Low", tip: "Morning shopping at Pavilion — all indoor. Private transfer at 2pm. Rain in late afternoon unlikely to affect your 5pm departure.", alert: null },
];

/* ─── WET WEATHER PLAN ── */
const wetWeatherBackups = [
  {
    day: "Day 2 (Mon 1 Jun) — Batu Caves Rained Out",
    primary: "If heavy rain before 9am, skip Batu Caves entirely",
    icon: "🌧️",
    options: [
      { name: "Option A: SuperPark Malaysia (all-day)", desc: "Jump straight to Avenue K. 10am opening, 2.5–3 hour session. Best rain backup — completely indoor, brilliant for both ages.", book: "klook.com — SuperPark Malaysia" },
      { name: "Option B: Petrosains + Petronas Towers (TODAY)", desc: "OPEN on public holidays! Morning visit to Towers (9:30am) then Petrosains (Level 4, Suria KLCC). Move Day 3 sightseeing to today. Frees up Day 3 for a more relaxed schedule.", book: "eticket.petronastwintowers.com.my + eticket.petrosains.com.my" },
      { name: "Option C: KidZania KL (full day)", desc: "Perfect rainy-day indoor spend. 3+ hours of roleplay for your 8yo especially. Book on Klook same-day if available.", book: "klook.com — KidZania KL" },
      { name: "Option D: The Exchange TRX + TRX City Park", desc: "KL's newest, most stunning mall (15-min Grab). Free rooftop park with kids' playground — covered area to explore. Apple Store, food hall, excellent dining options. Note: rooftop park best avoided if actively raining.", book: "No booking needed — walk in" },
      { name: "Option E: Museum of Illusions + Pavilion mall crawl", desc: "Quick 45-min Museum of Illusions (Bukit Bintang, walkable), then Pavilion for Kiztopia and toy shopping. Low-cost, flexible, no booking needed.", book: "Walk-in or Klook for Museum of Illusions" },
    ]
  },
  {
    day: "Any Day — Afternoon Shower (3–5pm)",
    primary: "KL rain is usually short and intense. Best to wait it out indoors",
    icon: "⛈️",
    options: [
      { name: "Mall hop to nearest AC", desc: "Every day's itinerary ends near Pavilion, Suria KLCC or Berjaya Times Square — all within 5-min walk or short Grab. Just duck inside and browse.", book: null },
      { name: "KLCC Park to Suria KLCC", desc: "If rain hits during the park visit, walk directly into Suria KLCC for Watsons, food court, or the cinema.", book: null },
      { name: "Jalan Alor rain contingency", desc: "Jalan Alor stalls put up awnings in rain — the experience continues! Or retreat to Lot 10 Hutong (5-min walk, fully indoor) for the same street food experience in AC.", book: null },
    ]
  },
  {
    day: "Days 3 & 4 — KLCC Park / Pavilion Rained Out",
    primary: "Both days are largely indoor anyway — very low rain risk to itinerary",
    icon: "🌦️",
    options: [
      { name: "Day 3: Rain during KLCC Park wading pool", desc: "Just head back into Suria KLCC and browse. Petrosains and Petronas visit are already done indoors. Grab dinner early at Din Tai Fung or Madam Kwan's.", book: null },
      { name: "Day 4 backup shopping: The Exchange TRX", desc: "If Pavilion or Central Market feels crowded/rainy, TRX is 15-min Grab, less crowded, newer shops, great food hall and kids' playground indoors.", book: null },
    ]
  },
];

/* ─── ATTRACTIONS DATA ── */
const attractions = [
  {
    name: "Petronas Twin Towers", emoji: "🏙️", color: "#1A4A6E",
    urgency: "BOOK NOW — SELLS OUT", urgencyColor: "#c0392b",
    hours: [
      { day: "Tue–Sun + Public Holidays", time: "9:00am – 9:00pm (last admission 8:30pm)" },
      { day: "Monday", time: "CLOSED (except 2nd & 4th Monday)" },
      { day: "Your visit: Tue 2 Jun", time: "✅ OPEN — 9am–9pm" },
    ],
    prices: [
      { cat: "Foreign Adult (13+)", price: "RM 98", note: "~SGD 29 / USD 21" },
      { cat: "Foreign Child (3–12)", price: "RM 50", note: "~SGD 15 / USD 11" },
      { cat: "Under 2", price: "FREE", note: "" },
      { cat: "Combo + Petrosains (Headout)", price: "From RM 130+", note: "Saves vs buying separately" },
    ],
    booking: BOOKING.petronas,
    tips: ["🔴 Time-ticketed — LATE ARRIVALS NOT ACCOMMODATED. Be at entrance 15 min early.", "Book 1–2 weeks ahead during school holidays — slots sell out fast.", "Best combo: Klook or Headout Petronas + Petrosains combo saves money + skip queues.", "Morning sessions have thinner crowds and better interior lighting for photos.", "Gift shop at Level 86 has exclusive Petronas Tower souvenirs."],
    reviews: ["\"Smooth visit, no delays, no lines. Staff kind and ready to support guests.\" — Headout verified, Mar 2025", "\"Very efficient staff even during school holidays.\" — Tiqets verified, 2025", "\"Views absolutely stunning. A must-do in KL.\" — TripAdvisor, Jan 2026"],
  },
  {
    name: "Petrosains Discovery Centre", emoji: "🔬", color: "#2E7D55",
    urgency: "BOOK AHEAD", urgencyColor: "#e67e22",
    hours: [
      { day: "Mon (Public Holidays only)", time: "9:30am – 6:30pm (last admission 5:00pm)" },
      { day: "Tue – Thu", time: "9:30am – 5:30pm (last admission 4:00pm)" },
      { day: "Friday", time: "1:30pm – 5:30pm (last admission 4:00pm)" },
      { day: "Sat / Sun / Public Holidays", time: "9:30am – 6:30pm (last admission 5:00pm)" },
      { day: "Mon 1 Jun (Public Holiday 👑)", time: "✅ OPEN — 9:30am–6:30pm (public holiday hours)" },
      { day: "Tue 2 Jun (your planned visit)", time: "✅ OPEN — 9:30am–5:30pm (last admission 4pm)" },
    ],
    prices: [
      { cat: "Foreign Adult", price: "~RM 46", note: "Confirm at eticket.petrosains.com.my" },
      { cat: "Foreign Child (3–12)", price: "~RM 35", note: "Third-party often cheaper" },
      { cat: "Under 2", price: "FREE", note: "" },
      { cat: "Energy Capsule Ride", price: "Extra fee", note: "Separate ticket — highly recommended!" },
      { cat: "Maker Studio workshop", price: "Extra fee", note: "Great add-on for 8yo" },
    ],
    booking: BOOKING.petrosains,
    tips: ["CASHLESS only — bring card, Apple/Google Pay, or eWallet.", "Time-ticketed system — book slot in advance, especially during school holidays.", "Headout/Klook combo with Towers saves money + skip-the-queue entry.", "Budget 2.5–3 hours. There is a café inside for a midway break.", "Science shows (Mangrove, Eat Prey Love) are timed — check schedule at the entrance.", "June 1 = Public Holiday: Petrosains IS OPEN. Could visit today instead of Tuesday if preferred."],
    reviews: ["\"Spent almost 4 hours. Kids didn't want to leave. Space, dinos, F1 tech — all huge hits.\" — Airial Travel, Aug 2025", "\"Clean, interactive, well-organized. Family did not feel bored.\" — Headout verified, 2025", "\"Go on a weekday and go early.\" — TripAdvisor, Aug 2025"],
  },
  {
    name: "SuperPark Malaysia", emoji: "🏃", color: "#2c6e49",
    urgency: "BOOK ONLINE (SAVES RM10)", urgencyColor: "#e67e22",
    hours: [
      { day: "Daily", time: "10:00am – 7:00pm" },
      { day: "Mon 1 Jun (your visit)", time: "✅ OPEN — great Day 2 afternoon activity" },
    ],
    prices: [
      { cat: "Walk-in", price: "From RM 69", note: "At-door price" },
      { cat: "Klook / Headout", price: "~RM 58–60", note: "Save ~RM10 vs walk-in" },
      { cat: "Under 3 / below 100cm", price: "FREE", note: "" },
    ],
    booking: BOOKING.superpark,
    tips: ["Sign waiver ONLINE before arriving at superpark.com.my — saves queue time at counter.", "Grip socks required (RM5–8 at counter) or bring your own non-slip socks.", "Children 12 and under MUST have a paying parent/guardian present at all times.", "Arrive 15 min before your session. Post-play: Natalina's Italian on Level 3 Avenue K is great for families."],
    reviews: ["\"Kids had a great time. Spacious, clean and everything in working order.\" — Headout verified, Mar 2026", "\"Been bringing our daughter since 3 — she's 5 now and still begs to go. We have just as much fun as she does.\" — KL With Kids, Feb 2026"],
  },
  {
    name: "Berjaya Times Square Theme Park", emoji: "🎢", color: "#2a5e8a",
    urgency: "WALK-IN OK (BUY ONLINE SAVES)", urgencyColor: "#2E7D55",
    hours: [
      { day: "Mon–Fri", time: "12:00pm – 10:00pm" },
      { day: "Sat/Sun + School & Public Holidays", time: "11:00am – 10:00pm" },
      { day: "Sun 31 May (your visit)", time: "✅ OPEN — 11am–10pm (school holiday weekend)" },
    ],
    prices: [
      { cat: "Weekday Adult", price: "~RM 32–38", note: "" },
      { cat: "Weekday Child (<12)", price: "~RM 22–28", note: "" },
      { cat: "Weekend/Holiday Adult", price: "~RM 37–43", note: "Applies to your visit (school hols)" },
      { cat: "Weekend/Holiday Child", price: "~RM 27–33", note: "" },
      { cat: "Under 3", price: "FREE", note: "" },
      { cat: "Online (Traveloka/Klook)", price: "From ~RM 19", note: "Significant savings vs walk-in" },
    ],
    booking: BOOKING.berjaya,
    tips: ["Buy online for significant savings during school holiday weekend rates.", "Fantasy Garden (gentle rides): best for ages 5–8. Galaxy Station roller coaster for 8yo (min ~110cm height).", "Re-entry allowed twice — keep wristband on. Lockers available (RM10).", "5-min walk from hotel via Jalan Imbi — no Grab needed on Day 1."],
    reviews: ["\"Affordable and good mix of adult/kids sections.\" — Trip.com verified, 2025", "\"Good for families. A&W and Kenny Rogers nearby for food.\" — TripAdvisor, 2025"],
  },
  {
    name: "Batu Caves", emoji: "🌈", color: "#C8773A",
    urgency: "NO BOOKING NEEDED — FREE", urgencyColor: "#2E7D55",
    hours: [
      { day: "Daily", time: "6:00am – 9:00pm (staircase closes ~8:30pm)" },
      { day: "Mon 1 Jun (your visit)", time: "✅ OPEN — 6am–9pm (public holiday)" },
    ],
    prices: [
      { cat: "Main Temple Cave (Cathedral Cave)", price: "FREE", note: "No ticket needed" },
      { cat: "Ramayana Cave", price: "~RM 5 per person", note: "Small cash fee at entrance" },
      { cat: "Dark Cave guided tour", price: "Small fee", note: "Sometimes closed — check ahead" },
      { cat: "Sarong rental (dress code)", price: "~RM 1–2", note: "Available at entrance" },
    ],
    booking: { note: "No booking needed. Grab to Batu Caves (~RM15, 25–35 min) or KTM Komuter from Subang station." },
    tips: ["Arrive before 9am on a public holiday — crowds build fast once the day warms up.", "Dress code: cover shoulders and knees. Sarongs for rent ~RM1 at the entrance.", "Use a baby carrier — NOT stroller-friendly. Hide all food from monkeys — they're very quick!", "Allow 2–3 hours for full complex including Ramayana Cave."],
    reviews: ["\"Arrive early morning for a quieter, cooler experience. Rainbow steps + golden statue = incredible.\" — Shipped Away, Jan 2026", "\"Free, easy from central KL, and absolutely worth it.\" — Guide Your Travel, 2025"],
  },
  {
    name: "KL Bird Park", emoji: "🦚", color: "#4a6e2a",
    urgency: "BOOK ON KLOOK", urgencyColor: "#e67e22",
    hours: [
      { day: "Daily (all year)", time: "9:00am – 5:30pm" },
      { day: "Mon 1 Jun (public holiday)", time: "✅ OPEN — 9am–5:30pm" },
    ],
    prices: [
      { cat: "Foreign Adult (standard)", price: "RM 90", note: "Official site 2026" },
      { cat: "Foreign Child (standard)", price: "RM 70", note: "Official site 2026" },
      { cat: "Klook price (adult)", price: "~RM 85", note: "Small saving + skip ticket queue" },
    ],
    booking: BOOKING.birdpark,
    tips: ["Check klbirdpark.com for daily bird show schedule before visiting.", "Best time: arrive at 9am when birds are most active — gets hot midday.", "Combine with Islamic Arts Museum nearby (free kids' art sessions on weekends).", "Allow 1.5–2 hours. The free-flight aviary is the main highlight."],
    reviews: ["\"Walking through the free-flight aviary felt like stepping into a rainforest.\" — Headout verified, 2025", "\"Kids loved the hornbills and peacocks. Feeding sessions are the highlight.\" — Mama's Guide to Malaysia, 2025"],
  },
  {
    name: "KLCC Park Wading Pool + Lake Symphony", emoji: "💦✨", color: "#1a3a5a",
    urgency: "COMPLETELY FREE", urgencyColor: "#2E7D55",
    hours: [
      { day: "Wading pool", time: "Daylight hours (check with park)" },
      { day: "Lake Symphony (lights only)", time: "7:30pm · 8:30pm · 9:30pm" },
      { day: "Lake Symphony (full + music)", time: "8:00pm · 9:00pm · 10:00pm" },
    ],
    prices: [{ cat: "Park, wading pool, Lake Symphony", price: "FREE", note: "" }],
    booking: { note: "No booking. Walk from Suria KLCC or via Bukit Bintang air-con walkway." },
    tips: ["Pack swimwear daily — the wading pool is irresistible and free.", "Arrive 15 min early for the fountain show for a good lakeside spot.", "KLCC main playground is partially under renovation until March 2027 — wading pool still open ✅"],
    reviews: ["\"Free wading pool under the Twin Towers — kids went crazy for it.\" — TraveLynn Family, 2025", "\"Lake Symphony is spectacular. Absolutely magical at night.\" — Mama's Guide to Malaysia, 2026"],
  },
];

/* ─── SHOPPING DATA ── */
const shoppingGuide = [
  {
    name: "Pavilion KL", walk: "5-min walk ⭐ Closest", icon: "🏆", color: "#b05c2a",
    highlights: ["Toys R Us + LEGO Store (Level 5–6)", "Kiztopia indoor playground (inside Toys R Us)", "Daiso (Tokyo Street L6) — RM6 toys, crafts, stationery", "Tokyo Street Level 6 — Japanese novelty & kawaii", "Cold Storage — Malaysian food & sauces to bring home 🛒", "Watsons: Ground & Level 2", "Din Tai Fung, Grandmama's, Madam Kwan's", "H&M, Zara, Uniqlo, Cotton On Kids", "Mothercare for baby/kids essentials"],
    bestFor: "Toy shopping, budget Daiso finds, food to bring home (Cold Storage), kids' essentials, premium brands, best dining",
    hours: "10am–10pm daily",
    tip: "School holiday sales running — check for promotions at the concierge desk on arrival.",
  },
  {
    name: "Berjaya Times Square", walk: "5-min walk ⭐ Closest", icon: "🎢", color: "#2a5e8a",
    highlights: ["Malaysia's largest indoor theme park (Level 5–8)", "Toy World (Level 2) — budget toys", "Toys R Us (Level 2)", "700+ stores — affordable fashion, electronics", "A&W, Kenny Rogers, food courts"],
    bestFor: "Budget shopping, toys, indoor theme park, value brands",
    hours: "10am–10pm daily",
    tip: "Great for affordable kids' clothing and toys. Theme park on Level 5 — buy online for savings.",
  },
  {
    name: "LaLaport BBCC", walk: "10-min walk / 5-min Grab", icon: "🇯🇵", color: "#4a6e2a",
    highlights: ["Don Don Donki — Japanese character goods, snacks, toys 🛒", "Toy World (Level 2) — budget toys from RM5", "MR.TOY — certified affordable toy chain", "Watsons outlet", "Less crowded than Pavilion", "Japanese dining options"],
    bestFor: "Japanese snacks to bring home, budget toys, Don Don Donki, relaxed browse",
    hours: "10am–10pm daily",
    tip: "Don Don Donki is a must-visit for Japanese snacks to bring home (Meiji chocolates, Hi-Chew, chips, instant ramen). Kids love the character and toy section. Less crowded than Pavilion — great for a relaxed afternoon browse.",
  },
  {
    name: "Suria KLCC", walk: "15-min air-con walkway", icon: "🏙️", color: "#1a4a6e",
    highlights: ["Petrosains & KLCC Park (Level 4 and outdoors)", "Isetan for Japanese brands and food hall", "Parkson for kids' clothing", "Watsons Level 2", "Premium brands — Burberry, Prada, etc."],
    bestFor: "Attached to Petronas Towers visit, premium brands, food court",
    hours: "10am–10pm daily",
    tip: "School holiday Isetan sale runs until 7 Jun 2026 — check for deals on kids' clothing.",
  },
  {
    name: "The Exchange TRX 🆕", walk: "15-min Grab (~RM10)", icon: "✨", color: "#6a3a8a",
    highlights: ["Malaysia's ONLY official Apple Store", "Free rooftop TRX City Park + kids' playground", "Seibu Department Store", "Market Lane — indie designers & artisan shops", "Golden Screen Cinemas Aurum Theatre", "Shake Shack, diverse dining", "Stroller-friendly, clean family rooms, nursing rooms"],
    bestFor: "Apple products, new-to-Malaysia brands, stunning architecture, family rooftop park",
    hours: "10am–10pm daily",
    tip: "Free rooftop park + playground is a hidden gem — great views, breezy, kids can run free. Best visited on a dry day. Note: interactive water play is currently under maintenance.",
    isNew: true,
  },
  {
    name: "Plaza Low Yat", walk: "5-min walk", icon: "💻", color: "#2a4a6e",
    highlights: ["KL's premier electronics and tech mall", "Phone accessories, cables, power banks", "Laptops, tablets, gaming gear", "Affordable phone screen repairs", "Watch batteries, chargers, converters"],
    bestFor: "Tech accessories, electronics, phone cases, affordable gear",
    hours: "10am–10pm daily",
    tip: "Walkable from hotel. Best for affordable phone accessories, power banks and travel adapters. Haggling is part of the experience at smaller stalls.",
  },
  {
    name: "Fahrenheit 88", walk: "On air-con KLCC walkway", icon: "🌡️", color: "#8a4040",
    highlights: ["Watsons (ground floor — on your daily walk!)", "Mid-range fashion brands", "Cotton On, Padini, Mr DIY", "Food options and cafes"],
    bestFor: "Watsons top-up, mid-range fashion, passing through to KLCC",
    hours: "10am–10pm daily",
    tip: "You pass through here every time you walk to KLCC. Perfect for a Watsons run without a detour.",
  },
  {
    name: "Mid Valley Megamall", walk: "15-20-min Grab (~RM15)", icon: "🏬", color: "#6e2a4a",
    highlights: ["Toys R Us flagship — massive selection", "The Gardens Mall next door (Beauty in the Pot with kids' play area)", "IKEA nearby — meatballs, kids' meals, play areas", "Food Republic — huge food court", "Watsons multiple locations"],
    bestFor: "Full day out, biggest Toys R Us, Beauty in the Pot dining, IKEA",
    hours: "10am–10pm daily",
    tip: "Not needed unless you want the biggest toy range or Beauty in the Pot experience. Worth a half-day if you have spare time.",
  },
];

/* ─── DAYS DATA ── */
const days = [
  {
    date: "Sun, 31 May", label: "Day 1", theme: "Arrival & Bukit Bintang First Night", color: "#C8773A", emoji: "✈️",
    slots: [
      { time: "09:00", tag: "DEPART", title: "Depart at 9:00am", desc: "Confirm your departure terminal before travel day — departing from Subang (SZB), Sultan Abdul Aziz Shah Airport, not KLIA.", tip: null, alert: null },
      { time: "~11:30", tag: "TRANSFER ✅", title: "Private Transfer → Hotel (Bukit Bintang)", desc: "Pre-booked driver meets you at arrivals. ~40–50 min. Store luggage at concierge if room not ready (check-in 3pm). Head to the pool while waiting.", tip: "💡 Save your driver's WhatsApp contact and share your flight details so they can track any delays.", alert: null },
      { time: "12:30", tag: "CHECK-IN 🐾", title: "Journey in the Wild — Signature Family Suite", desc: "Bunk beds, jungle-themed play area, city views, kids' bath amenities, welcome puzzle activity. The pool is a resort-in-the-city. Four suite themes available: Journey in the Wild 🐾, Sky Wanderer ☁️, Enchanted Sweets 🍬, Choo Choo Train 🚂.", tip: "💡 Call ahead to confirm iron, hair dryer and shaver are in the room (some guests reported these missing).", alert: null },
      { time: "14:30", tag: "INDOOR PLAY", title: "Berjaya Times Square Theme Park 🎢 (5-min walk)", desc: "Opens 11am on weekends/school holidays. Fantasy Garden for ages 5–8: carousels, bumper cars, gentle rides. Galaxy Station roller coaster for 8yo. Buy tickets online at berjayatimessquarethemeparkkl.com or Klook for savings vs walk-in.", tip: null, alert: null },
      { time: "17:30", tag: "SHOPPING", title: "Toy World + MR.TOY + Watsons (Berjaya Times Square)", desc: "Toy World Level 2 — budget toys, great pocket-money buys from RM5. MR.TOY (same Level 2 area) — Malaysia's home-grown certified toy chain, RM5–30, safe and affordable. Watsons Level 1 — sunscreen, kids' Panadol, Mopiko, hydration sachets, local snacks.", tip: null, alert: null },
      { time: "18:30", tag: "FRESHEN UP 🚿", title: "Back to Hotel — Wash Up Before Dinner", desc: "5-min walk back from Berjaya Times Square. Cool shower and change into fresh evening clothes. Give the kids 30 min to rest before heading out to Jalan Alor — makes the evening so much more enjoyable for everyone.", tip: null, alert: null },
      { time: "19:00", tag: "DINNER 🌟", title: "Jalan Alor Food Street (5-min walk)", desc: "KL's most famous hawker street. Satay, char kway teow, BBQ chicken wings (W Restaurant stall 7 — legendary), fresh coconut water, mango sticky rice. Opens ~5pm.", tip: "💡 Post-dinner: stroll Bintang Walk to see the city lit up at night.", alert: null },
    ]
  },
  {
    date: "Mon, 1 Jun", label: "Day 2", theme: "PUBLIC HOLIDAY + Batu Caves + SuperPark", color: "#2E7D55", emoji: "👑",
    slots: [
      { time: "07:30", tag: "BREAKFAST", title: "Hotel Breakfast — Bukit Bintang", desc: "Malaysian + international buffet. Fuel up early for an active day.", tip: null, alert: "👑 PUBLIC HOLIDAY: Yang di-Pertuan Agong's Birthday. Petrosains OPEN today (public holiday hours 9:30am–6:30pm). Attractions will be busier — Batu Caves early morning is the smart move." },
      { time: "08:30", tag: "GRAB", title: "Grab to Batu Caves (~25–35 min, ~RM15)", desc: "Head out early before the public holiday crowds and heat build up. Return by Grab.", tip: "💡 If it's raining at 8am, skip Batu Caves and go straight to SuperPark (see wet weather backup tab).", alert: null },
      { time: "09:00", tag: "MUST DO 🌈", title: "Batu Caves — FREE Entry", desc: "272-step rainbow staircase to Temple Cave. Free to enter. 42.7m golden Murugan statue. Ramayana Cave (~RM5) has vivid Hindu epic dioramas. Arrive early for cooler temps and better photos.", tip: "💡 Cover shoulders + knees (sarong rental ~RM1). Hide ALL food from monkeys! Use a carrier for younger kids — not stroller-friendly.", alert: null },
      { time: "11:30", tag: "OPTION", title: "KL Bird Park OR Islamic Arts Museum (15-min Grab)", desc: "KL Bird Park: RM90 adult / RM70 child. World's largest free-flight aviary — hornbills, peacocks, flamingos. Open 9am–5:30pm. Book on Klook. Islamic Arts Museum has free kids' activities on public holidays.", tip: null, alert: null },
      { time: "12:30", tag: "LUNCH", title: "Lot 10 Hutong Food Court", desc: "Level 4, Lot 10 Mall (Bukit Bintang). KL's heritage hawker court: chicken rice, wonton noodles, satay, pandan pancakes. Air-conditioned, clean, family-friendly.", tip: null, alert: null },
      { time: "14:00", tag: "INDOOR PLAY ⭐", title: "SuperPark Malaysia (Avenue K, 15-min Grab)", desc: "Ninja tracks, zip cables, trampolines, foam pits, climbing, basketball, pedal cars, scooters. 25+ activities. Open 10am–7pm. From RM69 walk-in or ~RM58 via Klook. Allow 2.5 hours.", tip: "💡 Book at klook.com to save ~RM10 and pre-sign waiver online. Grip socks required.", alert: null },
      { time: "17:00", tag: "FRESHEN UP 🚿", title: "Back to Hotel — Wash Up Before Dinner", desc: "Short Grab from Avenue K back to Bukit Bintang (~15 min, ~RM10). SuperPark is sweaty work! A cool shower and fresh clothes before dinner makes the evening out so much nicer. Kids get a quiet hour to relax and decompress before heading out again.", tip: null, alert: null },
      { time: "19:00", tag: "DINNER", title: "Madam Kwan's (Suria KLCC or Pavilion)", desc: "Nasi bojari, curry laksa, teh tarik. Kids' menu available. Reliable local favourite.", tip: null, alert: null },
    ]
  },
  {
    date: "Tue, 2 Jun", label: "Day 3", theme: "Petronas Towers + Petrosains + KLCC", color: "#1A4A6E", emoji: "🏙️",
    slots: [
      { time: "08:30", tag: "WALK", title: "Air-Con Walkway to KLCC (via Fahrenheit 88)", desc: "1.17km covered walkway. Stop at Watsons in Fahrenheit 88 for any essentials. No sweating!", tip: "💡 BOOK BOTH BEFORE YOU GO: eticket.petronastwintowers.com.my + eticket.petrosains.com.my (or combo on Headout). Late arrivals at Petronas are turned away!", alert: null },
      { time: "09:30", tag: "BUCKET LIST 🏙️", title: "Petronas Twin Towers — RM98 adult / RM50 child", desc: "Level 86 Observation Deck (360° views) + Level 41–42 Skybridge. Interactive displays. Under-2 FREE. MUST arrive 15 min before booked slot. Allow 1.5 hours.", tip: "💡 Exclusive gift shop at top — great souvenirs for the kids.", alert: null },
      { time: "11:00", tag: "KIDS FAVE 🔬", title: "Petrosains — ~RM46 adult / ~RM35 child (last admission 4pm)", desc: "11 interactive zones: Energy Capsule dark ride, dinosaurs, oil rig, robotics, nanotechnology, 3D theatre. CASHLESS only. Allow 2.5–3 hours. Last admission 4pm on Tuesdays — plan ahead!", tip: "💡 Book Energy Capsule ride add-on separately. Dino zone and F1 simulator are the 8yo highlights.", alert: null },
      { time: "13:30", tag: "LUNCH", title: "Suria KLCC Dining", desc: "Din Tai Fung Level 4 (open kitchen, kids love watching dumplings fold). PappaRich for roti canai. Basement food court for budget bites.", tip: null, alert: "⚠️ AQUARIA KLCC closed until March 2027 ❌ — skip entirely." },
      { time: "15:00", tag: "FREE 💦", title: "KLCC Park Wading Pool — FREE", desc: "Pack swimwear. 50-acre park, free wading pool, shower rooms beside pool. Main playground partially under renovation but wading pool open.", tip: null, alert: null },
      { time: "17:00", tag: "FRESHEN UP 🚿", title: "Back to Hotel — Wash Up", desc: "Walk back via the air-con Bukit Bintang–KLCC walkway (~15 min). Kids will need a rinse and dry clothes after the wading pool. Rest up at the hotel, then Grab back to KLCC (~10 min) in time for the 8pm Lake Symphony fountain show.", tip: null, alert: null },
      { time: "18:00", tag: "BROWSE", title: "Suria KLCC + Watsons Level 2", desc: "Watsons for last-minute essentials. Isetan supermarket for local snacks (school holiday sale until 7 Jun!). Parkson for affordable kids' clothing.", tip: null, alert: null },
      { time: "19:30", tag: "HIGHLIGHT ✨", title: "Lake Symphony Light & Fountain Show — FREE", desc: "Full show (with music): 8pm / 9pm / 10pm. Lights-only: 7:30pm / 8:30pm / 9:30pm. Arrive 15 min early for a good spot. Completely free.", tip: null, alert: null },
    ]
  },
  {
    date: "Wed, 3 Jun", label: "Day 4", theme: "Shopping Morning + Farewell", color: "#7A3B6E", emoji: "👋",
    slots: [
      { time: "08:00", tag: "BREAKFAST", title: "Final Hotel Breakfast", desc: "Last hotel breakfast spread. Private transfer at 2pm — you have a good morning ahead.", tip: null, alert: null },
      { time: "09:00", tag: "SHOPPING 🛍️", title: "Pavilion KL — Toys, LEGO + Watsons (5-min walk)", desc: "Toys R Us (Level 5–6): LEGO often 10–20% cheaper than home. LEGO Store flagship. Tokyo Street (Level 6): Japanese novelty + stationery. Watsons Ground/Level 2: Milo sachets, Mamee snacks, cheap Biore sunscreen to bring home. Kiztopia inside Toys R Us for a 30-min play break.", tip: null, alert: null },
      { time: "10:30", tag: "OPTION", title: "Optional: The Exchange TRX (15-min Grab)", desc: "KL's newest prestige mall — Malaysia's only Apple Store, rooftop kids' playground (free), stylish food hall. Great for a browse if you have time. MRT: Tun Razak Exchange station.", tip: null, alert: null },
      { time: "10:30", tag: "SOUVENIR", title: "OR: Central Market (Pasar Seni) — Souvenir Run", desc: "15-min Grab. Batik scarves, pewter, handicrafts, local snacks, fridge magnets. Kasturi Walk outdoor market next door. Allow 45 min.", tip: null, alert: null },
      { time: "11:45", tag: "PACK UP", title: "Back to Hotel — Checkout", desc: "Private transfer at 2pm. Be in the lobby by 1:50pm. Store bags with concierge if needed.", tip: null, alert: null },
      { time: "12:15", tag: "FAREWELL LUNCH", title: "Final Malaysian Meal (Pavilion KL, 5-min walk)", desc: "Din Tai Fung one last time, Grandmama's (Malaysian comfort food + legendary desserts), or PappaRich (roti canai + teh tarik). Be back by 1:50pm.", tip: null, alert: null },
      { time: "14:00", tag: "TRANSFER ✅", title: "Private Transfer to Airport — Pre-Booked", desc: "2pm sharp from hotel lobby. ~40–50 min to Subang Airport (SZB). Arrive ~2:50–3pm — perfectly timed for 5pm departure.", tip: "💡 Check-in typically opens 2 hours before departure. A 3pm arrival gives a relaxed, stress-free send-off.", alert: null },
      { time: "17:00", tag: "DEPART ✈️", title: "5:00pm — Depart Subang (SZB)", desc: "Goodbye KL! 🇲🇾🐾 Until next time.", tip: null, alert: null },
    ]
  },
];

/* ─── DINING DATA ── */
const kidsDining = [
  { name: "Din Tai Fung", where: "Pavilion KL & Suria KLCC", type: "Taiwanese Dumplings", age: "All ages ✅", why: "Xiao long bao — zero spice, kids universally love them. Open kitchen to watch folding." },
  { name: "Grandmama's", where: "Pavilion KL Level 3", type: "Malaysian", age: "All ages ✅", why: "Malaysian comfort food + iconic dessert spread. Vintage decor kids find fun." },
  { name: "Madam Kwan's", where: "Suria KLCC & Pavilion", type: "Malaysian", age: "All ages ✅", why: "Local classic. Nasi bojari, laksa. Kids' menu. Consistently reliable and comfortable." },
  { name: "PappaRich", where: "Most major malls", type: "Malaysian", age: "All ages ✅", why: "Quick service. Roti canai, nasi lemak — mild for kids. Fast and affordable." },
  { name: "Nando's", where: "Suria KLCC, Pavilion, Berjaya Times Square", type: "Peri-Peri Chicken", age: "5+ ✅", why: "Lemon herb chicken is mild. Self-serve sauces let parents control the spice." },
  { name: "Lot 10 Hutong Food Court", where: "Level 4, Lot 10 Mall, Bukit Bintang", type: "Heritage Hawker", age: "All ages ✅", why: "Heritage hawker court. Chicken rice, wonton noodles, satay. AC and spotless." },
  { name: "Beauty in the Pot", where: "The Gardens Mall, Mid Valley (non-halal)", type: "Hotpot + Kids' Play", age: "5+ ✅", why: "Hot pot + in-view kids' play corner. Parents eat, kids play safely nearby." },
  { name: "Jalan Alor Night Market", where: "5-min walk from Bukit Bintang hotels", type: "Street Food", age: "All ages ✅", why: "Iconic night experience. BBQ wings, satay, char kway teow, fresh coconuts. Opens ~5pm." },
];

/* ─── TIPS DATA ── */
const tips = [
  { icon: "🌡️", title: "Weather", body: "Hot & humid 28–32°C. June is one of KL's drier months — mostly morning sunshine, afternoon showers ~3–5pm (usually short and intense, 30–60 min). Plan outdoor activities for mornings. Pack light breathable clothes, SPF 50 sunscreen, hats and a packable umbrella for afternoons." },
  { icon: "🚗", title: "Getting Around", body: "Grab everywhere — safe, cheap, reliable. The KLCC–Bukit Bintang air-con walkway (1.17km, via Fahrenheit 88) saves a Grab fare daily. Pavilion and Berjaya Times Square are 5-min walks from your hotel in Bukit Bintang." },
  { icon: "💊", title: "Watsons Top Buys", body: "Biore UV SPF 50 sunscreen (much cheaper than home), Safi kids' sunscreen, Mopiko itch relief, kids' Panadol syrup, Seagull hydration sachets, insect repellent patches. Snacks to bring home: Milo 3-in-1 sachets, Mamee Monster noodle snacks, Hup Seng cream crackers." },
  { icon: "🧸", title: "Toy Shopping — Budget to Splurge", body: "Cheapest SAFE options: Toy World (Berjaya Times Square L2 & LaLaport L2) — pocket-money toys from RM5, perfectly fine quality; MR.TOY stores (Malaysia's home-grown certified toy chain by MR DIY Group, found in most major malls, RM5–30 range — great for action figures, cars, arts and crafts); Daiso at Pavilion Level 6 (Tokyo Street area), RM6 per item — craft kits, stationery, fidget toys, brilliant for both ages. For brands: LEGO is 10–20% cheaper than Singapore/Australia at Pavilion flagship. Toys R Us gift-wraps free. Don Don Donki at LaLaport for Japanese character goods. ⚠️ Avoid unlicensed market stalls — fake toys look convincing but fall apart after a day." },
  { icon: "💳", title: "Money & Payments", body: "Cards accepted everywhere in malls. Register for Touch 'n Go eWallet for QR payments. Keep RM cash for: Grab, hawker stalls, Jalan Alor, Central Market and Batu Caves sarong rental (~RM1)." },
  { icon: "👑", title: "June 1 = Public Holiday!", body: "Yang di-Pertuan Agong's Birthday. All malls, theme parks and attractions open (including Petrosains on public holiday hours). Expect slightly busier crowds everywhere. Batu Caves early morning (before 9am) is the best strategy." },
  { icon: "🛍️", title: "Sale Season Note", body: "Malaysia Mega Sale runs 15 Jun – 31 Jul 2026 — just AFTER your trip. However, Isetan school holiday sale runs now until 7 Jun at KLCC and The Gardens. Check for deals on kids' clothing and accessories." },
  { icon: "🎟️", title: "Pre-Book NOW", body: "1) Petronas Towers — eticket.petronastwintowers.com.my (CRITICAL — time-ticketed, sells out). 2) Petrosains combo — Headout (saves money + skip queue). 3) SuperPark — Klook (saves ~RM10). All links in the Prices & Hours tab." },
  { icon: "🛒", title: "Food to Bring Home", body: "Best in-mall hauls: Watsons (every mall) — Milo 3-in-1 sachets, Mamee Monster noodle snacks, Hup Seng cream crackers, Khong Guan biscuits; great value in bulk. Isetan Food Hall at Suria KLCC (school holiday sale until 7 Jun!) — premium Japanese snacks, local condiments, kuih mixes. Cold Storage at Pavilion KL — Brahim's ready-to-eat Malaysian curries (perfect to bring home), kaya (coconut jam), pandan paste, ABC rose syrup, local curry paste packets. Don Don Donki at LaLaport BBCC — Japanese candy, Meiji chocolates, instant noodles, chips. Tip: airport shops at Subang charge more — stock up at mall Watsons and Cold Storage instead." },
  { icon: "🏬", title: "Backup Malls — Adults Shop + Kids Play", body: "If a day opens up or kids need more space: Mid Valley Megamall (15–20 min Grab, ~RM15) — KL's biggest Toys R Us, full fashion lineup for adults, Beauty in the Pot restaurant with in-view kids' play corner. LaLaport BBCC (10-min walk or 5-min Grab, free) — less crowded than Pavilion, Don Don Donki, Toy World, Watsons, relaxed food court; good half-day option. The Exchange TRX (15-min Grab, ~RM10) — free rooftop TRX City Park where kids can run freely, Malaysia's only Apple Store, indie boutiques and upscale dining; best adult shopping experience after Pavilion. KidZania KL (Mid Valley area, ~20 min Grab) — full roleplay city for ages 3–15, 3+ hours of occupation-play fun, great alternative full-day if SuperPark is fully booked. Avoid 1 Utama or Sunway Pyramid — too far from Bukit Bintang base." },
  { icon: "🔒", title: "Safety", body: "KL is family-safe. Use crossbody bags in busy areas. Bukit Bintang is a well-lit tourist precinct — very safe for families. Locals are friendly and helpful." },
];

/* ─── COMPONENT ── */
export default function KLTravelGuide() {
  const [activeTab, setActiveTab] = useState("weather");
  const [activeDay, setActiveDay] = useState(0);
  const [expandedAtt, setExpandedAtt] = useState(null);
  const [expandedShop, setExpandedShop] = useState(null);
  const [expandedBackup, setExpandedBackup] = useState(null);
  const [expandedTip, setExpandedTip] = useState(null);

  const navItems = [
    { id: "weather", label: "🌦️ Weather" },
    { id: "prices", label: "🎟️ Prices & Book" },
    { id: "itinerary", label: "📅 Itinerary" },
    { id: "hotel", label: "🏨 Suite" },
    { id: "shopping", label: "🛍️ Shopping" },
    { id: "dining", label: "🍜 Dining" },
    { id: "tips", label: "💡 Tips" },
  ];

  return (
    <div style={{ fontFamily: "'Georgia',serif", background: "linear-gradient(160deg,#fdf8f0 0%,#f5ede0 100%)", minHeight: "100vh", color: "#2a1f14" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .cg{font-family:'Cormorant Garamond',Georgia,serif}
        .jost{font-family:'Jost',system-ui,sans-serif}
        .nav-tab{cursor:pointer;padding:8px 14px;border-radius:4px;font-family:'Jost',sans-serif;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;border:1.5px solid transparent;transition:all 0.2s;white-space:nowrap}
        .nav-tab.active{background:#2a1f14;color:#fdf8f0;border-color:#2a1f14}
        .nav-tab:not(.active){background:rgba(255,255,255,0.65);color:#6b5040;border-color:rgba(42,31,20,0.15)}
        .nav-tab:not(.active):hover{background:white;border-color:rgba(42,31,20,0.3)}
        .day-tab{cursor:pointer;padding:8px 13px;border-radius:4px;font-family:'Jost',sans-serif;font-size:11px;font-weight:500;letter-spacing:1px;text-transform:uppercase;border:1.5px solid transparent;transition:all 0.2s;white-space:nowrap}
        .day-tab.active{color:white}
        .day-tab:not(.active){background:rgba(255,255,255,0.65);color:#6b5040;border-color:rgba(200,119,58,0.25)}
        .slot-card{background:white;border-radius:8px;padding:16px 18px;margin-bottom:12px;box-shadow:0 2px 8px rgba(42,31,20,0.07);border-left:3px solid var(--day-color);transition:transform 0.15s,box-shadow 0.15s}
        .slot-card:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(42,31,20,0.12)}
        .slot-tag{display:inline-block;padding:2px 9px;border-radius:2px;font-size:9px;letter-spacing:2px;font-family:'Jost',sans-serif;font-weight:600;text-transform:uppercase;background:var(--day-color);color:white}
        .alert-box{background:linear-gradient(135deg,#fff4e6,#ffe8cc);border:1px solid #f0a050;border-radius:6px;padding:10px 14px;margin-top:10px;font-size:13px;font-family:'Jost',sans-serif;color:#7a4010;line-height:1.6}
        .tip-box{background:linear-gradient(135deg,#f0f8f0,#e0f2e0);border:1px solid #90c890;border-radius:6px;padding:10px 14px;margin-top:10px;font-size:13px;font-family:'Jost',sans-serif;color:#2a5a2a;line-height:1.6}
        .expand-card{background:white;border-radius:10px;padding:16px 18px;margin-bottom:11px;border:1.5px solid rgba(42,31,20,0.1);cursor:pointer;transition:all 0.2s;box-shadow:0 2px 6px rgba(42,31,20,0.06)}
        .expand-card:hover{border-color:rgba(42,31,20,0.25);box-shadow:0 4px 14px rgba(42,31,20,0.1)}
        .badge{display:inline-block;padding:2px 9px;border-radius:3px;font-size:10px;letter-spacing:1px;font-weight:600;font-family:'Jost',sans-serif;text-transform:uppercase}
        .grid2{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
        .book-btn{display:inline-block;padding:5px 12px;border-radius:4px;font-size:10px;font-family:'Jost',sans-serif;font-weight:600;letter-spacing:1px;text-transform:uppercase;text-decoration:none;margin:2px;cursor:pointer;border:none}
        .price-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(42,31,20,0.06)}
        .price-row:last-child{border-bottom:none}
        .hours-row{display:flex;gap:8px;padding:6px 0;border-bottom:1px solid rgba(42,31,20,0.06);align-items:flex-start}
        .hours-row:last-child{border-bottom:none}
        .source-chip{display:inline-block;background:rgba(200,119,58,0.12);color:#C8773A;padding:2px 8px;border-radius:3px;font-size:10px;letter-spacing:1px;font-family:'Jost',sans-serif;font-weight:600;text-transform:uppercase;margin:2px}
      `}</style>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg,#1a3a2a 0%,#2c5a40 45%,#C8773A 100%)", padding: "44px 22px 34px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "55px 55px" }} />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "#C8773A", color: "white", padding: "3px 14px", borderRadius: 2, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", fontFamily: "'Jost',sans-serif", fontWeight: 600 }}>Family Travel Guide · Family of 4</div>
          <h1 className="cg" style={{ fontSize: 44, fontWeight: 600, color: "#fff", marginTop: 10, lineHeight: 1.1 }}>Kuala Lumpur<br /><span style={{ color: "#f5c87a", fontStyle: "italic" }}>Journey in the Wild 🐾</span></h1>
          <p className="jost" style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 8, letterSpacing: 1 }}>31 MAY – 3 JUNE 2026 · BUKIT BINTANG, KUALA LUMPUR · FAMILY OF 4</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            {[{ icon: "✈️", label: "Depart", val: "9:00am · 31 May" }, { icon: "🐾", label: "Suite", val: "Journey in the Wild" }, { icon: "📍", label: "Base", val: "Bukit Bintang, KL" }, { icon: "🚗", label: "Transfers", val: "Private both ways ✅" }, { icon: "👑", label: "Jun 1", val: "PUBLIC HOLIDAY" }, { icon: "✈️", label: "Return", val: "5:00pm · 3 Jun" }].map(item => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: 8, padding: "7px 13px", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="jost" style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, letterSpacing: 2, textTransform: "uppercase" }}>{item.label}</div>
                <div style={{ color: "white", fontSize: 12, fontFamily: "'Jost',sans-serif", fontWeight: 500, marginTop: 2 }}>{item.icon} {item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALERT BAR */}
      <div style={{ background: "#7a3b10", padding: "10px 22px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p className="jost" style={{ color: "#ffe0b0", fontSize: 11.5 }}>⚠️ Confirm departure airport before travel — depart from <strong>Subang (SZB)</strong>, not KLIA &nbsp;·&nbsp; <strong>Aquaria KLCC closed until March 2027 ❌</strong> &nbsp;·&nbsp; <strong>June 1 = Public Holiday 👑</strong> — Petrosains OPEN today! &nbsp;·&nbsp; Private transfers booked both ways ✅</p>
        </div>
      </div>

      {/* STICKY NAV */}
      <div style={{ background: "rgba(253,248,240,0.97)", borderBottom: "1px solid rgba(42,31,20,0.12)", padding: "10px 22px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
          {navItems.map(t => <button key={t.id} className={`nav-tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 18px 48px" }}>

        {/* SOURCES */}
        <div style={{ marginBottom: 20, padding: "10px 14px", background: "rgba(200,119,58,0.07)", borderRadius: 8, border: "1px solid rgba(200,119,58,0.18)" }}>
          <p className="jost" style={{ fontSize: 9, color: "#8a6040", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5 }}>Verified May 2026 — official sites + Klook, Headout, Traveloka, TripAdvisor, AccuWeather, KL With Kids, Mama's Guide to Malaysia</p>
          {["Official Sites", "AccuWeather", "Klook", "Headout", "Traveloka", "TripAdvisor", "KL With Kids", "Mama's Guide", "Little Steps Asia", "KL Foodie"].map(s => <span key={s} className="source-chip">{s}</span>)}
        </div>

        {/* ══ WEATHER TAB ══ */}
        {activeTab === "weather" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Weather Forecast & Backup Plans 🌦️</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Source: AccuWeather monthly forecast + historical climate data (University of East Anglia / Met Office)</p>

            {/* Overview card */}
            <div style={{ background: "linear-gradient(135deg,#1a3a5a,#1a4a6e)", borderRadius: 12, padding: 22, color: "white", marginBottom: 24 }}>
              <h3 className="cg" style={{ fontSize: 22, color: "#f5c87a", marginBottom: 14 }}>Late May / Early June KL Climate Overview</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12, marginBottom: 16 }}>
                {[
                  { icon: "🌡️", label: "Daily High", val: "31–32°C (88–90°F)" },
                  { icon: "🌙", label: "Overnight Low", val: "22–23°C (72–73°F)" },
                  { icon: "💧", label: "Humidity", val: "85–89%" },
                  { icon: "☀️", label: "Sun Hours", val: "7–8 hrs/day" },
                  { icon: "🌧️", label: "Rain Days in June", val: "~12 days (less than May)" },
                  { icon: "⛈️", label: "Rain Pattern", val: "Short afternoon storms (3–5pm)" },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                    <div className="jost" style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                    <div style={{ color: "white", fontSize: 14, fontFamily: "'Jost',sans-serif", fontWeight: 600, marginTop: 3 }}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className="jost" style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, padding: "12px 14px", background: "rgba(255,255,255,0.08)", borderRadius: 8 }}>
                <strong style={{ color: "#f5c87a" }}>Good news:</strong> June is one of KL's drier months — significantly less rain than April and May. Most rain falls as short, intense afternoon or evening thunderstorms (typically 30–60 minutes), then clears. Morning hours (7am–1pm) are usually sunny and dry. This is peak school holiday season — plan outdoor activities for mornings and indoor activities for afternoons.
              </div>
            </div>

            {/* Day-by-day forecast */}
            <h3 className="cg" style={{ fontSize: 22, fontWeight: 600, marginBottom: 14 }}>Your Day-by-Day Forecast</h3>
            {weatherDays.map((w, i) => (
              <div key={i} style={{ background: "white", borderRadius: 10, padding: "16px 18px", marginBottom: 12, border: "1.5px solid rgba(42,31,20,0.1)", boxShadow: "0 2px 6px rgba(42,31,20,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div className="jost" style={{ fontSize: 10, color: "#8a6040", letterSpacing: 2, textTransform: "uppercase" }}>{w.label}</div>
                    <div className="cg" style={{ fontSize: 20, fontWeight: 600, marginTop: 2 }}>{w.date} {w.emoji}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: "#C8773A" }}>{w.high}°C</div>
                    <div className="jost" style={{ fontSize: 11, color: "#8a6040" }}>Low {w.low}°C · {w.feel}</div>
                    <span className="badge" style={{ marginTop: 4, display: "inline-block", background: w.rain === "Low" ? "rgba(46,125,85,0.15)" : w.rain === "Medium" ? "rgba(230,126,34,0.15)" : "rgba(192,57,43,0.15)", color: w.rain === "Low" ? "#2E7D55" : w.rain === "Medium" ? "#e67e22" : "#c0392b" }}>Rain risk: {w.rain}</span>
                  </div>
                </div>
                {w.alert && <div className="alert-box" style={{ marginTop: 10 }}>{w.alert}</div>}
                <div className="tip-box" style={{ marginTop: 10 }}>{w.tip}</div>
              </div>
            ))}

            {/* What to pack */}
            <div style={{ background: "linear-gradient(135deg,#2e4020,#3a5a28)", borderRadius: 10, padding: 20, color: "white", marginBottom: 24 }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 12 }}>🎒 What to Pack for the Weather</h3>
              {[
                "👕 Light, breathable cotton or moisture-wicking fabrics (pack at least 2 changes per person per day)",
                "☀️ SPF 50 sunscreen — apply daily, reapply after the wading pool (buy extra at Watsons)",
                "🧢 Hats and sunglasses for outdoor mornings (Batu Caves especially)",
                "☂️ Packable umbrella or light rain jacket for afternoon showers",
                "👙 Swimwear for EVERY day — hotel pool + KLCC wading pool",
                "👟 Comfortable closed-toe walking shoes (for Batu Caves stair climb especially)",
                "🩴 Easy slip-on sandals for malls and indoor activities",
                "💊 Paracetamol for kids — heat can cause headaches (buy at Watsons)",
              ].map((t, i) => <div key={i} className="jost" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: 7, lineHeight: 1.6 }}>{t}</div>)}
            </div>

            {/* Wet weather backup plans */}
            <h3 className="cg" style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>🌧️ Wet Weather Backup Plans</h3>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 16 }}>Especially important for Day 2 (Monday). All backups are fully indoor. Tap to expand.</p>
            {wetWeatherBackups.map((b, i) => (
              <div key={i} className="expand-card" onClick={() => setExpandedBackup(expandedBackup === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 26 }}>{b.icon}</span>
                    <div>
                      <div className="cg" style={{ fontSize: 18, fontWeight: 600, color: "#1A4A6E" }}>{b.day}</div>
                      <div className="jost" style={{ fontSize: 12, color: "#8a6040", marginTop: 2 }}>{b.primary}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: "#1A4A6E", fontFamily: "'Jost',sans-serif", flexShrink: 0 }}>{expandedBackup === i ? "−" : "+"}</span>
                </div>
                {expandedBackup === i && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(26,74,110,0.15)" }}>
                    {b.options.map((opt, j) => (
                      <div key={j} style={{ background: "rgba(26,74,110,0.05)", borderRadius: 8, padding: "12px 14px", marginBottom: 10, borderLeft: "3px solid #1A4A6E" }}>
                        <div className="cg" style={{ fontSize: 16, fontWeight: 600, color: "#1A4A6E" }}>{opt.name}</div>
                        <div className="jost" style={{ fontSize: 13, color: "#4a3828", marginTop: 4, lineHeight: 1.6 }}>{opt.desc}</div>
                        {opt.book && <div className="jost" style={{ fontSize: 11, color: "#C8773A", marginTop: 5 }}>📲 Book: {opt.book}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══ PRICES TAB ══ */}
        {activeTab === "prices" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Prices, Hours & Booking Links 🎟️</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Cross-verified from official sites, Klook, Headout, Traveloka, TripAdvisor. Prices in RM. Tap any attraction to expand — booking links included.</p>

            {attractions.map((att, i) => (
              <div key={i} className="expand-card" onClick={() => setExpandedAtt(expandedAtt === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{att.emoji}</span>
                    <div>
                      <div className="cg" style={{ fontSize: 19, fontWeight: 600, color: att.color }}>{att.name}</div>
                      <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 3, fontSize: 9, letterSpacing: 1.5, fontWeight: 700, fontFamily: "'Jost',sans-serif", textTransform: "uppercase", background: att.urgencyColor, color: "white", marginTop: 4 }}>{att.urgency}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: att.color, fontFamily: "'Jost',sans-serif", flexShrink: 0 }}>{expandedAtt === i ? "−" : "+"}</span>
                </div>

                {expandedAtt === i && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: `2px solid ${att.color}20` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 16 }}>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>🕐 Hours</div>
                        {att.hours.map((h, j) => (
                          <div key={j} className="hours-row">
                            <div className="jost" style={{ fontSize: 11.5, color: "#8a6040", minWidth: 130, flexShrink: 0 }}>{h.day}</div>
                            <div className="jost" style={{ fontSize: 12, color: "#2a1f14", fontWeight: h.time.includes("✅") ? "600" : "400" }}>{h.time}</div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>💰 Prices</div>
                        {att.prices.map((p, j) => (
                          <div key={j} className="price-row">
                            <div className="jost" style={{ fontSize: 12.5, color: "#4a3828" }}>{p.cat}</div>
                            <div style={{ textAlign: "right" }}>
                              <div className="jost" style={{ fontSize: 14, fontWeight: 600, color: att.color }}>{p.price}</div>
                              {p.note && <div className="jost" style={{ fontSize: 10, color: "#8a6040" }}>{p.note}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booking buttons */}
                    <div style={{ background: `${att.color}10`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                      <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>🔗 Book Here</div>
                      {att.booking.official && (
                        <a href={att.booking.official} target="_blank" rel="noopener noreferrer" className="book-btn" style={{ background: att.color, color: "white" }}>🌐 Official Site</a>
                      )}
                      {att.booking.klook && (
                        <a href={att.booking.klook} target="_blank" rel="noopener noreferrer" className="book-btn" style={{ background: "#e74c3c", color: "white" }}>Klook</a>
                      )}
                      {att.booking.headout && (
                        <a href={att.booking.headout} target="_blank" rel="noopener noreferrer" className="book-btn" style={{ background: "#e67e22", color: "white" }}>Headout</a>
                      )}
                      {att.booking.combo && (
                        <a href={att.booking.combo} target="_blank" rel="noopener noreferrer" className="book-btn" style={{ background: "#2E7D55", color: "white" }}>🎁 Combo Deal</a>
                      )}
                      {att.booking.note && <div className="jost" style={{ fontSize: 12, color: att.color, marginTop: 6 }}>{att.booking.note}</div>}
                    </div>

                    {/* Tips */}
                    <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8 }}>💡 Tips</div>
                    {att.tips.map((t, j) => <div key={j} className="jost" style={{ fontSize: 13, color: "#4a3828", marginBottom: 6, lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${att.color}40` }}>{t}</div>)}

                    {/* Reviews */}
                    <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: att.color, fontWeight: 700, marginBottom: 8, marginTop: 14 }}>⭐ Reviews (2025–2026)</div>
                    {att.reviews.map((r, j) => (
                      <div key={j} style={{ background: "rgba(255,255,255,0.8)", borderRadius: 6, padding: "8px 12px", marginBottom: 6, borderLeft: `3px solid ${att.color}60` }}>
                        <div className="jost" style={{ fontSize: 12.5, color: "#4a3828", fontStyle: "italic", lineHeight: 1.6 }}>{r}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Booking checklist */}
            <div style={{ marginTop: 24, background: "linear-gradient(135deg,#1a2a3a,#2a4050)", borderRadius: 12, padding: 22, color: "white" }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 14 }}>📋 Booking Checklist — Do This Now</h3>
              {[
                { item: "Petronas Twin Towers (Tue 2 Jun)", action: "eticket.petronastwintowers.com.my", urgency: "CRITICAL", link: BOOKING.petronas.official },
                { item: "Petrosains + Towers Combo (Tue 2 Jun)", action: "headout.com — combo ticket saves money + skip queue", urgency: "URGENT", link: BOOKING.petrosains.combo },
                { item: "SuperPark Malaysia (Mon 1 Jun PM)", action: "klook.com — saves ~RM10 vs walk-in", urgency: "RECOMMENDED", link: BOOKING.superpark.klook },
                { item: "Berjaya Times Square Theme Park (Sun 31 May)", action: "berjayatimessquarethemeparkkl.com or Klook/Traveloka", urgency: "OPTIONAL", link: BOOKING.berjaya.official },
                { item: "KL Bird Park (Mon 1 Jun AM)", action: "klook.com — small saving, skip ticket queue", urgency: "OPTIONAL", link: BOOKING.birdpark.klook },
                { item: "Batu Caves (Mon 1 Jun AM)", action: "No booking needed — FREE entry", urgency: "NO ACTION", link: null },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 3, fontSize: 9, letterSpacing: 1, fontWeight: 700, fontFamily: "'Jost',sans-serif", textTransform: "uppercase", background: b.urgency === "CRITICAL" ? "#c0392b" : b.urgency === "URGENT" ? "#e67e22" : b.urgency === "RECOMMENDED" ? "#2e7d55" : "#1a4a6e", color: "white", flexShrink: 0, marginTop: 3 }}>{b.urgency}</span>
                  <div>
                    <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: "#f5c87a" }}>{b.item}</div>
                    <div className="jost" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{b.action}</div>
                    {b.link && <a href={b.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 4, padding: "2px 10px", borderRadius: 3, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 10, fontFamily: "'Jost',sans-serif", textDecoration: "none" }}>Open Booking Link →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ITINERARY TAB ══ */}
        {activeTab === "itinerary" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 6 }}>Day-by-Day Itinerary</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 18 }}>Private transfers pre-booked. June 1 = Public Holiday — Petrosains open! See Weather tab for backup plans.</p>
            <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
              {days.map((d, i) => <button key={i} className={`day-tab ${activeDay === i ? "active" : ""}`} style={activeDay === i ? { background: d.color, borderColor: d.color } : {}} onClick={() => setActiveDay(i)}>{d.emoji} {d.label}<div style={{ fontSize: 9.5, opacity: 0.75, marginTop: 1 }}>{d.date}</div></button>)}
            </div>
            {days.map((day, di) => di === activeDay && (
              <div key={di} style={{ "--day-color": day.color }}>
                <div style={{ marginBottom: 14 }}>
                  <span className="jost" style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: day.color, fontWeight: 700 }}>{day.date}</span>
                  <h3 className="cg" style={{ fontSize: 24, fontWeight: 600, marginTop: 3 }}>{day.theme}</h3>
                </div>
                {day.slots.map((slot, si) => (
                  <div key={si} className="slot-card">
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ minWidth: 46, textAlign: "right" }}><span className="jost" style={{ fontSize: 11, color: day.color, fontWeight: 600 }}>{slot.time}</span></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 5 }}>
                          <span className="slot-tag">{slot.tag}</span>
                          <span className="cg" style={{ fontSize: 16, fontWeight: 600 }}>{slot.title}</span>
                        </div>
                        <p className="jost" style={{ fontSize: 13, lineHeight: 1.65, color: "#4a3828" }}>{slot.desc}</p>
                        {slot.alert && <div className="alert-box">{slot.alert}</div>}
                        {slot.tip && <div className="tip-box">{slot.tip}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ══ HOTEL TAB ══ */}
        {activeTab === "hotel" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Your Hotel — Bukit Bintang Suite</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Signature Family Suite: Journey in the Wild 🐾</p>
            <div style={{ background: "linear-gradient(135deg,#1a3a2a,#2e6040)", borderRadius: 12, padding: 24, color: "white", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <span style={{ fontSize: 44 }}>🐾</span>
                <div>
                  <div className="jost" style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.55)", textTransform: "uppercase" }}>Signature Family Suite — Your Booking ✅</div>
                  <div className="cg" style={{ fontSize: 26, fontWeight: 600, color: "#f5c87a" }}>Journey in the Wild</div>
                </div>
              </div>
              <p className="jost" style={{ fontSize: 13.5, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", marginBottom: 16 }}>Animal-kingdom themed suite: bunk beds, dedicated play area, city views, kids' bath amenities, welcome puzzle activity for the whole family on arrival. Eco-friendly: filtered water tap, biodegradable packaging.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["🛏️ Bunk beds for the kids", "🎮 Dedicated in-room play area", "🌿 Animal-themed jungle décor", "🧩 Welcome puzzle activity", "🛁 Kids' bath amenities", "🌇 City views", "💧 Filtered water tap", "🌺 Hotel spa — family suite guests get discounted rate"].map(f => <div key={f} className="jost" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>{f}</div>)}
              </div>
            </div>
            <div className="grid2" style={{ marginBottom: 20 }}>
              {[{ theme: "Journey in the Wild 🐾", color: "#2e6040", note: "YOUR BOOKING ✅ — jungle, animals, adventure.", active: true }, { theme: "Sky Wanderer ☁️", color: "#1a4a6e", note: "Clouds, balloons, sky palette.", active: false }, { theme: "Enchanted Sweets 🍬", color: "#8a3060", note: "Candy-coloured sweet shop fantasy.", active: false }, { theme: "Choo Choo Train 🚂", color: "#6a4010", note: "Train station adventure, bunk carriages.", active: false }].map(t => (
                <div key={t.theme} style={{ background: t.active ? `linear-gradient(135deg,${t.color},${t.color}cc)` : "white", borderRadius: 8, padding: "13px 15px", border: t.active ? "none" : `1.5px solid ${t.color}30` }}>
                  <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: t.active ? "white" : t.color }}>{t.theme}</div>
                  {t.active && <div className="jost" style={{ fontSize: 8, letterSpacing: 2, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginTop: 2 }}>YOUR SUITE ✅</div>}
                  <div className="jost" style={{ fontSize: 12, color: t.active ? "rgba(255,255,255,0.8)" : "#6b5040", marginTop: 5, lineHeight: 1.5 }}>{t.note}</div>
                </div>
              ))}
            </div>
            <div className="grid2">
              {[{ icon: "🌿", title: "Biophilic Design", body: "13,000 sq ft of vertical gardens — a natural oasis in Bukit Bintang." }, { icon: "🏊", title: "Saltwater Pool", body: "Resort-like pool with cabanas and city views. Great family afternoon." }, { icon: "🍽️", title: "All-Day Restaurant", body: "All-day dining — Malaysian + international options. Wide breakfast buffet." }, { icon: "📍", title: "Location", body: "5-min walk to Pavilion, Berjaya Times Square & Jalan Alor." }, { icon: "🚇", title: "Transport", body: "Bukit Bintang MRT nearby. Air-con walkway to KLCC (1.17km)." }, { icon: "⚠️", title: "Heads-Up Tip", body: "Call ahead: confirm iron, hair dryer & shaver in room. Request front-facing rooms to avoid construction noise." }].map(h => (
                <div key={h.title} style={{ background: "white", borderRadius: 8, padding: "13px 15px", border: "1.5px solid rgba(200,119,58,0.15)" }}>
                  <div style={{ fontSize: 20, marginBottom: 5 }}>{h.icon}</div>
                  <div className="cg" style={{ fontSize: 15, fontWeight: 600 }}>{h.title}</div>
                  <div className="jost" style={{ fontSize: 12.5, color: "#6b5040", marginTop: 4, lineHeight: 1.5 }}>{h.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ SHOPPING TAB ══ */}
        {activeTab === "shopping" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Full Shopping Guide 🛍️</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 8 }}>8 malls covered — from walkable to Grab. Includes Watsons, toy stores and sale alerts.</p>
            <div className="alert-box" style={{ marginBottom: 18 }}>
              🛍️ <strong>Sale Alert:</strong> Isetan School Holiday Sale runs until 7 Jun 2026 at KLCC and The Gardens — kids' clothing and baby deals. Malaysia Mega Sale (nationwide) starts 15 Jun 2026 — just after your trip, but some malls start early.
            </div>

            {shoppingGuide.map((s, i) => (
              <div key={i} className="expand-card" onClick={() => setExpandedShop(expandedShop === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{s.icon}</span>
                    <div>
                      <div className="cg" style={{ fontSize: 18, fontWeight: 600, color: s.color }}>{s.name} {s.isNew ? <span style={{ background: "#c0392b", color: "white", fontSize: 9, padding: "2px 7px", borderRadius: 3, fontFamily: "'Jost',sans-serif", fontWeight: 700, letterSpacing: 1, marginLeft: 6, textTransform: "uppercase" }}>NEW</span> : null}</div>
                      <div className="jost" style={{ fontSize: 11, color: "#8a6040", marginTop: 1 }}>📍 {s.walk} · 🕐 {s.hours}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: s.color, fontFamily: "'Jost',sans-serif", flexShrink: 0 }}>{expandedShop === i ? "−" : "+"}</span>
                </div>
                {expandedShop !== i && <div className="jost" style={{ fontSize: 12.5, color: "#6b5040", marginTop: 8 }}>Best for: <strong>{s.bestFor}</strong></div>}
                {expandedShop === i && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `2px solid ${s.color}25` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: s.color, fontWeight: 700, marginBottom: 8 }}>✨ Highlights</div>
                        {s.highlights.map((h, j) => <div key={j} className="jost" style={{ fontSize: 12.5, color: "#4a3828", marginBottom: 5, lineHeight: 1.5 }}>• {h}</div>)}
                      </div>
                      <div>
                        <div className="jost" style={{ fontSize: 9.5, letterSpacing: 2, textTransform: "uppercase", color: s.color, fontWeight: 700, marginBottom: 8 }}>🎯 Best For</div>
                        <div className="jost" style={{ fontSize: 13, color: "#4a3828", lineHeight: 1.6 }}>{s.bestFor}</div>
                        {s.tip && <div className="tip-box" style={{ marginTop: 10 }}>💡 {s.tip}</div>}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Watsons directory */}
            <div style={{ marginTop: 24 }}>
              <h3 className="cg" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>💊 Watsons Directory</h3>
              <div className="grid2">
                {[
                  { loc: "Fahrenheit 88 ⭐", floor: "Ground — on KLCC walkway!", note: "MOST CONVENIENT — on your daily walk. Sunscreen, meds, snacks on the go" },
                  { loc: "Pavilion KL", floor: "Ground & Level 2", note: "Fully stocked: Biore UV SPF 50, Safi kids' sunscreen, Panadol, travel essentials" },
                  { loc: "Berjaya Times Square", floor: "Level 1 (large format)", note: "Bulk buys — plasters, Mopiko, household, hydration sachets" },
                  { loc: "Suria KLCC", floor: "Level 2", note: "After Petrosains/Towers visit. Travel-size products, kids' snacks" },
                  { loc: "LaLaport BBCC", floor: "Ground Floor", note: "Newer, well-stocked outlet" },
                ].map((w, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 8, padding: "13px 15px", border: "1.5px solid rgba(200,119,58,0.2)" }}>
                    <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: "#C8773A" }}>{w.loc}</div>
                    <div className="jost" style={{ fontSize: 11, color: "#8a6040", marginTop: 2 }}>📍 {w.floor}</div>
                    <div className="jost" style={{ fontSize: 12, color: "#4a3828", marginTop: 5, lineHeight: 1.5 }}>{w.note}</div>
                  </div>
                ))}
              </div>
              <div className="tip-box" style={{ marginTop: 12 }}>💡 <strong>Best Watsons buys:</strong> Biore UV SPF 50 (cheap!), Safi kids' sunscreen, Mopiko itch relief, Seagull hydration sachets, kids' Panadol syrup, insect repellent patches. Snacks to bring home: Milo sachets, Mamee Monster noodles, Hup Seng cream crackers.</div>
            </div>

            {/* Toy stores */}
            <div style={{ marginTop: 24, background: "linear-gradient(135deg,#1a3a2a,#2e6040)", borderRadius: 10, padding: 20, color: "white" }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 12 }}>🧸 Toy Store Directory</h3>
              {[{ store: "Toys R Us", malls: "Pavilion KL L5–6, Berjaya Times Square L2, Mid Valley", note: "Widest range. LEGO, Barbie, Hot Wheels, board games. Free gift-wrapping. Kiztopia play inside Pavilion outlet." }, { store: "LEGO Store", malls: "Pavilion KL (Level 5)", note: "Full flagship. Pick-a-brick wall. Often 10–20% cheaper than Singapore/Australia." }, { store: "Toy World", malls: "Berjaya Times Square L2, LaLaport BBCC L2", note: "Budget pick — affordable local and imported toys. Best for pocket-money buys." }, { store: "Tokyo Street", malls: "Pavilion KL Level 6", note: "Japanese-themed floor: kawaii stationery, novelty toys, character goods. Kids adore it." }, { store: "Don Don Donki", malls: "LaLaport BBCC", note: "Japanese discount store: character plush, anime goods, snacks. Kids' section highlight." }, { store: "Kiztopia", malls: "Inside Toys R Us, Pavilion KL L5–6", note: "Singapore playground brand (opened KL 2024). Play + shop combo. 30-45 min sessions. Best ages 1–8." },
              { store: "MR.TOY 💰", malls: "Berjaya Times Square L2, LaLaport BBCC, most major malls", note: "Malaysia's home-grown certified toy chain (by MR DIY Group). RM5–30 range — action figures, vehicles, arts and crafts, balls, dolls. Safe quality at very budget prices. Great for topping up the toy bag without breaking the bank." },
              { store: "Daiso 💰", malls: "Pavilion KL Level 6 (Tokyo Street area), Suria KLCC, most malls", note: "Japanese RM6 everything store. Excellent for: craft kits, clay, slime, sticker sets, small figurines, fidget toys, stationery. Kids can pick 3–4 items for under RM25 — perfect pocket money spend." }].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div>
                    <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: "#f5c87a" }}>{t.store}</div>
                    <div className="jost" style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>📍 {t.malls}</div>
                    <div className="jost" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.5 }}>{t.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Food to bring home */}
            <div style={{ marginTop: 24, background: "linear-gradient(135deg,#3a2010,#5a3010)", borderRadius: 10, padding: 20, color: "white" }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 12 }}>🛒 Food to Bring Home — Where to Buy</h3>
              {[
                { store: "Watsons (every mall)", note: "Milo 3-in-1 sachets, Mamee Monster noodle snacks, Hup Seng cream crackers, Khong Guan biscuits. Buy in bulk — much cheaper than airport shops." },
                { store: "Cold Storage — Pavilion KL", note: "Brahim's ready-to-eat Malaysian curries & nasi lemak (great to bring home), kaya (coconut jam), pandan paste, ABC rose syrup, local curry paste packets. Halal-certified range available." },
                { store: "Isetan Food Hall — Suria KLCC", note: "School holiday sale until 7 Jun! Premium Japanese snacks, local condiments, kuih mixes, Pocky varieties, Japanese seaweed crackers." },
                { store: "Don Don Donki — LaLaport BBCC", note: "Japanese candy, Meiji chocolates, instant ramen, chips, Pocky, Hi-Chew. Kids can pick their own Japanese snack haul." },
                { store: "Pavilion Tokyo Street (L6)", note: "Japanese confectionery, Matcha KitKats, unique flavour snacks to bring home as gifts." },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div>
                    <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: "#f5c87a" }}>{f.store}</div>
                    <div className="jost" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.5 }}>{f.note}</div>
                  </div>
                </div>
              ))}
              <div className="jost" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>💡 Tip: pack a foldable tote bag in your luggage — you WILL need extra space on the way home.</div>
            </div>

            {/* Backup malls */}
            <div style={{ marginTop: 20, background: "linear-gradient(135deg,#1a2040,#2a3060)", borderRadius: 10, padding: 20, color: "white" }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 12 }}>🏬 Backup Malls — Adults Shop + Kids Play</h3>
              {[
                { mall: "Mid Valley Megamall", grab: "15–20 min Grab (~RM15)", note: "KL's biggest Toys R Us for the full toy range. Fashion Valley for adult shopping (H&M, Uniqlo, Zara, Padini). Beauty in the Pot restaurant with an in-view kids' play corner. Gardens Mall next door adds even more options." },
                { mall: "LaLaport BBCC", grab: "10-min walk / 5-min Grab (free or ~RM5)", note: "Less crowded than Pavilion. Don Don Donki, Toy World, Watsons, decent food court. Good half-day option when Bukit Bintang feels busy. 10-min walk from hotel." },
                { mall: "The Exchange TRX 🆕", grab: "15-min Grab (~RM10)", note: "Free rooftop TRX City Park — kids can run free, great views. Malaysia's only Apple Store. Upscale adult boutiques and restaurants. Best 'wow factor' mall for adults after Pavilion." },
                { mall: "KidZania KL", grab: "~20 min Grab (Mid Valley area)", note: "Full roleplay city for ages 3–15. Kids become chefs, doctors, pilots, firefighters. 3+ hours of engagement — a full alternative day if SuperPark is fully booked. Book in advance on Klook." },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <div>
                    <div className="cg" style={{ fontSize: 15, fontWeight: 600, color: "#f5c87a" }}>{m.mall}</div>
                    <div className="jost" style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>🚗 {m.grab}</div>
                    <div className="jost" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.5 }}>{m.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ DINING TAB ══ */}
        {activeTab === "dining" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Kids-Friendly Dining 🍜</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Validated by Mama's Guide to Malaysia, Little Steps Asia and KL Foodie. All kid-tested.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {kidsDining.map((r, i) => (
                <div key={i} style={{ background: "white", borderRadius: 10, padding: "15px 18px", border: "1.5px solid rgba(42,31,20,0.1)", boxShadow: "0 2px 6px rgba(42,31,20,0.05)" }}>
                  <div className="cg" style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{r.name}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 7 }}>
                    <span className="badge" style={{ background: "rgba(200,119,58,0.12)", color: "#C8773A" }}>📍 {r.where}</span>
                    <span className="badge" style={{ background: "rgba(26,74,110,0.1)", color: "#1A4A6E" }}>🍽️ {r.type}</span>
                    <span className="badge" style={{ background: "rgba(46,125,85,0.12)", color: "#2E7D55" }}>👧 {r.age}</span>
                  </div>
                  <p className="jost" style={{ fontSize: 13, color: "#4a3828", lineHeight: 1.65 }}>{r.why}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, background: "linear-gradient(135deg,#1a2a3a,#2a4050)", borderRadius: 12, padding: 20, color: "white" }}>
              <h3 className="cg" style={{ fontSize: 20, color: "#f5c87a", marginBottom: 12 }}>Must-Try Dishes 🍜</h3>
              <div className="grid2">
                {[{ dish: "Xiao Long Bao", where: "Din Tai Fung", note: "Zero spice, universally loved" }, { dish: "Nasi Lemak", where: "Grandmama's / Hotel", note: "KL's national dish — sambal on side" }, { dish: "Char Kway Teow", where: "Jalan Alor stall 59B", note: "Smoky flat noodles — kids love it" }, { dish: "Satay (chicken)", where: "Jalan Alor + courts", note: "Grilled skewers — great finger food" }, { dish: "Roti Canai", where: "PappaRich (all malls)", note: "Flaky flatbread + mild curry dip" }, { dish: "Cendol", where: "Lot 10 Hutong", note: "Shaved ice, green jelly, coconut milk" }, { dish: "Fresh Coconut Water", where: "Jalan Alor stalls", note: "Best tropical drink for hot kids 🥥" }, { dish: "Mango Sticky Rice", where: "Jalan Alor Thai stalls", note: "Sweet coconut rice — kids beg for seconds" }].map((f, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 13px" }}>
                    <div className="cg" style={{ fontSize: 14, fontWeight: 600, color: "#f5c87a" }}>{f.dish}</div>
                    <div className="jost" style={{ fontSize: 10.5, color: "#a0d0e0", marginTop: 2 }}>{f.where}</div>
                    <div className="jost" style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)", marginTop: 4, lineHeight: 1.5 }}>{f.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ TIPS TAB ══ */}
        {activeTab === "tips" && (
          <div>
            <h2 className="cg" style={{ fontSize: 30, fontWeight: 600, marginBottom: 4 }}>Family Travel Tips 💡</h2>
            <p className="jost" style={{ fontSize: 13, color: "#6b5040", marginBottom: 20 }}>Tap any card to expand.</p>
            <div className="grid2">
              {tips.map((tip, i) => (
                <div key={i} className="expand-card" onClick={() => setExpandedTip(expandedTip === i ? null : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ fontSize: 22 }}>{tip.icon}</span>
                      <span className="cg" style={{ fontSize: 17, fontWeight: 600 }}>{tip.title}</span>
                    </div>
                    <span style={{ color: "#C8773A", fontSize: 18, fontFamily: "'Jost',sans-serif" }}>{expandedTip === i ? "−" : "+"}</span>
                  </div>
                  {expandedTip === i && <p className="jost" style={{ fontSize: 13, color: "#4a3828", lineHeight: 1.65, marginTop: 11, paddingTop: 11, borderTop: "1px solid #f0e0d0" }}>{tip.body}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 44, textAlign: "center", paddingBottom: 12, borderTop: "1px solid rgba(200,119,58,0.2)", paddingTop: 26 }}>
          <p className="cg" style={{ fontSize: 20, fontStyle: "italic", color: "#C8773A" }}>"Into the wild — and back before bedtime. 🐾"</p>
          <p className="jost" style={{ fontSize: 9, color: "#a08060", marginTop: 10, letterSpacing: 2 }}>CURATED MAY 2026 · OFFICIAL SITES · ACCUWEATHER · KLOOK · HEADOUT · TRAVELOKA · TRIPADVISOR · MAMA'S GUIDE · LITTLE STEPS ASIA · KL WITH KIDS</p>
        </div>
      </div>
    </div>
  );
}
