import { useState, useMemo, FormEvent } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  User, 
  CheckCircle, 
  Receipt, 
  BookmarkCheck,
  Percent,
  Plus,
  Minus,
  Check,
  FileText,
  DollarSign
} from 'lucide-react';
import { Product, Category, Customer, Sale, SaleItem } from '../types';

interface SalesViewProps {
  products: Product[];
  categories: Category[];
  customers: Customer[];
  onAddSale: (sale: Omit<Sale, 'id' | 'date'>) => Sale;
  currency: string;
}

export default function SalesView({
  products,
  categories,
  customers,
  onAddSale,
  currency
}: SalesViewProps) {
  
  // Selection filtering for stock matching
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cart, setCart] = useState<SaleItem[]>([]);
  
  // Checkout choices
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('casual');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia' | 'QR'>('Efectivo');
  
  // Change calculator
  const [cashReceived, setCashReceived] = useState<string>('');

  // Ticket receipt popup modal
  const [completedSale, setCompletedSale] = useState<Sale | null>(null);

  // Filtered selling products
  const availableProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategoryId === 'all' || p.categoryId === selectedCategoryId;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategoryId, searchQuery]);

  // Totals calculations
  const totalAmount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.subtotal, 0);
  }, [cart]);

  // Compute calculated change in Bolivianos if Efectivo is chosen
  const cashChange = useMemo(() => {
    const receivedNum = Number(cashReceived);
    if (isNaN(receivedNum) || receivedNum < totalAmount) return 0;
    return receivedNum - totalAmount;
  }, [cashReceived, totalAmount]);

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    // Check stock first
    const cartItem = cart.find(item => item.productId === product.id);
    const cartQuantity = cartItem ? cartItem.quantity : 0;

    if (product.stock <= cartQuantity) {
      alert(`Lo lamento, no hay stock disponible de "${product.name}" para agregar más unidades del límite actual.`);
      return;
    }

    if (cartItem) {
      setCart(cart.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * product.price }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      }]);
    }
  };

  // Alter item quantity inside shopping cart directly
  const handleUpdateQuantity = (productId: string, delta: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(cart.map(item => {
      if (item.productId === productId) {
        const nextQty = item.quantity + delta;
        if (nextQty <= 0) return null; // will be filtered
        
        // Stock check limit
        if (delta > 0 && product.stock < nextQty) {
          alert(`No hay stock disponible de "${product.name}" para agregar más unidades de la tienda.`);
          return item;
        }

        return {
          ...item,
          quantity: nextQty,
          subtotal: nextQty * item.price
        };
      }
      return item;
    }).filter(Boolean) as SaleItem[]);
  };

  // Remove single item from checkout list
  const handleRemoveItem = (id: string) => {
    setCart(cart.filter(item => item.productId !== id));
  };

  // Execute checkout and generate legal/internal ticket
  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let customerName = 'Cliente Casual (Vecino Av. Jaimes Freyre)';
    if (selectedCustomerId !== 'casual') {
      const selected = customers.find(c => c.id === selectedCustomerId);
      if (selected) {
        customerName = selected.name;
      }
    }

    const saleObject = onAddSale({
      customerId: selectedCustomerId === 'casual' ? null : selectedCustomerId,
      customerName,
      items: cart,
      total: totalAmount,
      paymentMethod,
      status: 'Completado'
    });

    setCompletedSale(saleObject);

    // Reset checkout states
    setCart([]);
    setSelectedCustomerId('casual');
    setCashReceived('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Product catalog selections (cols 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-xl font-bold font-display text-[#5D4037]">Caja Registradora / POS</h2>
              <p className="text-stone-500 text-xs mt-0.5">
                Facturación y ventas rápidas con cálculo automático de cambio.
              </p>
            </div>
            
            {/* Quick category slider */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedCategoryId('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  selectedCategoryId === 'all' 
                    ? 'bg-amber-500 text-white border-amber-600' 
                    : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
                }`}
              >
                Todos
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategoryId(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    selectedCategoryId === c.id 
                      ? 'bg-amber-500 text-white border-amber-600' 
                      : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search catalog bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
            <input
              type="text"
              placeholder="Escribe para buscar productos por nombre o código SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-stone-200 focus:border-amber-500 rounded-xl text-xs font-medium focus:outline-none placeholder-stone-400 bg-white"
            />
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[62vh] overflow-y-auto pr-1">
            {availableProducts.map((p) => {
              const cartItem = cart.find(item => item.productId === p.id);
              const qtyInCart = cartItem ? cartItem.quantity : 0;
              const remainingStock = p.stock - qtyInCart;
              const isOutOfStock = remainingStock <= 0;

              return (
                <button
                  key={p.id}
                  disabled={isOutOfStock}
                  onClick={() => handleAddToCart(p)}
                  className={`
                    p-3 bg-white border-2 rounded-xl text-left shadow-sm flex flex-col justify-between h-36 relative group transition-all text-xs cursor-pointer select-none
                    ${isOutOfStock 
                      ? 'opacity-50 border-stone-200/60 bg-stone-50/50 cursor-not-allowed' 
                      : qtyInCart > 0 
                        ? 'border-amber-500 ring-2 ring-amber-400/20' 
                        : 'border-stone-200/80 hover:border-amber-400 hover:shadow-md'
                    }
                  `}
                >
                  <div className="space-y-1.5 w-full">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-2xl bg-[#FFF3E0] p-1.5 rounded-lg border border-amber-100/50 w-9 h-9 flex items-center justify-center shrink-0">
                        {p.imageAlt || '📦'}
                      </span>
                      {qtyInCart > 0 && (
                        <span className="bg-amber-500 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                          {qtyInCart}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-stone-900 line-clamp-2 leading-tight group-hover:text-amber-700 transition-colors">
                      {p.name}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 w-full font-sans">
                    <span className="font-extrabold text-stone-950 text-xs">
                      {currency} {p.price.toFixed(1)}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isOutOfStock ? 'bg-red-100 text-red-600' : remainingStock <= p.minStock ? 'bg-amber-100 text-amber-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {isOutOfStock ? 'S/ STOCK' : `${remainingStock} pzs`}
                    </span>
                  </div>
                </button>
              );
            })}
            
            {availableProducts.length === 0 && (
              <div className="col-span-full py-16 text-center text-stone-400 bg-white border-2 border-stone-200/60 rounded-2xl">
                No hay productos que coincidan con los filtros comerciales.
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Virtual Shopping Cart & Bill summary (cols 5) */}
        <div className="lg:col-span-5 bg-white border-2 border-stone-200/60 p-5 rounded-2xl shadow-sm space-y-4">
          
          {/* Header Cart */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-[#D84315]" size={18} />
              <h3 className="font-bold text-stone-900 text-sm font-display">Nota de Compra Actual</h3>
            </div>
            
            {cart.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('¿Desea vaciar por completo la canasta de compras?')) {
                    setCart([]);
                  }
                }}
                className="text-stone-400 hover:text-red-600 transition text-xs font-semibold"
              >
                Vaciar Canasta
              </button>
            )}
          </div>

          {/* Cart list items */}
          <div className="space-y-2 border-b border-dashed border-stone-200 pb-3 max-h-[35vh] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-3 p-2 hover:bg-[#FAF8F5] rounded-xl transition-all">
                <div className="space-y-0.5 w-1/2">
                  <p className="text-xs font-bold text-[#5D4037] truncate">{item.name}</p>
                  <p className="text-[10px] text-stone-500 font-medium">Unidad: {currency} {item.price.toFixed(1)}</p>
                </div>

                {/* Adjuster qty */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, -1)}
                    className="p-1 text-stone-500 hover:bg-stone-200 rounded cursor-pointer"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="font-mono font-bold text-xs text-stone-900 w-6 text-center shrink-0">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleUpdateQuantity(item.productId, 1)}
                    className="p-1 text-stone-500 hover:bg-stone-200 rounded cursor-pointer"
                  >
                    <Plus size={11} />
                  </button>
                </div>

                <div className="w-1/4 text-right">
                  <p className="font-extrabold text-[#5D4037] text-xs">
                    {currency} {item.subtotal.toFixed(1)}
                  </p>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="p-1 text-[#D84315] hover:bg-red-50 rounded cursor-pointer shrink-0"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="py-12 text-center text-stone-400 space-y-1.5 leading-normal">
                <ShoppingCart className="mx-auto text-stone-300" size={36} />
                <p className="font-semibold text-xs">Canasta de Compras Vacía</p>
                <p className="text-[10px] text-stone-400">Haz clic sobre cualquier producto del catálogo izquierdo para agregarlo a la cuenta.</p>
              </div>
            )}
          </div>

          {/* Checkout controls */}
          <form onSubmit={handleCheckout} className="space-y-4 text-xs font-semibold text-stone-700">
            
            {/* Customer Select */}
            <div className="space-y-1">
              <label className="block text-stone-500 font-medium">Asignar Cliente</label>
              <div className="flex items-center gap-1.5">
                <span className="p-2 bg-stone-100 text-stone-500 rounded-xl"><User size={14} /></span>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full py-2 px-2 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="casual">Cliente Casual (Ventas sin registro individual)</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name} ({c.phone || 'S/ Tel'})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method selection */}
            <div className="space-y-1.5">
              <label className="block text-stone-500 font-medium">Forma de Pago</label>
              <div className="grid grid-cols-4 gap-1.5 text-[10px] text-center">
                {['Efectivo', 'Tarjeta', 'QR', 'Transferencia'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => {
                      setPaymentMethod(method as any);
                      if (method !== 'Efectivo') setCashReceived('');
                    }}
                    className={`p-2 border-2 rounded-xl transition-all cursor-pointer font-bold ${
                      paymentMethod === method 
                        ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm' 
                        : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* If Efectivo is selected show Change Calculator */}
            {paymentMethod === 'Efectivo' && cart.length > 0 && (
              <div className="grid grid-cols-2 gap-4 bg-[#FAFAFA] border border-stone-200 p-3 rounded-xl">
                <div className="space-y-1">
                  <label className="block text-stone-600 text-[10px] font-bold">Monto Recibido ({currency})</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 100"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono font-bold text-sm bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <span className="block text-stone-600 text-[10px] font-bold">Cambio a Entregar</span>
                  <div className="py-2.5 text-base font-extrabold text-green-700 font-mono">
                    {currency} {cashChange.toFixed(1)}
                  </div>
                </div>
              </div>
            )}

            {/* Totals table */}
            <div className="space-y-1 bg-[#FFF3E0]/40 p-3 rounded-xl border border-amber-200/50">
              <div className="flex justify-between items-center text-stone-600">
                <span>Subtotal Neto</span>
                <span className="font-mono font-bold">{currency} {totalAmount.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 text-[11px]">
                <span>Régimen Simplificado (Impto 0%)</span>
                <span>Exento</span>
              </div>
              <div className="flex justify-between items-center text-stone-900 border-t border-amber-200/60 pt-2 text-base font-black">
                <span>Total General</span>
                <span className="font-mono text-[#D84315]">
                  {currency} {totalAmount.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Actions submit */}
            <button
              type="submit"
              disabled={cart.length === 0}
              className={`
                w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-2 border-0 cursor-pointer
                ${cart.length === 0 ? 'opacity-50 cursor-not-allowed saturate-50' : 'hover:shadow-lg active:scale-95'}
              `}
            >
              <BookmarkCheck size={16} />
              Finalizar Despacho Comercial
            </button>

          </form>

        </div>

      </div>

      {/* Invoice thermo-printer ticket modal */}
      {completedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm" />
          
          <div className="relative bg-white rounded-2xl w-full max-w-sm border-2 border-stone-300 shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            {/* Receipt decoration */}
            <div className="flex flex-col items-center justify-center space-y-2 text-center pb-4 border-b border-stone-200">
              <Receipt size={36} className="text-amber-600" />
              <h3 className="font-bold text-stone-900 font-display uppercase tracking-wider">Recibo de Caja No S.</h3>
              <p className="text-[10px] text-stone-400 font-mono">2026-05-25 • Sopocachi, La Paz - Bolivia</p>
            </div>

            {/* Simulated legal thermo receipt text */}
            <div className="py-4 space-y-4 font-mono text-[11px] text-stone-700 leading-normal">
              
              {/* Header metadata */}
              <div className="space-y-0.5 pb-2 border-b border-dashed border-stone-200">
                <div className="flex justify-between">
                  <span>ESTABLECIMIENTO:</span>
                  <span className="font-bold text-[#5D4037]">TIENDA RAUL</span>
                </div>
                <div className="flex justify-between">
                  <span>TRANSACCIÓN ID:</span>
                  <span className="font-bold">{completedSale.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLIENTE:</span>
                  <span className="font-bold truncate">{completedSale.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>HORA REGISTRO:</span>
                  <span>{new Date(completedSale.date).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Items listing table */}
              <div className="space-y-1.5 pb-2 border-b border-dashed border-stone-200">
                <div className="grid grid-cols-12 font-bold text-stone-900 pb-1">
                  <span className="col-span-6">ITEM</span>
                  <span className="col-span-2 text-center">CANT</span>
                  <span className="col-span-4 text-right">SUBTOTAL</span>
                </div>
                {completedSale.items.map((item) => (
                  <div key={item.productId} className="grid grid-cols-12">
                    <span className="col-span-6 truncate">{item.name}</span>
                    <span className="col-span-2 text-center">x{item.quantity}</span>
                    <span className="col-span-4 text-right">{currency} {item.subtotal.toFixed(1)}</span>
                  </div>
                ))}
              </div>

              {/* Payment Details */}
              <div className="space-y-1 border-b border-dashed border-stone-200 pb-2">
                <div className="flex justify-between font-bold text-stone-900 text-xs">
                  <span>TOTAL COBRADO:</span>
                  <span>{currency} {completedSale.total.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>MEDIO DE PAGO:</span>
                  <span>{completedSale.paymentMethod}</span>
                </div>
                {completedSale.paymentMethod === 'Efectivo' && (
                  <>
                    <div className="flex justify-between">
                      <span>MONTO RECIBIDO:</span>
                      <span>{currency} {Number(cashReceived).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-green-700 font-bold">
                      <span>CAMBIO ENTREGADO:</span>
                      <span>{currency} {cashChange.toFixed(1)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Standard academic footer text inside receipt */}
              <div className="text-center text-[10px] text-stone-400 space-y-1 pt-2">
                <p>--- PROYECTO ACADÉMICO UMSA ---</p>
                <p>GRACIAS POR SU COMPRA VIRTUAL</p>
                <p>La Paz - Bolivia</p>
              </div>

            </div>

            {/* Bottom accept */}
            <button
              onClick={() => setCompletedSale(null)}
              className="mt-4 w-full py-3 bg-[#5D4037] hover:bg-[#3E2723] text-white font-black rounded-xl text-center text-xs transition cursor-pointer flex items-center justify-center gap-2 border-0 shadow-md"
            >
              <Check size={14} className="text-amber-300" />
              Finalizar y Limpiar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
