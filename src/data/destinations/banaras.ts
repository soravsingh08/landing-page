import type { LandingConfig } from "../landing";
import hero from "@/assets/images/hero-ganga-sunrise.jpg";
import heroAarti from "@/assets/images/hero-ganga-aarti-assi.jpg";
import heroAartiAerial from "@/assets/images/hero-aarti-aerial.jpg";
import heroKashiGhat from "@/assets/images/hero-kashi-vishwanath-ghat.jpg";
import aartiPriest from "@/assets/images/ganga-aarti-priest.webp";
import aarti from "@/assets/images/ganga-aarti.webp";
import sarnath from "@/assets/images/sarnath-dhamek-stupa.webp";
import kashiCorridor from "@/assets/images/kashi-vishwanath-corridor.webp";
import ayodhyaMandir from "@/assets/images/ayodhya-ram-mandir.webp";
import assiGhat from "@/assets/images/assi-ghat.webp";
import prayagraj from "@/assets/images/prayagraj-yamuna-bridge.webp";
import mahabodhi from "@/assets/images/bodhgaya-mahabodhi-temple.jpg";
import ayodhyaSaryuNight from "@/assets/images/ayodhya-saryu-night.jpg";
import ayodhyaDham from "@/assets/images/ayodhya-dham-riverfront.jpg";
import sangam from "@/assets/images/prayagraj-triveni-sangam.jpg";

// Six packages come from the client's "Selected Packages — Developer Brief", plus the
// bestseller Varanasi Prayagraj Ayodhya from srivastavaroute.in: prices, itineraries,
// inclusions and exclusions as listed there, with the client's clarifications (breakfast
// in every package; boat rides never included, arranged on request). All prices are
// per person (confirmed with the client).
// "Was" prices follow the discount levels of the earlier packages (24–26% off).
const BOAT_RIDE_ON_REQUEST = "Boat ride: arranged on request, paid separately";

export const banaras: LandingConfig = {
  slug: "banaras",
  path: "/",
  name: "Banaras",
  tripLabel: "Kashi yatra",
  specialist: "Kashi specialist",
  seo: {
    title: "Banaras Tour Packages from ₹6,999 | Varanasi, Ayodhya, Prayagraj & Bodhgaya | Srivastava Route",
    description:
      "Book Banaras (Varanasi) tour packages with Ganga Aarti, Kashi Vishwanath darshan, Sarnath, Ayodhya, Prayagraj & Bodhgaya. Hotel with breakfast and pickup & drop included. Customise your Kashi yatra with Srivastava Route.",
    keywords: [
      "Banaras tour packages",
      "Varanasi tour package",
      "Kashi tour package",
      "Varanasi Ayodhya tour package",
      "Ayodhya tour package",
      "Bodhgaya Varanasi package",
      "Prayagraj tour package",
      "Kashi Vishwanath darshan package",
      "Ganga Aarti Varanasi",
      "Varanasi Sarnath tour",
      "Kashi yatra",
    ],
    ogImage: "/og-banaras-tour-packages.jpg",
    ogAlt: "Banaras Tour Packages by Srivastava Route",
  },
  offer: { name: "Kashi Festive Sale", endsAt: null },
  hero: {
    eyebrow: "Kashi · Ayodhya · Prayagraj · Bodhgaya",
    titleLead: "Banaras Tour",
    titleAccent: "Packages",
    sub: "Ganga Aarti from the river, peaceful Kashi Vishwanath darshan and sunrise on the ghats. Curated Varanasi journeys crafted by Srivastava Route.",
    image: hero,
    imageAlt: "Wooden boats moored on the Ganga ghats at sunrise, Varanasi",
    // Every package includes these (client brief). Add a rating or traveller count only once it is real.
    proof: ["Hotel + breakfast", "Pickup & drop", "Custom itineraries"],
    slides: [
      { image: heroAarti, alt: "Priests raising flaming lamps during the evening Ganga Aarti at Assi Ghat", caption: "Evening Ganga Aarti · Assi Ghat" },
      { image: hero, alt: "Wooden boats moored on the Ganga ghats at sunrise, Varanasi", caption: "Sunrise on the Ganga" },
      { image: heroAartiAerial, alt: "Hundreds of boats gathered on the Ganga for the Ganga Aarti at Dashashwamedh Ghat, seen from above", caption: "Ganga Aarti from above · Dashashwamedh Ghat" },
      { image: heroKashiGhat, alt: "Lalita Ghat, the riverside gateway to Kashi Vishwanath Dham, lit up at night", caption: "Kashi Vishwanath Dham · Lalita Ghat" },
    ],
  },
  priceUnit: "/person",
  packageTypes: [
    { key: "pilgrimage", label: "Pilgrimage" },
    { key: "family", label: "Family" },
    { key: "heritage", label: "Heritage & Culture", short: "Heritage" },
    { key: "weekend", label: "Short Trips" },
  ],
  // Ordered by search interest for these trips (Varanasi Ayodhya, Varanasi, Ayodhya, Prayagraj).
  // Confirm against Google Ads Keyword Planner and reorder once the campaign has data.
  bestsellers: {
    eyebrow: "Most searched yatras",
    title: "Our Best Packages",
    lead: "The trips travellers ask us about most, planned with darshan timings and hotels near the ghats.",
    items: [
      { packageId: "varanasi-prayagraj-ayodhya", badge: "Bestseller" },
      { packageId: "varanasi-ayodhya", badge: "Most searched" },
      { packageId: "varanasi-tour", badge: "Popular" },
      { packageId: "ayodhya-ram-darbar", badge: "Trending" },
    ],
  },
  packagesSection: {
    eyebrow: "Handpicked",
    title: "All Varanasi Tour Packages",
    highlight: "Varanasi",
    lead: "Every itinerary is planned by our Kashi specialists, with comfortable stays, private cabs, local guides and darshan timings sorted for you. Pick one as it is, or let us tailor it.",
  },
  packages: [
    // Srivastava Route's bestseller, as listed on srivastavaroute.in (price per person, itinerary,
    // inclusions and exclusions from the live package page). Boat ride per the client brief: on request.
    {
      id: "varanasi-prayagraj-ayodhya",
      title: "Varanasi Prayagraj Ayodhya Tour",
      route: ["Varanasi", "Prayagraj", "Ayodhya"],
      nights: 3,
      price: 11999,
      oldPrice: 15999,
      image: aarti,
      imageAlt: "Crowds watching the evening Ganga Aarti on the ghats of Varanasi",
      heroImage: heroAartiAerial,
      heroImageAlt: "Hundreds of boats gathered on the Ganga for the Ganga Aarti at Dashashwamedh Ghat, seen from above",
      summary:
        "Explore the spiritual heart of India with the Varanasi, Ayodhya and Prayagraj tour. Witness the divine Ganga Aarti in Varanasi, seek blessings at Lord Ram's birthplace in Ayodhya, and experience the sacred Triveni Sangam in Prayagraj.",
      types: ["pilgrimage", "family"],
      highlights: ["Ganga Aarti at Dashashwamedh", "Triveni Sangam", "Ram Janmabhoomi darshan"],
      badge: "Bestseller",
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "guide"],
      itinerary: [
        {
          title: "Arrival in Varanasi",
          city: "Varanasi",
          detail:
            "Arrival at Varanasi. Check-in at the hotel and relax. In the evening, witness the divine Ganga Aarti at Dashashwamedh Ghat.",
          highlights: ["Hotel check-in", "Ganga Aarti", "Dashashwamedh Ghat"],
          stay: "Overnight stay in Varanasi",
          image: heroAarti,
          imageAlt: "Priests raising flaming lamps during the evening Ganga Aarti",
        },
        {
          title: "Varanasi Sightseeing to Prayagraj",
          city: "Varanasi → Prayagraj",
          detail:
            "Early morning boat ride on the Ganga (optional, paid separately). Visit Kashi Vishwanath Temple, Annapurna Temple and Sankat Mochan Temple, then drive to Prayagraj with en-route sightseeing.",
          highlights: ["Kashi Vishwanath", "Annapurna Temple", "Sankat Mochan"],
          stay: "Overnight stay in Prayagraj",
          image: kashiCorridor,
          imageAlt: "Ganga Dwar gateway of the Kashi Vishwanath corridor",
        },
        {
          title: "Prayagraj to Ayodhya",
          city: "Prayagraj → Ayodhya",
          detail:
            "Visit the Triveni Sangam, Hanuman Mandir and Anand Bhawan. After sightseeing, drive to Ayodhya and visit Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan.",
          highlights: ["Triveni Sangam", "Anand Bhawan", "Ram Janmabhoomi", "Hanuman Garhi"],
          stay: "Overnight stay in Ayodhya",
          image: sangam,
          imageAlt: "Pilgrims and boats on the river at Triveni Sangam",
        },
        {
          title: "Ayodhya Departure",
          city: "Ayodhya",
          detail: "Morning temple visits and local sightseeing. Tour ends with departure from Ayodhya.",
          stay: "Tour ends with departure",
          image: ayodhyaMandir,
          imageAlt: "Shri Ram Janmabhoomi Mandir in Ayodhya",
        },
      ],
      inclusions: [
        "Airport pickup and drop",
        "All sightseeing",
        "Hotel with breakfast",
        "Guide included",
        "Wheelchair, toll and parking",
      ],
      exclusions: ["Lunch and dinner", "Boat ride", "Room personal expenses"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "varanasi-ayodhya",
      title: "Varanasi & Ayodhya Package",
      route: ["Ayodhya", "Varanasi"],
      nights: 2,
      price: 7999,
      oldPrice: 10499,
      image: kashiCorridor,
      imageAlt: "Ganga Dwar gateway of the Kashi Vishwanath corridor in Varanasi",
      heroImage: heroKashiGhat,
      heroImageAlt: "Lalita Ghat, the riverside gateway to Kashi Vishwanath Dham, lit up at night",
      summary:
        "Two holy cities in three days: the Saryu Aarti and Ram Janmabhoomi in Ayodhya, then the Ganga Aarti and VIP darshan at Kashi Vishwanath in Varanasi.",
      types: ["pilgrimage"],
      highlights: ["Saryu Ghat Aarti", "Ram Janmabhoomi", "VIP darshan at Kashi Vishwanath"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
      itinerary: [
        {
          title: "Arrival in Ayodhya",
          city: "Ayodhya",
          detail: "Pickup from Ayodhya airport or railway station and hotel check-in. Attend the aarti at Saryu Ghat and visit Hanuman Garhi.",
          highlights: ["Saryu Ghat Aarti", "Hanuman Garhi"],
          stay: "Overnight stay in Ayodhya",
          image: ayodhyaSaryuNight,
          imageAlt: "Ghats on the Saryu river in Ayodhya lit up at night",
        },
        {
          title: "Drive to Varanasi & Stay",
          city: "Ayodhya → Varanasi",
          detail:
            "Breakfast at the hotel, then visit Ram Janmabhoomi and explore Kanak Bhawan and Dashrath Mahal. Drive to Varanasi and check in, attend the Ganga Aarti at Dashashwamedh Ghat and explore the local market famous for silk clothes.",
          highlights: ["Ram Janmabhoomi", "Kanak Bhawan", "Dashrath Mahal", "Ganga Aarti"],
          stay: "Overnight stay in Varanasi",
          image: aarti,
          imageAlt: "Crowds watching the evening Ganga Aarti on the ghats of Varanasi",
        },
        {
          title: "Varanasi Darshan & Departure",
          city: "Varanasi",
          detail:
            "Breakfast at the hotel, then visit Vishwanath Temple, Kaal Bhairav Temple, Tulsi Manas Mandir and Sankat Mochan Hanuman Temple. Drive to the airport for drop-off.",
          highlights: ["Kashi Vishwanath", "Kaal Bhairav", "Tulsi Manas Mandir", "Sankat Mochan"],
          stay: "Tour ends with airport drop",
          image: kashiCorridor,
          imageAlt: "Ganga Dwar gateway of the Kashi Vishwanath corridor",
        },
      ],
      inclusions: ["Hotel accommodation", "Cab", "VIP darshan at Kashi Vishwanath Temple", "Breakfast"],
      exclusions: ["Flight tickets", "Train tickets", "Lunch", "Dinner", "Personal expenses", "Boat ride"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "ayodhya-ram-darbar",
      title: "Ayodhya Ram Darbar",
      route: ["Ayodhya"],
      nights: 2,
      price: 6999,
      oldPrice: 9499,
      image: ayodhyaMandir,
      imageAlt: "Shri Ram Janmabhoomi Mandir in Ayodhya",
      heroImage: ayodhyaSaryuNight,
      heroImageAlt: "Ghats on the Saryu river in Ayodhya lit up at night",
      summary:
        "Ayodhya, the sacred birthplace of Lord Shri Ram. Temple visits, river ghats and spiritual experiences, ideal for pilgrims and family travellers.",
      types: ["pilgrimage", "family"],
      highlights: ["Shri Ram Janmabhoomi", "Saryu River Aarti", "Hanuman Garhi & Kanak Bhawan"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
      itinerary: [
        {
          title: "Arrival in Ayodhya",
          city: "Ayodhya",
          detail:
            "Arrival at Ayodhya / Faizabad railway station or airport and hotel check-in. Visit Shri Ram Janmabhoomi, Hanuman Garhi and Kanak Bhawan, with the evening free for the Saryu River Aarti.",
          highlights: ["Shri Ram Janmabhoomi", "Hanuman Garhi", "Kanak Bhawan", "Saryu River Aarti"],
          stay: "Overnight stay in Ayodhya",
          image: ayodhyaMandir,
          imageAlt: "Shri Ram Janmabhoomi Mandir in Ayodhya",
        },
        {
          title: "Ayodhya Sightseeing",
          city: "Ayodhya",
          detail:
            "Breakfast at the hotel, then visit Dashrath Mahal and Nageshwarnath Temple. Explore Ram Ki Paidi and the local markets, with an optional visit to nearby spiritual places.",
          highlights: ["Dashrath Mahal", "Nageshwarnath Temple", "Ram Ki Paidi"],
          stay: "Overnight stay in Ayodhya",
          image: ayodhyaDham,
          imageAlt: "Temples and ghats along the Saryu riverfront in Ayodhya",
        },
        {
          title: "Departure",
          city: "Ayodhya",
          detail: "Breakfast and hotel check-out, then transfer to the railway station or airport. Tour ends.",
          stay: "Tour ends with station / airport drop",
          image: ayodhyaSaryuNight,
          imageAlt: "Ghats on the Saryu river in Ayodhya lit up at night",
        },
      ],
      inclusions: [
        "2 nights hotel accommodation",
        "Daily breakfast and dinner",
        "All sightseeing by private cab",
        "Pick-up and drop (station / airport)",
        "Driver allowance, fuel and parking",
      ],
      exclusions: ["Airfare / train tickets", "Entry fees and special darshan charges", "Personal expenses (shopping, tips, laundry)", "Boat ride"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "varanasi-tour",
      title: "Varanasi Tour Package",
      route: ["Varanasi", "Sarnath"],
      nights: 2,
      price: 7999,
      oldPrice: 10499,
      image: aartiPriest,
      imageAlt: "Priest performing the evening Ganga Aarti with fire lamps in Varanasi",
      heroImage: heroAarti,
      heroImageAlt: "Priests raising flaming lamps during the evening Ganga Aarti at Assi Ghat",
      summary:
        "A short tour of sacred temples, holy ghats, Sarnath and Ramnagar Fort: spirituality, history and culture in one trip.",
      types: ["heritage", "pilgrimage"],
      highlights: ["Kashi Vishwanath & Annapurna", "Sarnath", "Ramnagar Fort"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
      itinerary: [
        {
          title: "Arrival & Ganga Aarti",
          city: "Varanasi",
          detail:
            "Arrival at Varanasi railway station or airport, hotel check-in and rest. Visit Kashi Vishwanath Temple and Annapurna Temple, then the evening Ganga Aarti at Dashashwamedh Ghat.",
          highlights: ["Kashi Vishwanath", "Annapurna Temple", "Ganga Aarti"],
          stay: "Overnight stay in Varanasi",
          image: heroKashiGhat,
          imageAlt: "Lalita Ghat, the riverside gateway to Kashi Vishwanath Dham, lit up at night",
        },
        {
          title: "Sarnath & Ramnagar Fort",
          city: "Varanasi · Sarnath",
          detail:
            "Early morning Ganga boat ride (optional, paid separately) and breakfast at the hotel. Excursion to Sarnath (Dhamek Stupa and Mulagandha Kuti Vihar), then Ramnagar Fort and Museum, and time for the local markets.",
          highlights: ["Dhamek Stupa", "Mulagandha Kuti Vihar", "Ramnagar Fort & Museum"],
          stay: "Overnight stay in Varanasi",
          image: sarnath,
          imageAlt: "Dhamek Stupa at Sarnath",
        },
        {
          title: "Departure",
          city: "Varanasi",
          detail:
            "Breakfast and hotel check-out. Visit BHU (Birla Temple) if time permits and end the journey with a Banarasi paan, then drop at the station or airport.",
          highlights: ["BHU Birla Temple", "Banarasi paan"],
          stay: "Tour ends with station / airport drop",
          image: assiGhat,
          imageAlt: "Temples and steps of Assi Ghat on the Ganga",
        },
      ],
      inclusions: [
        "2 nights hotel accommodation",
        "Daily breakfast",
        "All sightseeing by private cab",
        "Ganga Aarti assistance",
        "Pick-up and drop (station / airport)",
        "Driver allowance, fuel and parking",
      ],
      exclusions: ["Train / flight tickets", "Boat ride charges", "Entry fees at monuments", "Special darshan / pooja charges", "Personal expenses (shopping, tips, meals)"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "bodhgaya-varanasi",
      title: "Bodhgaya Varanasi Package",
      route: ["Varanasi", "Bodhgaya"],
      nights: 2,
      price: 8999,
      oldPrice: 11999,
      image: mahabodhi,
      imageAlt: "Mahabodhi Temple in Bodhgaya",
      summary:
        "The Ganga Aarti in Varanasi and the sacred Bodhi Tree in Bodhgaya, where the Buddha attained enlightenment.",
      types: ["pilgrimage", "heritage"],
      highlights: ["Ganga Aarti at Dashashwamedh", "Kashi Vishwanath Temple", "Mahabodhi Temple & Bodhi Tree"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
      itinerary: [
        {
          title: "Arrival in Varanasi",
          city: "Varanasi",
          detail: "Arrive in Varanasi, hotel check-in and rest. In the evening, attend the Ganga Aarti at Dashashwamedh Ghat.",
          highlights: ["Ganga Aarti", "Dashashwamedh Ghat"],
          stay: "Overnight stay in Varanasi",
          image: aarti,
          imageAlt: "Crowds watching the evening Ganga Aarti on the ghats of Varanasi",
        },
        {
          title: "Varanasi Sightseeing to Bodhgaya",
          city: "Varanasi → Bodhgaya",
          detail:
            "Early morning Ganga boat ride (optional, paid separately). Visit Kashi Vishwanath Temple, Annapurna Temple and Sankat Mochan Temple, then drive to Bodhgaya for hotel check-in and rest.",
          highlights: ["Kashi Vishwanath", "Annapurna Temple", "Sankat Mochan"],
          stay: "Overnight stay in Bodhgaya",
          image: kashiCorridor,
          imageAlt: "Ganga Dwar gateway of the Kashi Vishwanath corridor",
        },
        {
          title: "Bodhgaya Sightseeing & Departure",
          city: "Bodhgaya",
          detail: "Visit the Mahabodhi Temple, the Bodhi Tree, the Great Buddha Statue and Sujata Stupa. Tour ends with departure.",
          highlights: ["Mahabodhi Temple", "Bodhi Tree", "Great Buddha Statue", "Sujata Stupa"],
          stay: "Tour ends with departure",
          image: mahabodhi,
          imageAlt: "Mahabodhi Temple in Bodhgaya",
        },
      ],
      inclusions: ["2 nights hotel accommodation", "Daily breakfast", "AC private cab for sightseeing and transfers", "Driver allowance, toll and parking"],
      exclusions: ["Airfare / train tickets", "Lunch and dinner", "Entry fees at monuments and temples", "Boat ride"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "prayagraj-tour",
      title: "Prayagraj Tour Package",
      route: ["Prayagraj"],
      nights: 2,
      price: 8999,
      oldPrice: 11999,
      image: sangam,
      imageAlt: "Pilgrims and boats on the river at Triveni Sangam, Prayagraj",
      summary:
        "Prayagraj (formerly Allahabad): the Triveni Sangam, home of the Kumbh, Magh Mela and Ardh Kumbh, plus Anand Bhavan, Allahabad Fort and Khusro Bagh.",
      types: ["pilgrimage", "heritage"],
      highlights: ["Triveni Sangam", "Allahabad Fort", "Anand Bhavan"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing", "guide"],
      itinerary: [
        {
          title: "Arrival & Triveni Sangam",
          city: "Prayagraj",
          detail:
            "Arrival in Prayagraj, hotel check-in and rest. Visit the Triveni Sangam for a holy dip (boat ride optional, paid separately), explore Allahabad Fort and enjoy the evening Ganga Aarti.",
          highlights: ["Triveni Sangam", "Allahabad Fort", "Evening Ganga Aarti"],
          stay: "Overnight stay in Prayagraj",
          image: sangam,
          imageAlt: "Pilgrims and boats on the river at Triveni Sangam",
        },
        {
          title: "Prayagraj Sightseeing",
          city: "Prayagraj",
          detail:
            "After breakfast, visit Hanuman Mandir (Lete Hanuman Ji) and Alopi Devi Temple, then explore Anand Bhavan, Jawahar Planetarium and Khusro Bagh. Free time for the local markets and street food at Chowk.",
          highlights: ["Lete Hanuman Ji", "Alopi Devi Temple", "Anand Bhavan", "Khusro Bagh"],
          stay: "Overnight stay in Prayagraj",
          image: prayagraj,
          imageAlt: "New Yamuna Bridge at Prayagraj at sunset",
        },
        {
          title: "Departure",
          city: "Prayagraj",
          detail: "After breakfast, visit Akshaya Vat (if accessible) and nearby temples, then hotel check-out and departure.",
          highlights: ["Akshaya Vat"],
          stay: "Tour ends with departure",
          image: sangam,
          imageAlt: "Pilgrims and boats on the river at Triveni Sangam",
        },
      ],
      inclusions: ["Airport pickup and drop", "All sightseeing", "Hotel with breakfast", "Guide included", "Wheelchair"],
      exclusions: ["Lunch", "Dinner", "Boat ride"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
    {
      id: "ayodhya-tour-1n2d",
      title: "Ayodhya Tour Package",
      route: ["Ayodhya"],
      nights: 1,
      price: 7499,
      oldPrice: 9999,
      image: ayodhyaDham,
      imageAlt: "Temples and ghats along the Saryu riverfront in Ayodhya",
      summary: "A short Ayodhya darshan trip: Shri Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan and the temples of the old city.",
      types: ["weekend", "pilgrimage"],
      highlights: ["Shri Ram Janmabhoomi", "Hanuman Garhi", "Kanak Bhawan"],
      includes: ["hotel", "breakfast", "transfers", "sightseeing"],
      itinerary: [
        {
          title: "Arrival & Ayodhya Darshan",
          city: "Ayodhya",
          detail:
            "Arrival at Ayodhya Junction, pickup and drive to the hotel to check in and freshen up. Visit Shri Ram Janmabhoomi and Hanuman Garhi.",
          highlights: ["Shri Ram Janmabhoomi", "Hanuman Garhi"],
          stay: "Overnight stay in Ayodhya",
          image: ayodhyaMandir,
          imageAlt: "Shri Ram Janmabhoomi Mandir in Ayodhya",
        },
        {
          title: "Ayodhya Sightseeing & Departure",
          city: "Ayodhya",
          detail:
            "After breakfast, check out and continue sightseeing: Dashrath Mahal (Ramkot), Kanak Bhawan, Bharat Temple, Nageshwarnath Temple, Sri Maniram Das Chavani and Sita ki Rasoi. Drop at Ayodhya Junction.",
          highlights: ["Dashrath Mahal", "Kanak Bhawan", "Bharat Temple", "Nageshwarnath Temple", "Sita ki Rasoi"],
          stay: "Tour ends with drop at Ayodhya Junction",
          image: ayodhyaDham,
          imageAlt: "Temples and ghats along the Saryu riverfront in Ayodhya",
        },
      ],
      inclusions: ["Pickup and drop", "Complete sightseeing by a private non-AC vehicle", "Stay at 3-star hotels", "Daily breakfast", "All taxes, tolls, parking and driver expense"],
      exclusions: ["Private expenses and room service charges", "Temple entry charges", "Pony ride, doli charges, tips and activities", "Boat ride", "Anything not mentioned in inclusions"],
      onRequest: [BOAT_RIDE_ON_REQUEST],
    },
  ],
  places: {
    eyebrow: "Top Picks",
    title: "Sacred Places We'll Take You",
    lead: "Combine Kashi with Ayodhya, Prayagraj and Bodhgaya. We handle the drives, stays and temple timings.",
    cta: "Build My Custom Yatra",
    items: [
      { name: "Varanasi", tagline: "84 ghats on the Ganga", image: hero, alt: "Wooden boats on the Ganga ghats at sunrise, Varanasi" },
      { name: "Kashi Vishwanath", tagline: "Jyotirlinga & the new corridor", image: kashiCorridor, alt: "Kashi Vishwanath corridor gateway" },
      { name: "Ayodhya", tagline: "Shri Ram Janmabhoomi", image: ayodhyaMandir, alt: "Shri Ram Janmabhoomi Mandir in Ayodhya" },
      { name: "Prayagraj", tagline: "Triveni Sangam", image: sangam, alt: "Pilgrims and boats on the river at Triveni Sangam, Prayagraj" },
      { name: "Sarnath", tagline: "Where the Buddha first taught", image: sarnath, alt: "Dhamek Stupa in Sarnath" },
      { name: "Bodhgaya", tagline: "Where the Buddha found enlightenment", image: mahabodhi, alt: "Mahabodhi Temple in Bodhgaya" },
    ],
  },
  why: {
    eyebrow: "Why Srivastava Route",
    title: "We Craft Journeys, Not Just Trips",
    lead: "Travel should be transformative. Our planners combine local insight with personal service so your Kashi yatra is seamless, comfortable and deeply memorable.",
    main: aarti,
    mainAlt: "Evening Ganga Aarti on the ghats of Varanasi",
    inset: kashiCorridor,
    insetAlt: "Kashi Vishwanath corridor gateway",
    stamp: ["Har Har", "Mahadev"],
    items: [
      { title: "Tailor-Made", text: "Custom itineraries built around your dates, pace and budget, never a fixed bus tour.", icon: "compass" },
      { title: "Trusted & Safe", text: "24/7 on-trip support, verified hotels and drivers, wheelchair help on request.", icon: "shield" },
      { title: "Expert Local Guides", text: "Banaras-born guides who bring the ghats, lanes and legends to life.", icon: "guide" },
      { title: "Darshan Made Easy", text: "We plan temple timings, queues and aarti spots so you spend time in devotion, not in lines.", icon: "temple" },
    ],
  },
  steps: [
    { title: "Share your plan", text: "Tell us your dates, group size and the temples you wish to visit." },
    { title: "Get a free itinerary", text: "A Kashi specialist calls you with a personalised day-by-day plan and best price." },
    { title: "Travel worry-free", text: "Pickup, hotels, cab, guide and darshan help, all arranged before you arrive." },
  ],
  faq: {
    title: "Banaras Trip FAQs",
    lead: "Quick answers to what travellers ask us most. Still unsure? Our specialists are a call away.",
    items: [
      {
        q: "What is the best time to visit Varanasi?",
        a: "October to March is the most pleasant season, with cool mornings ideal for boat rides and ghat walks. Dev Deepawali (Kartik Purnima, usually November) is the most spectacular time, while the monsoon months bring fewer crowds and lower hotel rates.",
      },
      {
        q: "How many days are enough for a Banaras tour?",
        a: "Two days cover the essentials: Kashi Vishwanath, Ganga Aarti, a sunrise boat ride and Sarnath. With 3 to 4 days you can comfortably add Prayagraj's Triveni Sangam and Ayodhya's Ram Janmabhoomi temple.",
      },
      {
        q: "What time is the Ganga Aarti at Dashashwamedh Ghat?",
        a: "The evening Ganga Aarti starts around sunset, roughly 6:30 to 7:00 PM in summer and 5:30 to 6:00 PM in winter. Our team reserves a good viewing spot or a boat so you can watch it from the river.",
      },
      {
        q: "Can I customise a Banaras tour package?",
        a: "Yes. Every package is a starting point: you can change hotels, add or remove cities, extend your stay or travel as a large family or group. Your specialist will rework the itinerary and price for you.",
      },
      {
        q: "What is included in the package price?",
        a: "Every package includes hotel stay with breakfast, pickup and drop, and transport for sightseeing. Boat rides are not included but can be arranged on request at extra cost; other meals, entry fees and personal expenses vary by package. Each package page lists exactly what is and isn't included.",
      },
      {
        q: "Is the tour suitable for senior citizens?",
        a: "Absolutely. We plan a relaxed pace, choose hotels close to the ghats and arrange wheelchair assistance, short-walk routes and help with temple queues for elderly travellers.",
      },
    ],
  },
  credits: [
    { what: "Boats at sunrise on the Ganga, Varanasi", who: "Schwiki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Boats_at_sunrise_Ganges_River_Varanasi_Uttar_Pradesh_Schwiki.jpg" },
    { what: "Evening Ganga Aarti, Assi Ghat", who: "Rangan Datta Wiki", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Evening_Ganga_Aarti_Assi_Ghat,_Varanasi_5.jpg" },
    { what: "Ganga Aarti at Dashashwamedh Ghat from above", who: "Saaremees", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti-Dashashwamedh_Ghat_Varanasi_India-Andres_Larin.jpg" },
    { what: "Lalita Ghat at night", who: "Srijitdutta.10", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Illuminated_Splendor_of_Lalita_Ghat_in_Varanasi.jpg" },
    { what: "Mahabodhi Temple, Bodhgaya", who: "Amitabha Gupta", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Mahabodhi_temple_at_Bodhgaya_in_Bihar_01.jpg" },
    { what: "Saryu river ghats at night, Ayodhya", who: "रूही", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Sarayu_River_night_view,_Ayodhya_001.jpg" },
    { what: "Ayodhya Dham riverfront", who: "Arunvarsha", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ayodhya_Dham.jpg" },
    { what: "Triveni Sangam, Prayagraj", who: "juggadery", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Allahabad,_Triveni_Sangam_27_(39310070552).jpg" },
    { what: "Ganga Aarti in the evening", who: "Vimalinarc", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti_at_Varanasi_in_the_evening.jpg" },
    { what: "Ganga Aarti priest", who: "Philip Nalangan", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Aarti_Varanasi.jpg" },
    { what: "Kashi Vishwanath corridor", who: "Ashvin Kaitabhya / Abhishek Pandey", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Ganga_Dwar,_Gateway_of_Corridor_of_Kashi_Vishwanath_Temple,_Varanasi.webp" },
    { what: "Shri Ram Janmabhoomi Mandir", who: "Prime Minister's Office", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Shri_Ram_Janambhoomi_Mandir,_Ayodhya.jpg" },
    { what: "Assi Ghat", who: "Akshay8090", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Assi_ghat_banaras_mandiro_ka_seher.jpg" },
    { what: "Dhamek Stupa, Sarnath", who: "Hardy Explorer", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Dhamek_Stupa,_2025.jpg" },
  ],
  whatsapp: {
    greeting: "Hi! I'm interested in your Banaras tour packages.",
    teasers: ["Namaste! Planning a Kashi trip? 🙏", "Need help picking the right trip?", "Hey! Liked a package? Connect with us 👋", "Chat with a Banaras expert now →"],
  },
  messagePlaceholder: "Temples you wish to visit, hotel preference, senior citizens travelling…",
};
