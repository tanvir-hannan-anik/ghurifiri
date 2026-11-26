/* ==========================================================================
   Sundarban Trails — single external script (app.js)
   Page content lives in the HTML files. This script only adds the
   interactive features required by the project brief:

   1. Mobile navigation menu toggle
   2. Hero destination slider (Home)
   3. Scroll-to-top button (all pages)
   4. Destination filter: region + price range (Destinations)
   5. Form validation helpers (shared by Booking and Contact forms)
   6. Booking form: validation, past-date check, live cost estimator
      and the list of submitted booking requests
   7. Contact form: validation with inline error messages
   8. FAQ accordion (Contact)

   Each feature first checks that its elements exist on the current page,
   so the same file can be linked from every page.
   ========================================================================== */

/* Group discount rule for the booking cost estimator */
const GROUP_SIZE = 5;          // discount applies from 5 travellers
const GROUP_DISCOUNT = 0.1;    // 10 %

/* Formats a number as Bangladeshi Taka, e.g. 12500 -> "৳12,500" */
function formatTaka(amount) {
  return "৳" + Math.round(amount).toLocaleString("en-US");
}

/* ---------- 1. Mobile navigation menu toggle ---------- */
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
  const navLinks = document.getElementById("navlinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

/* ---------- 2. Hero destination slider ---------- */
const slider = document.querySelector(".hero-slider");

if (slider) {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".slider-dots button");
  let current = 0;
  let timer;

  // Show the slide at position `index` (wraps around at both ends)
  function showSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    dots[current].setAttribute("aria-current", "false");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
    dots[current].classList.add("active");
    dots[current].setAttribute("aria-current", "true");
  }

  // Move to the next slide every 5 seconds
  function startAutoPlay() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
  }

  slider.querySelector(".prev").addEventListener("click", () => {
    showSlide(current - 1);
    startAutoPlay();
  });

  slider.querySelector(".next").addEventListener("click", () => {
    showSlide(current + 1);
    startAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  // Pause while the visitor hovers over or focuses the slider
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", startAutoPlay);
  slider.addEventListener("focusin", () => clearInterval(timer));
  slider.addEventListener("focusout", startAutoPlay);

  startAutoPlay();
}

/* ---------- 3. Scroll-to-top button ---------- */
const scrollTopButton = document.getElementById("scrollTop");

if (scrollTopButton) {
  // Appears after the visitor scrolls 300px down the page
  window.addEventListener("scroll", () => {
    scrollTopButton.classList.toggle("show", window.scrollY > 300);
  });

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- 4. Destination filter: region + price range ---------- */
const filterForm = document.getElementById("destinationFilter");

if (filterForm) {
  const regionFilter = document.getElementById("regionFilter");
  const priceFilter = document.getElementById("priceFilter");
  const priceValue = document.getElementById("priceValue");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  const cards = document.querySelectorAll(".destination-item");

  // Show only the cards that match the chosen region AND are within the price limit
  function filterDestinations() {
    const region = regionFilter.value;
    const maxPrice = Number(priceFilter.value);
    let visible = 0;

    priceValue.textContent = formatTaka(maxPrice);

    cards.forEach((card) => {
      const matchesRegion = region === "all" || card.dataset.region === region;
      const matchesPrice = Number(card.dataset.price) <= maxPrice;
      const show = matchesRegion && matchesPrice;

      card.hidden = !show;
      if (show) visible++;
    });

    resultCount.textContent = `Showing ${visible} of ${cards.length} destinations`;
    noResults.hidden = visible > 0;
  }

  regionFilter.addEventListener("change", filterDestinations);
  priceFilter.addEventListener("input", filterDestinations);

  // "Reset filters" button inside the no-results message
  filterForm.addEventListener("reset", () => setTimeout(filterDestinations));

  filterDestinations();
}

/* ---------- 5. Form validation helpers ---------- */

/* Shows (or clears, when message is "") the inline error for one field.
   The error element's id is always the field id + "Error". */
function setError(id, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(id + "Error");

  error.textContent = message;
  field.classList.toggle("is-invalid", message !== "");
  field.setAttribute("aria-invalid", message !== "");
}

/* Runs every rule; returns true when the whole form is valid.
   `rules` maps a field id to a function that returns an error message or "". */
function validateAll(rules) {
  let firstInvalid = null;

  for (const id in rules) {
    const message = rules[id]();
    setError(id, message);
    if (message && !firstInvalid) firstInvalid = id;
  }

  // Move keyboard focus to the first problem so it is easy to fix
  if (firstInvalid) {
    const field = document.getElementById(firstInvalid);
    (field.querySelector("input") || field).focus();
  }

  return firstInvalid === null;
}

/* Re-checks a field while the visitor corrects it (only once it shows an error) */
function liveRevalidate(form, rules) {
  ["input", "change"].forEach((type) => {
    form.addEventListener(type, (event) => {
      const id = event.target.type === "radio" ? event.target.name : event.target.id;
      if (rules[id] && document.getElementById(id + "Error").textContent) {
        setError(id, rules[id]());
      }
    });
  });
}

/* Clears every error message, e.g. after the form is reset */
function clearErrors(rules) {
  for (const id in rules) setError(id, "");
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const namePattern = /^[A-Za-z][A-Za-z .'-]{2,}$/;

/* ---------- 6. Booking form: validation and live cost estimator ---------- */
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const destination = document.getElementById("destination");
  const travelers = document.getElementById("travelers");
  const success = document.getElementById("bookingSuccess");

  // Returns true if the yyyy-mm-dd date is before today
  function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(value + "T00:00:00") < today;
  }

  // One rule per field: return an error message, or "" when valid
  const bookingRules = {
    fullName() {
      const value = document.getElementById("fullName").value.trim();
      if (!value) return "Please enter your full name.";
      if (!namePattern.test(value)) return "Name should be at least 3 letters (letters and spaces only).";
      return "";
    },
    email() {
      const value = document.getElementById("email").value.trim();
      if (!value) return "Please enter your email address.";
      if (!emailPattern.test(value)) return "That email doesn't look right — try name@example.com.";
      return "";
    },
    phone() {
      const value = document.getElementById("phone").value.replace(/[\s-]/g, "");
      if (!value) return "Please enter a phone number so we can call you.";
      if (!/^(\+?880)?01[3-9]\d{8}$/.test(value)) return "Enter a Bangladeshi mobile number, e.g. 01712-345678.";
      return "";
    },
    travelDate() {
      const value = document.getElementById("travelDate").value;
      if (!value) return "Please choose your travel date.";
      if (isPastDate(value)) return "This date is in the past. Please choose today or a future date.";
      return "";
    },
    travelers() {
      const value = Number(travelers.value);
      if (!travelers.value) return "Please enter the number of travelers.";
      if (!Number.isInteger(value) || value < 1 || value > 20) return "Number of travelers must be a whole number from 1 to 20.";
      return "";
    },
    destination() {
      return destination.value ? "" : "Please choose a destination.";
    },
    tourType() {
      return bookingForm.querySelector('input[name="tourType"]:checked') ? "" : "Please choose a tour type.";
    },
  };

  // Live estimate: travelers × package price, minus 10 % for groups of 5+
  function updateEstimate() {
    const selected = destination.options[destination.selectedIndex];
    const price = Number(selected.dataset.price || 0);
    const count = Number(travelers.value);
    const people = Number.isInteger(count) && count > 0 ? count : 0;

    const total = price * people;
    const discount = people >= GROUP_SIZE ? total * GROUP_DISCOUNT : 0;
    const finalAmount = total - discount;

    document.getElementById("estPrice").textContent = formatTaka(price);
    document.getElementById("estTravelers").textContent = people;
    document.getElementById("estTotal").textContent = formatTaka(total);
    document.getElementById("estDiscount").textContent = "− " + formatTaka(discount);
    document.getElementById("estFinal").textContent = formatTaka(finalAmount);

    return finalAmount;
  }

  destination.addEventListener("change", updateEstimate);
  travelers.addEventListener("input", updateEstimate);
  liveRevalidate(bookingForm, bookingRules);

  /* --- Submitted booking requests list --- */
  const STORAGE_KEY = "sundarbanTrailsBookings";
  const bookingList = document.getElementById("bookingList");
  const noBookings = document.getElementById("noBookings");
  const bookingCount = document.getElementById("bookingCount");
  const clearButton = document.getElementById("clearBookings");

  // Read saved requests from this browser (empty list if storage is blocked)
  function loadBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveBookings(bookings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // storage unavailable: the list still shows until the page is reloaded
    }
  }

  let bookings = loadBookings();

  // Text of the <label> that belongs to a radio button or checkbox
  function labelText(input) {
    return document.querySelector(`label[for="${input.id}"]`).textContent;
  }

  // Collects the submitted form values into one plain object
  function readBookingForm() {
    const option = destination.options[destination.selectedIndex];
    const count = Number(travelers.value);
    const total = Number(option.dataset.price) * count;
    const discount = count >= GROUP_SIZE ? total * GROUP_DISCOUNT : 0;
    const addons = [...bookingForm.querySelectorAll('input[name="addons"]:checked')].map(labelText);

    return {
      name: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      date: document.getElementById("travelDate").value,
      travelers: count,
      destination: option.text.replace(/\s*\(.*\)$/, ""), // drop the "(৳…)" price
      tourType: labelText(bookingForm.querySelector('input[name="tourType"]:checked')),
      addons: addons.length ? addons.join(", ") : "None",
      notes: document.getElementById("notes").value.trim() || "—",
      finalAmount: total - discount,
    };
  }

  // Builds one list item. textContent is used so typed text can never inject HTML.
  function bookingItem(booking) {
    const item = document.createElement("li");
    item.className = "col-md-6";

    const card = document.createElement("article");
    card.className = "booking-item";

    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = booking.destination;
    const amount = document.createElement("span");
    amount.className = "price";
    amount.textContent = formatTaka(booking.finalAmount);
    header.append(title, amount);

    const details = document.createElement("dl");
    const rows = [
      ["Name", booking.name],
      ["Email", booking.email],
      ["Phone", booking.phone],
      ["Travel date", booking.date],
      ["Travelers", booking.travelers],
      ["Tour type", booking.tourType],
      ["Add-ons", booking.addons],
      ["Notes", booking.notes],
    ];
    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      row.append(dt, dd);
      details.append(row);
    });

    card.append(header, details);
    item.append(card);
    return item;
  }

  // Redraws the whole list (newest request first)
  function renderBookings() {
    bookingList.replaceChildren(...bookings.map(bookingItem));
    bookingCount.textContent = `(${bookings.length})`;
    noBookings.hidden = bookings.length > 0;
    clearButton.hidden = bookings.length === 0;
  }

  clearButton.addEventListener("click", () => {
    if (!confirm("Remove all booking requests from this list?")) return;
    bookings = [];
    saveBookings(bookings);
    renderBookings();
  });

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prototype: nothing is sent to a server
    success.hidden = true;

    if (!validateAll(bookingRules)) return;

    const booking = readBookingForm();
    bookings.unshift(booking);
    saveBookings(bookings);
    renderBookings();

    success.textContent = `Thank you, ${booking.name}! Your booking request for ${booking.destination} (estimated ${formatTaka(booking.finalAmount)}) has been received and added to the list below. Our team will contact you within 24 hours to confirm.`;
    success.hidden = false;

    bookingForm.reset();
  });

  renderBookings();

  // Reset button: clear errors and recalculate after the browser resets the values
  bookingForm.addEventListener("reset", () => {
    clearErrors(bookingRules);
    setTimeout(updateEstimate);
  });

  updateEstimate();
}

/* ---------- 7. Contact form: validation with inline error messages ---------- */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const success = document.getElementById("contactSuccess");

  const contactRules = {
    contactName() {
      const value = document.getElementById("contactName").value.trim();
      if (!value) return "Please tell us your name.";
      if (!namePattern.test(value)) return "Name should be at least 3 letters (letters and spaces only).";
      return "";
    },
    contactEmail() {
      const value = document.getElementById("contactEmail").value.trim();
      if (!value) return "Please enter your email so we can reply.";
      if (!emailPattern.test(value)) return "That email doesn't look right — try name@example.com.";
      return "";
    },
    subject() {
      const value = document.getElementById("subject").value.trim();
      if (!value) return "Please add a subject for your message.";
      if (value.length < 3) return "Subject should be at least 3 characters.";
      return "";
    },
    message() {
      const value = document.getElementById("message").value.trim();
      if (!value) return "Please write your message.";
      if (value.length < 10) return `Your message is a little short — please write at least 10 characters (${value.length}/10).`;
      return "";
    },
  };

  liveRevalidate(contactForm, contactRules);

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prototype: nothing is sent to a server
    success.hidden = true;

    if (!validateAll(contactRules)) return;

    const name = document.getElementById("contactName").value.trim();
    success.textContent = `Thanks, ${name}! Your message has been received. We usually reply within one working day.`;
    success.hidden = false;
    contactForm.reset();
  });
}

/* ---------- 8. FAQ accordion ---------- */
const faqButtons = document.querySelectorAll(".accordion-button");

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const wasOpen = button.getAttribute("aria-expanded") === "true";

    // Close every answer first, so only one is open at a time
    faqButtons.forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      other.classList.add("collapsed");
      document.getElementById(other.getAttribute("aria-controls")).classList.remove("show");
    });

    // Then open the clicked one (unless it was already open, which closes it)
    if (!wasOpen) {
      button.setAttribute("aria-expanded", "true");
      button.classList.remove("collapsed");
      document.getElementById(button.getAttribute("aria-controls")).classList.add("show");
    }
  });
});
