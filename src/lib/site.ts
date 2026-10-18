export const site = {
  name: "Hawke’s Bay Total Mobility",
  tagline: "Honest • Reliable • Service",
  phoneDisplay: "027 352 1635",
  phoneHref: "tel:+64273521635",
  // 027 is an NZ mobile number, so "text us" opens a pre-filled text message.
  bookHref: "sms:+64273521635?&body=Hi%2C%20I%27d%20like%20to%20book%20a%20ride.",
  smsNumber: "+64273521635",
  email: "bookings@hawkesbaytotalmobility.co.nz",
  hours: "Phones answered 7am to 7pm, every day",
  afterHours: "Early flights, dialysis and late hospital discharges can be pre-booked for any time of day or night.",
  // Set NEXT_PUBLIC_SITE_URL on the host if the live domain differs.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawkesbaytotalmobility.co.nz",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Total Mobility", href: "/total-mobility" },
  { label: "About", href: "/about" },
  { label: "Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
];

/**
 * Photos. `photos/` are the client's own photos of the van (lightly colour-corrected).
 * `stock/` are real photographs licensed from Unsplash; their alt text describes what's
 * in the picture, never "our driver", so nothing pretends to be the business.
 */
export const photos = {
  heroVan: {
    src: "/images/photos/van-marine-parade-apartments.jpg",
    alt: "White Toyota HiAce passenger van parked on Marine Parade, Napier, in front of a curved apartment building and Norfolk pines",
    caption: "On Marine Parade, Napier.",
  },
  vanApartments2: {
    src: "/images/photos/van-marine-parade-apartments-2.jpg",
    alt: "The van parked beside the Norfolk pines on Marine Parade, Napier",
    caption: "Marine Parade, Napier.",
  },
  vanSide: {
    src: "/images/photos/van-marine-parade-side.jpg",
    alt: "The van turning onto Marine Parade in Napier on a sunny day",
    caption: "Heading along Marine Parade.",
  },
  vanApproach: {
    src: "/images/photos/van-marine-parade-approach.jpg",
    alt: "The van driving along Marine Parade, Napier, with the Art Deco dome and cafés behind",
    caption: "Marine Parade, Napier.",
  },
  vanPassing: {
    src: "/images/photos/van-marine-parade-passing.jpg",
    alt: "The van driving past palm trees and apartments on Marine Parade, Napier",
    caption: "Out and about in Napier.",
  },
  vanRear: {
    src: "/images/photos/van-marine-parade-rear.jpg",
    alt: "Rear view of the van driving down Marine Parade, Napier",
  },
  vanMemorial: {
    src: "/images/photos/van-war-memorial-centre.jpg",
    alt: "The van parked outside the Napier War Memorial Centre with the driver at the wheel",
    caption: "Outside the Napier War Memorial Centre.",
  },
  fleetMemorial: {
    src: "/images/photos/fleet-war-memorial-centre.jpg",
    alt: "The van and a white sedan parked outside the Napier War Memorial Centre",
    caption: "Van and car, Napier War Memorial Centre.",
  },
  fleetFlag: {
    src: "/images/photos/fleet-war-memorial-flag.jpg",
    alt: "The van and a white sedan outside the Napier War Memorial Centre with the flag flying",
  },
  // Real photography from Unsplash (free for commercial use, no attribution required). Source pages:
  // napier: unsplash.com/photos/6Qo7ku_9dKc · nurse: dMhB7w99ju8 · wheelchair car: RhMqVe3ogco (CDC)
  // walker: a6JvnH4h1pM · coffee: DcawA4jhfuE · airport: unsplash.com/photos/1711093085669 · caregiver: 2obyM4zYt3Y
  // vineyard: Cc10IJDoj78 · park: UlG-z-Kz_AI · sunset: VUOiQW4OeLI · bench: 78hTqvjYMS4
  // Branded van images generated with Codex (OpenAI image model) from the real logo and van. Not photos of the actual fleet.
  brandParade: {
    src: "/images/brand/van-parade.jpg",
    alt: "White Hawke’s Bay Total Mobility van with the company logo, parked beside Norfolk pines and the sea",
  },
  brandRamp: {
    src: "/images/brand/van-ramp.jpg",
    alt: "A driver wheeling an older woman up the rear ramp of a Hawke’s Bay Total Mobility van outside a hospital",
  },
  brandDoor: {
    src: "/images/brand/van-door.jpg",
    alt: "A driver walking beside an older man with a walking frame towards a Hawke’s Bay Total Mobility van",
  },
  brandRoad: {
    src: "/images/brand/van-road.jpg",
    alt: "A Hawke’s Bay Total Mobility van with passengers driving along a tree-lined street",
  },
  heroNapier: {
    src: "/images/stock/napier-bluff-hill-view.jpg",
    alt: "Napier and Hawke Bay seen from Bluff Hill on a cloudy day",
  },
  stepDown: {
    src: "/images/stock/nurse-with-patient.jpg",
    alt: "A nurse laughing with an older woman",
  },
  ramp: {
    src: "/images/stock/wheelchair-user-car.jpg",
    alt: "A man in a wheelchair beside the open door of a car",
  },
  shopping: {
    src: "/images/stock/walker-town-square.jpg",
    alt: "A woman with a wheeled walker in a town square lined with shops",
  },
  cafe: {
    src: "/images/stock/friends-coffee.jpg",
    alt: "Three older friends talking over coffee",
  },
  luggage: {
    src: "/images/stock/airport-terminal.jpg",
    alt: "An airport departure lounge with large windows looking onto the runway",
  },
  hospitalArrival: {
    src: "/images/stock/caregiver-walker.jpg",
    alt: "A carer holding the hands of a smiling older woman who uses a walker",
  },
  villageWalk: {
    src: "/images/stock/couple-vineyard.jpg",
    alt: "An older couple sitting together looking out over a vineyard",
  },
  companionRide: {
    src: "/images/stock/wheelchair-companion-park.jpg",
    alt: "A woman in a wheelchair in a park with a younger companion standing beside her",
  },
  frontPath: {
    src: "/images/stock/wheelchair-park-sunset.jpg",
    alt: "A person pushing a wheelchair across a park at sunset",
  },
  seasideBench: {
    src: "/images/stock/couple-seaside-bench.jpg",
    alt: "An older couple on a bench looking out to sea",
  },
} satisfies Record<string, { src: string; alt: string; caption?: string }>;

export type PhotoKey = keyof typeof photos;

export type Service = {
  slug: string;
  photo: PhotoKey;
  title: string;
  /** Short category shown on the service card. */
  tag: string;
  /** Page <title> (before the brand suffix). */
  seoTitle: string;
  short: string;
  metaDescription: string;
  intro: string;
  includes: string[];
  goodFor: string[];
  specs?: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "medical-appointments",
    photo: "stepDown",
    title: "Medical appointments",
    seoTitle: "Transport to Medical Appointments in Hawke’s Bay",
    tag: "Health",
    short: "Hospital, GP, specialist, dialysis and physio appointments.",
    metaDescription:
      "Accessible transport to hospital, GP, specialist and clinic appointments in Napier, Hastings and across Hawke’s Bay. Door-to-door help. Call 027 352 1635.",
    intro:
      "We pick you up from home, help you in and out of the van, and drop you at the right entrance for your appointment. When you’re finished, call or text and we’ll come back for you.",
    includes: [
      "Pickup from your door and drop-off at the right entrance",
      "A hand to reception or the waiting room if you’d like it",
      "Return trips when you’re ready, even if the appointment runs over",
      "Total Mobility cards, ACC claims and Health NZ travel vouchers",
      "Wheelchair-accessible vans",
    ],
    goodFor: ["Outpatient and specialist visits at Hawke’s Bay Hospital", "GP, dental and physio appointments", "Regular dialysis or chemotherapy"],
    faqs: [
      { q: "What if my appointment runs late?", a: "That happens a lot. Call or text us when you’re finished and we’ll arrange your ride home. There’s no fee for waiting on a late clinic." },
      { q: "Can a support person come with me?", a: "Yes. A family member, carer or assistance dog can travel with you at no extra charge." },
      { q: "Can you bill ACC or Health NZ directly?", a: "Yes, if your travel has been approved. Give us your ACC claim number or purchase order when you book." },
    ],
  },
  {
    slug: "wheelchair-transport",
    photo: "brandRamp",
    title: "Wheelchair transport",
    seoTitle: "Wheelchair Transport in Napier & Hastings",
    tag: "Accessibility",
    short: "Stay in your own chair. Ramp access and proper floor restraints.",
    metaDescription:
      "Wheelchair-accessible van transport in Hawke’s Bay. Ramp access, secure wheelchair restraints and door-to-door assistance. Call 027 352 1635.",
    intro:
      "You stay in your own wheelchair for the whole trip. We roll you up the ramp, strap the chair to the floor and give you a seatbelt, and we don’t rush any of it.",
    includes: [
      "Ramp access, suitable for manual chairs and most power chairs",
      "Four-point floor restraints plus a lap and sash seatbelt",
      "A seat beside you for a carer or family member",
      "Help from your door to the van and back",
    ],
    specs: [
      { label: "Ramp", value: "Fold-out rear ramp, rated to 350 kg" },
      { label: "Restraints", value: "4-point floor tie-downs and lap/sash seatbelt" },
      { label: "Headroom", value: "High-roof van, room for tall passengers and headrests" },
      { label: "Companion", value: "Seat beside the wheelchair position" },
      { label: "Payment", value: "EFTPOS, cash or Total Mobility card in the van" },
    ],
    goodFor: ["Manual and power wheelchair users", "Anyone who finds getting into a car painful or difficult", "Trips anywhere around Napier, Hastings and the Bay"],
    faqs: [
      { q: "Do I need to get out of my wheelchair?", a: "No. You stay in your own chair and we secure it to the floor of the van." },
      { q: "Will my power chair fit?", a: "Most will. If your chair is especially large or heavy, tell us the make and model when you book and we’ll check." },
      { q: "Does my carer pay extra?", a: "No. Carers and family travel with you at no extra charge." },
    ],
  },
  {
    slug: "shopping-errands",
    photo: "shopping",
    title: "Shopping & errands",
    seoTitle: "Accessible Transport for Shopping & Errands",
    tag: "Everyday",
    short: "Supermarket, pharmacy, bank and post shop, with a hand for your bags.",
    metaDescription:
      "Accessible transport for grocery shopping, banking, prescriptions and errands in Napier, Hastings and Hawke’s Bay. Help with bags. Call 027 352 1635.",
    intro:
      "Do your own shopping, at your own pace. We’ll take you to the supermarket, chemist, bank or post shop, help with the bags and bring you home.",
    includes: [
      "Supermarkets, pharmacies, banks and shops",
      "Help carrying bags between the shop, the van and your door",
      "More than one stop in a trip, if you tell us when you book",
    ],
    goodFor: ["The weekly grocery shop", "Picking up prescriptions", "Banking and paying bills in person"],
    faqs: [
      { q: "Can I make more than one stop?", a: "Yes. Tell us your stops when you book and we’ll plan the trip around them." },
      { q: "Will the driver help carry my shopping?", a: "Yes, from the shop to the van and from the van to your door." },
    ],
  },
  {
    slug: "social-outings",
    photo: "cafe",
    title: "Social outings",
    seoTitle: "Accessible Transport for Social Outings",
    tag: "Community",
    short: "Family visits, coffee with friends, church, clubs and events.",
    metaDescription:
      "Accessible transport to visit family and friends, clubs, church, cafés and events around Hawke’s Bay. Wheelchair-friendly vans. Call 027 352 1635.",
    intro:
      "Not every trip is an appointment. Visit the grandkids, meet a friend for coffee, get to club or church. We’ll get you there and back.",
    includes: ["Visits to family and friends", "Clubs, church, groups and classes", "Cafés, restaurants and local events", "A return pickup at a time that suits you"],
    goodFor: ["Regular weekly activities", "Birthdays and family occasions", "Events around Napier and Hastings"],
    faqs: [
      { q: "Can you pick me up at a set time afterwards?", a: "Yes. Give us a return time when you book, or call or text when you’re ready." },
      { q: "Can I book the same trip every week?", a: "Yes. Tell us the day and time and we’ll set it up as a regular booking." },
    ],
  },
  {
    slug: "airport-transfers",
    photo: "luggage",
    title: "Airport transfers",
    seoTitle: "Wheelchair Airport Transfers, Hawke’s Bay Airport",
    tag: "Travel",
    short: "To and from Hawke’s Bay Airport, including early and late flights.",
    metaDescription:
      "Pre-booked wheelchair-accessible airport transfers to and from Hawke’s Bay Airport in Napier. Help with luggage, door-to-door. Call 027 352 1635.",
    intro:
      "We’ll collect you from home, load your bags and drop you at the terminal kerb at Hawke’s Bay Airport. Coming home, we’ll be there to meet you.",
    includes: ["Pickups timed around your flight", "Help with luggage", "Drop-off and pickup at the terminal kerb", "Wheelchair-accessible vans"],
    goodFor: ["Holidays and family visits", "Travel out of the region for treatment", "Anyone flying with a wheelchair or walker"],
    faqs: [
      { q: "How far ahead should I book?", a: "As early as you can, especially for early-morning or late-night flights." },
      { q: "What if my flight is delayed?", a: "Give us your flight number when you book, and call or text if your plans change." },
    ],
  },
  {
    slug: "local-travel",
    photo: "brandRoad",
    title: "Getting around the Bay",
    seoTitle: "Accessible Local Transport Around Hawke’s Bay",
    tag: "Local trips",
    short: "Point-to-point trips around Napier, Hastings and the towns between.",
    metaDescription:
      "Accessible point-to-point transport around Napier, Hastings, Havelock North, Taradale and wider Hawke’s Bay. Call 027 352 1635.",
    intro:
      "Anywhere you need to go around the Bay: Napier, Hastings, Havelock North, Taradale, Flaxmere and further out on request.",
    includes: ["Trips anywhere in Napier and Hastings", "Havelock North, Taradale, Flaxmere and nearby towns", "Longer trips across Hawke’s Bay on request", "Help at both ends"],
    goodFor: ["Visiting another town in the Bay", "Work, study or volunteering", "Trips the bus doesn’t suit"],
    faqs: [
      { q: "Do you go outside Napier and Hastings?", a: "Yes. Longer trips around Hawke’s Bay can be arranged. Call or text with the details." },
      { q: "Can I book on the day?", a: "Call us and we’ll do our best. Booking ahead gives you the best chance of the time you want." },
    ],
  },
];

export const steps = [
  {
    icon: "phone",
    title: "Book your trip",
    body: "Call, text or book online. Tell us where you’re going, when, and whether you use a wheelchair or walker.",
    detail: "A day or two ahead is best",
  },
  {
    icon: "heart",
    title: "We come to your door",
    body: "Not just the kerb. We help with the ramp, your walker or your bags, and get you settled before we move off.",
    detail: "Door-to-door help, every trip",
  },
  {
    icon: "clock",
    title: "Call when you’re done",
    body: "Clinics often run late, so there’s no need to guess a finish time. Call or text when you’re ready and we’ll come back.",
    detail: "No charge for waiting on a late clinic",
  },
] as const;

export const areas: { name: string; body: string; slug?: string }[] = [
  { name: "Napier", slug: "napier", body: "Napier Hill, Ahuriri, Marewa, Onekawa, Tamatea and the Marine Parade." },
  { name: "Hastings", slug: "hastings", body: "Hastings central, Mahora, Parkvale, Akina and Hawke’s Bay Hospital." },
  { name: "Havelock North", slug: "havelock-north", body: "The village, Te Mata and surrounding streets." },
  { name: "Taradale", slug: "taradale", body: "Taradale, Greenmeadows and Pirimai." },
  { name: "Flaxmere", body: "Local trips around Flaxmere and into Hastings." },
  { name: "Clive & Haumoana", body: "Clive, Haumoana, Te Awanga and the coastal villages." },
  { name: "Bay View & Eskdale", body: "Northern Napier suburbs, and rural pickups on request." },
  { name: "Further afield", body: "Longer trips across the region can be arranged. Call or text to check." },
];

export type AreaPage = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  photo: PhotoKey;
  intro: string;
  trips: { title: string; body: string }[];
  local: string;
  faqs: { q: string; a: string }[];
};

/** Hand-written town pages — each one has its own trips and local detail, not a template swap. */
export const areaPages: AreaPage[] = [
  {
    slug: "napier",
    name: "Napier",
    metaTitle: "Wheelchair Transport in Napier",
    metaDescription:
      "Door-to-door wheelchair and mobility transport in Napier — appointments, shopping, the airport and trips to Hastings hospital. Call 027 352 1635.",
    photo: "brandParade",
    intro:
      "From Napier Hill to Tamatea and Bay View, we provide wheelchair-accessible, door-to-door transport around Napier, and across to Hastings when your appointment is at the hospital.",
    trips: [
      { title: "Hospital trips to Hastings", body: "Hawke’s Bay Hospital is in Hastings. We’ll take you there from your door in Napier and bring you home again." },
      { title: "Hawke’s Bay Airport", body: "The airport is just up the road at Westshore. We’ll get you and your luggage to the terminal kerb." },
      { title: "Shopping and the city centre", body: "Supermarkets, pharmacies, banks and the Napier CBD, with a hand for your bags." },
      { title: "The Parade and outings", body: "Cafés, the waterfront, family visits and community groups across Napier." },
    ],
    local:
      "Napier’s hills and busy central streets can be hard going with a wheelchair or walker. We pick you up at your door, including homes on Napier Hill, and drop you at the entrance you need.",
    faqs: [
      { q: "Do you cover Napier Hill?", a: "Yes. We pick up from homes on the Hill and help you from your door to the van." },
      { q: "Can you take me from Napier to the hospital in Hastings?", a: "Yes, it’s one of our most common trips. Book ahead and tell us your appointment time." },
    ],
  },
  {
    slug: "hastings",
    name: "Hastings",
    metaTitle: "Wheelchair Transport in Hastings",
    metaDescription:
      "Door-to-door wheelchair and mobility transport in Hastings — Hawke’s Bay Hospital, GP visits, shopping and social outings. Call 027 352 1635.",
    photo: "hospitalArrival",
    intro:
      "Around Hastings, Flaxmere, Mahora and Akina, we provide door-to-door accessible transport, including trips to Hawke’s Bay Hospital and back.",
    trips: [
      { title: "Hawke’s Bay Hospital", body: "Outpatient appointments, specialist visits and treatments. We drop you at the right entrance and collect you afterwards." },
      { title: "GP, dental and physio", body: "Regular appointments around Hastings, with help in and out of the van." },
      { title: "Shopping and errands", body: "Hastings CBD, supermarkets and pharmacies, with a hand for your bags." },
      { title: "Flaxmere and Havelock North", body: "Local trips between Hastings, Flaxmere and Havelock North." },
    ],
    local:
      "With the region’s main hospital in Hastings, a lot of our trips start or finish here. Tell us your appointment time and the ward or clinic when you book, and we’ll plan the pickup around it.",
    faqs: [
      { q: "Can you wait for me at the hospital?", a: "Appointment times vary, so call or text when you’re finished and we’ll come and get you." },
      { q: "Do you cover Flaxmere?", a: "Yes. Flaxmere and the surrounding Hastings suburbs are part of our regular area." },
    ],
  },
  {
    slug: "havelock-north",
    name: "Havelock North",
    metaTitle: "Wheelchair Transport Havelock North",
    metaDescription:
      "Door-to-door wheelchair and mobility transport in Havelock North — village trips, appointments and hospital visits in Hastings. Call 027 352 1635.",
    photo: "villageWalk",
    intro: "We provide door-to-door accessible transport around Havelock North: into the village, to appointments, and to Hastings for hospital visits.",
    trips: [
      { title: "The village", body: "Cafés, shops, the library and appointments in the village centre." },
      { title: "Hospital and specialists", body: "Trips to Hawke’s Bay Hospital and specialist rooms in Hastings." },
      { title: "Family and social visits", body: "Lunches, visits to friends and family, clubs and church." },
      { title: "Across the Bay", body: "Longer trips to Napier, Taradale or the airport when you need them." },
    ],
    local:
      "Havelock North is close to Hastings, so hospital and specialist trips are quick. We’ll collect you from your door, whether you’re in the village or out towards Te Mata.",
    faqs: [
      { q: "Do you pick up outside the village?", a: "Yes. We collect from homes right across Havelock North, including out towards Te Mata." },
      { q: "Can I book a regular weekly outing?", a: "Yes. Tell us your day and time and we’ll set it up." },
    ],
  },
  {
    slug: "taradale",
    name: "Taradale",
    metaTitle: "Wheelchair Transport in Taradale",
    metaDescription:
      "Door-to-door wheelchair and mobility transport in Taradale, Greenmeadows and Pirimai — appointments, shopping and hospital trips. Call 027 352 1635.",
    photo: "shopping",
    intro: "Around Taradale, Greenmeadows and Pirimai, we provide door-to-door accessible transport for appointments, shopping and trips further afield.",
    trips: [
      { title: "Taradale shops", body: "The town centre, supermarkets and pharmacies, with help carrying your shopping." },
      { title: "Medical appointments", body: "Local GPs and clinics, and trips to Hawke’s Bay Hospital in Hastings." },
      { title: "Into Napier", body: "The Napier CBD, the Marine Parade and visits around the city." },
      { title: "Social outings", body: "Clubs, church, cafés and family visits around Taradale and Greenmeadows." },
    ],
    local:
      "Taradale sits between Napier and Hastings, so it’s well placed for hospital trips and for getting into town. We’ll pick you up from your door and help you all the way.",
    faqs: [
      { q: "Do you cover Greenmeadows and Pirimai?", a: "Yes, both are part of our regular Taradale area." },
      { q: "How far ahead should I book?", a: "As early as you can for appointments. For same-day trips, call and we’ll do our best." },
    ],
  },
];
