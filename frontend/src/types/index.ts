export type Role = 'PRODUCTOR' | 'COMPRADOR' | 'ADMINISTRADOR';

export type CropStatus =
  | 'PLANIFICADO'
  | 'EN_CRECIMIENTO'
  | 'LISTO_PARA_COSECHA'
  | 'COSECHADO'
  | 'PERDIDO';

export type ActivityType =
  | 'SIEMBRA'
  | 'RIEGO'
  | 'FERTILIZACION'
  | 'PODA'
  | 'COSECHA'
  | 'OTRO';

export type MeasurementUnit = 'KILOGRAMO' | 'TONELADA' | 'LIBRA' | 'BULTO' | 'UNIDAD';

export type ProductCategory =
  | 'FRUTAS'
  | 'HORTALIZAS'
  | 'GRANOS'
  | 'TUBERCULOS'
  | 'CAFE'
  | 'OTROS';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string> | null;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: Role;
  phone?: string | null;
  location?: string | null;
  active: boolean;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  location?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone?: string;
  location?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface Parcel {
  id: number;
  ownerId: number;
  name: string;
  location: string;
  area: number;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ParcelRequest {
  name: string;
  location: string;
  area: number;
  description?: string;
}

export interface Crop {
  id: number;
  parcelId: number;
  name: string;
  variety?: string | null;
  plantingDate: string;
  estimatedHarvestDate?: string | null;
  status: CropStatus;
  observations?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CropRequest {
  parcelId: number;
  name: string;
  variety?: string;
  plantingDate: string;
  estimatedHarvestDate?: string | null;
  status: CropStatus;
  observations?: string;
}

export interface AgriculturalActivity {
  id: number;
  cropId: number;
  type: ActivityType;
  activityDate: string;
  description: string;
  observations?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivityRequest {
  cropId: number;
  type: ActivityType;
  activityDate: string;
  description: string;
  observations?: string;
}

export interface Expense {
  id: number;
  ownerId: number;
  parcelId?: number | null;
  cropId?: number | null;
  concept: string;
  amount: number;
  expenseDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpenseRequest {
  parcelId?: number | null;
  cropId?: number | null;
  concept: string;
  amount: number;
  expenseDate: string;
}

export interface ProductionRecord {
  id: number;
  cropId: number;
  quantity: number;
  unit: MeasurementUnit;
  harvestDate: string;
  observations?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductionRequest {
  cropId: number;
  quantity: number;
  unit: MeasurementUnit;
  harvestDate: string;
  observations?: string;
}

export interface Product {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  availableQuantity: number;
  unit: MeasurementUnit;
  contactPhone: string;
  contactEmail: string;
  active: boolean;
  producerName?: string | null;
  producerLocation?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  availableQuantity: number;
  unit: MeasurementUnit;
  contactPhone: string;
  contactEmail: string;
  active: boolean;
}

export interface ProducerDashboard {
  parcelCount: number;
  activeCropCount: number;
  totalExpenses: number;
  productionRecordCount: number;
  publishedProductCount: number;
  recentActivities: AgriculturalActivity[];
}

export interface BuyerDashboard {
  availableProductCount: number;
  recentProducts: Product[];
}
