import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AlertTriangle, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Database, 
  CreditCard, 
  DollarSign, 
  QrCode, 
  FileText, 
  TrendingUp, 
  Package, 
  ShieldAlert, 
  UserCheck, 
  Plus, 
  Trash2, 
  Edit, 
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';

// ==========================================
// 1. ÁRBOL DE PROBLEMAS (DIAGNÓSTICO)
// ==========================================
export function ArbolProblemas() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const efectos = [
    { id: 'efecto_ingresos', text: 'Pérdida de ingresos debido a errores en el registro de ventas', icon: '📉', detail: 'La contabilidad manual y el tecleo imprevisto conllevan cobros incorrectos, descuadres de caja diarios y mermas invisibles.' },
    { id: 'efecto_espera', text: 'Clientes insatisfechos debido a largos tiempos de espera en la caja', icon: '⏳', detail: 'La lentitud al pesar, sumar y dictar precios tradicionales desgasta la paciencia del vecino paceño en horas pico.' },
    { id: 'efecto_competencia', text: 'Pérdida de competitividad frente a supermercados avanzados', icon: '🏛️', detail: 'Establecimientos de cadena atraen clientela gracias a cobros inmediatos por tarjeta de débito y facturas electrónicas automatizadas.' },
    { id: 'efecto_tecnologia', text: 'Falta de actualización tecnológica y estática comercial', icon: '💻', detail: 'Imposibilidad de implementar estrategias modernas como cupones de descuento u organización inteligente de anaqueles.' }
  ];

  const subEfectos = [
    { id: 'efecto_lento', text: 'Procesos de pago lentos o poco eficientes', icon: '🐢', parent: 'efecto_espera' }
  ];

  const causas = [
    { id: 'causa_integracion', text: 'Falta de integración entre el sistema físico y control digital', icon: '🔌', detail: 'El inventario vive en papel mientras la caja opera de memoria; no hay sincronía en tiempo real entre ambos.' },
    { id: 'causa_stock', text: 'Productos populares agotados de forma rápida sin reposición', icon: '📦', detail: 'Falta de indicadores visuales o alertas de mínimos que avisen que el pan de Laja o la leche están por terminarse.' },
    { id: 'causa_personal', text: 'Escasez de personal altamente capacitado en sistemas', icon: '👨‍🏫', detail: 'Se requiere un sistema tan intuitivo y guiado que cualquier empleado de caja o familiar de Don Raúl pueda operarlo sin cometer errores.' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-1">
        <span className="text-[10px] uppercase font-extrabold tracking-widest bg-amber-100 text-[#5D4037] px-2.5 py-1 rounded-full">Diagnóstico Estratégico</span>
        <h3 className="font-bold text-stone-950 text-base font-display">Árbol de Problemas Académico</h3>
        <p className="text-xs text-stone-500">Mapeo estructural de relaciones de causa-efecto que sustentan el desarrollo del sistema de Don Raúl.</p>
      </div>

      <div className="p-4 bg-stone-50/50 rounded-2xl border border-stone-200/70 space-y-8 relative overflow-hidden">
        {/* EFECTOS (Hojas / Copa del Árbol) */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider font-mono">Efectos & Consecuencias del Estado Actual</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {efectos.map((ef) => (
              <div 
                key={ef.id}
                onMouseEnter={() => setHoveredNode(ef.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 text-center relative cursor-pointer flex flex-col justify-between h-28 ${
                  hoveredNode === ef.id ? 'border-red-500 bg-red-50/30 shadow-md scale-[1.02]' : 'border-stone-200 bg-white'
                }`}
              >
                <div className="text-xl shrink-0">{ef.icon}</div>
                <p className="text-[11px] font-extrabold text-stone-800 leading-tight my-1">{ef.text}</p>
                <span className="text-[9px] text-[#5D4037] font-semibold italic shrink-0">Consecuencia Directa</span>
              </div>
            ))}
          </div>

          {/* Sub efectos */}
          <div className="flex justify-center">
            {subEfectos.map((se) => (
              <div 
                key={se.id}
                onMouseEnter={() => setHoveredNode(se.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-2 px-4 rounded-lg border-2 max-w-xs text-center transition-all duration-300 cursor-pointer ${
                  hoveredNode === se.id ? 'border-red-400 bg-red-50/50 scale-105' : 'border-stone-200 bg-white'
                }`}
              >
                <span className="text-xs font-bold text-stone-700 flex items-center justify-center gap-1">
                  <span>{se.icon}</span> {se.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tronco de Unión Conectora */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-1 bg-gradient-to-b from-red-200 via-amber-500 to-emerald-200 h-10 relative">
            <div className="absolute inset-0 bg-amber-500 animate-pulse" />
          </div>
        </div>

        {/* PROBLEMA CENTRAL (Tronco) */}
        <div className="flex justify-center">
          <div 
            onMouseEnter={() => setHoveredNode('problema_central')}
            onMouseLeave={() => setHoveredNode(null)}
            className={`p-4 rounded-2xl border-2 border-amber-600 bg-gradient-to-br from-amber-600 to-amber-700 text-white max-w-xl text-center shadow-lg transition-transform duration-300 cursor-pointer ${
              hoveredNode === 'problema_central' ? 'scale-105 shadow-amber-300/30' : ''
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <AlertTriangle size={15} className="text-amber-200" />
              <span className="font-mono text-[9px] tracking-widest font-bold text-amber-100 uppercase">PROBLEMA GENERAL DEL MODELO</span>
            </div>
            <h4 className="font-extrabold text-xs sm:text-xs font-display uppercase tracking-wide leading-relaxed">
              Inadecuada eficiencia del sistema de ventas de productos de un supermercado / micro-market administrado manualmente
            </h4>
          </div>
        </div>

        {/* Tronco de Unión Conectora */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="w-1 bg-gradient-to-b from-amber-200 to-emerald-200 h-10 relative" />
        </div>

        {/* CAUSAS (Raíces del Árbol) */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider font-mono">Causas & Raíces Fundacionales (Diagnóstico)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {causas.map((ca) => (
              <div 
                key={ca.id}
                onMouseEnter={() => setHoveredNode(ca.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center relative cursor-pointer flex flex-col justify-between h-28 ${
                  hoveredNode === ca.id ? 'border-emerald-500 bg-emerald-50/30 shadow-md scale-[1.02]' : 'border-stone-210 bg-white'
                }`}
              >
                <div className="text-xl shrink-0">{ca.icon}</div>
                <p className="text-[11px] font-extrabold text-stone-850 leading-tight my-1">{ca.text}</p>
                <span className="text-[9px] text-[#5D4037] font-semibold italic shrink-0">Causa Raíz</span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL DE EXPLICACIÓN DINÁMICA */}
        <div className="bg-[#FFFDF9] border border-amber-200/50 rounded-xl p-3 min-h-[4rem] flex items-center justify-center transition-all duration-300">
          <div className="text-center">
            {hoveredNode === null && (
              <p className="text-[11px] text-stone-500 font-medium italic">Pasa el cursor sobre cualquier nodo del árbol para leer su justificación técnica-académica...</p>
            )}
            {hoveredNode === 'efecto_ingresos' && (
              <p className="text-xs text-[#5D4037] font-semibold"><strong>Pérdida de Ingresos:</strong> {efectos[0].detail}</p>
            )}
            {hoveredNode === 'efecto_espera' && (
              <p className="text-xs text-[#5D4037] font-semibold"><strong>Clientes Insatisfechos:</strong> {efectos[1].detail}</p>
            )}
            {hoveredNode === 'efecto_competencia' && (
              <p className="text-xs text-[#5D4037] font-semibold"><strong>Pérdida de Competitividad:</strong> {efectos[2].detail}</p>
            )}
            {hoveredNode === 'efecto_tecnologia' && (
              <p className="text-xs text-[#5D4037] font-semibold"><strong>Atraso Tecnológico:</strong> {efectos[3].detail}</p>
            )}
            {hoveredNode === 'efecto_lento' && (
              <p className="text-xs text-[#5D4037] font-semibold"><strong>Lentitud Generalizada:</strong> Al no contar con código lector de barras ni una pasarela ágil, la emisión toma hasta 5 minutos por cliente.</p>
            )}
            {hoveredNode === 'problema_central' && (
              <p className="text-xs text-amber-800 font-bold"><strong>Problema Central:</strong> La ineficiencia comercial bloquea la capacidad del Micro Market Mirador de crecer, generando mermas diarias y desaprovechando la alta afluencia de universitarios y vecinos marianos.</p>
            )}
            {hoveredNode === 'causa_integracion' && (
              <p className="text-xs text-emerald-800 font-bold"><strong>Falta de Sincronía:</strong> {causas[0].detail}</p>
            )}
            {hoveredNode === 'causa_stock' && (
              <p className="text-xs text-emerald-800 font-bold"><strong>Roturas de Stock:</strong> {causas[1].detail}</p>
            )}
            {hoveredNode === 'causa_personal' && (
              <p className="text-xs text-emerald-800 font-bold"><strong>Personal sin Capacitar:</strong> {causas[2].detail}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 2. DIAGRAMA DE CONTEXTO (MODELO AMBIENTAL)
// ==========================================
export function DiagramaContexto() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);

  const flujos = [
    { id: 'solicita', sender: 'cliente', text: 'Solicita_Productos', desc: 'El cliente comunica los abarrotes o productos del valle que desea adquirir.', icon: '🛒' },
    { id: 'paga', sender: 'cliente', text: 'Realiza_Pago', desc: 'El cliente entrega dinero en efectivo, tarjeta o escanea un código QR generado.', icon: '💵' },
    { id: 'factura', sender: 'sistema', text: 'Factura', desc: 'El sistema emite el comprobante fiscal/ticket de venta con el detalle legal.', icon: '🧾' },
    { id: 'alta', sender: 'admin', text: 'Alta_Productos', desc: 'El administrador (Don Raúl) abastece stock o modifica tarifas de venta.', icon: '🍎' },
    { id: 'reporte', sender: 'sistema', text: 'Reporte_Ventas', desc: 'El sistema consolida cierres de caja y rendimiento general de ingresos.', icon: '📊' },
    { id: 'informe_prod', sender: 'sistema', text: 'Informe_Productos', desc: 'El administrador recibe el aviso de productos que descendieron del límite mínimo de inventario.', icon: '📈' }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Database className="text-amber-500" size={16} />
          <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Modelo Ambiental: Diagrama de Contexto</h3>
        </div>
        <span className="text-[9px] font-mono bg-[#FFF3E0] text-[#D84315] font-bold px-2 py-0.5 rounded">Nivel Técnico: 0</span>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed font-semibold">
        Representa los límites de la arquitectura funcional de software de Tienda Raul. Comunica el flujo bidireccional entre el núcleo digital y los actores externos.
      </p>

      {/* CANVAS DEL DIAGRAMA INTERACTIVO */}
      <div className="p-6 bg-[#FAF8F5] border border-stone-200 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative">
          
          {/* ACTOR EXTEMO 1: CLIENTE */}
          <div className="md:col-span-3 flex flex-col items-center p-4 bg-white rounded-2xl border-2 border-stone-200 shadow-sm z-10 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl shadow-inner text-amber-900 font-bold">
              👨‍👩‍👦
            </div>
            <div>
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display">Vecino / Cliente</h4>
              <p className="text-[10px] text-stone-500 font-sans leading-normal">Entidad de frontera receptora e impulsora de consumo</p>
            </div>
          </div>

          {/* FLUJOS ENTRE CLIENTE Y SISTEMA */}
          <div className="md:col-span-3 flex flex-col justify-center space-y-1.5 p-2 z-10">
            <button 
              onClick={() => setActiveFlow('solicita')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'solicita' ? 'bg-amber-100 text-amber-900 border-amber-400 font-extrabold translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>🛒 Solicita_Productos</span>
              <span className="text-stone-400">➔</span>
            </button>
            <button 
              onClick={() => setActiveFlow('paga')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'paga' ? 'bg-amber-100 text-amber-900 border-amber-400 font-extrabold translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>💵 Realiza_Pago</span>
              <span className="text-stone-400">➔</span>
            </button>
            <button 
              onClick={() => setActiveFlow('factura')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'factura' ? 'bg-[#FFF3E0] text-[#D84315] border-amber-300 font-extrabold -translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>🧾 Factura</span>
              <span className="text-stone-400">⮨</span>
            </button>
          </div>

          {/* PROCESO PRINCIPAL (SISTEMA CENTRAL) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center py-6">
            <div className="w-28 h-28 rounded-full border-4 border-[#5D4037] bg-gradient-to-br from-[#5D4037] to-[#3E2723] text-white flex flex-col items-center justify-center p-3 text-center shadow-lg relative group">
              <span className="text-xl">🏪</span>
              <span className="font-mono text-[9px] font-bold text-amber-400">PROCESO 0</span>
              <h5 className="font-extrabold text-[9px] uppercase tracking-wide leading-tight">Subsistema de venta de productos</h5>
              
              {/* Ripple Ring Effect to signify Central Node */}
              <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-ping pointer-events-none" />
            </div>
          </div>

          {/* FLUJOS ENTRE SISTEMA Y ADMINISTRADOR */}
          <div className="md:col-span-3 flex flex-col justify-center space-y-1.5 p-2 z-10">
            <button 
              onClick={() => setActiveFlow('alta')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'alta' ? 'bg-amber-100 text-amber-900 border-amber-400 font-extrabold -translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>🍎 Alta_Productos</span>
              <span className="text-stone-400">⮨</span>
            </button>
            <button 
              onClick={() => setActiveFlow('informe_prod')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'informe_prod' ? 'bg-amber-100 text-amber-900 border-amber-400 font-extrabold translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>📈 Informe_Productos</span>
              <span className="text-stone-400">➔</span>
            </button>
            <button 
              onClick={() => setActiveFlow('reporte')}
              className={`p-1.5 text-left rounded-lg text-[10px] font-bold font-mono transition-all flex items-center justify-between border ${
                activeFlow === 'reporte' ? 'bg-[#FFF3E0] text-[#D84315] border-amber-300 font-extrabold translate-x-1' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              }`}
            >
              <span>📊 Reporte_Ventas</span>
              <span className="text-stone-400">➔</span>
            </button>
          </div>
        </div>

        {/* BOTTOM BOX DETALLE DEL FLUJO SELECCIONADO */}
        <div className="bg-white border text-[11px] border-stone-200 rounded-xl p-3 min-h-[4rem] flex items-center justify-center transition-all">
          {activeFlow ? (
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#5D4037] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Detalle del Flujo de Datos
              </span>
              <p className="text-stone-700 font-bold leading-normal">
                {flujos.find(x => x.id === activeFlow)?.icon} {" "} 
                <strong className="font-mono text-amber-800">{flujos.find(x => x.id === activeFlow)?.text}</strong>:{" "}
                {flujos.find(x => x.id === activeFlow)?.desc}
              </p>
            </div>
          ) : (
            <div className="text-center text-stone-400 font-medium italic">
              Haz clic en cualquiera de los flujos de datos anteriores (como "Realiza_Pago" o "Reporte_Ventas") para inspeccionar su trazabilidad en el sistema.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. DFD NIVEL 1 (GRÁFICO 0 DE PROCESOS)
// ==========================================
export function DfdNivel1() {
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const dfdElements = [
    { id: '1', title: '1. Verificación de Productos', type: 'Proceso', desc: 'Evalúa la lista solicitada, consulta existencias en el Almacén de Datos y determina si es viable el despacho o se notifica desabasto.' },
    { id: '2', title: '2. Pago y Facturación', type: 'Proceso', desc: 'Gestiona la recepción de dinero (Efectivo/Tarjeta/QR), descuenta stock y escribe en el almacenamiento histórico emitiendo la factura.' },
    { id: '3', title: '3. Emisión de Informes', type: 'Proceso', desc: 'Consolida reportes periódicos de existencias críticas, alertando sobre inventarios por debajo del mínimo.' },
    { id: '4', title: '4. Reportes de Venta', type: 'Proceso', desc: 'Concentra la recaudación acumulada para generar reportes financieros consolidados destinados a la toma de decisiones gerenciales.' },
    { id: 'store', title: 'Almacén Centralizador de Datos', type: 'Almacén', desc: 'Estructura persistente en disco (red, base de datos) que sostiene catálogos de productos, transacciones de venta e historial comercial.' }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-6">
      <div className="flex flex-col gap-1">
        <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
          <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.1</span>
          Diagrama de Flujo de Datos (DFD) Nivel 1 - Gráfico 0
        </h4>
        <p className="text-xs text-stone-500 font-sans">
          Mapeo de la primera fragmentación funcional de subprocesos. Haz clic en cualquier nodo para leer su responsabilidad técnica o académica.
        </p>
      </div>

      <div className="p-4 bg-stone-50/50 rounded-2xl border border-stone-200/60 space-y-6">
        
        {/* ALMACEN (DATA STORE) - RED BOX AT THE TOP */}
        <div className="flex justify-center">
          <button 
            type="button"
            onClick={() => setActiveElement('store')}
            className={`p-3 bg-[#8B0000] text-white border-2 rounded-xl flex items-center gap-2 px-6 shadow transition-all ${
              activeElement === 'store' ? 'border-amber-400 scale-105 shadow-md' : 'border-transparent hover:border-amber-200'
            }`}
          >
            <Database size={16} />
            <div className="text-left leading-tight">
              <span className="block text-[8px] font-mono uppercase text-red-200 font-bold">ALMACÉN DE DATOS</span>
              <span className="text-xs font-bold uppercase font-display">Almacen</span>
            </div>
          </button>
        </div>

        {/* CONNECTING ARROWS SVG TO THE CHANNELS */}
        <div className="text-center text-[10px] text-stone-400 font-mono italic flex justify-center gap-12 -my-2 select-none">
          <span>↓ Lectura / Escritura de Catálogo & Boletas</span>
        </div>

        {/* PROCESSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* PROCESO 1: VERIFICACION */}
          <button 
            type="button"
            onClick={() => setActiveElement('1')}
            className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between h-36 transition-all ${
              activeElement === '1' ? 'bg-[#FFFDF4] border-amber-500 scale-[1.03] shadow-md' : 'bg-white border-stone-200 hover:border-amber-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800">1</div>
            <div className="my-1.5">
              <h5 className="font-extrabold text-[10px] uppercase text-[#5D4037] leading-tight">Subsistema de Verificación</h5>
              <span className="text-[9px] text-stone-500 block mt-0.5">Solicita_Productos</span>
            </div>
            <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase font-bold">Disponible ➔ P2</span>
          </button>

          {/* PROCESO 2: PAGO */}
          <button 
            type="button"
            onClick={() => setActiveElement('2')}
            className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between h-36 transition-all ${
              activeElement === '2' ? 'bg-[#FFFDF4] border-amber-500 scale-[1.03] shadow-md' : 'bg-white border-stone-200 hover:border-amber-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800">2</div>
            <div className="my-1.5">
              <h5 className="font-extrabold text-[10px] uppercase text-[#5D4037] leading-tight">Subsistema de Pago</h5>
              <span className="text-[9px] text-stone-500 block mt-0.5">Realiza el pago / Factura</span>
            </div>
            <span className="text-[8px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase font-bold">Emitir Facturas</span>
          </button>

          {/* PROCESO 3: INFORME */}
          <button 
            type="button"
            onClick={() => setActiveElement('3')}
            className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between h-36 transition-all ${
              activeElement === '3' ? 'bg-[#FFFDF4] border-amber-500 scale-[1.03] shadow-md' : 'bg-white border-stone-200 hover:border-amber-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800">3</div>
            <div className="my-1.5">
              <h5 className="font-extrabold text-[10px] uppercase text-[#5D4037] leading-tight">Subsistema de Informe</h5>
              <span className="text-[9px] text-stone-500 block mt-0.5">No Disponible ➔ Proveedor</span>
            </div>
            <span className="text-[8px] font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase font-bold">Informe_Producto</span>
          </button>

          {/* PROCESO 4: REPORTES */}
          <button 
            type="button"
            onClick={() => setActiveElement('4')}
            className={`p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-between h-36 transition-all ${
              activeElement === '4' ? 'bg-[#FFFDF4] border-amber-500 scale-[1.03] shadow-md' : 'bg-white border-stone-200 hover:border-amber-300'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-800">4</div>
            <div className="my-1.5">
              <h5 className="font-extrabold text-[10px] uppercase text-[#5D4037] leading-tight">Reporte de Ventas</h5>
              <span className="text-[9px] text-stone-500 block mt-0.5">pagos acumulados</span>
            </div>
            <span className="text-[8px] font-mono text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded uppercase font-bold">Reporte_Ventas</span>
          </button>

        </div>

        {/* BOTTOM DEFINITIONS CARD */}
        <div className="bg-white border text-[11px] border-stone-200 rounded-xl p-3.5 min-h-[4.5rem] flex items-center justify-center transition-all">
          {activeElement ? (
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-white bg-[#5D4037] px-2 py-0.5 rounded">
                {dfdElements.find(x => x.id === activeElement)?.type} Seleccionado
              </span>
              <h5 className="font-bold text-stone-900 text-xs mt-1">
                {dfdElements.find(x => x.id === activeElement)?.title}
              </h5>
              <p className="text-stone-650 font-medium max-w-2xl leading-relaxed">
                {dfdElements.find(x => x.id === activeElement)?.desc}
              </p>
            </div>
          ) : (
            <div className="text-center text-stone-400 font-medium italic">
              Haz clic sobre cualquiera de los 4 procesos principales de Nivel 1 o sobre el "Almacén" rojo en la parte superior para comprender el desglose funcional de datos.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


// ==========================================
// 4. DFD NIVEL 2 (PROCESO DE COBRO DETALLE)
// ==========================================
export function DfdNivel2() {
  const [activeDfdStep, setActiveDfdStep] = useState<string | null>(null);

  const stepsInfo = [
    { id: '2.1', title: '2.1 Método de pago', type: 'Filtro Inicial', desc: 'Evalúa la procedencia y selección del cliente: si solicita pago por QR bancario (Tigo Money/Banco), Tarjeta de débito, o efectivo directo en caja.' },
    { id: '2.2', title: '2.2 Transferencia bancaria', type: 'Proceso de Validación', desc: 'Valida la sincronización de fondos o capturas con la app bancaria para asentar la verificación de datos del pago.' },
    { id: '2.3', title: '2.3 Tarjeta de crédito o débito', type: 'Proceso de Enlace', desc: 'Espera la lectura en el terminal POS y el ingreso seguro del código PIN del tarjetahabiente.' },
    { id: '2.4', title: '2.4 En efectivo', type: 'Proceso Físico', desc: 'Gestiona la entrada de billetes (Bs.), descuenta montos pendientes, y calcula el cambio de caja de forma exacta.' },
    { id: '2.5', title: '2.5 Factura', type: 'Asentamiento', desc: 'Ordena la generación del PDF con código QR fiscal, graba la transacción en el Almacén persistente (Tabla Factura) y distribuye los informes.' },
    { id: '2.7', title: '2.7 Pagos', type: 'Cierre', desc: 'Interconecta con el cierre del día consolidando el reporte_pago para enviarlo a la contabilidad general.' },
    { id: 'store_fact', title: 'Factura (Data Store)', type: 'Almacén de Facturación', desc: 'Depósito estructurado para la persistencia del histórico correlativo de comprobantes y desgloses de impuestos.' }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-6">
      <div className="flex justify-between items-center pb-2 border-b border-stone-100">
        <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5 animate-pulse">
          <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded font-mono">P2</span>
          Descomposición de Detalle: DFD Nivel 2 (Subprocesos de Cobro)
        </h4>
        <span className="text-[10px] font-bold text-stone-400">Micro Market Mirador</span>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed font-semibold">
        Exhibe con zoom lógico cómo se desvía la corriente de datos tras seleccionarse una pasarela de pago. Haz clic en las esferas para explorar su funcionamiento:
      </p>

      <div className="p-4 bg-stone-50/50 rounded-2xl border border-stone-200/60 relative overflow-hidden space-y-6">
        
        {/* ROW 1: ORIGEN */}
        <div className="flex justify-start items-center">
          <button 
            type="button"
            onClick={() => setActiveDfdStep('2.1')}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center p-2 text-center transition-all ${
              activeDfdStep === '2.1' ? 'bg-amber-600 text-white scale-105 border-2 border-amber-300' : 'bg-white text-[#5D4037] border-2 border-[#5D4037] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="text-[8px] font-mono font-bold leading-none">2.1</span>
            <span className="text-[9px] font-extrabold uppercase leading-tight mt-0.5">Método de pago</span>
          </button>
          
          <div className="h-0.5 bg-stone-300 flex-grow max-w-[4rem] relative">
            <span className="absolute -top-3 left-2 text-[8px] font-mono text-stone-400 uppercase select-none font-bold">Distribuye ➔</span>
          </div>

          {/* CLUSTER DE VALIDACIÓN (TRES SUBMETODOS) */}
          <div className="flex flex-col gap-2">
            {/* TRANSFERENCIA */}
            <button 
              type="button"
              onClick={() => setActiveDfdStep('2.2')}
              className={`p-2 rounded-xl text-left border text-[10px] flex items-center gap-2 transition-all w-48 ${
                activeDfdStep === '2.2' ? 'bg-[#FFFDF0] border-amber-500 scale-102 font-bold text-stone-900' : 'bg-white border-stone-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-800 font-mono shrink-0">2.2</span>
              <span>2.2 Transferencia bancaria (QR)</span>
            </button>

            {/* TARJETA */}
            <button 
              type="button"
              onClick={() => setActiveDfdStep('2.3')}
              className={`p-2 rounded-xl text-left border text-[10px] flex items-center gap-2 transition-all w-48 ${
                activeDfdStep === '2.3' ? 'bg-[#FFFDF0] border-amber-500 scale-102 font-bold text-stone-900' : 'bg-white border-stone-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-[8px] font-bold text-orange-850 font-mono shrink-0">2.3</span>
              <span>2.3 Tarjeta débito / crédito</span>
            </button>

            {/* EFECTIVO */}
            <button 
              type="button"
              onClick={() => setActiveDfdStep('2.4')}
              className={`p-2 rounded-xl text-left border text-[10px] flex items-center gap-2 transition-all w-48 ${
                activeDfdStep === '2.4' ? 'bg-[#FFFDF0] border-amber-500 scale-102 font-bold text-stone-900' : 'bg-white border-stone-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[8px] font-bold text-emerald-800 font-mono shrink-0">2.4</span>
              <span>2.4 En efectivo (Bs.)</span>
            </button>
          </div>

          <div className="h-0.5 bg-stone-300 flex-grow max-w-[3rem] relative" />

          {/* FACTURA GENERA PROCESO 2.5 */}
          <button 
            type="button"
            onClick={() => setActiveDfdStep('2.5')}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center p-2 text-center transition-all shrink-0 ${
              activeDfdStep === '2.5' ? 'bg-amber-600 text-white scale-105 border-2 border-amber-300' : 'bg-white text-[#5D4037] border-2 border-[#5D4037] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="text-[8px] font-mono font-bold leading-none">2.5</span>
            <span className="text-[9px] font-extrabold uppercase leading-tight mt-0.5">Factura</span>
          </button>
        </div>

        {/* FACTURA RECIBE DE ALMACEN DE FACTURACIÓN */}
        <div className="flex justify-center items-center gap-4">
          <div className="w-32 h-0.5 bg-[#8B0000] relative shrink-0">
            <span className="absolute -top-3 left-4 text-[7px] font-mono text-red-500 uppercase font-bold">Crea registro</span>
          </div>

          <button 
            type="button"
            onClick={() => setActiveDfdStep('store_fact')}
            className={`p-2.5 bg-[#8B0000] text-white border-2 rounded-xl flex items-center gap-2 shadow transition-all shrink-0 ${
              activeDfdStep === 'store_fact' ? 'border-amber-400 scale-105' : 'border-transparent hover:border-amber-200'
            }`}
          >
            <Database size={13} className="text-red-200" />
            <span className="text-[10px] uppercase font-bold font-mono">D: Factura (Data Store)</span>
          </button>

          <div className="w-16 h-0.5 bg-stone-300 relative shrink-0" />

          {/* EMISION PROCESO 2.7 */}
          <button 
            type="button"
            onClick={() => setActiveDfdStep('2.7')}
            className={`w-16 h-16 rounded-full flex flex-col items-center justify-center p-1.5 text-center transition-all shrink-0 ${
              activeDfdStep === '2.7' ? 'bg-amber-600 text-white scale-105 border-2 border-amber-300' : 'bg-white text-[#5D4037] border-2 border-[#5D4037] hover:bg-[#FAF8F5]'
            }`}
          >
            <span className="text-[8px] font-mono font-bold leading-none">2.7</span>
            <span className="text-[9px] font-extrabold uppercase leading-tight mt-0.5">Pagos</span>
          </button>
        </div>

        {/* BOTTOM EXPLANATORY INFO */}
        <div className="bg-white border text-[11px] border-stone-200 rounded-xl p-3 min-h-[4rem] flex items-center justify-center">
          {activeDfdStep ? (
            <div className="text-center space-y-1">
              <span className="text-[9px] font-mono font-semibold uppercase text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                Subnodo: {stepsInfo.find(x => x.id === activeDfdStep)?.id} - {stepsInfo.find(x => x.id === activeDfdStep)?.type}
              </span>
              <p className="text-stone-700 font-extrabold leading-normal mt-1">
                {stepsInfo.find(x => x.id === activeDfdStep)?.title}:{" "}
                <span className="text-stone-500 font-medium font-sans">{stepsInfo.find(x => x.id === activeDfdStep)?.desc}</span>
              </p>
            </div>
          ) : (
            <div className="text-center text-stone-400 font-medium italic">
              Haz clic en cualquiera de los subprocesos jerárquicos de cobro (por ejemplo "2.4 En efectivo" o "Factura") para diagramar la lógica interna de validaciones de Tienda Raul.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


// ==========================================
// 5. DIAGRAMA DE CASOS DE USO UML
// ==========================================
export function DiagramaCasosDeUso() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  const useCases = [
    { id: 'escoge', text: 'U.C. Escoge productos', ext: 'Asociado directo al Cliente', desc: 'El cliente selecciona físicamente los productos en el local o en el portal.' },
    { id: 'ver_prod', text: 'U.C. Verificacion de productos', ext: 'Include: cancela el producto', desc: 'Evalúa la compatibilidad de stock, escanea clave de producto y determina el subtotal.' },
    { id: 'cancela', text: 'U.C. cancela el producto', ext: 'Extend por: QR, efectivo, tarjeta', desc: 'Cierra la transacción emitiendo la instrucción de pago y abriendo la pasarela de selección.' },
    { id: 'devoluciones', text: 'U.C. Devoluciones', ext: 'Asociado a Cliente y Cajero', desc: 'Procesa el reembolso o canje de mercancías que presenten fallos o fecha de caducidad vencida.' },
    { id: 'pagos', text: 'U.C. Verifica los pagos', ext: 'Asociado a Cajero y Admin', desc: 'Analiza si el efectivo coincide con lo cobrado o valida el estado de la transacción telemática.' },
    { id: 'gest_inv', text: 'U.C. Gestiona inventario', ext: 'Extend: Agregar, Eliminar, Editar', desc: 'Acción administrativa para mantener al día el catálogo comercial del negocio.' },
    { id: 'informes', text: 'U.C. informe de inventario', ext: 'Asociado a Cajero y Admin', desc: 'Alerta sobre mermas o marcas mínimas para evitar quiebres y programar compras con proveedores.' },
    { id: 'informe_v', text: 'U.C. Informe de ventas', ext: 'Asociado a Súper Administrador', desc: 'Dibuja estadísticas consolidadas del flujo de caja, margen de ganancia y rendimiento diario.' }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
        <UserCheck className="text-amber-500" size={16} />
        <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Diagramas de Casos de Uso (UML)</h3>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed font-semibold">
        Representa las funciones operativas generales del sistema agrupadas por roles de actores del negocio. Haz clic sobre las burbujas para inspeccionar el Caso de Uso:
      </p>

      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* ACTORES CLAVE (IZQUIERDA) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="text-center p-2.5 bg-white border border-stone-200 rounded-xl space-y-1">
              <span className="text-xl">🤵</span>
              <h5 className="font-extrabold text-[10px] text-[#5D4037] uppercase">Cliente</h5>
              <p className="text-[9px] text-stone-400">Escoge y devuelve</p>
            </div>
            <div className="text-center p-2.5 bg-white border border-stone-200 rounded-xl space-y-1">
              <span className="text-xl">🧑‍💻</span>
              <h5 className="font-extrabold text-[10px] text-[#5D4037] uppercase">Cajero</h5>
              <p className="text-[9px] text-stone-400">Verifica, cobra y rinde</p>
            </div>
            <div className="text-center p-2.5 bg-white border border-stone-200 rounded-xl space-y-1">
              <span className="text-xl">👨‍💼</span>
              <h5 className="font-extrabold text-[10px] text-[#5D4037] uppercase">Administrador</h5>
              <p className="text-[9px] text-stone-400">Don Raúl (Dueño)</p>
            </div>
          </div>

          {/* CAJA DE LÍMITE DEL SISTEMA (CENTRO - USE CASE BUBBLES) */}
          <div className="md:col-span-9 bg-white border-2 border-stone-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
            <span className="absolute top-1 right-2 text-[7px] font-mono text-stone-405 font-bold uppercase select-none">LÍMITE DEL SISTEMA</span>
            
            {useCases.map((uc) => (
              <button
                key={uc.id}
                type="button"
                onClick={() => setSelectedCase(uc.id)}
                className={`p-2.5 rounded-full border-2 text-center text-[10px] transition-all flex flex-col items-center justify-center min-h-[4.5rem] leading-tight ${
                  selectedCase === uc.id ? 'bg-[#FFF3E0] border-amber-500 font-bold text-amber-950 scale-102 shadow-sm' : 'bg-[#FAF8F5] border-stone-200 text-stone-700 hover:border-amber-300'
                }`}
              >
                <span className="font-display font-bold uppercase">{uc.text}</span>
                <span className="text-[8px] text-stone-550 italic font-mono mt-0.5">{uc.ext}</span>
              </button>
            ))}
          </div>

        </div>

        {/* DETAILS PANEL */}
        <div className="bg-white border text-[11px] border-stone-200 rounded-xl p-3 min-h-[4rem] flex items-center justify-center">
          {selectedCase ? (
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-white bg-amber-700 px-2 py-0.5 rounded">
                Caso de Uso: {selectedCase.toUpperCase()}
              </span>
              <h5 className="font-bold text-stone-900 text-xs mt-1">
                {useCases.find(x => x.id === selectedCase)?.text}
              </h5>
              <p className="text-stone-600 font-medium max-w-2xl leading-relaxed">
                {useCases.find(x => x.id === selectedCase)?.desc}
              </p>
            </div>
          ) : (
            <div className="text-center text-stone-400 font-medium italic">
              Haz clic en cualquier óvalo de Caso de Uso dentro del Límite del Sistema para describir detalladamente su secuencia narrativa académica.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


// ==========================================
// 6. DIAGRAMA DE CLASES UML (ORIENTADO A OBJETOS)
// ==========================================
export function DiagramaClases() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const classes = [
    {
      id: 'cliente',
      name: 'Cliente',
      attributes: ['+ nombre: String', '+ apellidos: String', '+ Ci/nit: Int'],
      methods: ['+ setters/getters()'],
      desc: 'Sostiene los datos generales de identificación del comprador para facturación fiscal formal.'
    },
    {
      id: 'factura',
      name: 'Factura',
      attributes: ['+ NroFactura: Int', '+ Cliente: Clase Cliente', '+ Producto: Carrito[]', '+ MetodoPago: Pagos'],
      methods: ['+ Factura()', '+ AgregarProd(C)', '+ IncluirCliente()', '+ RecibirPago()', '+ GenerarInformeVenta()'],
      desc: 'Clase centralizadora de agregación encargada de orquestar la cabecera, la asignación del cliente y el detalle de los productos comprados.'
    },
    {
      id: 'producto',
      name: 'Producto',
      attributes: ['+ CodigoProducto: Int', '+ NomProd: String', '+ Precio: Double', '+ Stock: Int'],
      methods: ['+ VerificaStock()'],
      desc: 'Modela la estructura del inventario de abarrotes. Su método VerificaStock decide el estado de semáforo.'
    },
    {
      id: 'administrador',
      name: 'Administrador',
      attributes: ['+ Cargo: String', '+ Nombre: String', '+ idAdmin: Int'],
      methods: ['+ setters/getters()'],
      desc: 'Clase con privilegios de escritura de inventario y extracción de reportes gerenciales.'
    },
    {
      id: 'metodopago',
      name: 'MetodoPago (Abstracta)',
      attributes: ['+ Cantidad: Double'],
      methods: ['+ setters/getters()', '+ VerificarPago()'],
      desc: 'Clase abstracta de la cual heredan las tres pasarelas particulares admitidas en Tienda Raul.'
    },
    {
      id: 'tarjeta',
      name: 'Tarjeta (Hereda MetodoPago)',
      attributes: ['+ nroTarjeta: String', '+ Nombre: String', '+ nomBanco: String'],
      methods: ['+ setters/getters()'],
      desc: 'Subclase especializada que añade validaciones electrónicas del banco del comercio.'
    },
    {
      id: 'qr',
      name: 'QR (Hereda MetodoPago)',
      attributes: ['+ nroMovimiento: String', '+ nomBanco: String'],
      methods: ['+ setters/getters()'],
      desc: 'Comprobación de transferencias inmediatas por escaneo dinámico de QR móvil.'
    },
    {
      id: 'efectivo',
      name: 'Efectivo (Hereda MetodoPago)',
      attributes: ['+ TipoMoneda: String'],
      methods: ['+ setters/getters()'],
      desc: 'Subclase física convencional para registrar cobros y vueltos con billetes nacionales.'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <Database className="text-amber-500" size={16} />
          <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Diagrama de Clases Estático (UML)</h3>
        </div>
        <span className="text-[9px] font-mono bg-[#FFF3E0] text-[#D84315] font-bold px-2 py-0.5 rounded">Modelo Estático</span>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed font-semibold">
        El modelo estructural orientado a objetos define la coherencia de datos del código del Micro Market Mirador. Haz clic en las clases para ver su especificación técnica:
      </p>

      <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200/70 space-y-6">
        
        {/* DIAGRAM FLOW REPRESENTATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {classes.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => setSelectedClass(cls.id)}
              className={`text-left rounded-xl border-2 overflow-hidden bg-white shadow-sm flex flex-col justify-between transition-all select-none ${
                selectedClass === cls.id ? 'border-amber-600 scale-[1.03] shadow-md' : 'border-stone-200 hover:border-amber-400'
              }`}
            >
              <div className="p-2 bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white font-extrabold text-[11px] font-display flex justify-between items-center shrink-0">
                <span>{cls.name}</span>
                <span className="text-[7px] font-mono opacity-80 uppercase tracking-widest leading-none">Class</span>
              </div>
              
              <div className="p-2 flex-grow flex flex-col justify-start">
                <div className="space-y-0.5 border-b border-stone-100 pb-1.5 mb-1.5">
                  <span className="text-[7px] font-mono block text-amber-600 font-extrabold uppercase">Atributos</span>
                  {cls.attributes.map((attr, idx) => (
                    <div key={idx} className="text-[9px] font-mono text-stone-600 truncate">{attr}</div>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[7px] font-mono block text-[#5D4037] font-extrabold uppercase">Métodos</span>
                  {cls.methods.map((m, idx) => (
                    <div key={idx} className="text-[9px] font-mono text-emerald-700 truncate">{m}</div>
                  ))}
                </div>
              </div>

            </button>
          ))}
        </div>

        {/* DETAILS ACCORDION */}
        <div className="bg-white border text-[11px] border-stone-200 rounded-xl p-3.5 min-h-[4.5rem] flex items-center justify-center">
          {selectedClass ? (
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-white bg-[#5D4037] px-2.5 py-0.5 rounded">
                Clase Técnica: {selectedClass.toUpperCase()}
              </span>
              <h5 className="font-bold text-stone-900 text-xs mt-1">
                Descripción del Objeto: {classes.find(x => x.id === selectedClass)?.name}
              </h5>
              <p className="text-stone-600 font-medium max-w-2xl leading-relaxed">
                {classes.find(x => x.id === selectedClass)?.desc}
              </p>
            </div>
          ) : (
            <div className="text-center text-stone-400 font-medium italic">
              Haz clic sobre cualquiera de las 8 cajas de clases UML de Tienda Raul de arriba para inspeccionar su herencia abstracta, agregaciones conceptuales u operaciones de código.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
