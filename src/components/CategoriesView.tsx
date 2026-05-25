import { useState, FormEvent } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Folder, 
  Layers,
  CheckCircle,
  X
} from 'lucide-react';
import { Category, Product } from '../types';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
}

export default function CategoriesView({
  categories,
  products,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: CategoriesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const countProductsInCategory = (catId: string) => {
    return products.filter(p => p.categoryId === catId).length;
  };

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormDescription(cat.description);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingCategory) {
      onUpdateCategory({
        id: editingCategory.id,
        name: formName,
        description: formDescription
      });
    } else {
      onAddCategory({
        name: formName,
        description: formDescription
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-[#5D4037]">Gestión de Categorías</h2>
          <p className="text-stone-500 text-xs mt-1">
            Define los rubros de comercialización de la tienda para estructurar y organizar el catálogo de productos.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white py-2.5 px-5 rounded-xl text-sm font-bold shadow-md shadow-orange-900/10 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Crear Categoría
        </button>
      </div>

      {/* Categories Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {categories.map((cat) => {
          const productCount = countProductsInCategory(cat.id);
          return (
            <div 
              key={cat.id} 
              className="bg-white rounded-2xl border-2 border-stone-200/60 p-5 shadow-sm hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-2xl" />

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#FFF3E0] text-[#D84315] rounded-xl">
                    <Folder size={18} />
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-700 transition-colors">{cat.name}</h3>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed font-normal">
                  {cat.description || 'Sin descripción brindada.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                  {productCount} {productCount === 1 ? 'Producto asignado' : 'Productos asignados'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(cat)}
                    className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer text-xs"
                    title="Editar"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (productCount > 0) {
                        alert(`No puedes eliminar la categoría "${cat.name}" porque tiene ${productCount} productos asignados. Mueve primero estos productos a otra categoría.`);
                        return;
                      }
                      if (window.confirm(`¿Estás seguro de eliminar la categoría "${cat.name}"?`)) {
                        onDeleteCategory(cat.id);
                      }
                    }}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-xs"
                    title="Eliminar"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {categories.length === 0 && (
          <div className="col-span-full py-16 text-center text-stone-400 bg-white border-2 border-stone-200/60 rounded-2xl">
            <Layers size={40} className="mx-auto text-stone-300 mb-2" />
            No se han registrado categorías aún en el sistema.
          </div>
        )}

      </div>

      {/* Form Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#3E2723]/30 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white rounded-2xl w-full max-w-md border-2 border-stone-200/80 shadow-2xl p-6 overflow-hidden">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-bold font-display text-[#5D4037] mb-4">
              {editingCategory ? 'Editar Categoría' : 'Añadir Nueva Categoría'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              
              <div className="space-y-1.5">
                <label className="block text-stone-600">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Lácteos Criollos o Gaseosas"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-stone-600">Descripción de Rubro</label>
                <textarea
                  placeholder="Describe qué tipos de mercadería pertenecen a esta categoría..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

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
                  {editingCategory ? 'Guardar Cambios' : 'Registrar Categoría'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
