export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  pricePerDay: number;
  availability: boolean;
  images: string[];
  features: string[];
  category: CarCategory;
  rating: number;
}

export type CarCategory = 'economy' | 'luxury' | 'suv' | 'sports' | 'family';

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

export interface Review {
  id: string;
  carId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  openingHours: string;
  closingHours: string;
} 