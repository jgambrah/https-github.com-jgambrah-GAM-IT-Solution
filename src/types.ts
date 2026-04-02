export type UserRole = 'CEO' | 'Manager' | 'Staff';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: any; // Timestamp
}

export interface Flock {
  id: string;
  name: string;
  breed: string;
  source?: string;
  ageWeeks?: number;
  initialCount: number;
  currentCount: number;
  status: 'active' | 'culled';
  createdAt: any; // Timestamp
}

export interface EggProduction {
  id: string;
  flockId: string;
  date: string; // YYYY-MM-DD
  totalEggs: number;
  grading: {
    large: number;
    medium: number;
    small: number;
    cracked: number;
  };
  notes?: string;
}

export interface InventoryItem {
  id: string;
  type: 'Feed' | 'Drug' | 'Consumable';
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  updatedAt: any; // Timestamp
}

export interface Transaction {
  id: string;
  type: 'Income' | 'Expense';
  category: 'Feed' | 'Labor' | 'Meds' | 'Sales' | 'Other';
  amount: number;
  date: any; // Timestamp
  description: string;
  flockId?: string;
}

export interface HealthRecord {
  id: string;
  flockId: string;
  type: 'Vaccination' | 'Medication' | 'VetVisit';
  date: string; // YYYY-MM-DD
  description: string;
  cost?: number;
}
