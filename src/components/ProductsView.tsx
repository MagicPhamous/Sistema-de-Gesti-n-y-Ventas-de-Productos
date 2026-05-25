import { useState, useMemo, FormEvent } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  AlertTriangle, 
  Filter, 
  PlusCircle, 
  ArrowUpDown,
  CheckCircle,
  X
} from 'lucide-react';
import { Product, Category } from '../types';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
  currency: string;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsView({
  products,
  categories,
  currency,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}: ProductsViewProps) {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'normal'>('all');
  
  // Sorting state
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formCost, setFormCost] = useState(0);
  const [formStock, setFormStock] = useState(0);
  const [formMinStock, setFormMinStock] = useState(5);
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formEmoji, setFormEmoji] = useState('📦');

  // Open modal for adding
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`TR-PR-${Math.floor(100 + Math.random() * 900)}`);
    setFormPrice(15.0);
    setFormCost(10.0);
    setFormStock(20);
    setFormMinStock(8);
    setFormCategoryId(categories[0]?.id || '');
    setFormEmoji('📦');
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSku(product.sku);
    setFormPrice(product.price);
    setFormCost(product.cost);
    setFormStock(product.stock);
    setFormMinStock(product.minStock);
    setFormCategoryId(product.categoryId);
    setFormEmoji(product.imageAlt || '📦');
    setIsModalOpen(true);
  };

  // Handle submit addition/edit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const productData = {
      name: formName,
      sku: formSku,
      price: Number(formPrice),
      cost: Number(formCost),
      stock: Number(formStock),
      minStock: Number(formMinStock),
      categoryId: formCategoryId,
      imageAlt: formEmoji
    };

    if (editingProduct) {
      onUpdateProduct({ ...productData, id: editingProduct.id });
    } else {
      onAddProduct(productData);
    }
    setIsModalOpen(false);
  };

  // Filtered & Sorted products computation
  const processedProducts = useMemo(() => {
    let result = products.filter(p => {
      // Search matches
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category matches
      const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;

      // Stock filter matches
      let matchesStock = true;
      if (stockFilter === 'low') {
        matchesStock = p.stock <= p.minStock;
      } else if (stockFilter === 'normal') {
        matchesStock = p.stock > p.minStock;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });

    // Sort
    result.sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });

    return result;
  }, [products, searchTerm, selectedCategory, stockFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'name' | 'price' | 'stock') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Category map for quick lookup
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach(c => {
      map[c.id] = c.name;
    });
    return map;
  }, [categories]);

  const emojiOptions = ['🧀', '🥖', '☕', '🌾', '🍫', '🥛', '🥤', '🍵', '🧴', '🍟', '🍎', '🥩', '🥚', '🧂', '🥫', '🧹', '📦'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-[#5D4037]">Inventario de Productos</h2>
          <p className="text-stone-500 text-xs mt-1">
            Administra precios, costos, mínimos permitidos de stock y asignación de categorías para "Tienda Raul".
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white py-2.5 px-5 rounded-xl text-sm font-bold shadow-md shadow-orange-900/10 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-xl border-2 border-stone-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-stone-100 focus:border-amber-500 rounded-lg text-xs font-medium focus:outline-none transition-all placeholder-stone-400 bg-[#FAFAFA]"
          />
        </div>

        {/* Category select */}
        <div className="w-full sm:w-1/2 md:w-1/4 flex items-center gap-2">
          <Filter size={14} className="text-stone-400 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 border-2 border-stone-100 focus:border-amber-500 rounded-lg text-xs font-semibold focus:outline-none transition-all bg-[#FAFAFA] text-[#5D4037]"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Stock status filter */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="w-full py-2 px-3 border-2 border-stone-100 focus:border-amber-500 rounded-lg text-xs font-semibold focus:outline-none transition-all bg-[#FAFAFA] text-[#5D4037]"
          >
            <option value="all">Todos los Niveles de Stock</option>
            <option value="low">⚠️ Bajo Stock (Críticos)</option>
            <option value="normal">✅ Stock Suficiente</option>
          </select>
        </div>

        {/* Total stats count label */}
        <div className="w-full md:w-auto text-right md:ml-auto">
          <span className="text-xs font-semibold text-stone-500 px-3 py-1.5 bg-[#FFF3E0] rounded-lg border border-amber-200">
            {processedProducts.length} Ítems Filtrados
          </span>
        </div>
      </div>

      {/* Modern responsive inventory table */}
      <div className="bg-white rounded-2xl border-2 border-stone-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-700">
            <thead>
              <tr className="bg-gradient-to-r from-stone-50 to-stone-100 border-b-2 border-stone-200 text-stone-500">
                <th className="p-4 font-semibold w-12 text-center text-stone-400">#</th>
                <th className="p-4 font-semibold align-middle">
                  <button 
                    onClick={() => toggleSort('name')}
                    className="flex items-center gap-1.5 font-semibold hover:text-stone-900 transition-colors uppercase cursor-pointer"
                  >
                    Producto
                    <ArrowUpDown size={12} className="text-stone-400" />
                  </button>
                </th>
                <th className="p-4 font-semibold text-stone-400 uppercase">SKU / Código</th>
                <th className="p-4 font-semibold uppercase">Categoría</th>
                <th className="p-4 font-semibold">
                  <button 
                    onClick={() => toggleSort('price')}
                    className="flex items-center gap-1.5 font-semibold hover:text-stone-900 transition-colors uppercase cursor-pointer"
                  >
                    Precio Venta
                    <ArrowUpDown size={12} className="text-stone-400" />
                  </button>
                </th>
                <th className="p-4 font-semibold text-stone-500 uppercase">Costo Promedio</th>
                <th className="p-4 font-semibold">
                  <button 
                    onClick={() => toggleSort('stock')}
                    className="flex items-center gap-1.5 font-semibold hover:text-stone-900 transition-colors uppercase cursor-pointer"
                  >
                    Stock actual
                    <ArrowUpDown size={12} className="text-stone-400" />
                  </button>
                </th>
                <th className="p-4 font-semibold text-stone-400 text-center uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {processedProducts.map((p, index) => {
                const isLow = p.stock <= p.minStock;
                return (
                  <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-4 text-center font-mono text-stone-400">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-1 bg-[#FFF3E0] rounded-xl border border-amber-200/30 flex items-center justify-center shrink-0 w-10 h-10">{p.imageAlt || '📦'}</span>
                        <div>
                          <p className="font-semibold text-stone-950 text-sm">{p.name}</p>
                          {isLow && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-red-600 bg-red-100 rounded-full px-2 py-0.5 font-bold mt-1.5 animate-pulse">
                              <AlertTriangle size={8} /> Stock crítico (Mínimo: {p.minStock})
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-stone-500 text-xs">{p.sku}</td>
                    <td className="p-4 text-stone-600 font-semibold">{categoryMap[p.categoryId] || 'Sin Categoría'}</td>
                    <td className="p-4 font-bold text-stone-900">{currency} {p.price.toFixed(1)}</td>
                    <td className="p-4 text-stone-500">{currency} {p.cost.toFixed(1)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isLow ? 'bg-red-600 animate-ping' : 'bg-green-500'}`} />
                        <span className={`text-sm font-extrabold ${isLow ? 'text-red-700 font-black' : 'text-stone-950'}`}>
                          {p.stock} pzs
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                          title="Editar Producto"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Estás seguro de eliminar el producto "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-2 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          title="Eliminar de catálogo"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {processedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-stone-400">
                    <AlertTriangle size={36} className="mx-auto text-stone-300 mb-2" />
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Dialog Modal to Add or Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-[#3E2723]/30 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl w-full max-w-lg border-2 border-stone-200/80 shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Top Close */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-bold font-display text-[#5D4037] mb-4">
              {editingProduct ? 'Editar Producto del Catálogo' : 'Añadir Nuevo Producto a Tienda Raul'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              
              {/* Product name */}
              <div className="space-y-1.5">
                <label className="block text-stone-600 text-xs">Nombre Completo del Producto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Pan de Laja Tradicional (Bolsa x10)"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* SKU & Category Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">SKU / Código Barra</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">Categoría Asociada</label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cost and Selling Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">Costo de Adquisición ({currency})</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={formCost}
                    onChange={(e) => setFormCost(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">Precio de Venta al Público ({currency})</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Initial stock and alert minimum stock */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">Stock Inicial Disponible</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600 text-xs">Alerta Stock Mínimo (Mínimo)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formMinStock}
                    onChange={(e) => setFormMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Emoji Icon picker */}
              <div className="space-y-2">
                <label className="block text-stone-600 text-xs">Icono Visual del Producto</label>
                <div className="flex flex-wrap gap-1.5 p-2.5 border-2 border-stone-100 rounded-xl bg-[#FAFAFA]">
                  {emojiOptions.map((emoji) => (
                    <button
                      type="button"
                      key={emoji}
                      onClick={() => setFormEmoji(emoji)}
                      className={`
                        w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all cursor-pointer
                        ${formEmoji === emoji ? 'bg-amber-400 scale-110 shadow-sm border border-amber-300' : 'hover:bg-stone-200'}
                      `}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions submit */}
              <div className="mt-6 flex gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 border-2 border-stone-200 rounded-xl hover:bg-stone-50 font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border-0"
                >
                  <CheckCircle size={15} />
                  {editingProduct ? 'Guardar Cambios' : 'Registrar Producto'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
