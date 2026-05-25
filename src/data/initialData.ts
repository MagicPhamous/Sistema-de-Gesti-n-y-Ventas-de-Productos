import { Product, Category, Customer, Sale, StockTransaction, SystemSettings } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Alimentos Básicos', description: 'Arroz, fideos, azúcar, aceites y granos de primera necesidad' },
  { id: 'cat-2', name: 'Lácteos y Quesos', description: 'Leche, quesos criollos paceños, yogures, mantequillas y derivados' },
  { id: 'cat-3', name: 'Panadería y Repostería', description: 'Pan batido, pan de Laja, galletas locales y queques artesanales' },
  { id: 'cat-4', name: 'Bebidas y Refrescos', description: 'Cervezas locales, gaseosas, jugos envasados y agua de manantial' },
  { id: 'cat-5', name: 'Snacks y Chocolates', description: 'Chocolates bolivianos, papitas fritas criollas y pipocas' },
  { id: 'cat-6', name: 'Café y Té de Altura', description: 'Café de Copacabana, infusiones de coca paceña y tés aromáticos' }
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'prod-1', name: 'Queso Criollo de Huatajata (Pieza)', sku: 'TR-LQ-01', price: 28.0, cost: 18.0, stock: 15, minStock: 5, categoryId: 'cat-2', imageAlt: '🧀' },
  { id: 'prod-2', name: 'Pan de Laja Tradicional (Bolsa x10)', sku: 'TR-PA-01', price: 10.0, cost: 7.0, stock: 4, minStock: 10, categoryId: 'cat-3', imageAlt: '🥖' }, // Alerta de stock!
  { id: 'prod-3', name: 'Café de los Yungas Premium (400g)', sku: 'TR-CF-01', price: 45.0, cost: 30.0, stock: 25, minStock: 8, categoryId: 'cat-6', imageAlt: '☕' },
  { id: 'prod-4', name: 'Arroz de Grano Largo Huaycha (Kg)', sku: 'TR-AB-01', price: 8.5, cost: 5.5, stock: 65, minStock: 15, categoryId: 'cat-1', imageAlt: '🌾' },
  { id: 'prod-5', name: 'Chocolate El Ceibo Semi-Amargo', sku: 'TR-SN-01', price: 15.0, cost: 9.5, stock: 30, minStock: 10, categoryId: 'cat-5', imageAlt: '🍫' },
  { id: 'prod-6', name: 'Leche PIL Natural Entera (1L)', sku: 'TR-LQ-02', price: 6.5, cost: 4.8, stock: 8, minStock: 12, categoryId: 'cat-2', imageAlt: '🥛' }, // Alerta de stock!
  { id: 'prod-7', name: 'Gaseosa Cascada Familiar 2L', sku: 'TR-BE-01', price: 11.0, cost: 7.5, stock: 50, minStock: 15, categoryId: 'cat-4', imageAlt: '🥤' },
  { id: 'prod-8', name: 'Mate de Coca en Saquitos (Caja 50 pzs)', sku: 'TR-CF-02', price: 18.0, cost: 11.0, stock: 3, minStock: 5, categoryId: 'cat-6', imageAlt: '🍵' }, // Alerta de stock!
  { id: 'prod-9', name: 'Aceite Fino Purificado (1 Litro)', sku: 'TR-AB-02', price: 12.5, cost: 9.0, stock: 35, minStock: 10, categoryId: 'cat-1', imageAlt: '🧴' },
  { id: 'prod-10', name: 'Papitas Fritas Tinki Tradicionales', sku: 'TR-SN-02', price: 5.5, cost: 3.2, stock: 12, minStock: 15, categoryId: 'cat-5', imageAlt: '🍟' } // Alerta de stock!
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'cust-1', name: 'Nelson Paul Lopez Gutierrez', email: 'nelson.lopez@umsa.bo', phone: '69723730', address: 'Sopocachi, Pasaje Soria Galvarro Nro 210', totalPurchases: 320.0 },
  { id: 'cust-2', name: 'Kate Lucero Fernandez Saavedra', email: 'kate.fernandez@umsa.bo', phone: '77580155', address: 'San Pedro, Av. 20 de Octubre Esquina Alcoreza', totalPurchases: 450.0 },
  { id: 'cust-3', name: 'Alejandro Quintela Aguilar', email: 'ale.quintela@outlook.com', phone: '68099764', address: 'Miraflores, Belisario Salinas Nro 422', totalPurchases: 120.0 },
  { id: 'cust-4', name: 'Hernán Viscarra Arias', email: 'hernan.viscarra@gmail.com', phone: '73081425', address: 'Cota Cota, Calle 28, Bloque D-5', totalPurchases: 85.0 }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'TR-VE-001',
    date: '2026-05-21T11:20:00Z',
    customerId: 'cust-1',
    customerName: 'Nelson Paul Lopez Gutierrez',
    items: [
      { productId: 'prod-1', name: 'Queso Criollo de Huatajata (Pieza)', price: 28.0, quantity: 2, subtotal: 56.0 },
      { productId: 'prod-3', name: 'Café de los Yungas Premium (400g)', price: 45.0, quantity: 1, subtotal: 45.0 }
    ],
    total: 101.0,
    paymentMethod: 'Efectivo',
    status: 'Completado'
  },
  {
    id: 'TR-VE-002',
    date: '2026-05-22T17:45:00Z',
    customerId: 'cust-2',
    customerName: 'Kate Lucero Fernandez Saavedra',
    items: [
      { productId: 'prod-5', name: 'Chocolate El Ceibo Semi-Amargo', price: 15.0, quantity: 4, subtotal: 60.0 },
      { productId: 'prod-7', name: 'Gaseosa Cascada Familiar 2L', price: 11.0, quantity: 2, subtotal: 22.0 }
    ],
    total: 82.0,
    paymentMethod: 'QR',
    status: 'Completado'
  },
  {
    id: 'TR-VE-003',
    date: '2026-05-23T14:15:00Z',
    customerId: null,
    customerName: 'Cliente Casual (Vecino Av. Jaimes Freyre)',
    items: [
      { productId: 'prod-2', name: 'Pan de Laja Tradicional (Bolsa x10)', price: 10.0, quantity: 3, subtotal: 30.0 },
      { productId: 'prod-6', name: 'Leche PIL Natural Entera (1L)', price: 6.5, quantity: 2, subtotal: 13.0 },
      { productId: 'prod-10', name: 'Papitas Fritas Tinki Tradicionales', price: 5.5, quantity: 5, subtotal: 27.5 }
    ],
    total: 70.5,
    paymentMethod: 'Efectivo',
    status: 'Completado'
  },
  {
    id: 'TR-VE-004',
    date: '2026-05-24T09:30:00Z',
    customerId: 'cust-3',
    customerName: 'Alejandro Quintela Aguilar',
    items: [
      { productId: 'prod-3', name: 'Café de los Yungas Premium (400g)', price: 45.0, quantity: 2, subtotal: 90.0 }
    ],
    total: 90.0,
    paymentMethod: 'Tarjeta',
    status: 'Completado'
  },
  {
    id: 'TR-VE-005',
    date: '2026-05-25T15:10:00Z',
    customerId: 'cust-2',
    customerName: 'Kate Lucero Fernandez Saavedra',
    items: [
      { productId: 'prod-1', name: 'Queso Criollo de Huatajata (Pieza)', price: 28.0, quantity: 1, subtotal: 28.0 },
      { productId: 'prod-4', name: 'Arroz de Grano Largo Huaycha (Kg)', price: 8.5, quantity: 10, subtotal: 85.0 },
      { productId: 'prod-9', name: 'Aceite Fino Purificado (1 Litro)', price: 12.5, quantity: 2, subtotal: 25.0 }
    ],
    total: 138.0,
    paymentMethod: 'Transferencia',
    status: 'Completado'
  }
];

export const INITIAL_TRANSACTIONS: StockTransaction[] = [
  { id: 'st-1', date: '2026-05-20T09:00:00Z', productId: 'prod-1', productName: 'Queso Criollo de Huatajata (Pieza)', type: 'ENTRADA', quantity: 20, reason: 'Ingreso de quesos frescos desde Huatajata', user: 'Raúl Gutiérrez' },
  { id: 'st-2', date: '2026-05-21T11:20:00Z', productId: 'prod-1', productName: 'Queso Criollo de Huatajata (Pieza)', type: 'SALIDA', quantity: 2, reason: 'Venta TR-VE-001', user: 'Caja Principal' },
  { id: 'st-3', date: '2026-05-23T10:15:00Z', productId: 'prod-6', productName: 'Leche PIL Natural Entera (1L)', type: 'AJUSTE', quantity: -3, reason: 'Pérdida por derrame accidental en estante', user: 'Empleado Raúl' },
  { id: 'st-4', date: '2026-05-24T15:30:00Z', productId: 'prod-4', productName: 'Arroz de Grano Largo Huaycha (Kg)', type: 'ENTRADA', quantity: 100, reason: 'Compra mayorista distribuidor central', user: 'Don Raúl' }
];

export const DEFAULT_SETTINGS: SystemSettings = {
  storeName: 'TIENDA RAUL',
  currency: 'Bs.',
  taxRate: 0, // Régimen Simplificado boliviano (no calculan IVA por defecto)
  primaryColor: '#FF9800',
  lowStockAlert: true
};
