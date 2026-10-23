import { ServiceItem, Technician, TransportVehicle, JobBooking } from "../types/trades";

export const TRADE_CATEGORIES = [
  { id: "plumbing", name: "Plumbing & Sanitary", icon: "Wrench", desc: "Leaks, pipe fittings, taps, geyser installations" },
  { id: "electrical", name: "Electrical & Power", icon: "Zap", desc: "Short circuits, wiring, switchboards, MCBs, lighting" },
  { id: "hvac", name: "HVAC & AC Service", icon: "Airplay", desc: "Gas refill, deep foam jet service, PCB repairs, compressor" },
  { id: "transport", name: "Intracity Freight & Moving", icon: "Truck", desc: "Tempo, Tata Ace, pickup trucks, household & goods moving" },
  { id: "carpentry", name: "Carpentry & Repairs", icon: "Hammer", desc: "Door locks, furniture assembly, hinge fixes, wardrobe repairs" },
];

export const SERVICE_CATALOG: ServiceItem[] = [
  // Plumbing
  { id: "p1", name: "Tap & Mixer Leakage Repair", category: "plumbing", description: "Fix dripping taps, washers, valve replacements", basePrice: 249, unit: "per tap", estimatedMinutes: 30, popular: true },
  { id: "p2", name: "Toilet Flush Tank & Commode Fix", category: "plumbing", description: "Internal mechanism replacement, siphon, ball valve fix", basePrice: 449, unit: "per toilet", estimatedMinutes: 45, popular: true },
  { id: "p3", name: "Severe Drain Blockage Clearing", category: "plumbing", description: "High-pressure mechanical snake clearing for kitchen/bathroom drains", basePrice: 599, unit: "per point", estimatedMinutes: 60, popular: true },
  { id: "p4", name: "Water Motor / Submersible Pump Fix", category: "plumbing", description: "Motor checkup, capacitor replacement, pipe airlock release", basePrice: 799, unit: "per motor", estimatedMinutes: 90 },
  { id: "p5", name: "Water Tank Cleaning & Sanitization", category: "plumbing", description: "Mechanical sludge removal + UV disinfection for 1000L tank", basePrice: 999, unit: "per 1000L", estimatedMinutes: 120 },

  // Electrical
  { id: "e1", name: "Emergency Short Circuit & Tripping MCB", category: "electrical", description: "Diagnosis and replacement of faulty MCB / tripped main phase", basePrice: 499, unit: "per callout", estimatedMinutes: 45, popular: true },
  { id: "e2", name: "Ceiling Fan / Exhaust Installation", category: "electrical", description: "Secure unmounting, downrod balance check, heavy anchor installation", basePrice: 299, unit: "per fan", estimatedMinutes: 30 },
  { id: "e3", name: "Switchboard & Socket Modular Rewiring", category: "electrical", description: "Replace melted switch, 16A power socket for microwave/geyser", basePrice: 349, unit: "per board", estimatedMinutes: 40, popular: true },
  { id: "e4", name: "Inverter & Battery Wiring Setup", category: "electrical", description: "Complete inverter backup wiring, battery terminal greasing", basePrice: 899, unit: "per setup", estimatedMinutes: 90 },

  // HVAC
  { id: "h1", name: "Split AC Deep Jet Foam Cleaning", category: "hvac", description: "Complete indoor blower disassembly + high pressure water jacket wash", basePrice: 599, unit: "per AC unit", estimatedMinutes: 60, popular: true },
  { id: "h2", name: "AC Gas Leak Detection & Full Refill", category: "hvac", description: "Nitrogen pressure testing, flare nut brazing, R32 / R410A refrigerant charge", basePrice: 2199, unit: "per unit", estimatedMinutes: 90, popular: true },
  { id: "h3", name: "AC PCB Circuit Board Diagnostic & Repair", category: "hvac", description: "Inverter board sensor replacement, communication error code resolution", basePrice: 1299, unit: "per board", estimatedMinutes: 75 },

  // Transport
  { id: "t1", name: "Tata Ace (Chhota Hathi) - 850 KG", category: "transport", description: "Ideal for 1 BHK shifting, furniture, appliances, boxes", basePrice: 399, unit: "base fare (first 2 km)", estimatedMinutes: 45, popular: true },
  { id: "t2", name: "3-Wheeler Commercial Cargo (500 KG)", category: "transport", description: "High maneuverability through narrow city lanes, market deliveries", basePrice: 249, unit: "base fare (first 2 km)", estimatedMinutes: 30, popular: true },
  { id: "t3", name: "Pickup Truck 8-ft Flatbed (1200 KG)", category: "transport", description: "Heavy equipment, pipes, commercial goods, full household", basePrice: 699, unit: "base fare (first 3 km)", estimatedMinutes: 60 },
  { id: "t4", name: "14ft Eicher Heavy Hauler (4000 KG)", category: "transport", description: "Intercity / large warehouse relocation with dedicated loader team", basePrice: 1899, unit: "base fare", estimatedMinutes: 120 }
];

export const INITIAL_TECHNICIANS: Technician[] = [
  { id: "tech-1", name: "Ramesh Sharma", phone: "+91 98201 44521", trade: "plumbing", experienceYears: 11, rating: 4.9, activeStatus: "available", completedJobsCount: 842, todayEarnings: 1850 },
  { id: "tech-2", name: "Vikas Prajapati", phone: "+91 98112 78390", trade: "electrical", experienceYears: 8, rating: 4.8, activeStatus: "on_job", currentJobId: "job-101", completedJobsCount: 620, todayEarnings: 2400 },
  { id: "tech-3", name: "Mohammed Farhan", phone: "+91 98450 11982", trade: "hvac", experienceYears: 9, rating: 4.95, activeStatus: "available", completedJobsCount: 1120, todayEarnings: 3100 },
  { id: "tech-4", name: "Suresh Yadav", phone: "+91 97230 65412", trade: "transport", experienceYears: 14, rating: 4.85, activeStatus: "on_job", currentJobId: "job-103", completedJobsCount: 1450, todayEarnings: 4200 },
  { id: "tech-5", name: "Amit Verma", phone: "+91 99104 22319", trade: "plumbing", experienceYears: 6, rating: 4.75, activeStatus: "available", completedJobsCount: 390, todayEarnings: 950 }
];

export const INITIAL_FLEET: TransportVehicle[] = [
  { id: "veh-1", vehicleType: "Tata Ace Gold", vehicleNumber: "MH-02-CB-4821", driverName: "Suresh Yadav", driverPhone: "+91 97230 65412", capacityKg: 850, basePrice: 399, perKmRate: 28, status: "in_transit", currentTrip: { from: "Andheri East Market", to: "Goregaon West IT Park", estKm: 8.4, fare: 634 } },
  { id: "veh-2", vehicleType: "Mahindra Bolero Maxi Truck", vehicleNumber: "MH-03-DF-9102", driverName: "Balwinder Singh", driverPhone: "+91 98221 00981", capacityKg: 1300, basePrice: 699, perKmRate: 36, status: "available" },
  { id: "veh-3", vehicleType: "Bajaj Maxima Z 3-Wheeler", vehicleNumber: "MH-01-EN-3341", driverName: "Abdul Rauf", driverPhone: "+91 98334 55120", capacityKg: 500, basePrice: 249, perKmRate: 22, status: "available" },
  { id: "veh-4", vehicleType: "Eicher Pro 2049 (14-ft)", vehicleNumber: "MH-04-GH-1178", driverName: "Kailash Gurjar", driverPhone: "+91 98190 77319", capacityKg: 3500, basePrice: 1899, perKmRate: 52, status: "available" }
];

export const INITIAL_BOOKINGS: JobBooking[] = [
  {
    id: "job-101",
    customerName: "Ananya Deshmukh",
    customerPhone: "+91 98205 12345",
    address: "Flat 402, Sea Green Apts, Prabhadevi",
    city: "Mumbai",
    category: "electrical",
    serviceId: "e1",
    serviceName: "Emergency Short Circuit & Tripping MCB",
    date: "Today",
    timeSlot: "10:30 AM - 11:30 AM",
    status: "in_progress",
    paymentStatus: "unpaid",
    amount: 549,
    assignedTechId: "tech-2",
    notes: "Main breaker tripping whenever geyser is powered on.",
    createdAt: "10:05 AM"
  },
  {
    id: "job-102",
    customerName: "Kunal Mehra",
    customerPhone: "+91 98114 67890",
    address: "B-12, Sector 52, Ardee City",
    city: "Gurugram (NCR)",
    category: "hvac",
    serviceId: "h2",
    serviceName: "AC Gas Leak Detection & Full Refill",
    date: "Today",
    timeSlot: "02:00 PM - 03:30 PM",
    status: "pending",
    paymentStatus: "unpaid",
    amount: 2299,
    assignedTechId: "tech-3",
    notes: "Daikin 1.5 Ton split AC not cooling, fan working.",
    createdAt: "09:40 AM"
  },
  {
    id: "job-103",
    customerName: "Modern Furniture Hub",
    customerPhone: "+91 98330 99887",
    address: "Godown 7, Timber Market, Reay Road",
    city: "Mumbai",
    category: "transport",
    serviceId: "t1",
    serviceName: "Tata Ace (Chhota Hathi) - 850 KG",
    date: "Today",
    timeSlot: "Immediate Express",
    status: "in_progress",
    paymentStatus: "upi_paid",
    amount: 634,
    assignedTechId: "tech-4",
    notes: "Deliver 4 office desks + chairs to Goregaon.",
    createdAt: "10:15 AM"
  },
  {
    id: "job-104",
    customerName: "Dr. Arvind Hegde",
    customerPhone: "+91 98451 22345",
    address: "Villa 14, Palm Meadows, Whitefield",
    city: "Bengaluru",
    category: "plumbing",
    serviceId: "p3",
    serviceName: "Severe Drain Blockage Clearing",
    date: "Yesterday",
    timeSlot: "04:00 PM",
    status: "completed",
    paymentStatus: "upi_paid",
    amount: 699,
    assignedTechId: "tech-1",
    notes: "Kitchen sink overflow resolved. Cleared grease blockage.",
    createdAt: "Yesterday"
  }
];
