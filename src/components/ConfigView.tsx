import { useState, FormEvent } from 'react';
import { 
  Settings, 
  Store, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Info
} from 'lucide-react';
import { SystemSettings } from '../types';

interface ConfigViewProps {
  settings: SystemSettings;
  onUpdateSettings: (settings: SystemSettings) => void;
  onResetDatabase: () => void;
}

export default function ConfigView({
  settings,
  onUpdateSettings,
  onResetDatabase
}: ConfigViewProps) {
  const [formStoreName, setFormStoreName] = useState(settings.storeName);
  const [formCurrency, setFormCurrency] = useState(settings.currency);
  const [formLowStockAlert, setFormLowStockAlert] = useState(settings.lowStockAlert);

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      storeName: formStoreName,
      currency: formCurrency,
      taxRate: 0,
      primaryColor: '#FF9800',
      lowStockAlert: formLowStockAlert
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold font-display text-[#5D4037]">Configuraciones del Sistema</h2>
        <p className="text-stone-500 text-xs mt-1">
          Ajusta los parámetros operativos generales del Punto de Venta (POS) y almacén de "Tienda Raul".
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left 2 columns: General Form settings */}
        <div className="md:col-span-2 bg-white rounded-2xl border-2 border-stone-200/60 p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-stone-700">
            
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-2">
              <Store size={16} className="text-amber-500" />
              <h3 className="font-bold text-stone-900 uppercase">Ajustes del Establecimiento</h3>
            </div>

            {/* Store name */}
            <div className="space-y-1.5">
              <label className="block text-stone-600">Título / Nombre de Tienda</label>
              <input
                type="text"
                required
                value={formStoreName}
                onChange={(e) => setFormStoreName(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Currency */}
            <div className="space-y-1.5">
              <label className="block text-stone-600">Moneda por Defecto</label>
              <input
                type="text"
                required
                value={formCurrency}
                onChange={(e) => setFormCurrency(e.target.value)}
                placeholder="Bs."
                className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none font-mono"
              />
            </div>

            {/* Understock notifications boolean toggle */}
            <div className="space-y-2">
              <label className="block text-stone-600">Alertas Automáticas de Bajo Stock</label>
              <label className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer text-xs font-semibold text-[#5D4037] hover:bg-stone-100 transition">
                <input
                  type="checkbox"
                  checked={formLowStockAlert}
                  onChange={(e) => setFormLowStockAlert(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <div>
                  <p className="font-bold">Notificar en el menú lateral</p>
                  <p className="text-[10px] text-stone-400 font-normal leading-normal">Se encenderá una alarma intermitente roja en la opción de stock si algún producto baja de su mínimo asignado.</p>
                </div>
              </label>
            </div>

            {/* Success message popup */}
            {saveSuccess && (
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded text-green-800 flex items-center gap-2 text-xs">
                <CheckCircle size={14} className="text-green-600" />
                <span>Configuraciones comerciales guardadas y aplicadas de inmediato.</span>
              </div>
            )}

            {/* Save submit */}
            <button
              type="submit"
              className="w-full py-3 bg-[#5D4037] hover:bg-[#3E2723] text-white font-black rounded-xl text-center text-xs shadow-md transition-all cursor-pointer border-0"
            >
              Guardar Configuraciones Generales
            </button>

          </form>
        </div>

        {/* Right column: Database action operations (Emergency reset) */}
        <div className="bg-red-50/50 border-2 border-red-200/50 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2 pb-3 border-b border-red-200 text-red-800">
              <AlertTriangle size={16} className="text-red-600" />
              <h4 className="font-bold uppercase font-display">Zona de Recuperación</h4>
            </div>

            <p className="font-medium text-red-900 leading-relaxed font-sans">
              Si registraste demasiados datos experimentales de prueba en las ventas o alteraste los mínimos y quieres reestablecer todo el sistema académico a su estado inicial, puedes realizar un reset completo.
            </p>

            <div className="p-3 bg-white border border-red-200 rounded-xl shadow-sm text-[10px] text-stone-500 font-sans leading-relaxed">
              <strong>ATENCIÓN:</strong> Al presionar el botón de abajo, se borrarán de la memoria RAM local todas las ventas ingresadas, clientes añadidos y productos nuevos, y se volverá a cargar los datos originales de la universidad.
            </div>
          </div>

          <div className="pt-6 mt-6">
            <button
              onClick={() => {
                if (window.confirm('⚠️ ¿Estás completamente seguro de borrar todos tus cambios y reestablecer la base de datos de Tienda Raul?')) {
                  onResetDatabase();
                  alert('Sistema reestablecido con éxito.');
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition shadow-sm cursor-pointer border-0"
            >
              <RefreshCw size={13} />
              Reestablecer Datos Originales
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
