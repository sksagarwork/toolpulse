export interface CityHub {
  id: string;
  cityName: string;
  state: string;
  topAreas: string[];
  monthlySearchesEst: number;
  popularServices: string[];
  activeContractorsCount: number;
}

export const INDIAN_CITY_HUBS: CityHub[] = [
  {
    id: "mumbai",
    cityName: "Mumbai",
    state: "Maharashtra",
    topAreas: ["Andheri West", "Bandra Kurla Complex", "Borivali", "Thane West", "Dadar", "Powai"],
    monthlySearchesEst: 142000,
    popularServices: ["Emergency Leakage Fix", "Chhota Hathi Tempo", "Split AC Jet Wash"],
    activeContractorsCount: 48
  },
  {
    id: "delhi-ncr",
    cityName: "Delhi-NCR",
    state: "Delhi & Haryana",
    topAreas: ["Sector 54 Gurugram", "Noida Sector 62", "Dwarka", "Rohini", "South Extension", "Indirapuram"],
    monthlySearchesEst: 189000,
    popularServices: ["AC Gas Leak Refill", "Tripping MCB Replacement", "Pickup Truck Shifting"],
    activeContractorsCount: 62
  },
  {
    id: "bengaluru",
    cityName: "Bengaluru",
    state: "Karnataka",
    topAreas: ["Whitefield", "Koramangala", "HSR Layout", "Indiranagar", "Electronic City", "Bellandur"],
    monthlySearchesEst: 165000,
    popularServices: ["Water Purifier & Drain Clearing", "1 BHK Shifting Tempo", "Ceiling Fan Repair"],
    activeContractorsCount: 54
  },
  {
    id: "pune",
    cityName: "Pune",
    state: "Maharashtra",
    topAreas: ["Kothrud", "Wakad", "Hinjawadi IT Park", "Viman Nagar", "Baner", "Hadapsar"],
    monthlySearchesEst: 88000,
    popularServices: ["Submersible Pump Fix", "Tata Ace Flatbed", "Modular Switchboard Rewiring"],
    activeContractorsCount: 36
  },
  {
    id: "hyderabad",
    cityName: "Hyderabad",
    state: "Telangana",
    topAreas: ["Gachibowli", "Hitec City", "Madhapur", "Kukatpally", "Banjara Hills", "Jubilee Hills"],
    monthlySearchesEst: 110000,
    popularServices: ["AC Deep Cleaning", "Emergency Bathroom Plumbing", "Intracity Goods Shifting"],
    activeContractorsCount: 42
  },
  {
    id: "ahmedabad",
    cityName: "Ahmedabad",
    state: "Gujarat",
    topAreas: ["SG Highway", "Bopal", "Satellite", "Maninagar", "Navrangpura", "Prahlad Nagar"],
    monthlySearchesEst: 72000,
    popularServices: ["Water Tank Sanitization", "Commercial Cargo 3-Wheeler", "Short Circuit Repair"],
    activeContractorsCount: 29
  }
];

export const RWA_VIRAL_SCRIPTS = [
  {
    id: "hinglish-emergency",
    title: "Apartment Society WhatsApp (Hinglish)",
    target: "RWA / Society WhatsApp Groups & Resident Associations",
    language: "Hinglish",
    text: `नमस्ते Society Members! 🙏

Agar kisi ko emergency mein *Plumber, Electrician, AC Mechanic ya Shifting Tempo (Chhota Hathi)* ki zaroorat ho, toh bina kisi broker commission ke directly verified technicians book kar sakte hain:

✅ Fixed & transparent rate card (No random overcharging)
✅ Verified background-checked local tradesmen
✅ 30-Day workmanship warranty
✅ Digital WhatsApp bill with GST

Book in 45 seconds here:
👉 https://sksagarwork.github.io/toolpulse/

Hope this helps society residents! Please save the link for emergency repairs. 🛠️`
  },
  {
    id: "english-professional",
    title: "Resident Welfare Association Notice (English)",
    target: "Condominium Portals (MyGate / NoBrokerHood / Apartment Adda)",
    language: "English",
    text: `Dear Residents,

For convenient home maintenance, appliance repairs, and intra-city logistics, you can now access verified local professionals via TradesOS:

🔧 Plumbing: Leak fixes, tap repairs, drain clearing
⚡ Electrical: MCB tripping, inverter wiring, switchboard fixes
❄️ HVAC: AC jet servicing, gas refills, PCB diagnostics
🚚 Freight: On-demand Tata Ace & pickup trucks for shifting

All jobs come with standardized rate cards and digital WhatsApp billing.

Instant booking link:
👉 https://sksagarwork.github.io/toolpulse/`
  },
  {
    id: "hindi-local",
    title: "Local Hardware & Shopkeepers (Hindi)",
    target: "Local hardware, paint, sanitary & electrical shop counters",
    language: "Hindi",
    text: `भाइयों और कारीगरों के लिए ज़रूरी सूचना! 📢

अब डायरी और कच्ची पर्ची पर काम लिखना बंद करें। *TradesOS* के साथ अपनी दुकान का नाम डालकर सिर्फ 10 सेकंड में पक्का WhatsApp बिल बनाएं और ग्राहक को तुरंत भेजें।

✓ कारीगरों और गाड़ियों का लाइव हिसाब
✓ फ्री डिजिटल बिलिंग सिस्टम
✓ ग्राहक सीधे आपको ऑर्डर देंगे

आज ही फ्री में शुरू करें:
👉 https://sksagarwork.github.io/toolpulse/`
  }
];
