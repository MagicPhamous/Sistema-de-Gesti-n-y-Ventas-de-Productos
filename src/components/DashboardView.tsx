import { useMemo } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  Calendar,
  CheckCircle2, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { Product, Sale, Customer, Category } from '../types';
import { motion } from 'motion/react';

interface DashboardViewProps {
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  categories: Category[];
  currency: string;
  onNavigate: (view: any) => void;
  onRestockProduct: (productId: string, amount: number) => void;
}

export default function DashboardView({
  products,
  sales,
  customers,
  categories,
  currency,
  onNavigate,
  onRestockProduct
}: DashboardViewProps) {
  
  // Calculations
  const metrics = useMemo(() => {
    // Total revenue from completed sales
    const completedSales = sales.filter(s => s.status === 'Completado');
    const totalSalesRevenue = completedSales.reduce((acc, s) => acc + s.total, 0);

    // Today's Date in UTC (as per additional metadata 2026-05-25)
    // We will matching '2026-05-25'
    const todayStr = '2026-05-25';
    const todaySales = completedSales.filter(s => s.date.startsWith(todayStr));
    const todaySalesRevenue = todaySales.reduce((acc, s) => acc + s.total, 0);

    // Low stock items
    const lowStockItems = products.filter(p => p.stock <= p.minStock);

    return {
      totalSalesRevenue,
      todaySalesRevenue,
      todaySalesCount: todaySales.length,
      lowStockCount: lowStockItems.length,
      lowStockItems,
      totalProducts: products.length,
      totalCustomers: customers.length,
      totalCategories: categories.length
    };
  }, [products, sales, customers, categories]);

  // Daily summary list of sales (take the last 4)
  const recentSales = useMemo(() => {
    return [...sales].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [sales]);

  // Container motion presets
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-6"
    >
      {/* Banner / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-5 opacity-10 pointer-events-none">
          <TrendingUp size={180} />
        </div>
        <div className="space-y-1 relative z-10">
          <p className="text-amber-100 text-xs font-mono tracking-widest uppercase">Bienvenido de vuelta</p>
          <h2 className="text-2xl font-bold tracking-tight">Consola de Control Comercial</h2>
          <p className="text-amber-50/80 text-sm max-w-xl">
            Administra tus ventas de comida rápida, controla stocks mínimos y mantén sincronizadas todas tus existencias en tiempo real.
          </p>
        </div>
        <button
          onClick={() => onNavigate('ventas')}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-[#5D4037] font-bold py-3 px-5 rounded-xl hover:bg-amber-50 active:scale-95 transition-all text-sm shadow-md"
        >
          <ShoppingBag size={18} className="text-orange-600" />
          Nueva Venta (POS)
        </button>
      </div>

      {/* Grid statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm flex items-center justify-between group hover:border-amber-400 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider block">Ventas de Hoy</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-stone-900">{currency} {metrics.todaySalesRevenue.toFixed(1)}</span>
              <span className="text-xs text-green-600 font-bold bg-green-100 rounded px-1">{metrics.todaySalesCount} ord.</span>
            </div>
            <span className="text-[10px] text-stone-400 block font-mono">Fecha: 2026-05-25</span>
          </div>
          <div className="p-3.5 bg-amber-100 text-[#5D4037] rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <DollarSign size={22} />
          </div>
        </motion.div>

        {/* Metric 2 */}
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm flex items-center justify-between group hover:border-amber-400 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider block">Ventas Acumuladas</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-stone-900">{currency} {metrics.totalSalesRevenue.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-green-600 font-semibold block">Total ventas completadas</span>
          </div>
          <div className="p-3.5 bg-amber-100 text-[#5D4037] rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <TrendingUp size={22} />
          </div>
        </motion.div>

        {/* Metric 3 */}
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm flex items-center justify-between group hover:border-amber-400 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider block">Productos</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-stone-900">{metrics.totalProducts}</span>
              <span className="text-xs text-stone-400">ítems</span>
            </div>
            <span className="text-[10px] text-stone-500 block">En {metrics.totalCategories} categorías</span>
          </div>
          <div className="p-3.5 bg-amber-100 text-[#5D4037] rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            <PackageCheck size={22} />
          </div>
        </motion.div>

        {/* Metric 4 */}
        <motion.div variants={itemVariants} className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm flex items-center justify-between group hover:border-amber-400 transition-all duration-300 pointer-events-auto">
          <div className="space-y-1">
            <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider block">Bajo Stock</span>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-2xl font-extrabold ${metrics.lowStockCount > 0 ? 'text-red-600 animate-pulse' : 'text-stone-900'}`}>{metrics.lowStockCount}</span>
              <span className="text-xs text-stone-500">alertas</span>
            </div>
            <span className="text-[10px] text-stone-500 block">Requieren reabastecer</span>
          </div>
          <div className={`p-3.5 rounded-xl group-hover:text-white transition-all duration-300 ${metrics.lowStockCount > 0 ? 'bg-red-100 text-red-600 animate-pulse group-hover:bg-red-600' : 'bg-green-100 text-green-700 group-hover:bg-green-600'}`}>
            <AlertTriangle size={22} />
          </div>
        </motion.div>

      </div>

      {/* SECCIÓN DE PRODUCTOS DESTACADOS */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">⭐</span>
            <div>
              <h3 className="font-bold text-[#5D4037] text-sm uppercase tracking-wider font-display">Productos Destacados de "Tienda Raul"</h3>
              <p className="text-[11px] text-stone-500">Selección de los artículos más vendidos y representativos con alta demanda en Sopocachi.</p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-100 text-[#5D4037] font-bold px-2 py-1 rounded-full uppercase tracking-wider font-mono">
            Calidad Garantizada
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Producto Destacado 1 */}
          <div className="bg-[#FAF8F5] border border-stone-200/70 p-4 rounded-xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-3xl p-2 bg-amber-100 rounded-xl group-hover:scale-110 transition-transform">🧀</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">Huatajata Real</span>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Queso Criollo de Huatajata</h4>
                <p className="text-[10px] text-stone-400 font-mono">Cód: TR-LQ-01</p>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-[10px] text-stone-400 font-semibold ml-1.5">(48 ventas)</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/50 flex justify-between items-center bg-transparent">
              <div>
                <span className="text-stone-400 text-[10px] block font-medium">Precio</span>
                <span className="text-stone-900 font-extrabold text-sm">{currency} 28.00</span>
              </div>
              <span className="text-xs bg-stone-200 text-stone-700 font-bold px-2 py-1 rounded">
                Stock: {products.find(p => p.id === 'prod-1')?.stock ?? 15} pzs
              </span>
            </div>
          </div>

          {/* Producto Destacado 2 */}
          <div className="bg-[#FAF8F5] border border-stone-200/70 p-4 rounded-xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-3xl p-2 bg-amber-100 rounded-xl group-hover:scale-110 transition-transform">☕</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">100% Orgánico</span>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Café de los Yungas Premium</h4>
                <p className="text-[10px] text-stone-400 font-mono">Cód: TR-CF-01</p>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-[10px] text-stone-400 font-semibold ml-1.5">(36 ventas)</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/50 flex justify-between items-center bg-transparent">
              <div>
                <span className="text-stone-400 text-[10px] block font-medium">Precio</span>
                <span className="text-stone-900 font-extrabold text-sm">{currency} 45.00</span>
              </div>
              <span className="text-xs bg-stone-200 text-stone-700 font-bold px-2 py-1 rounded">
                Stock: {products.find(p => p.id === 'prod-3')?.stock ?? 25} pzs
              </span>
            </div>
          </div>

          {/* Producto Destacado 3 */}
          <div className="bg-[#FAF8F5] border border-stone-200/70 p-4 rounded-xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-3xl p-2 bg-amber-100 rounded-xl group-hover:scale-110 transition-transform">🍫</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">Alto Cacao</span>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-sm">Chocolate El Ceibo Semi-Amargo</h4>
                <p className="text-[10px] text-stone-400 font-mono">Cód: TR-SN-01</p>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span className="text-[10px] text-stone-400 font-semibold ml-1.5">(29 ventas)</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/50 flex justify-between items-center bg-transparent">
              <div>
                <span className="text-stone-400 text-[10px] block font-medium">Precio</span>
                <span className="text-stone-900 font-extrabold text-sm">{currency} 15.00</span>
              </div>
              <span className="text-xs bg-stone-200 text-stone-700 font-bold px-2 py-1 rounded">
                Stock: {products.find(p => p.id === 'prod-5')?.stock ?? 30} pzs
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area: Left section (low stock logs) & Right section (recent transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Section (Stock Notifications / Low Stock) */}
        <div className="lg:col-span-2 bg-[#FFF3E0]/70 border-2 border-amber-200/75 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-amber-600" size={18} />
                <h3 className="font-semibold text-[#5D4037]">Reabastecimiento Crítico</h3>
              </div>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {metrics.lowStockCount} Alerta{metrics.lowStockCount === 1 ? '' : 's'}
              </span>
            </div>

            {metrics.lowStockCount === 0 ? (
              <div className="py-12 text-center text-stone-500 space-y-2">
                <CheckCircle2 size={40} className="mx-auto text-green-600" />
                <p className="font-medium text-sm">¡Inventario Excelente!</p>
                <p className="text-xs text-stone-400">Todos los productos tienen existencias por encima de sus mínimos establecidos.</p>
              </div>
            ) : (
              <div className="divide-y divide-amber-200/60 max-h-75 overflow-y-auto pr-1">
                {metrics.lowStockItems.map((prod) => (
                  <div key={prod.id} className="py-3 flex items-center justify-between gap-2.5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{prod.imageAlt || '📦'}</span>
                        <p className="text-xs font-bold text-[#5D4037] max-w-40 truncate">{prod.name}</p>
                      </div>
                      <div className="flex gap-2 text-[10px] font-mono">
                        <span className="text-red-700 bg-red-100 px-1 rounded font-bold">Stock Actual: {prod.stock}</span>
                        <span className="text-stone-500">Mínimo: {prod.minStock}</span>
                      </div>
                    </div>
                    {/* Quick restock button: restock immediately with 20 items */}
                    <button
                      onClick={() => onRestockProduct(prod.id, 20)}
                      className="px-2.5 py-1.5 bg-amber-600 text-white text-[11px] font-bold rounded-lg hover:bg-amber-700 shadow-sm active:scale-95 transition-all whitespace-nowrap"
                    >
                      +20 Stock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => onNavigate('stock')}
            className="mt-4 w-full flex items-center justify-center gap-1 bg-amber-100 hover:bg-amber-200 text-[#5D4037] font-bold py-2 px-4 rounded-xl text-xs transition-colors"
          >
            Ver Bitácora de Movimientos
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Section (Recent Sales) */}
        <div className="lg:col-span-3 bg-white border-2 border-stone-200/60 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Calendar className="text-amber-500" size={18} />
                <h3 className="font-semibold text-stone-900">Actividad de Ventas Recientes</h3>
              </div>
              <button 
                onClick={() => onNavigate('reportes')}
                className="text-amber-600 hover:text-amber-700 text-xs font-bold transition-all"
              >
                Ver Análisis Completo
              </button>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-stone-500 border-b border-stone-100">
                    <th className="py-3 font-semibold">Cód/Orden</th>
                    <th className="py-3 font-semibold">Cliente</th>
                    <th className="py-3 font-semibold">Método</th>
                    <th className="py-3 font-semibold">Total</th>
                    <th className="py-3 font-semibold text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-3 font-mono font-medium text-[#5D4037]">{sale.id}</td>
                      <td className="py-3 font-medium truncate max-w-44">{sale.customerName}</td>
                      <td className="py-3">
                        <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-mono">
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 text-stone-900 font-bold">{currency} {sale.total.toFixed(1)}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          sale.status === 'Completado' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                        }`}>
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentSales.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-400">
                        No hay ventas registradas aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ventas')}
            className="mt-4 w-full flex items-center justify-center gap-1.5 bg-[#5D4037] hover:bg-[#4E342E] text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors shadow-sm shadow-[#5D4037]/20"
          >
            Ir al Módulo de Caja Registradora
            <ArrowRight size={14} className="text-amber-400" />
          </button>
        </div>

      </div>

    </motion.div>
  );
}
