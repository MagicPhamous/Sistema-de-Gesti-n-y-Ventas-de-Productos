import { useState, useMemo, FormEvent } from 'react';
import { 
  TrendingUp, 
  Plus, 
  Minus, 
  RefreshCcw, 
  History, 
  User, 
  CheckCircle, 
  Search,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { Product, StockTransaction } from '../types';

interface StockViewProps {
  products: Product[];
  transactions: StockTransaction[];
  onAddTransaction: (transaction: Omit<StockTransaction, 'id' | 'date'>) => void;
  currency: string;
}

export default function StockView({
  products,
  transactions,
  onAddTransaction,
  currency
}: StockViewProps) {
  // Navigation tabs nested
  const [activeTab, setActiveTab] = useState<'log' | 'record'>('log');

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ENTRADA' | 'SALIDA' | 'AJUSTE'>('ALL');

  // Form states
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [type, setType] = useState<'ENTRADA' | 'SALIDA' | 'AJUSTE'>('ENTRADA');
  const [quantity, setQuantity] = useState(5);
  const [reason, setReason] = useState('Abastecimiento rutinario de estanterías');
  const [operator, setOperator] = useState('Don Raúl Gutiérrez');

  // Computed fields
  const categoriesMap = useMemo(() => {
    const map: Record<string, string> = {};
    products.forEach(p => {
      map[p.id] = p.name;
    });
    return map;
  }, [products]);

  // Handle submit new transaction
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;

    onAddTransaction({
      productId: selectedProductId,
      productName: categoriesMap[selectedProductId] || 'Producto Desconocido',
      type,
      quantity,
      reason,
      user: operator
    });

    // Reset defaults & switch tab
    setQuantity(5);
    setReason('');
    setActiveTab('log');
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.user.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
      return matchesSearch && matchesType;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery, typeFilter]);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-[#5D4037]">Control e Historial de Stock</h2>
          <p className="text-stone-500 text-xs mt-1">
            Registra abastecimientos (entradas), cancelaciones o pérdidas (salidas), ajustes financieros y visualiza la bitácora histórica.
          </p>
        </div>
        
        {/* Tab switch buttons */}
        <div className="flex bg-stone-100 rounded-xl p-1 border-2 border-stone-200">
          <button
            onClick={() => setActiveTab('log')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'log' ? 'bg-[#5D4037] text-white shadow-sm' : 'text-stone-600 hover:text-[#5D4037]'
            }`}
          >
            <History size={14} />
            Bitácora de Movimientos
          </button>
          <button
            onClick={() => {
              if (products.length === 0) {
                alert('Deberías registrar al menos un producto antes de alterar el inventario.');
                return;
              }
              setActiveTab('record');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'record' ? 'bg-[#5D4037] text-white shadow-sm' : 'text-stone-600 hover:text-[#5D4037]'
            }`}
          >
            <Plus size={14} />
            Registrar Movimiento
          </button>
        </div>
      </div>

      {activeTab === 'log' && (
        <div className="space-y-4">
          
          {/* Filtering bar */}
          <div className="bg-white p-4 rounded-xl border-2 border-stone-200/60 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por producto, motivo u operador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-stone-100 focus:border-amber-500 rounded-lg text-xs font-medium focus:outline-none placeholder-stone-400 bg-[#FAFAFA]"
              />
            </div>

            <div className="w-full sm:w-1/4 flex items-center gap-2">
              <Filter size={14} className="text-stone-400 shrink-0" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full py-2 px-3 border-2 border-stone-100 focus:border-amber-500 rounded-lg text-xs font-semibold focus:outline-none bg-[#FAFAFA] text-[#5D4037]"
              >
                <option value="ALL">Todos los Movimientos</option>
                <option value="ENTRADA">📥 Entradas (Abastecimientos)</option>
                <option value="SALIDA">📤 Salidas (Descartes/Bajas)</option>
                <option value="AJUSTE">🔧 Ajustes Menores</option>
              </select>
            </div>

            <div className="w-full sm:w-auto text-right sm:ml-auto">
              <span className="text-xs font-semibold text-stone-500 px-3 py-1.5 bg-[#FFF3E0] rounded-lg border border-amber-200">
                {filteredTransactions.length} Movimientos Registrados
              </span>
            </div>

          </div>

          {/* Historical Logs List Table */}
          <div className="bg-white rounded-2xl border-2 border-stone-200/60 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead>
                  <tr className="bg-gradient-to-r from-stone-50 to-stone-100 border-b-2 border-stone-200 text-stone-500">
                    <th className="p-4 font-semibold w- w-36">Fecha y Hora</th>
                    <th className="p-4 font-semibold">Producto Afectado</th>
                    <th className="p-4 font-semibold text-center">Tipo de Operación</th>
                    <th className="p-4 font-semibold text-center">Variación de Cantidad</th>
                    <th className="p-4 font-semibold">Concepto / Motivo de cambio</th>
                    <th className="p-4 font-semibold">Operado por</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-medium font-sans">
                  {filteredTransactions.map((t) => {
                    let badgeColor = 'bg-green-100 text-green-700 border-green-200';
                    let typeSign = '+';
                    if (t.type === 'SALIDA') {
                      badgeColor = 'bg-red-100 text-red-700 border-red-200';
                      typeSign = '-';
                    } else if (t.type === 'AJUSTE') {
                      badgeColor = 'bg-amber-100 text-amber-700 border-amber-200';
                      typeSign = t.quantity >= 0 ? '+' : '';
                    }

                    return (
                      <tr key={t.id} className="hover:bg-[#FAF8F5]/30 transition-colors">
                        <td className="p-4 font-mono text-stone-500 whitespace-nowrap">
                          {new Date(t.date).toLocaleDateString()} {new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4 font-semibold text-[#5D4037]">{t.productName}</td>
                        <td className="p-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                            {t.type}
                          </span>
                        </td>
                        <td className={`p-4 text-center font-mono font-bold text-sm ${t.quantity >= 0 && t.type !== 'SALIDA' ? 'text-green-600' : 'text-red-600'}`}>
                          {typeSign}{t.quantity} pzs
                        </td>
                        <td className="p-4 text-stone-600 text-xs italic font-normal max-w-sm">{t.reason}</td>
                        <td className="p-4 text-stone-700">
                          <div className="flex items-center gap-1.5 font-semibold">
                            <span className="p-1 bg-stone-100 rounded-full text-stone-400 shrink-0"><User size={10} /></span>
                            <span className="truncate">{t.user}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-stone-400">
                        <History size={32} className="mx-auto text-stone-300 mb-2" />
                        No se encontraron registros en el historial de inventarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'record' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recording Form Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-stone-200/60 p-6 shadow-sm">
            <h3 className="text-base font-bold font-display text-[#5D4037] pb-3 border-b border-stone-100 mb-4">
              Registrar Movimiento Manual en Inventario
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              
              {/* Product Select */}
              <div className="space-y-1.5">
                <label className="block text-stone-600">Seleccionar Producto del Catálogo</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} (Stock Actual: {p.stock})</option>
                  ))}
                </select>
              </div>

              {/* Type and quantity row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600 font-bold">Tipo de Alteración</label>
                  <div className="grid grid-cols-3 gap-1.5 mt-1">
                    
                    <button
                      type="button"
                      onClick={() => setType('ENTRADA')}
                      className={`flex items-center justify-center gap-1 py-2 rounded-lg border-2 font-bold cursor-pointer transition-all ${
                        type === 'ENTRADA' ? 'border-green-500 bg-green-50 text-green-700' : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Plus size={12} />
                      ENTRADA
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('SALIDA')}
                      className={`flex items-center justify-center gap-1 py-2 rounded-lg border-2 font-bold cursor-pointer transition-all ${
                        type === 'SALIDA' ? 'border-red-500 bg-red-50 text-red-700' : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <Minus size={12} />
                      SALIDA
                    </button>

                    <button
                      type="button"
                      onClick={() => setType('AJUSTE')}
                      className={`flex items-center justify-center gap-1 py-2 rounded-lg border-2 font-bold cursor-pointer transition-all ${
                        type === 'AJUSTE' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <RefreshCcw size={12} />
                      AJUSTE
                    </button>

                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600">Cantidad (Piezas/Unidades)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Operator and reason info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600">Nombre del Operador a Registrar</label>
                  <input
                    type="text"
                    required
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    placeholder="Ej. Raúl Gutiérrez o Empleado"
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600">Razón / Justificación del Cambio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Reabastecimiento Central o Merma dañada"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Information warnings */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-lg flex gap-2.5">
                <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={16} />
                <p className="text-[11px] font-medium text-amber-900 leading-normal font-sans">
                  <strong>IMPORTANTE:</strong> Registrar este movimiento alterará inmediatamente de forma permanente e irreversible el stock actual de dicho producto disponible para el Punto de Venta (POS).
                </p>
              </div>

              {/* Actions submit */}
              <div className="flex gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('log')}
                  className="w-1/2 py-2.5 border-2 border-stone-200 rounded-xl hover:bg-stone-50 font-bold transition-colors cursor-pointer"
                >
                  Volver a Bitácora
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
                >
                  <CheckCircle size={15} />
                  Ejecutar Movimiento
                </button>
              </div>

            </form>
          </div>

          {/* Right informational column: Understock alerts */}
          <div className="bg-[#FFF3E0]/60 border-2 border-amber-200/60 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-amber-200">
                <AlertTriangle className="text-amber-600" size={16} />
                <h4 className="font-bold text-[#5D4037] text-xs uppercase">Estadísticas Críticas de Stock</h4>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white border border-amber-200 rounded-xl flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-semibold">Alertas de Bajo Stock</span>
                  <span className="text-sm font-extrabold text-[#D84315] font-mono">
                    {products.filter(p => p.stock <= p.minStock).length} Ítems
                  </span>
                </div>

                <div className="p-3 bg-white border border-amber-200 rounded-xl flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-semibold">Total Stock Almacenado</span>
                  <span className="text-sm font-extrabold text-stone-800 font-mono">
                    {products.reduce((acc, p) => acc + p.stock, 0)} unidades
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-stone-500 leading-relaxed font-sans">
                Para reabastecer rápidamente cualquier producto, puedes ingresar una Entrada con la cantidad adquirida o utilizar el botón de reabastecimiento directo en el panel del Dashboard.
              </div>
            </div>

            <div className="mt-8">
              <span className="block text-[10px] font-mono text-center text-amber-700">
                Sincronización de Base de Datos local activa.
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
