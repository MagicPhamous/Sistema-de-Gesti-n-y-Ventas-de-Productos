import { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Layers, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  AlertTriangle,
  BookOpen,
  Award,
  Video,
  Phone,
  Workflow,
  Sparkles,
  Blocks
} from 'lucide-react';
import { ViewType, Product } from '../types';

// Let's extend ViewType in our Sidebar for Academic views as well
export type AllViewTypes = 
  | ViewType
  | 'historia'
  | 'marco'
  | 'estructurado'
  | 'objetos'
  | 'videos'
  | 'contacto';

interface SidebarProps {
  currentView: AllViewTypes;
  onViewChange: (view: AllViewTypes) => void;
  products: Product[];
  storeName: string;
}

export default function Sidebar({ currentView, onViewChange, products, storeName }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Compute how many products are low on stock
  const lowStockCount = useMemo(() => {
    return products.filter(p => p.stock <= p.minStock).length;
  }, [products]);

  const systemItems = [
    { id: 'dashboard' as AllViewTypes, name: 'Dashboard Principal', icon: LayoutDashboard },
    { id: 'ventas' as AllViewTypes, name: 'Punto de Venta (POS)', icon: ShoppingCart },
    { id: 'productos' as AllViewTypes, name: 'Inventario Productos', icon: Package },
    { id: 'categorias' as AllViewTypes, name: 'Categorías Rubros', icon: Layers },
    { id: 'stock' as AllViewTypes, name: 'Control de Stock', icon: TrendingUp, badge: lowStockCount > 0 ? lowStockCount : undefined },
    { id: 'clientes' as AllViewTypes, name: 'Clientes CRM', icon: Users },
    { id: 'reportes' as AllViewTypes, name: 'Reportes y Gráficos', icon: BarChart3 },
    { id: 'configuracion' as AllViewTypes, name: 'Configuraciones', icon: Settings }
  ];

  const academicItems = [
    { id: 'historia' as AllViewTypes, name: 'Historia de Don Raúl', icon: Award },
    { id: 'marco' as AllViewTypes, name: 'Marco Teórico ADS', icon: BookOpen },
    { id: 'estructurado' as AllViewTypes, name: 'Análisis Estructurado', icon: Workflow },
    { id: 'objetos' as AllViewTypes, name: 'Diseño Objetos UML', icon: Blocks },
    { id: 'videos' as AllViewTypes, name: 'Videos Tutoriales', icon: Video },
    { id: 'contacto' as AllViewTypes, name: 'Soporte y Contacto', icon: Phone }
  ];

  const renderNavGroup = (title: string, items: typeof systemItems) => (
    <div className="space-y-1.5 pt-4">
      <h3 className="px-4 text-[10px] font-extrabold uppercase tracking-widest text-[#D84315] font-display">
        {title}
      </h3>
      <div className="space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 group text-left cursor-pointer border-0
                ${isActive 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md font-bold' 
                  : 'text-stone-300 hover:bg-[#4E342E]/50 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-amber-500 group-hover:text-amber-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 animate-pulse">
                  <AlertTriangle size={8} />
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2.5 bg-amber-600 text-white rounded-xl shadow-lg hover:bg-amber-700 transition-all duration-300 flex items-center justify-center cursor-pointer border-0"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for mobile screen overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#3E2723]/30 backdrop-blur-sm z-30 lg:hidden transition-all duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-[#5D4037] border-r-4 border-amber-500 text-white flex flex-col justify-between 
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shrink-0 max-h-screen overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand logo header */}
        <div>
          <div className="py-6 px-6 border-b border-orange-950/20 bg-[#3E2723]">
            <div className="flex items-center gap-3">
              {/* Bolivian store thematic yellow design bag/basket representing Tienda Raul */}
              <div className="relative w-11 h-11 rounded-2xl bg-amber-400 border-2 border-amber-100 flex items-center justify-center shadow-md animate-bounce">
                <span className="text-xl">🏪</span>
                {/* Red Baseball Cap badge with R represents Raúl */}
                <span className="absolute -top-1.5 -right-1 text-[9px] bg-red-600 text-white font-black px-1.5 py-0.2 rounded-full rotate-12 scale-75 border border-white">R</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-base tracking-tight text-white uppercase bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                  {storeName}
                </h1>
                <p className="font-mono text-[9px] text-amber-200/60 tracking-wider">
                  SISTEMA DE GESTIÓN v3.5
                </p>
              </div>
            </div>
          </div>

          {/* Navigation group containers */}
          <nav className="p-3 space-y-4 divide-y divide-[#4E342E]/60">
            {/* Ocultado por el momento para priorizar el Portafolio Académico */}
            {/* <div className="space-y-1">
              {renderNavGroup("Módulos del Sistema", systemItems)}
            </div> */}
            <div className="pt-2">
              {renderNavGroup("Portafolio Académico", academicItems)}
            </div>
          </nav>
        </div>

        {/* Bottom reference academic stamp */}
        <div className="p-4 border-t border-orange-950/25 bg-[#3E2723] flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-orange-600/25 border border-orange-500/50 flex items-center justify-center font-bold text-xs font-display text-amber-200">
            ADS
          </div>
          <div>
            <p className="text-xs font-bold text-amber-50">Análisis y Diseño</p>
            <p className="text-[9px] font-mono text-amber-400/85">Carrera de Informática</p>
          </div>
        </div>

      </aside>
    </>
  );
}
