import React, { useState, useEffect } from "react";
import {
  Wrench,
  Truck,
  Hammer,
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  Plus,
  TrendingUp,
  Award,
  ChevronRight,
  Filter,
  Receipt,
  Download,
  Share2
} from "lucide-react";
import {
  TRADE_CATEGORIES,
  SERVICE_CATALOG,
  INITIAL_TECHNICIANS,
  INITIAL_FLEET,
  INITIAL_BOOKINGS
} from "../../data/tradesData";
import {
  TradeCategory,
  JobBooking,
  Technician,
  TransportVehicle,
  ServiceItem,
  JobStatus,
  PaymentStatus
} from "../../types/trades";

export const TradesOSApp: React.FC = () => {
  // Navigation Modes: "consumer" | "contractor" | "fleet" | "invoice" | "billionaire"
  const [activeMode, setActiveMode] = useState<"consumer" | "contractor" | "fleet" | "invoice" | "billionaire">("consumer");

  // State
  const [bookings, setBookings] = useState<JobBooking[]>(() => {
    const saved = localStorage.getItem("tradesos_bookings");
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [technicians] = useState<Technician[]>(INITIAL_TECHNICIANS);
  const [fleet] = useState<TransportVehicle[]>(INITIAL_FLEET);

  // Sync bookings
  useEffect(() => {
    localStorage.setItem("tradesos_bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Selected Category Filter for Consumer Mode
  const [selectedCategory, setSelectedCategory] = useState<TradeCategory | "all">("all");
  const [bookingModalItem, setBookingModalItem] = useState<ServiceItem | null>(null);

  // Booking Form State
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custCity, setCustCity] = useState("Mumbai");
  const [custSlot, setCustSlot] = useState("Immediate (Within 45 mins)");
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Contractor Dispatch State
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Fleet Freight Calculator State
  const [freightVehicle, setFreightVehicle] = useState("veh-1");
  const [freightFrom, setFreightFrom] = useState("Dharavi Market, Mumbai");
  const [freightTo, setFreightTo] = useState("Bandra Kurla Complex (BKC)");
  const [freightKm, setFreightKm] = useState(7.5);
  const [freightHelper, setFreightHelper] = useState(true);
  const [freightSuccess, setFreightSuccess] = useState(false);

  // Invoice Builder State
  const [invBusinessName, setInvBusinessName] = useState("Sharma Plumbing & Sanitary Works");
  const [invCustomerName, setInvCustomerName] = useState("Rahul Saxena");
  const [invCustomerPhone, setInvCustomerPhone] = useState("+91 98200 11223");
  const [invItems, setInvItems] = useState([
    { desc: "Emergency Main Valve & Pipe Fitting Labour", rate: 599, qty: 1, type: "labour" },
    { desc: "Heavy Duty Brass Concealed Stop Cock (Astral)", rate: 850, qty: 1, type: "part" },
    { desc: "CPVC Pipe 1-inch (2 Lengths) + Solvent Cement", rate: 420, qty: 1, type: "part" }
  ]);
  const [invDiscount, setInvDiscount] = useState(100);

  // Billionaire ARR Calculator State
  const [subStarter, setSubStarter] = useState(450); // 450 contractors @ 999/mo
  const [subPro, setSubPro] = useState(180); // 180 contractors @ 2999/mo
  const [subFleet, setSubFleet] = useState(45); // 45 logistics fleets @ 7999/mo
  const [monthlyGmv, setMonthlyGmv] = useState(3500000); // 35 Lakh booking GMV (10% take-rate)

  // Handlers
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalItem || !custName || !custPhone || !custAddress) {
      alert("Please enter customer name, phone, and complete address.");
      return;
    }

    const newBooking: JobBooking = {
      id: "job-" + (Date.now() % 10000),
      customerName: custName,
      customerPhone: custPhone,
      address: custAddress,
      city: custCity,
      category: bookingModalItem.category,
      serviceId: bookingModalItem.id,
      serviceName: bookingModalItem.name,
      date: "Today",
      timeSlot: custSlot,
      status: "pending",
      paymentStatus: "unpaid",
      amount: bookingModalItem.basePrice,
      assignedTechId: "tech-1",
      notes: "Consumer on-demand booking from TradesOS portal",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setBookings([newBooking, ...bookings]);
    setBookingSuccess(newBooking.id);
    setTimeout(() => {
      setBookingModalItem(null);
      setBookingSuccess(null);
      setCustName("");
      setCustPhone("");
      setCustAddress("");
    }, 2500);
  };

  const handleUpdateJobStatus = (jobId: string, newStatus: JobStatus) => {
    setBookings(
      bookings.map((b) => (b.id === jobId ? { ...b, status: newStatus } : b))
    );
  };

  const handleUpdatePayment = (jobId: string, newPayment: PaymentStatus) => {
    setBookings(
      bookings.map((b) => (b.id === jobId ? { ...b, paymentStatus: newPayment } : b))
    );
  };

  // Filtered Services
  const filteredServices =
    selectedCategory === "all"
      ? SERVICE_CATALOG
      : SERVICE_CATALOG.filter((s) => s.category === selectedCategory);

  // Filtered Bookings for Contractor OS
  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === statusFilter);

  // Selected Freight Vehicle
  const currentVehicle = fleet.find((v) => v.id === freightVehicle) || fleet[0];
  const calculatedFreightFare = Math.round(
    currentVehicle.basePrice +
      Math.max(0, freightKm - 2) * currentVehicle.perKmRate +
      (freightHelper ? 250 : 0)
  );

  // Invoice calculations
  const invSubtotal = invItems.reduce((acc, item) => acc + item.rate * item.qty, 0);
  const invGst = Math.round((invSubtotal - invDiscount) * 0.18);
  const invTotal = invSubtotal - invDiscount + invGst;

  // Billionaire Economics
  const mrrSubscriptions =
    subStarter * 999 + subPro * 2999 + subFleet * 7999;
  const mrrCommission = monthlyGmv * 0.10;
  const totalMonthlyRevenue = mrrSubscriptions + mrrCommission;
  const annualARR = totalMonthlyRevenue * 12;
  const valuation10x = annualARR * 10;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Billionaire Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/60 via-slate-900 to-emerald-950/60 border border-blue-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-bold uppercase tracking-wider">
              <span>Vertical SaaS & Logistics Powerhouse</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300">India 59 Billion Dollar Market</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Trades<span className="text-blue-400">OS</span> — India Blue-Collar & Logistics Cloud
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              The dual-engine platform combining <strong className="text-white">Urban Company</strong> (on-demand household bookings), <strong className="text-white">ServiceTitan</strong> (operating system for plumbers, electricians, AC contractors), and <strong className="text-white">Porter</strong> (intra-city freight & moving).
            </p>
          </div>

          {/* Quick Real-Time Engine Stats */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-400 block font-medium">Unorganized Market</span>
              <span className="text-lg font-bold text-amber-400">90%+</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-400 block font-medium">Digital Penetration</span>
              <span className="text-lg font-bold text-emerald-400">&lt; 1%</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-400 block font-medium">Urban Company Val.</span>
              <span className="text-lg font-bold text-blue-400">$2.5 Billion</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
              <span className="text-xs text-slate-400 block font-medium">ServiceTitan Val.</span>
              <span className="text-lg font-bold text-teal-400">$9.5 Billion</span>
            </div>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveMode("consumer")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === "consumer"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          <span>1. Consumer Booking Portal (Urban Company)</span>
        </button>

        <button
          onClick={() => setActiveMode("contractor")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === "contractor"
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Hammer className="w-4 h-4 text-emerald-300" />
          <span>2. Contractor Field Dispatch (ServiceTitan)</span>
          <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveMode("fleet")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === "fleet"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Truck className="w-4 h-4 text-indigo-300" />
          <span>3. Intracity Freight & Fleet (Porter)</span>
        </button>

        <button
          onClick={() => setActiveMode("invoice")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === "invoice"
              ? "bg-teal-600 text-white shadow-lg shadow-teal-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Receipt className="w-4 h-4 text-teal-300" />
          <span>4. WhatsApp GST Invoice Maker</span>
        </button>

        <button
          onClick={() => setActiveMode("billionaire")}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeMode === "billionaire"
              ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25"
              : "text-amber-400 hover:text-amber-300 hover:bg-slate-800/60"
          }`}
        >
          <TrendingUp className="w-4 h-4 text-yellow-300" />
          <span>5. 100 Crore ARR Roadmap</span>
        </button>
      </div>

      {/* MODE 1: CONSUMER BOOKING PORTAL */}
      {activeMode === "consumer" && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                All Services
              </button>
              {TRADE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as TradeCategory)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standardized Rate Cards • Background Verified Tradesmen</span>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col justify-between group hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {service.category}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                        <Award className="w-3 h-3" />
                        <span>High Demand</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>~{service.estimatedMinutes} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>30-Day Guarantee</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Standard Price</span>
                    <span className="text-lg font-black text-emerald-400">
                      ₹{service.basePrice}{" "}
                      <span className="text-xs font-normal text-slate-400">/ {service.unit}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setBookingModalItem(service)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/30"
                  >
                    <span>Book Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            <button
              onClick={() => setBookingModalItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-blue-400">Confirm On-Demand Booking</span>
              <h2 className="text-xl font-bold text-white">{bookingModalItem.name}</h2>
              <p className="text-xs text-slate-400">Fixed rate: ₹{bookingModalItem.basePrice} ({bookingModalItem.unit})</p>
            </div>

            {bookingSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-lg font-bold text-white">Technician Dispatched!</h3>
                <p className="text-xs text-slate-300">
                  Booking ID <strong className="text-emerald-300">{bookingSuccess}</strong> has been logged to the contractor dispatch queue. Ramesh Sharma will reach your address in 35-45 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Deshmukh"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">City</label>
                    <select
                      value={custCity}
                      onChange={(e) => setCustCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi-NCR">Delhi-NCR (Gurugram/Noida)</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Lucknow">Lucknow</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Complete Address / Landmark</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat number, Building name, Street, Landmark"
                    value={custAddress}
                    onChange={(e) => setCustAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Time Slot Preference</label>
                  <select
                    value={custSlot}
                    onChange={(e) => setCustSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Immediate (Within 45 mins)">Immediate Express (Within 45 mins)</option>
                    <option value="Today: 02:00 PM - 04:00 PM">Today: 02:00 PM - 04:00 PM</option>
                    <option value="Today: 05:00 PM - 07:00 PM">Today: 05:00 PM - 07:00 PM</option>
                    <option value="Tomorrow Morning (09:00 AM - 11:00 AM)">Tomorrow Morning (09:00 AM - 11:00 AM)</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Estimated Total (Pay after service)</span>
                  <span className="text-base font-bold text-emerald-400">₹{bookingModalItem.basePrice}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2"
                >
                  <span>Confirm Dispatch</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: CONTRACTOR FIELD OS (SERVICETITAN MODEL) */}
      {activeMode === "contractor" && (
        <div className="space-y-6">
          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 font-medium">Total Active Jobs</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-white">{bookings.length}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold">
                  Live Dispatch
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 font-medium">Technicians on Duty</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-emerald-400">{technicians.length}</span>
                <span className="text-xs text-slate-400">100% Verified</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 font-medium">Today Pipeline Value</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-teal-300">
                  ₹{bookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400 font-bold">+18% vs avg</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 font-medium">Pending Collections</span>
              <div className="flex items-center justify-between mt-1">
                <span className="text-2xl font-bold text-amber-400">
                  ₹{bookings
                    .filter((b) => b.paymentStatus === "unpaid")
                    .reduce((acc, b) => acc + b.amount, 0)
                    .toLocaleString()}
                </span>
                <span className="text-xs text-amber-300 font-semibold">Cash / UPI</span>
              </div>
            </div>
          </div>

          {/* Job Dispatch Board */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Hammer className="w-5 h-5 text-emerald-400" />
                  <span>Real-Time Job Dispatch & Technician Board</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Assign skilled tradesmen, track completion status, and reconcile instant payments.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2 text-xs">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="all">All Statuses ({bookings.length})</option>
                  <option value="pending">Pending</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="in_progress">In-Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Bookings Table / List */}
            <div className="space-y-3">
              {filteredBookings.map((job) => {
                const assignedTech = technicians.find((t) => t.id === job.assignedTechId);
                return (
                  <div
                    key={job.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition"
                  >
                    <div className="space-y-1.5 max-w-md">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {job.id}
                        </span>
                        <span className="text-xs text-slate-400">• {job.timeSlot}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            job.status === "completed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : job.status === "in_progress"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {job.status.replace("_", " ")}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{job.serviceName}</h4>
                      <p className="text-xs text-slate-300">
                        <strong>{job.customerName}</strong> ({job.customerPhone})
                      </p>
                      <p className="text-xs text-slate-400">{job.address}, {job.city}</p>
                    </div>

                    {/* Assigned Tech Info */}
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs space-y-1 w-full md:w-56">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Assigned Pro</span>
                        <span className="font-bold text-emerald-400">★ {assignedTech?.rating || "4.9"}</span>
                      </div>
                      <p className="font-bold text-white">{assignedTech?.name || "Ramesh Sharma"}</p>
                      <p className="text-slate-400 flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{assignedTech?.phone || "+91 98201 44521"}</span>
                      </p>
                    </div>

                    {/* Actions & Status Updates */}
                    <div className="flex flex-col items-end space-y-2 w-full md:w-auto">
                      <span className="text-base font-black text-emerald-400">
                        ₹{job.amount}
                      </span>

                      <div className="flex items-center space-x-2">
                        <select
                          value={job.status}
                          onChange={(e) => handleUpdateJobStatus(job.id, e.target.value as JobStatus)}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="in_progress">In-Progress</option>
                          <option value="completed">Completed</option>
                        </select>

                        <select
                          value={job.paymentStatus}
                          onChange={(e) => handleUpdatePayment(job.id, e.target.value as PaymentStatus)}
                          className={`rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none border ${
                            job.paymentStatus === "upi_paid" || job.paymentStatus === "cash_collected"
                              ? "bg-emerald-950 text-emerald-300 border-emerald-700/50"
                              : "bg-amber-950 text-amber-300 border-amber-700/50"
                          }`}
                        >
                          <option value="unpaid">Unpaid</option>
                          <option value="upi_paid">UPI Paid</option>
                          <option value="cash_collected">Cash Collected</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: INTRACITY FREIGHT & LOGISTICS (PORTER MODEL) */}
      {activeMode === "fleet" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Freight Booking Calculator */}
            <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-indigo-400" />
                  <span>Intracity Freight Calculator</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Instant transparent trip estimate based on vehicle capacity & distance.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Select Commercial Vehicle</label>
                  <select
                    value={freightVehicle}
                    onChange={(e) => setFreightVehicle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    {fleet.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.vehicleType} ({v.capacityKg} KG) - ₹{v.basePrice} base + ₹{v.perKmRate}/km
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Pickup Location</label>
                  <input
                    type="text"
                    value={freightFrom}
                    onChange={(e) => setFreightFrom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Drop Location</label>
                  <input
                    type="text"
                    value={freightTo}
                    onChange={(e) => setFreightTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-300 font-semibold">Estimated Distance: {freightKm} KM</label>
                    <span className="text-indigo-400 font-mono">₹{currentVehicle.perKmRate}/km</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    step="0.5"
                    value={freightKm}
                    onChange={(e) => setFreightKm(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="helperCheck"
                    checked={freightHelper}
                    onChange={(e) => setFreightHelper(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <label htmlFor="helperCheck" className="text-slate-300 cursor-pointer">
                    Add 1 Dedicated Loading Helper (+₹250)
                  </label>
                </div>

                {/* Fare Summary Box */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Fare (First 2 KM)</span>
                    <span>₹{currentVehicle.basePrice}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Distance Fare ({Math.max(0, freightKm - 2)} KM @ ₹{currentVehicle.perKmRate})</span>
                    <span>₹{Math.round(Math.max(0, freightKm - 2) * currentVehicle.perKmRate)}</span>
                  </div>
                  {freightHelper && (
                    <div className="flex justify-between text-slate-400">
                      <span>Loading Helper Fee</span>
                      <span>₹250</span>
                    </div>
                  )}
                  <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-white">Total Guaranteed Fare</span>
                    <span className="text-emerald-400 text-base">₹{calculatedFreightFare}</span>
                  </div>
                </div>

                {freightSuccess ? (
                  <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-center text-xs text-emerald-300 font-bold">
                    Driver {currentVehicle.driverName} Dispatched to Pickup!
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setFreightSuccess(true);
                      setTimeout(() => setFreightSuccess(false), 3000);
                    }}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
                  >
                    <span>Instant Driver Dispatch</span>
                    <Truck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Live Fleet Roster */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Live Commercial Fleet Management</h3>
                  <p className="text-xs text-slate-400">Real-time driver location, trip status, and load capacity.</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  {fleet.length} Vehicles Online
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fleet.map((veh) => (
                  <div
                    key={veh.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-indigo-500/40 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {veh.vehicleNumber}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{veh.vehicleType}</h4>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          veh.status === "available"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {veh.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-400">
                      <p className="flex justify-between">
                        <span>Driver:</span>
                        <strong className="text-white">{veh.driverName}</strong>
                      </p>
                      <p className="flex justify-between">
                        <span>Max Load:</span>
                        <strong className="text-indigo-400">{veh.capacityKg} KG</strong>
                      </p>
                      <p className="flex justify-between">
                        <span>Tariff:</span>
                        <strong className="text-emerald-400">₹{veh.basePrice} base + ₹{veh.perKmRate}/km</strong>
                      </p>
                    </div>

                    {veh.currentTrip && (
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                        <span className="text-blue-400 font-bold block">Current Route in Transit:</span>
                        <p className="text-slate-300 truncate">From: {veh.currentTrip.from}</p>
                        <p className="text-slate-300 truncate">To: {veh.currentTrip.to}</p>
                        <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/60 font-semibold">
                          <span>{veh.currentTrip.estKm} KM</span>
                          <span className="text-emerald-400">₹{veh.currentTrip.fare}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: INSTANT WHATSAPP GST INVOICE MAKER */}
      {activeMode === "invoice" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice Form Controls */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Receipt className="w-5 h-5 text-teal-400" />
                <span>Instant Digital Invoice Builder</span>
              </h3>
              <p className="text-xs text-slate-400">
                Generate professional bills on the job site and dispatch directly to customer WhatsApp.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Your Business Name</label>
                <input
                  type="text"
                  value={invBusinessName}
                  onChange={(e) => setInvBusinessName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={invCustomerName}
                    onChange={(e) => setInvCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Customer Phone</label>
                  <input
                    type="tel"
                    value={invCustomerPhone}
                    onChange={(e) => setInvCustomerPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Line Items List */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Billable Items (Labour & Parts)</span>
                  <button
                    onClick={() =>
                      setInvItems([
                        ...invItems,
                        { desc: "Additional Pipe / Fitting Spare", rate: 350, qty: 1, type: "part" }
                      ])
                    }
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                {invItems.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => {
                        const copy = [...invItems];
                        copy[idx].desc = e.target.value;
                        setInvItems(copy);
                      }}
                      className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                    />
                    <div className="flex items-center space-x-1">
                      <span className="text-slate-500">₹</span>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => {
                          const copy = [...invItems];
                          copy[idx].rate = parseInt(e.target.value) || 0;
                          setInvItems(copy);
                        }}
                        className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-right text-emerald-400"
                      />
                    </div>
                    <button
                      onClick={() => setInvItems(invItems.filter((_, i) => i !== idx))}
                      className="text-rose-400 hover:text-rose-300 px-1"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Discount (₹)</label>
                <input
                  type="number"
                  value={invDiscount}
                  onChange={(e) => setInvDiscount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Rendered Live Digital Invoice Preview */}
          <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest block">
                  TAX INVOICE / CASH MEMO
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{invBusinessName}</h2>
                <p className="text-xs text-slate-400">Authorized TradesOS Verified Contractor</p>
              </div>

              <div className="text-right text-xs text-slate-400 space-y-0.5">
                <p className="font-mono font-bold text-white">INV-2026-0842</p>
                <p>Date: Today</p>
                <p className="text-emerald-400 font-semibold">Payment: UPI / QR</p>
              </div>
            </div>

            <div className="text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 space-y-1">
              <span className="text-slate-500 font-bold uppercase tracking-wider block text-[10px]">Billed To:</span>
              <p className="text-white font-bold">{invCustomerName}</p>
              <p className="text-slate-400">{invCustomerPhone}</p>
            </div>

            {/* Itemized Table */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-12 text-slate-400 font-semibold border-b border-slate-800 pb-2">
                <span className="col-span-8">Description</span>
                <span className="col-span-2 text-center">Qty</span>
                <span className="col-span-2 text-right">Amount</span>
              </div>

              {invItems.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 text-slate-200 py-1 border-b border-slate-800/50">
                  <span className="col-span-8 text-white">{item.desc}</span>
                  <span className="col-span-2 text-center text-slate-400">{item.qty}</span>
                  <span className="col-span-2 text-right font-mono text-emerald-400">
                    ₹{item.rate * item.qty}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-400 border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{invSubtotal}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Discount Applied</span>
                <span>-₹{invDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18% for parts/labour)</span>
                <span>₹{invGst}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white border-t border-slate-800 pt-2">
                <span>Grand Total Payable</span>
                <span className="text-emerald-400 text-lg">₹{invTotal}</span>
              </div>
            </div>

            {/* Actions: Send WhatsApp Bill */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `*Invoice from ${invBusinessName}*
Customer: ${invCustomerName}
Total Amount: ₹${invTotal}
Thank you for choosing TradesOS verified services!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Bill to Customer WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
                title="Print Invoice"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: BILLIONAIRE ARR & VALUATION ROADMAP */}
      {activeMode === "billionaire" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/60 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Mathematical Valuation Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Path to 100 Crore ARR & Unicorn Valuation
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              India has <strong className="text-white">50 million+</strong> skilled trades businesses (plumbing, electricians, AC mechanics, carpenters, tempos). By capturing a mere <strong className="text-amber-300">0.05% of this market</strong>, TradesOS generates massive recurring SaaS fees and marketplace take-rate.
            </p>
          </div>

          {/* Interactive Simulation Sliders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-5">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span>Simulate Your Business Network</span>
              </h3>

              {/* Slider 1: Starter Plan */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Solo Contractors on Starter Plan (₹999/mo)
                  </span>
                  <span className="text-amber-400 font-bold">{subStarter} contractors</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={subStarter}
                  onChange={(e) => setSubStarter(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">
                  Monthly: ₹{(subStarter * 999).toLocaleString()}/mo
                </span>
              </div>

              {/* Slider 2: Growth Pro Plan */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Mid-Size Trade Contractors on Pro (₹2,999/mo)
                  </span>
                  <span className="text-emerald-400 font-bold">{subPro} businesses</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="20"
                  value={subPro}
                  onChange={(e) => setSubPro(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">
                  Monthly: ₹{(subPro * 2999).toLocaleString()}/mo
                </span>
              </div>

              {/* Slider 3: Fleet Logistics Plan */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Fleet Operators & Logistics Hubs (₹7,999/mo)
                  </span>
                  <span className="text-indigo-400 font-bold">{subFleet} fleets</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={subFleet}
                  onChange={(e) => setSubFleet(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">
                  Monthly: ₹{(subFleet * 7999).toLocaleString()}/mo
                </span>
              </div>

              {/* Slider 4: Marketplace GMV */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">
                    Consumer Marketplace GMV (10% Take Rate)
                  </span>
                  <span className="text-teal-400 font-bold">₹{(monthlyGmv / 100000).toFixed(1)} Lakh/mo</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="500000"
                  value={monthlyGmv}
                  onChange={(e) => setMonthlyGmv(parseInt(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">
                  Take-rate commission: ₹{(monthlyGmv * 0.1).toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Live Real-Time Financial Valuation Output */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                  Live Financial Model Output
                </span>
                <h4 className="text-xl font-bold text-white mt-1">Compound Recurring Wealth</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Monthly Recurring Revenue (MRR)</span>
                    <span className="text-2xl font-black text-emerald-400">
                      ₹{Math.round(totalMonthlyRevenue).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Recurring / Month
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Annual Run-Rate (ARR)</span>
                    <span className="text-3xl font-black text-amber-400">
                      ₹{(annualARR / 10000000).toFixed(2)} Crore
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    ₹{Math.round(annualARR).toLocaleString()}/yr
                  </span>
                </div>

                <div className="bg-gradient-to-r from-amber-950/80 to-blue-950/80 p-5 rounded-xl border border-amber-500/50 space-y-1">
                  <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                    Enterprise Valuation (at 10x EV/ARR SaaS Multiple)
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    ₹{(valuation10x / 10000000).toFixed(1)} Crore
                  </span>
                  <p className="text-xs text-slate-300 pt-1">
                    Equivalent to approx. <strong className="text-emerald-300">${(valuation10x / 860000000).toFixed(2)} Million USD</strong> in venture equity.
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  High retention business: Once a contractor manages their daily jobs, workers, and GST invoices on TradesOS, churn drops below 1.5% per month.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
