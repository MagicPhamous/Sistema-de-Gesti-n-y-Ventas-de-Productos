export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  categoryId: string;
  imageAlt?: string; // Icon or color indicator code
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPurchases: number; // accumulated amount spent
}

export interface SaleItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  date: string;
  customerId: string | null;
  customerName: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'QR';
  status: 'Completado' | 'Cancelado';
}

export interface StockTransaction {
  id: string;
  date: string;
  productId: string;
  productName: string;
  type: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  quantity: number;
  reason: string;
  user: string;
}

export type ViewType = 
  | 'dashboard'
  | 'productos'
  | 'categorias'
  | 'stock'
  | 'ventas'
  | 'clientes'
  | 'reportes'
  | 'configuracion';

export interface SystemSettings {
  storeName: string;
  currency: string;
  taxRate: number; // e.g. 13% IVA in Bolivia, or 0
  primaryColor: string;
  lowStockAlert: boolean;
}
