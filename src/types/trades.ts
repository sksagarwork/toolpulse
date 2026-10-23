export type TradeCategory = "plumbing" | "electrical" | "hvac" | "transport" | "carpentry";

export interface ServiceItem {
  id: string;
  name: string;
  category: TradeCategory;
  description: string;
  basePrice: number;
  unit: string;
  estimatedMinutes: number;
  popular?: boolean;
}

export type JobStatus = "pending" | "dispatched" | "in_progress" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "cash_collected" | "upi_paid" | "partially_paid";

export interface JobBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  city: string;
  category: TradeCategory;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  status: JobStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  assignedTechId?: string;
  notes?: string;
  createdAt: string;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  trade: TradeCategory;
  experienceYears: number;
  rating: number;
  activeStatus: "available" | "on_job" | "off_duty";
  currentJobId?: string;
  completedJobsCount: number;
  todayEarnings: number;
}

export interface TransportVehicle {
  id: string;
  vehicleType: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  capacityKg: number;
  basePrice: number;
  perKmRate: number;
  status: "available" | "in_transit" | "maintenance";
  currentTrip?: {
    from: string;
    to: string;
    estKm: number;
    fare: number;
  };
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  type: "labour" | "part" | "transport";
}

export interface TradeInvoice {
  id: string;
  invoiceNumber: string;
  businessName: string;
  businessPhone: string;
  businessGstin?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  taxGst: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod: "UPI" | "Cash" | "Bank Transfer";
  date: string;
  notes?: string;
}
