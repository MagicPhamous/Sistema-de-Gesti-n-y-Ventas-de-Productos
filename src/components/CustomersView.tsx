import { useState, useMemo, FormEvent } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  CheckCircle,
  X 
} from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  currency: string;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'totalPurchases'>) => void;
}

export default function CustomersView({
  customers,
  currency,
  onAddCustomer
}: CustomersViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    onAddCustomer({
      name: formName,
      email: formEmail,
      phone: formPhone,
      address: formAddress
    });

    // Reset and close
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormAddress('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-[#5D4037]">Directorio de Clientes</h2>
          <p className="text-stone-500 text-xs mt-1">
            Registra y consulta tus compradores frecuentes para fidelizarlos, asignarles facturaciones y acumular reportes de consumo.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#D84315] hover:bg-[#BF360C] text-white py-2.5 px-5 rounded-xl text-sm font-bold shadow-md shadow-orange-900/10 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Nuevo Cliente
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
        <input
          type="text"
          placeholder="Buscar clientes por nombre, teléfono, e-mail o barrio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border-2 border-stone-200 focus:border-amber-500 rounded-xl text-xs font-medium focus:outline-none placeholder-stone-400 bg-white"
        />
      </div>

      {/* Grid Customers layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {filteredCustomers.map((c) => (
          <div 
            key={c.id} 
            className="bg-white rounded-2xl border-2 border-stone-200/60 p-5 shadow-sm hover:border-amber-400 transition-all duration-300 relative overflow-hidden"
          >
            {/* Top accent badge */}
            <div className="absolute top-4 right-4 bg-amber-100 text-[#D84315] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <DollarSign size={10} />
              Acumulado: {currency} {c.totalPurchases.toFixed(0)}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF3E0] text-[#5D4037] flex items-center justify-center font-bold text-sm border border-amber-200">
                  {c.name.split(' ').map(token => token[0]).slice(0,2).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm">{c.name}</h3>
                  <span className="text-[10px] font-mono text-stone-400">Cliente Frecuente</span>
                </div>
              </div>

              {/* Information lists */}
              <div className="space-y-2 text-stone-600 font-medium text-xs border-t border-stone-100 pt-3">
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-stone-400" />
                  <span>Celular: {c.phone || 'S/ Registro'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-stone-400" />
                  <span className="truncate">Email: {c.email || 'S/ Registro'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-stone-400" />
                  <span className="truncate">Barrio: {c.address || 'S/ Registro'}</span>
                </div>
              </div>

            </div>
          </div>
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full py-16 text-center text-stone-400 bg-white border-2 border-stone-200/60 rounded-2xl">
            <Users size={40} className="mx-auto text-stone-300 mb-2" />
            No se encontraron clientes registrados en el directorio.
          </div>
        )}

      </div>

      {/* Add customer modal */}
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
              Registrar Nuevo Cliente
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-stone-700">
              
              <div className="space-y-1.5">
                <label className="block text-stone-600">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Kate Lucero Fernandez Saavedra"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-stone-600">Celular / Teléfono</label>
                  <input
                    type="tel"
                    placeholder="Ej. 77580155"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-stone-600">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Ej. nelson.lopez@umsa.bo"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-stone-600">Dirección Residencial / Oficina</label>
                <input
                  type="text"
                  placeholder="Ej. Sopocachi Av. Jaimes Freyre Nro 142"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full px-3 py-2.5 border-2 border-stone-200 rounded-xl focus:border-amber-500 focus:outline-none"
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
                  Registrar Cliente
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
