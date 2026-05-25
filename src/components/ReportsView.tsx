import { useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShoppingBag, 
  ArrowUpRight, 
  Calendar, 
  PieChart as PieIcon,
  Tag
} from 'lucide-react';
import { Product, Sale, Category } from '../types';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie,
  Legend
} from 'recharts';

interface ReportsViewProps {
  products: Product[];
  sales: Sale[];
  categories: Category[];
  currency: string;
}

export default function ReportsView({
  products,
  sales,
  categories,
  currency
}: ReportsViewProps) {

  // Process completed sales for time charts
  const salesHistoryData = useMemo(() => {
    // Generate dates from May 21 to May 25 (the span in our INITIAL_SALES)
    const dates = ['2026-05-21', '2026-05-22', '2026-05-23', '2026-05-24', '2026-05-25'];
    
    return dates.map(dStr => {
      // Filter sales matching this date
      const daysSales = sales.filter(s => s.status === 'Completado' && s.date.startsWith(dStr));
      const totalRevenue = daysSales.reduce((acc, s) => acc + s.total, 0);
      const ordersCount = daysSales.length;

      // Extract brief date name
      const dayLabel = new Date(dStr + 'T00:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });

      return {
        date: dayLabel,
        'Ingresos (Bs.)': totalRevenue,
        'Pedidos': ordersCount
      };
    });
  }, [sales]);

  // Process category products distribution
  const categoryDistributionData = useMemo(() => {
    return categories.map(cat => {
      const catProducts = products.filter(p => p.categoryId === cat.id);
      const totalUnits = catProducts.reduce((acc, p) => acc + p.stock, 0);

      return {
        name: cat.name.length > 20 ? cat.name.substring(0, 18) + '...' : cat.name,
        'Unidades': totalUnits,
        'Productos': catProducts.length
      };
    });
  }, [products, categories]);

  // Process top products sold
  const topProductsData = useMemo(() => {
    const productSalesMap: Record<string, { name: string; quantity: number; revenue: number }> = {};

    sales.filter(s => s.status === 'Completado').forEach(sale => {
      sale.items.forEach(item => {
        if (!productSalesMap[item.productId]) {
          productSalesMap[item.productId] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSalesMap[item.productId].quantity += item.quantity;
        productSalesMap[item.productId].revenue += item.subtotal;
      });
    });

    return Object.values(productSalesMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 6);
  }, [sales]);

  // Color Palette coordinates
  const COLORS = ['#FF9800', '#FFB300', '#D84315', '#6D4C41', '#4CAF50', '#00BCD4'];

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold font-display text-[#5D4037]">Centro de Reportes y Estadísticas</h2>
        <p className="text-stone-500 text-xs mt-1">
          Visualiza gráficos de facturación diaria, niveles de inventario por rubro general y el ranking de mercadería líder para Don Raúl.
        </p>
      </div>

      {/* Grid Row 2: Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Daily Revenue Area Chart */}
        <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <TrendingUp size={16} className="text-amber-500" />
            <h3 className="font-bold text-stone-900 text-xs uppercase">Curva de Ingresos Diarios</h3>
          </div>

          <div className="h-72 w-full text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9800" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF9800" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEFF1" />
                <XAxis dataKey="date" tick={{ fill: '#78909C' }} />
                <YAxis tick={{ fill: '#78909C' }} />
                <Tooltip formatter={(value) => [`${currency} ${value}`, 'Ingresos']} />
                <Area type="monotone" dataKey="Ingresos (Bs.)" stroke="#FF9800" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-stone-400 text-center font-sans">Evolución de ventas acumuladas durante la última semana académica.</p>
        </div>

        {/* Chart 2: Category distribution bar chart */}
        <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <PieIcon size={16} className="text-amber-500" />
            <h3 className="font-bold text-stone-900 text-xs uppercase">Existencias por Categoría</h3>
          </div>

          <div className="h-72 w-full text-[10px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECEFF1" />
                <XAxis dataKey="name" tick={{ fill: '#78909C' }} />
                <YAxis tick={{ fill: '#78909C' }} />
                <Tooltip />
                <Bar dataKey="Unidades" fill="#D84315" radius={[4, 4, 0, 0]}>
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-stone-400 text-center font-sans">Volumen total de piezas físicas almacenadas sumando todos los productos del rubro.</p>
        </div>

      </div>

      {/* Grid Row 3: Product sales table ranking leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 cols: Best sellers listings */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-stone-100">
            <ShoppingBag size={16} className="text-[#D84315]" />
            <h3 className="font-bold text-stone-900 text-xs uppercase">Ranking: Productos Más Vendidos</h3>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-stone-400 border-b border-stone-50">
                  <th className="py-3 font-semibold">Producto</th>
                  <th className="py-3 font-semibold text-center">Cant. Despachada</th>
                  <th className="py-3 font-semibold text-right">Recaudación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                {topProductsData.map((prod, index) => (
                  <tr key={prod.name} className="hover:bg-[#FAF8F5]/40">
                    <td className="py-3 flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        index === 0 ? 'bg-amber-500 text-white' : index === 1 ? 'bg-stone-300 text-stone-800' : 'bg-[#FFF3E0] text-amber-950'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="font-bold text-[#5D4037] truncate max-w-sm">{prod.name}</span>
                    </td>
                    <td className="py-3 text-center font-bold font-mono text-stone-900">{prod.quantity} unidades</td>
                    <td className="py-3 text-right font-bold text-green-700 font-mono">{currency} {prod.revenue.toFixed(1)}</td>
                  </tr>
                ))}
                {topProductsData.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-stone-400">
                      No hay datos de ventas para procesar líderes aún.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 col: Brief totals card highlights */}
        <div className="bg-gradient-to-b from-[#5D4037] to-[#3E2723] p-6 rounded-2xl text-white flex flex-col justify-between border-r-4 border-amber-500">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-orange-950/20">
              <BarChart3 className="text-amber-400" size={16} />
              <h4 className="font-bold text-amber-200 text-xs uppercase">Estadísticas de Éxito</h4>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-amber-200/60 uppercase block">Ticket Promedio por Venta</span>
                <span className="text-2xl font-black font-mono text-amber-400">
                  {currency} {sales.length > 0 ? (sales.reduce((acc, s) => acc + s.total, 0) / sales.length).toFixed(1) : '0.0'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-amber-200/60 uppercase block font-sans">Margen Comercial Promedio</span>
                <span className="text-lg font-bold text-green-300 font-mono">
                  +40% Estimado
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-orange-950/20 mt-6">
            <p className="text-[10px] text-amber-200/40 leading-relaxed font-sans">
              Datos consolidados localmente en el navegador. La exactitud de estos reportes de "Tienda Raul" está fundamentada en el flujo financiero computado en tiempo real.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
