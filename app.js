// Demo content. All reservations stay in this browser; no payments are collected.
const trips = [
  {
    "id": "coxs-bazar",
    "name": "Cox's Bazar Beach Escape",
    "country": "Cox's Bazar",
    "region": "Chattogram",
    "days": 3,
    "nights": 2,
    "price": 8500,
    "rating": 4.8,
    "image": "assets/coxs-bazar.jpg",
    "description": "Enjoy sea breezes, beach walks, and coastal scenery on a relaxed Bangladesh getaway.",
    "stops": [
      "Arrive from Dhaka & beach sunset",
      "Himchari and Inani coastal excursion",
      "Free morning & return to Dhaka"
    ]
  },
  {
    "id": "sajek",
    "name": "Sajek Valley Cloud Retreat",
    "country": "Sajek Valley",
    "region": "Chattogram",
    "days": 3,
    "nights": 2,
    "price": 7500,
    "rating": 4.9,
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sajek_Valley%2C_Bangladesh.jpg",
    "description": "Wake up above green hills and drifting clouds, with time to enjoy the peaceful scenery of Sajek.",
    "stops": [
      "Dhaka to Khagrachhari & transfer to Sajek",
      "Sunrise views & Konglak hill walk",
      "Breakfast & return journey"
    ]
  },
  {
    "id": "sundarbans",
    "name": "Sundarbans River Adventure",
    "country": "Sundarbans",
    "region": "Khulna",
    "days": 3,
    "nights": 2,
    "price": 12500,
    "rating": 4.8,
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Entry_of_Sundarban_Forest_%2CBangladesh.jpg",
    "description": "Explore the Bangladesh mangroves on a guided boat journey from Mongla, with forest scenery and quiet waterways.",
    "stops": [
      "Meet in Mongla & board the boat",
      "Guided forest visit & river cruising",
      "Morning birdwatching & return to Mongla"
    ]
  },
  {
    "id": "sreemangal",
    "name": "Sreemangal Tea Garden Escape",
    "country": "Sreemangal",
    "region": "Sylhet",
    "days": 2,
    "nights": 1,
    "price": 5500,
    "rating": 4.7,
    "image": "assets/sreemangal.jpg",
    "description": "Slow down among green tea gardens, enjoy local tea, and discover the landscapes around Sreemangal.",
    "stops": [
      "Dhaka to Sreemangal & tea garden visit",
      "Lawachara nature walk & return to Dhaka"
    ]
  },
  {
    "id": "sylhet",
    "name": "Sylhet Water & Wilderness",
    "country": "Sylhet",
    "region": "Sylhet",
    "days": 3,
    "nights": 2,
    "price": 9500,
    "rating": 4.8,
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/48/Ratargul_Swamp_Forest.jpg",
    "description": "Discover Sylhet through riverside views and the greenery of Ratargul, with time to explore local food and culture.",
    "stops": [
      "Arrive in Sylhet & city exploration",
      "Ratargul guided boat trip, subject to water levels",
      "Jaflong excursion & return journey"
    ]
  },
  {
    "id": "kuakata",
    "name": "Kuakata Coastal Getaway",
    "country": "Kuakata",
    "region": "Barishal",
    "days": 3,
    "nights": 2,
    "price": 6500,
    "rating": 4.8,
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Kuakata.jpg",
    "description": "Enjoy wide coastal views, relaxed beach time, and sunrise and sunset outings on the coast of southern Bangladesh.",
    "stops": [
      "Dhaka to Kuakata & sunset beach walk",
      "Sunrise outing & local coastal exploration",
      "Free morning & return to Dhaka"
    ]
  }
];
const money = (n) => "৳" + Number(n).toLocaleString("en-BD");
const photo = (trip) => trip.image;
const icon = (name) => `<i class="bi bi-${name}" aria-hidden="true"></i>`;
const page = document.body.dataset.page || "home";
const pages = [
  ["home", "Home", "index.html"],
  ["packages", "Packages", "packages.html"],
  ["destinations", "Destinations", "destinations.html"],
  ["bookings", "Bookings", "bookings.html"],
  ["about", "About Us", "about.html"],
  ["contact", "Contact", "contact.html"],
];
const brand = `<a class="brand" href="index.html"><img src="assets/plane.svg" alt=""><span>GhuriFiri<small>AROUND THE WORLD</small></span></a>`;
document.getElementById("header").innerHTML =
  `<div class="container"><nav class="navbar">${brand}<button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><div class="navlinks">${pages.map(([id, label, url]) => `<a href="${url}" class="${page === id ? "active" : ""}" ${page === id ? 'aria-current="page"' : ""}>${label}</a>`).join("")}<a href="#" class="signin" id="signin">Sign In &nbsp; ${icon("person")}</a></div></nav></div>`;
document.getElementById("footer").innerHTML =
  `<div class="container"><div class="footer-grid"><div>${brand}<p>Big dreams. Beautiful places.<br>Thoughtfully planned journeys, made for you.</p><div class="social-links">${icon("instagram")}${icon("facebook")}${icon("pinterest")}</div></div><div><h3>Explore</h3><div class="footer-links"><a href="packages.html">Our packages</a><a href="destinations.html">Destinations</a><a href="index.html#pricing">Travel plans</a><a href="bookings.html">My bookings</a></div></div><div><h3>Get to know us</h3><div class="footer-links"><a href="about.html">Our story</a><a href="contact.html">Contact us</a><a href="contact.html#faq">FAQs & support</a><a href="about.html#promise">Our travel promise</a><a href="photo-credits.html">Photo credits</a></div></div><div><h3>Let's plan your next escape</h3><p>${icon("envelope")} hello@ghurifiri.example<br>${icon("geo-alt")} Dhaka, Bangladesh<br>${icon("clock")} Every day, 9 am – 6 pm</p><a href="contact.html" class="btn btn-outline-light btn-sm">Get in touch</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} GhuriFiri. Around the world, with you.</span><span>Demo website · Illustrative packages and prices · No real transactions</span></div></div>`;
document.body.insertAdjacentHTML(
  "beforeend",
  `<div class="modal fade" id="travelModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><h2 class="modal-title" id="modalTitle"></h2><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body" id="modalBody"></div></div></div></div><div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="notice" class="toast" role="status" aria-live="polite"><div class="d-flex"><div class="toast-body"></div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div></div></div>`,
);
const main = document.getElementById("main");
const card = (t) =>
  `<article class="trip-card"><div class="trip-photo"><img src="${photo(t)}" alt="${t.country} holiday scenery" loading="lazy"></div><div class="trip-body"><h3>${t.name}</h3><div class="trip-meta"><span>${icon("geo-alt-fill")} ${t.country}</span><span>${icon("airplane")} ${t.days} Days / ${t.nights} Nights</span></div><div class="trip-bottom"><div><span class="price">${money(t.price)}</span><span class="per-person">Per Person</span></div><span class="rating">${icon("star-fill")} ${t.rating}</span><button class="round-button" data-trip="${t.id}" aria-label="View ${t.name}">${icon("arrow-right")}</button></div></div></article>`;
function subhero(title, description) {
  return `<section class="subhero"><div class="container"><p class="small mb-3">GhuriFiri / ${page.toUpperCase()}</p><h1>${title}</h1><p>${description}</p></div></section>`;
}
const benefits = `<div class="benefits">${[
  ["send", "Best Price Guarantee", "Get the best deals<br>or we match it."],
  ["shield-check", "Secure Booking", "Your data is safe<br>with us."],
  ["headset", "24/7 Customer Support", "We're here to help,<br>anytime."],
  [
    "suitcase-lg",
    "Custom Travel Packages",
    "Tailored experiences<br>just for you.",
  ],
]
  .map(
    ([i, h, p]) =>
      `<div class="benefit"><div class="ice-icon">${icon(i)}</div><div><h3>${h}</h3><p>${p}</p></div></div>`,
  )
  .join("")}</div>`;
const plans = [
  [
    "Economy",
    1500,
    "Simple, comfortable travel",
    [
      "Shared AC Transport",
      "Standard Accommodation",
      "Daily Breakfast",
      "Local Transfers"
    ]
  ],
  [
    "Premium",
    3500,
    "A little extra comfort",
    [
      "Premium AC Transport",
      "Upgraded Accommodation",
      "Breakfast & Dinner",
      "Local Transfers",
      "Guided Sightseeing"
    ]
  ],
  [
    "Business",
    6000,
    "More space and flexibility",
    [
      "Private AC Transport",
      "Premium Accommodation",
      "All Meals Included",
      "Flexible Pickup",
      "Private Local Guide",
      "Flexible Itinerary"
    ]
  ],
  [
    "Luxury",
    10000,
    "A special Bangladesh escape",
    [
      "Private Premium Transport",
      "Best Available Local Stay",
      "All Meals Included",
      "Private Transfers",
      "Curated Local Experiences",
      "Dedicated Trip Host"
    ]
  ]
];
if (page === "home")
  main.innerHTML = `<section class="hero"><div class="container hero-copy"><h1>GhuriFiri<span>AROUND THE WORLD</span></h1><div class="script">Explore. Dream. Discover.</div><p>Exclusive travel packages to<br>Bangladesh's most beautiful destinations.</p><a class="btn btn-light" href="packages.html">Explore Packages &nbsp; ${icon("send-fill")}</a></div></section><div class="container"><section class="search-wrap" aria-label="Find your trip"><div class="search-tabs" role="tablist">${[
    ["airplane-fill", "Transport"],
    ["buildings", "Hotels"],
    ["car-front-fill", "Cars"],
    ["ticket-perforated", "Experiences"],
  ]
    .map(
      ([i, t], n) =>
        `<button role="tab" aria-selected="${n === 0}" class="${n === 0 ? "active" : ""}" data-search-type="${t}">${icon(i)}${t}</button>`,
    )
    .join(
      "",
    )}</div><form class="search-box" id="searchForm"><div><label for="from" id="fromLabel">From</label><input id="from" value="Dhaka, Bangladesh" required></div><div><label for="to">Destination</label><select id="to">${trips.map((t) => `<option value="${t.country}">${t.country}</option>`).join("")}</select></div><div><label for="depart" id="departLabel">Depart</label><input type="date" id="depart" required></div><div><label for="return" id="returnLabel">Return</label><input type="date" id="return" required></div><div><label for="travelers" id="travelersLabel">Travelers</label><select id="travelers"><option value="1">1 Adult</option><option value="2" selected>2 Adults</option><option value="3">3 Adults</option><option value="4">4 Adults</option><option value="5">5 Adults</option><option value="6">6 Adults</option></select></div><button class="btn btn-primary" type="submit">Search</button></form></section>${benefits}<section class="panel"><div class="section-heading"><h2>Popular Packages</h2><a href="packages.html">View All Packages &nbsp; ${icon("arrow-right-circle")}</a></div><div class="package-grid">${trips.slice(0, 4).map(card).join("")}</div></section><section class="pricing" id="pricing"><div class="pricing-intro"><h2>PRICING DETAILS</h2><span>──</span><img src="assets/plane.svg" alt="Paper airplane"></div>${plans.map(([name, price, desc, features], i) => `<article class="plan ${i === 1 ? "popular" : ""}">${i === 1 ? '<div class="ribbon">Most Popular</div>' : ""}<h3>${name}</h3><p>${desc}</p><span class="price">${money(price)}</span><span class="per-person">Per Person · starting at</span><ul>${features.map((f) => `<li>${f}</li>`).join("")}</ul><button class="btn ${i === 1 ? "btn-primary" : "btn-outline-primary"}" data-plan="${name}">Select Plan</button></article>`).join("")}</section><section class="panel"><h2 class="section-title how-title">How to Book</h2><div class="steps">${[
    ["geo-alt", "Choose Destination", "Pick your dream destination."],
    ["box-seam", "Select Package", "Choose the best package for you."],
    ["credit-card", "Make Payment", "Review your demo reservation."],
    ["send", "Enjoy Your Trip", "Pack your bags and make memories!"],
  ]
    .map(
      ([i, h, p], n) =>
        `<div class="step">${icon(i)}<div><h3>${n + 1}. ${h}</h3><p>${p}</p></div></div>`,
    )
    .join(
      "",
    )}</div></section><section class="social-proof"><div class="stats">${[
    ["airplane", "6", "Destinations"],
    ["people", "1K+", "Happy Travelers"],
    ["box", "6", "Travel Packages"],
    ["headset", "24/7", "Support"],
  ]
    .map(
      ([i, n, l]) =>
        `<div>${icon(i)}<strong>${n}</strong><small>${l}</small></div>`,
    )
    .join(
      "",
    )}</div><blockquote class="quote">Our Sylhet getaway was full of beautiful moments!<br>Everything was perfectly organized.<footer>— Nusrat A. <span class="stars">★★★★★</span><br>Dhaka, Bangladesh · Illustrative testimonial</footer></blockquote><span class="visually-hidden">All statistics are illustrative demo content.</span></section><p class="demo-note text-center">Travel inspiration shown with illustrative statistics, reviews, and demo prices.</p><section class="newsletter"><div><h2>A little wanderlust in your inbox.</h2><p>Fresh destinations, travel tips, and your next great escape.</p></div><form id="newsletterForm"><label class="visually-hidden" for="newsletterEmail">Email address</label><input id="newsletterEmail" type="email" class="form-control" placeholder="Your email address" required><button class="btn btn-primary">Subscribe</button></form></section></div>`;
if (page === "packages")
  main.innerHTML =
    subhero(
      "Your next adventure starts here.",
      "Handpicked escapes, unforgettable places, and a package for every kind of traveler.",
    ) +
    `<section class="container page-content"><div class="filter-bar"><input id="packageSearch" class="form-control" aria-label="Search packages" placeholder="Search a destination or package…"><select id="regionFilter" class="form-select" aria-label="Filter by division"><option value="">All divisions</option><option>Chattogram</option><option>Sylhet</option><option>Khulna</option><option>Barishal</option></select><select id="sortPackages" class="form-select" aria-label="Sort packages"><option value="popular">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div><p id="resultsLabel" class="demo-note"></p><div class="package-grid" id="packageResults"></div><p class="demo-note mt-4">Sample packages include accommodation, local transfers, and listed activities. Prices are illustrative and shown per person in BDT.</p></section>`;
if (page === "destinations")
  main.innerHTML =
    subhero(
      "Discover beautiful Bangladesh.",
      "From coastal beaches to green hills and tea gardens, find the place that speaks to you.",
    ) +
    `<section class="container page-content"><div class="row g-4">${trips.map((t) => `<div class="col-md-6 col-lg-4"><a class="destination-card" href="packages.html?destination=${encodeURIComponent(t.country)}"><img src="${photo(t)}" alt="${t.country}" loading="lazy"><div><span class="small">${t.region.toUpperCase()}</span><h2>${t.country}</h2><p>${t.days} days of discovery · from ${money(t.price)}</p><span class="btn btn-light btn-sm">Explore destination</span></div></a></div>`).join("")}</div></section>`;
if (page === "bookings")
  main.innerHTML =
    subhero(
      "Your journeys, all in one place.",
      "A little planning today. A whole world of memories tomorrow.",
    ) +
    `<section class="container page-content"><p class="demo-note mb-4">Demo reservations are saved only in this browser. No payment or real booking is made.</p><div id="bookingList"></div></section>`;
if (page === "about")
  main.innerHTML =
    subhero(
      "For the love of going places.",
      "We believe the best journeys start with a little curiosity — and a paper plane.",
    ) +
    `<section class="container page-content"><div class="row align-items-center g-5 mb-5"><div class="col-md-6"><img src="${photo(trips[0], 1000)}" alt="Cox's Bazar sea beach in Bangladesh" class="img-fluid rounded-4"></div><div class="col-md-6"><span class="text-primary small fw-bold">OUR STORY</span><h2 class="fw-bold my-3">Big dreams.<br>Beautifully simple journeys.</h2><p>GhuriFiri is a Bangladesh-focused demo travel brand created around one simple idea: discovering Bangladesh should feel as exciting as the destination itself.</p><p>From a coastal escape to a tea garden retreat, our sample itineraries bring the details together so you can spend more time dreaming about where to go next.</p><a href="packages.html" class="btn btn-primary mt-2">Find your next escape</a></div></div><section class="panel" id="promise"><h2 class="section-title mb-3">Our travel promise</h2>${benefits}<p class="demo-note">This is a demonstration website. The brand, service promises, prices, reviews, and statistics are illustrative.</p></section></section>`;
if (page === "contact")
  main.innerHTML =
    subhero(
      "Let's make your next trip happen.",
      "Have a destination in mind? A question about a package? We would love to hear from you.",
    ) +
    `<section class="container page-content"><div class="row g-5"><div class="col-lg-4 contact-info"><div class="mb-4">${icon("envelope")}<h3 class="mt-3">Drop us a line</h3><p>hello@ghurifiri.example<br>Demo contact address</p></div><div class="mb-4">${icon("geo-alt")}<h3 class="mt-3">Come say hello</h3><p>Dhaka, Bangladesh</p></div><div>${icon("headset")}<h3 class="mt-3">Here for your journey</h3><p>Every day, 9 am – 6 pm<br>Questions, ideas, or a little travel inspiration.</p></div></div><div class="col-lg-8"><form class="panel" id="contactForm"><h2 class="fs-4 fw-bold mb-4">Send a message</h2><div class="row g-3"><div class="col-md-6"><label for="contactName" class="form-label">Your name</label><input class="form-control" id="contactName" required maxlength="100" placeholder="Full name"></div><div class="col-md-6"><label for="contactEmail" class="form-label">Email address</label><input class="form-control" id="contactEmail" type="email" required placeholder="you@example.com"></div><div class="col-12"><label for="subject" class="form-label">I'm interested in</label><select id="subject" class="form-select"><option>Planning a trip</option><option>Package details</option><option>Booking support</option><option>Something else</option></select></div><div class="col-12"><label for="message" class="form-label">Your message</label><textarea id="message" class="form-control" rows="5" required minlength="10" placeholder="Tell us a little about your dream trip…"></textarea></div><div class="col-12"><p class="demo-note">Demo form: shows a confirmation; no message is sent.</p><button class="btn btn-primary">Send message</button></div></div></form></div></div><section id="faq" class="panel mt-4"><h2 class="section-title mb-4">A few helpful answers</h2>${[
      [
        "What is included in a package?",
        "Each sample package includes accommodation, local transfers, and the activities listed in the itinerary. Transport and extras depend on the selected plan.",
      ],
      [
        "Can I change or cancel my reservation?",
        "Yes. Open Bookings and cancel a demo reservation at any time, then create a new reservation with your preferred details.",
      ],
      [
        "Will I be charged for booking?",
        "No. This is a demonstration website. No payments are collected and no actual travel services are reserved.",
      ],
    ]
      .map(
        ([q, a]) =>
          `<details class="py-3 border-bottom"><summary class="fw-bold">${q}</summary><p class="mt-3 mb-0">${a}</p></details>`,
      )
      .join("")}</section></section>`;

function notify(message) {
  document.querySelector("#notice .toast-body").textContent = message;
  bootstrap.Toast.getOrCreateInstance(document.getElementById("notice"), {
    delay: 5000,
  }).show();
}
function showModal(title, content) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = content;
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById("travelModal"),
  ).show();
}
function readBookings() {
  try {
    return JSON.parse(localStorage.getItem("ghurifiriBookingsBD") || "[]");
  } catch {
    return [];
  }
}
function saveBookings(bookings) {
  try {
    localStorage.setItem("ghurifiriBookingsBD", JSON.stringify(bookings));
    return true;
  } catch {
    notify(
      "Browser storage is unavailable. Please allow local storage to save a demo booking.",
    );
    return false;
  }
}
function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function viewTrip(id) {
  const t = trips.find((t) => t.id === id);
  showModal(
    t.name,
    `<img class="detail-image" src="${photo(t, 1200)}" alt="${t.country}"><div class="d-flex justify-content-between align-items-center mb-3"><span>${icon("geo-alt")} ${t.country} · ${t.days} days / ${t.nights} nights</span><strong class="price">${money(t.price)}</strong></div><p>${t.description}</p><h3 class="fs-6 fw-bold">Your sample itinerary</h3><ol class="small lh-lg">${t.stops.map((s) => `<li>${s}</li>`).join("")}</ol><p class="demo-note">Includes accommodation, transfers, and listed activities. Demo price per person.</p><button class="btn btn-primary" data-book="${t.id}">Book this escape</button>`,
  );
}
function bookTrip(id, plan = "Package") {
  const t = trips.find((t) => t.id === id);
  const selected = plans.find((p) => p[0] === plan);
  const unit = t.price + (selected ? selected[1] : 0);
  const search = new URLSearchParams(location.search);
  const initialDate = search.get("depart") || today(30);
  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(initialDate) && initialDate >= today()
      ? initialDate
      : today(30);
  showModal(
    "Plan your " + t.name,
    `<p>${t.days} days in ${t.country} · ${plan === "Package" ? "Standard package" : plan + " upgrade"} · ${money(unit)} per person</p><form id="bookingForm"><div class="row g-3"><div class="col-sm-6"><label for="guestName">Full name</label><input class="form-control" id="guestName" required maxlength="100"></div><div class="col-sm-6"><label for="guestEmail">Email</label><input type="email" class="form-control" id="guestEmail" required></div><div class="col-sm-6"><label for="bookingDate">Departure date</label><input class="form-control" type="date" id="bookingDate" min="${today()}" value="${validDate}" required></div><div class="col-sm-6"><label for="guestCount">Travelers</label><select class="form-select" id="guestCount">${[1, 2, 3, 4, 5, 6].map((n) => `<option value="${n}">${n} ${n === 1 ? "adult" : "adults"}</option>`).join("")}</select></div><div class="col-12"><div class="panel mb-2 mt-2 d-flex justify-content-between"><span>Total (BDT)</span><strong id="bookingTotal">${money(unit)}</strong></div><p class="demo-note">Demo reservation only. No payment is collected. Details are saved in this browser.</p><button class="btn btn-primary w-100">Confirm demo booking</button></div></div></form>`,
  );
  const count = document.getElementById("guestCount");
  count.value = ["1", "2", "3", "4", "5", "6"].includes(search.get("travelers"))
    ? search.get("travelers")
    : "2";
  const update = () =>
    (document.getElementById("bookingTotal").textContent = money(
      unit * Number(count.value),
    ));
  count.onchange = update;
  update();
  document.getElementById("bookingForm").onsubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("bookingDate").value < today())
      return notify("Choose a future departure date.");
    const bookings = readBookings();
    bookings.unshift({
      id: "GHF-" + Date.now().toString(36).toUpperCase(),
      trip: id,
      date: document.getElementById("bookingDate").value,
      travelers: Number(count.value),
      total: unit * Number(count.value),
      plan,
    });
    if (saveBookings(bookings)) {
      bootstrap.Modal.getInstance(
        document.getElementById("travelModal"),
      ).hide();
      notify(
        "Demo booking confirmed! Find your reservation on the Bookings page.",
      );
      if (page === "bookings") renderBookings();
    }
  };
}
function renderBookings() {
  const bookings = readBookings();
  document.getElementById("bookingList").innerHTML = bookings.length
    ? bookings
        .map((b) => {
          const t = trips.find((t) => t.id === b.trip);
          if (!t) return "";
          return `<article class="panel booking-row"><div><span class="badge-demo">Confirmed demo</span><h3 class="mt-3">${t.name}</h3><p class="mb-1">${b.date} · ${b.travelers} traveler${b.travelers > 1 ? "s" : ""} · ${b.plan}</p><small class="text-secondary">${b.id}</small></div><strong class="price">${money(b.total)}</strong><button class="btn btn-outline-primary" data-cancel="${b.id}">Cancel reservation</button></article>`;
        })
        .join("")
    : `<div class="empty">${icon("suitcase-lg")}<h2>Your next chapter is waiting.</h2><p>Find a place you love and make your first demo booking.</p><a href="packages.html" class="btn btn-primary mt-2">Explore packages</a></div>`;
}
function filterPackages() {
  const query = document
    .getElementById("packageSearch")
    .value.toLowerCase()
    .trim();
  const region = document.getElementById("regionFilter").value;
  let matches = trips.filter(
    (t) =>
      (t.name + " " + t.country).toLowerCase().includes(query) &&
      (!region || t.region === region),
  );
  const sort = document.getElementById("sortPackages").value;
  if (sort !== "popular")
    matches.sort((a, b) =>
      sort === "low" ? a.price - b.price : b.price - a.price,
    );
  document.getElementById("resultsLabel").textContent =
    `${matches.length} demo package${matches.length === 1 ? "" : "s"} found`;
  document.getElementById("packageResults").innerHTML = matches.length
    ? matches.map(card).join("")
    : '<div class="empty" style="grid-column:1/-1"><h2>No destinations found.</h2><p>Try another destination or choose all regions.</p></div>';
}
document.querySelector(".menu-toggle").onclick = (e) => {
  const open = document.querySelector(".navlinks").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
};
document.addEventListener("click", (e) => {
  const trip = e.target.closest("[data-trip]"),
    book = e.target.closest("[data-book]"),
    plan = e.target.closest("[data-plan]"),
    cancel = e.target.closest("[data-cancel]");
  if (trip) viewTrip(trip.dataset.trip);
  if (book) bookTrip(book.dataset.book, book.dataset.upgrade || "Package");
  if (plan) {
    const name = plan.dataset.plan;
    showModal(
      name + " travel plan",
      `<p>Choose your destination to add the ${name} plan. The plan price is an upgrade added to the package price.</p><div class="row g-3">${trips.map((t) => `<div class="col-sm-6"><button class="btn btn-outline-primary w-100" data-book="${t.id}" data-upgrade="${name}">${t.name}<br><small>From ${money(t.price + plans.find((p) => p[0] === name)[1])} per person</small></button></div>`).join("")}</div>`,
    );
  }
  if (cancel) {
    showModal(
      "Cancel demo reservation?",
      `<p>This removes the reservation from this browser. You can always book another escape.</p><button class="btn btn-primary" id="confirmCancel">Yes, cancel reservation</button> <button class="btn btn-outline-primary" data-bs-dismiss="modal">Keep reservation</button>`,
    );
    document.getElementById("confirmCancel").onclick = () => {
      if (
        saveBookings(
          readBookings().filter((b) => b.id !== cancel.dataset.cancel),
        )
      ) {
        bootstrap.Modal.getInstance(
          document.getElementById("travelModal"),
        ).hide();
        renderBookings();
        notify("Demo reservation canceled.");
      }
    };
  }
});
document.getElementById("signin").onclick = (e) => {
  e.preventDefault();
  showModal(
    "Welcome to GhuriFiri",
    `<p>Try the demo traveler profile. No account is created or password required.</p><form id="signinForm"><label for="profileName">Your first name</label><input class="form-control mb-3" id="profileName" required maxlength="30" placeholder="How should we greet you?"><button class="btn btn-primary">Continue in demo mode</button></form>`,
  );
  document.getElementById("signinForm").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("profileName").value.trim();
    if (!name) return;
    document.getElementById("signin").textContent = "Hi, " + name;
    bootstrap.Modal.getInstance(document.getElementById("travelModal")).hide();
    notify("Welcome, " + name + "! Your demo profile is ready for this visit.");
  };
};
if (page === "home") {
  document.getElementById("depart").value = today(30);
  document.getElementById("return").value = today(37);
  document.getElementById("depart").min = today();
  document.getElementById("return").min = today(30);
  document.getElementById("depart").onchange = (e) => {
    document.getElementById("return").min = e.target.value;
    if (document.getElementById("return").value < e.target.value)
      document.getElementById("return").value = e.target.value;
  };
  let searchType = "Transport";
  document.querySelectorAll("[data-search-type]").forEach(
    (button) =>
      (button.onclick = () => {
        searchType = button.dataset.searchType;
        document.querySelectorAll("[data-search-type]").forEach((b) => {
          b.classList.toggle("active", b === button);
          b.setAttribute("aria-selected", b === button);
        });
        document.getElementById("fromLabel").textContent =
          searchType === "Hotels"
            ? "Hotel preference"
            : searchType === "Cars"
              ? "Pickup location"
              : searchType === "Experiences"
                ? "Experience style"
                : "From";
        document.getElementById("from").value = {
          Transport: "Dhaka, Bangladesh",
          Hotels: "Beach resort",
          Cars: "Dhaka pickup point",
          Experiences: "Culture & adventure",
        }[searchType];
        document.getElementById("departLabel").textContent =
          searchType === "Hotels" ? "Check-in" : "Depart";
        document.getElementById("returnLabel").textContent =
          searchType === "Hotels" ? "Check-out" : "Return";
      }),
  );
  document.getElementById("searchForm").onsubmit = (e) => {
    e.preventDefault();
    if (
      document.getElementById("return").value <
      document.getElementById("depart").value
    )
      return notify("Return date must be on or after departure.");
    const params = new URLSearchParams({
      destination: document.getElementById("to").value,
      type: searchType,
      from: document.getElementById("from").value,
      depart: document.getElementById("depart").value,
      return: document.getElementById("return").value,
      travelers: document.getElementById("travelers").value,
    });
    location.href = "packages.html?" + params;
  };
  document.getElementById("newsletterForm").onsubmit = (e) => {
    e.preventDefault();
    notify(
      "Thanks! Your demo subscription is confirmed. No email will be sent.",
    );
    e.target.reset();
  };
}
if (page === "packages") {
  const params = new URLSearchParams(location.search);
  document.getElementById("packageSearch").value =
    params.get("destination") || "";
  ["packageSearch", "regionFilter", "sortPackages"].forEach((id) =>
    document.getElementById(id).addEventListener("input", filterPackages),
  );
  filterPackages();
  if (params.has("type")) {
    const info = document.createElement("p");
    info.className = "panel small";
    info.textContent = `${params.get("type")} inspiration for ${params.get("destination")}. Showing related demo travel packages; standalone transport, hotels, cars, and activities are not sold in this demo.`;
    document.querySelector(".filter-bar").before(info);
  }
}
if (page === "bookings") renderBookings();
if (page === "contact")
  document.getElementById("contactForm").onsubmit = (e) => {
    e.preventDefault();
    notify(
      "Thanks! Your demo message was validated successfully. No message was sent.",
    );
    e.target.reset();
  };
