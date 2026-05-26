import { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  User, 
  Youtube, 
  CornerRightDown, 
  ArrowRight, 
  FileCode, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

// Fotos reales de Micro Market Mirador (definidas como constantes para asegurar compilación de TypeScript limpia)
const microMarketFront = "/src/assets/images/micro_market_front_1779838266947.png";
const microMarketHill = "/src/assets/images/micro_market_hill_1779838286747.png";
const microMarketInside = "/src/assets/images/micro_market_inside_1779838307514.png";

interface AcademicViewsProps {
  currentTab: 'historia' | 'marco' | 'estructurado' | 'objetos' | 'videos' | 'contacto';
}

export default function AcademicViews({ currentTab }: AcademicViewsProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [selectedDfdTab, setSelectedDfdTab] = useState<'nivel1' | 'nivel2'>('nivel1');
  const [selectedDfd2Process, setSelectedDfd2Process] = useState<'P1' | 'P2' | 'P3' | 'P4'>('P1');
  const [activeDfdNode, setActiveDfdNode] = useState<string | null>(null);

  // Accordion details for Theoretical Framework
  const academicTeorico = [
    {
      title: "1. Introducción al Análisis y Diseño de Sistemas (ADS)",
      content: "El análisis y diseño de sistemas (ADS) es la disciplina dedicada a estudiar el estado comercial u operativo de una organización (en este caso, la administración manual de Tienda Raul) con la finalidad de proponer e implementar flujos técnicos perfeccionados y soluciones informáticas robustas. Define la transición analítica desde los requerimientos humanos en mostrador hasta el código que automatiza transacciones en tiempo real."
    },
    {
      title: "2. Metodologías Estructuradas",
      content: "La metodología estructurada sitúa los procesos y los flujos de datos en el centro de su análisis teórico. Utiliza una descomposición funcional jerárquica para fragmentar la complejidad del sistema global. Los cimientos de este paradigma residen en la Declaración de Propósitos, los diagramas lógicos de contexto, y los Diagramas de Flujo de Datos (DFD) en sus niveles de abstracción 1 y 2, junto con diccionarios de datos estructurados."
    },
    {
      title: "3. Metodologías Orientadas a Objetos (UML)",
      content: "El paradigma de Orientación a Objetos representa la lógica comercial en forma de entidades autónomas (objetos) que encapsulan datos (atributos como SKU, precio de venta) y operaciones (métodos como deducirStock, recalcularTotal). Se estandariza universalmente mediante diagramas del Lenguaje de Modelado Unificado (UML), primordialmente los diagramas estructurales de Clases y los diagramas de interacción y Casos de Uso del Sistema."
    },
    {
      title: "4. Herramientas y Técnicas de Modelado de Sistemas",
      content: "Corresponden a las técnicas aplicadas para documentar, validar y simular el ciclo operativo del negocio. Incluyen entrevistas lógicas de levantamiento con Don Raúl, matriz de requerimientos funcionales y no funcionales, descripciones narrativas detalladas de Casos de Uso, diccionarios procesales, tablas de decisión comercial (como el control del stock mínimo), y diagramación técnica de flujos en cajas registradoras (POS) para asegurar la fidelidad del software."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. VIEW: DON RAUL HISTORY */}
      {currentTab === 'historia' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="flex justify-between items-center pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">La Historia de Éxito de "Micro Market Mirador"</h2>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Award size={12} />
              Emprendimiento Paceño
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Don Raul character card / portrait placeholder */}
            <div className="md:col-span-4 space-y-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-1.5 shadow-lg group overflow-hidden relative">
                <div className="absolute inset-0 bg-[#3E2723]/10" />
                <div className="bg-[#FFF3E0] rounded-[22px] p-6 text-center space-y-4">
                  {/* Avatar Representing Don Raul, the founder */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-[#5D4037] border-4 border-amber-400 flex items-center justify-center text-5xl shadow-md animate-pulse">
                    👨‍💼
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5D4037] text-base">Don Raúl Gutiérrez</h4>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full font-bold mt-1 inline-block">Propietario Fundador</span>
                  </div>
                  <div className="text-xs text-stone-500 italic">
                    "Empezamos con un solo cajón y el sueño de traer alimentos de calidad directamente desde los valles locales a las mesas de nuestros vecinos paceños."
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="md:col-span-8 space-y-4 leading-relaxed text-sm text-stone-600 font-medium">
              <p>
                En la pintoresca y concurrida calle <strong>C. Teniente Rosendo Villa (La Paz, Bolivia)</strong>, ubicado en las inmediaciones del emblemático <strong>Mirador Killi Killi</strong> y cercano a la zona Periférica, se encuentra un pilar fundamental de la alimentación del vecindario: el renovado <strong>"Micro Market Mirador"</strong> (anteriormente conocido comercialmente como "Tienda Raul"). Fundada el <strong>12 de octubre de 2012</strong> por Don Raúl Gutiérrez, esta prestigiosa tienda de abarrotes y productos del valle nació de una premisa humilde: ofrecer productos de alta calidad, quesos criollos recién traídos del lago de Huatajata, y pan caliente de Laja directamente a las familias de la zona.
              </p>
              <p>
                Don Raúl nos comparte: <em>"Nosotros somos paceños de corazón, y creamos esta tienda para apoyar a nuestros hermanos productores rurales. Apostamos por el Mirador Killi Killi por el gran cariño que le tenemos a esta hermosa zona periférica y a su gente trabajadora"</em>. Con el tiempo, lo que comenzó como un pequeño anaquel en una esquina residencial se expandió y consolidó, requiriendo hoy en día una coordinación logística minuciosa de compras, cálculo de inventario mínimo para evitar desabastecimientos de productos clave como la leche o el aceite, y facturación ágil diario en caja.
              </p>
              <p>
                Hoy en día, "Micro Market Mirador" ha decidido dar el paso hacia la <strong>transformación digital de sus operaciones</strong>. El desarrollo de este Sistema de Gestión y Ventas simboliza la unión de los esfuerzos familiares paceños con tecnologías modernas de software desarrolladas por destacados universitarios de la <strong>Universidad Mayor de San Andrés (UMSA)</strong>, permitiendo planificar con precisión científica el stock y dar un servicio instantáneo y transparente a cada cliente.
              </p>
            </div>
          </div>

          {/* REAL STORE PHOTO GALLERY */}
          <div className="pt-6 border-t border-stone-200/80 space-y-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-extrabold text-[#5D4037] text-base font-display flex items-center gap-2">
                <span>📸</span> Galería Fotográfica del Establecimiento
              </h3>
              <p className="text-xs text-stone-500">Fotografías reales recopiladas del punto de venta "Micro Market Mirador" y su pintoresco entorno topográfico.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image 1: Front storefront */}
              <div className="bg-white p-3 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-400 transition-all duration-300">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 relative group border border-stone-200">
                  <img 
                    src={microMarketFront} 
                    alt="Fachada del Micro Market Mirador" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] bg-amber-100 text-[#5D4037] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Fachada Principal</span>
                  <h4 className="font-extrabold text-[#5D4037] text-xs">Acceso e Identidad</h4>
                  <p className="text-[10px] text-stone-500 leading-normal font-sans">Estructura general de ingreso con los característicos peldaños y la marquesina del Micro Market Mirador.</p>
                </div>
              </div>

              {/* Image 2: Slanted Hill perspective */}
              <div className="bg-white p-3 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-400 transition-all duration-300">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 relative group border border-stone-200">
                  <img 
                    src={microMarketHill} 
                    alt="Mirador Killi Killi calle" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] bg-amber-100 text-[#5D4037] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Pendiente Topográfica</span>
                  <h4 className="font-extrabold text-[#5D4037] text-xs">C. Teniente Rosendo Villa</h4>
                  <p className="text-[10px] text-stone-500 leading-normal font-sans">Ubicación estratégica en la inclinada cuesta residencial que conecta el mirador con el centro paceño.</p>
                </div>
              </div>

              {/* Image 3: Interior store view */}
              <div className="bg-white p-3 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-3 flex flex-col justify-between hover:border-amber-400 transition-all duration-300">
                <div className="rounded-xl overflow-hidden aspect-[4/3] bg-stone-100 relative group border border-stone-200">
                  <img 
                    src={microMarketInside} 
                    alt="Interior del micro market" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] bg-amber-100 text-[#5D4037] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Orden Interno</span>
                  <h4 className="font-extrabold text-[#5D4037] text-xs">Góndolas de Inventario</h4>
                  <p className="text-[10px] text-stone-500 leading-normal font-sans font-sans">Distribución de abarrotes de primera necesidad y canastas organizadoras de autoservicio.</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      )}

      {/* 2. VIEW: MARCO TEORICO */}
      {currentTab === 'marco' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">Marco Teórico Disciplinar (ADS)</h2>
            <p className="text-stone-500 text-xs mt-1">Sustento científico de las metodologías empleadas para estructurar el sistema.</p>
          </div>

          <div className="space-y-3">
            {academicTeorico.map((item, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div key={index} className="bg-white border-2 border-stone-200/60 rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setActiveAccordion(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-stone-50 to-stone-100 font-bold text-xs text-stone-800 uppercase tracking-wide text-left cursor-pointer"
                  >
                    <span className="font-display">{item.title}</span>
                    <ChevronDown size={14} className={`text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white border-t border-stone-200 text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                      {item.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* 3. VIEW: ANALISIS ESTRUCTURADO */}
      {currentTab === 'estructurado' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">Análisis y Diseño Estructurado</h2>
            <p className="text-stone-500 text-xs mt-1">El paradigma tradicional resuelto paso a paso enfocado en procesos funcionales.</p>
          </div>

          {/* Declaracion de propositos */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-2 border-l-4 border-amber-500">
            <h3 className="font-bold text-stone-900 text-xs uppercase font-display tracking-wider">Declaración de Propósitos</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
              El propósito fundamental del sistema es <strong>gestionar e integrar de manera eficiente el ciclo comercial de Tienda Raul</strong>, coordinando desde el registro detallado de los productos y la alerta de mínimos en el inventario de abarrotes, hasta el procesamiento ágil en caja registradora de boletas de venta, permitiendo un seguimiento riguroso de compras a proveedores de valles y generando reportes gerenciales automáticos para optimizar el capital de trabajo de Don Raúl Gutiérrez.
            </p>
          </div>

          {/* Diagrama del modelo ambiental PLACEHOLDER */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <FileCode className="text-amber-500" size={16} />
              <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Modelo Ambiental: Diagrama de Contexto</h3>
            </div>
            
            <div className="p-6 bg-[#FAF8F5] border border-dashed border-amber-500/40 rounded-xl text-center space-y-3">
              <span className="text-4xl">📐</span>
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display">Área de Visualización de Diagrama de Contexto</h4>
              <p className="text-[11px] text-stone-500 max-w-lg mx-auto font-sans leading-relaxed">
                [<strong>Espacio para tu Diagrama</strong>] Aquí debes subir la imagen de tu Diagrama de Contexto. El sistema de Tienda Raul tiene 4 entidades externas clásicas: <strong>Clientes, Proveedores Mayoristas, Don Raúl (Gerente), y el Empleado de Caja</strong>.
              </p>
              <div className="inline-block bg-[#FFF3E0] text-[#D84315] font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200">
                Archivo sugerido: `/public/assets/diagramas/M_Ambiental.png`
              </div>
            </div>
          </div>

          {/* Lista de Acontecimientos */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 text-xs uppercase font-display pb-2 border-b border-stone-100">Lista de Acontecimientos Comunes</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-stone-600">
              <li className="p-3 bg-stone-50 rounded-xl flex items-start gap-2 border border-stone-100">
                <span className="text-amber-600 mt-0.5 shrink-0"><CornerRightDown size={12} /></span>
                <span>Un cliente solicita la compra de víveres en el mostrador del pasaje de Sopocachi (Acontecimiento Externo).</span>
              </li>
              <li className="p-3 bg-stone-50 rounded-xl flex items-start gap-2 border border-stone-100">
                <span className="text-amber-600 mt-0.5 shrink-0"><CornerRightDown size={12} /></span>
                <span>El inventario del producto "leche" disminuye y cruza el límite mínimo de alerta (Acontecimiento Temporal/Interno).</span>
              </li>
              <li className="p-3 bg-stone-50 rounded-xl flex items-start gap-2 border border-stone-100">
                <span className="text-amber-600 mt-0.5 shrink-0"><CornerRightDown size={12} /></span>
                <span>Don Raúl solicita el informe consolidado de utilidades y ventas del día (Acontecimiento Externo).</span>
              </li>
              <li className="p-3 bg-stone-50 rounded-xl flex items-start gap-2 border border-stone-100">
                <span className="text-amber-600 mt-0.5 shrink-0"><CornerRightDown size={12} /></span>
                <span>Un proveedor paceño llega con facturas de quesos criollos para registrar el stock nuevo (Acontecimiento Externo).</span>
              </li>
            </ul>
          </div>

          {/* Modelo de Comportamiento DFD Nivel 1 y Nivel 2 */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <FileCode className="text-amber-500" size={16} />
              <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Modelo de Comportamiento: DFD Nivel 1 y Nivel 2</h3>
            </div>
            
            {/* 1. INTRODUCCIÓN DFD NIVEL 1 */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
                <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.1</span>
                Introducción al Diagrama de Flujo de Datos (DFD) Nivel 1
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                El Diagrama de Flujo de Datos de Nivel 1 representa la primera descomposición lógica y funcional de nuestro sistema único centralizado. En este nivel de abstracción del análisis estructurado, el "Micro Market Mirador" se desglosa en sus cuatro grandes dominios funcionales. El DFD de Nivel 1 expone cómo los flujos de datos entrantes e históricos cruzan las barreras de los almacenes persistentes ("Data Stores") para ser procesados y emitidos como información de control, permitiendo un mapeo transparente de la logística del negocio.
              </p>
            </div>

            {/* 2. DESCRIPCIÓN DEL DFD NIVEL 1 */}
            <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/50">
              <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
                <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.2</span>
                Descripción del Flujo en DFD Nivel 1
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                En este diagrama general de nivel 1, la corriente de información inicia cuando la entidad externa <strong>Cliente</strong> introduce solicitudes de compra al sistema, lo que genera flujos de consulta de inventario y mutación en el almacén de productos. Simultáneamente, el <strong>Cajero/Empleado</strong> opera el terminal alimentando datos de transacciones de pago, mientras que el <strong>Proveedor</strong> retroalimenta el sistema con facturas de entrega de nueva mercancía para actualizar stocks. Así, cada proceso opera de manera autónoma pero interconectado mediante un canal centralizado de almacenamiento de datos históricos y estados operacionales.
              </p>
            </div>

            {/* 3. COMPONENTES PRINCIPALES DEL SISTEMA */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
                <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.3</span>
                Componentes Principales de la Arquitectura de Datos
              </h4>
              <p className="text-xs text-stone-500 font-sans">Definiciones teóricas de los depósitos de persistencia de datos (Almacenes) y Entidades Externas clave:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                  <h5 className="font-bold text-stone-800 text-xs uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Almacenes de Datos (Persistencia)
                  </h5>
                  <ul className="space-y-1.5 text-xs text-stone-505 leading-relaxed font-semibold">
                    <li>• <strong className="text-stone-800 font-extrabold">D1: Almacén de Catálogo de Productos:</strong> Guarda ID, SKU, nombre comercial del vívire, categoría, precio y umbral de stock de seguridad.</li>
                    <li>• <strong className="text-stone-800 font-extrabold">D2: Almacén de Transacciones y Ventas:</strong> Archiva históricos de boletas de recibo de caja, subtotales, impuestos y formas de pago.</li>
                    <li>• <strong className="text-stone-800 font-extrabold">D3: Almacén de Clientes y Direcciones:</strong> Almacena contactos telefónicos de universitarios, ubicaciones geográficas en Mirador Killi Killi y rutas.</li>
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                  <h5 className="font-bold text-stone-800 text-xs uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> Entidades Externas de Frontera
                  </h5>
                  <ul className="space-y-1.5 text-xs text-stone-505 leading-relaxed font-semibold">
                    <li>• <strong className="text-stone-800 font-extrabold">Clientes (Vecinos / Universitarios):</strong> Emisores directos de pedidos y receptores de recibos de venta o tickets de entrega.</li>
                    <li>• <strong className="text-stone-800 font-extrabold">Proveedores Mayoristas:</strong> Abastecedores de lácteos del lago, pan de Laja y abarrotes que emiten remisiones físicas.</li>
                    <li>• <strong className="text-stone-800 font-extrabold">Don Raúl (Gerente General):</strong> Receptor de estadísticas de rendimiento consolidado y reportes logísticos de auditoría.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* LAS CUATRO ÁREAS OPERATIVAS MAQUETADAS */}
            <div className="space-y-3">
              <p className="text-xs text-stone-500 font-sans">Visualización resumida de los cuatro macro-procesos operados por el sistema:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-amber-50/50 border-2 border-amber-500/20 rounded-xl space-y-1">
                  <span className="text-xl">📥</span>
                  <p className="font-extrabold text-amber-900 text-[10px] uppercase font-display leading-tight">P1: GESTIONAR PEDIDOS DE CLIENTES</p>
                </div>
                <div className="p-3 bg-orange-50/50 border-2 border-orange-500/20 rounded-xl space-y-1">
                  <span className="text-xl">📦</span>
                  <p className="font-extrabold text-orange-900 text-[10px] uppercase font-display leading-tight">P2: ADMINISTRAR ABASTECIMIENTO Y STOCK</p>
                </div>
                <div className="p-3 bg-amber-50/50 border-2 border-amber-500/20 rounded-xl space-y-1">
                  <span className="text-xl">🛵</span>
                  <p className="font-extrabold text-amber-950 text-[10px] uppercase font-display leading-tight">P3: COORDINAR LOGÍSTICA DE ENTREGA</p>
                </div>
                <div className="p-3 bg-orange-50/50 border-2 border-orange-500/20 rounded-xl space-y-1">
                  <span className="text-xl">📊</span>
                  <p className="font-extrabold text-orange-950 text-[10px] uppercase font-display leading-tight">P4: REPORTAR Y APOYAR A LA GERENCIA</p>
                </div>
              </div>
            </div>

            {/* 4. INTRODUCCIÓN DFD NIVEL 2 */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
                <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.4</span>
                Introducción al Diagrama de Flujo de Datos (DFD) Nivel 2
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-semibold">
                La técnica de la descomposición funcional jerárquica dictamina que cada macro-proceso del Nivel 1 posee su propia complejidad interna. El Diagrama de Flujo de Datos de Nivel 2 (también conocido como diagramas de detalle) expande los procesos principales P1, P2, P3 y P4 en sub-procesos atómicos más detallados. Esto permite comprender con precisión quirúrgica cómo opera individualmente cada algoritmo de software, qué sub-flujos de validación se ejecutan y cómo interactúan con las estructuras lógicas de la base de datos de "Micro Market Mirador".
              </p>
            </div>

            {/* 5. DESCRIPCIÓN DEL DFD NIVEL 2 POR PROCESO */}
            <div className="space-y-4 pt-2">
              <h4 className="font-extrabold text-[#5D4037] text-sm font-display flex items-center gap-1.5">
                <span className="text-xs bg-[#FFF3E0] text-amber-800 px-2 py-0.5 rounded font-mono">1.5</span>
                Descripción Detallada por Proceso (DFD Nivel 2)
              </h4>
              
              <div className="space-y-4">
                
                {/* PROCESO P1 */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                    <span className="text-xs bg-amber-600 text-white font-extrabold font-mono px-2 py-0.5 rounded">PROCESO P1</span>
                    <span className="font-bold text-stone-800 text-[11px] font-display uppercase tracking-wider">GESTIONAR PEDIDOS DE CLIENTES</span>
                  </div>
                  <p className="text-xs text-stone-600 font-semibold leading-relaxed">
                    Este macro-proceso automatiza las tareas asociadas con la atención en el mostrador del comercio y la confirmación de transacciones comerciales de venta. Se subdivide en tres operaciones vitales:
                  </p>
                  <ul className="text-xs text-stone-500 space-y-1.5 pl-2 font-medium">
                    <li>• <strong className="text-stone-700">Sub-Proceso 1.1 (Seleccionar Ítem de Catálogo):</strong> Lee códigos SKU o nombres para extraer los precios vigentes de la base de datos del Catálogo de Productos y agregarlos al registro de caja interactiva.</li>
                    <li>• <strong className="text-stone-700">Sub-Proceso 1.2 (Validar Disponibilidad):</strong> Compara la cantidad comercial demandada contra el stock físico en base de datos. Si es suficiente, bloquea temporalmente los productos; si es menor al mínimo de existencias, levanta banderas visuales de desabastecimiento.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 1.3 (Registrar Venta y Emitir Recibo):</strong> Al recibir la pasarela ordinaria o pago Tigo Money, genera una boleta oficial de recibo numerada correlativamente, descontando permanentemente el inventario de la tienda y escribiendo el estado final en el depósito transaccional histórico.</li>
                  </ul>
                </div>

                {/* PROCESO P2 */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                    <span className="text-xs bg-orange-600 text-white font-extrabold font-mono px-2 py-0.5 rounded">PROCESO P2</span>
                    <span className="font-bold text-stone-800 text-[11px] font-display uppercase tracking-wider">ADMINISTRAR ABASTECIMIENTO Y STOCK</span>
                  </div>
                  <p className="text-xs text-stone-600 font-semibold leading-relaxed">
                    Encargado de mantener la integridad y la continuidad operativa de las existencias para que "Micro Market Mirador" nunca carezca de productos esenciales.
                  </p>
                  <ul className="text-xs text-stone-500 space-y-1.5 pl-2 font-medium">
                    <li>• <strong className="text-stone-705">Sub-Proceso 2.1 (Monitorear Niveles y Alertas):</strong> Ejecuta de forma asíncrona un análisis de umbrales sobre el almacén de catálogo, detectando de manera inmediata artículos con stock por debajo de la zona de seguridad.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 2.2 (Registrar Entrada del Proveedor):</strong> Procesa las remisiones ingresadas al sistema por la llegada de reabastecimientos (p. ej. quesos de Huatajata o mermeladas), inyectando las cantidades directas a la base del catálogo y recalculando el costo ponderado.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 2.3 (Ajuste Físico y Pérdidas):</strong> Ofrece un módulo de administración interna para corregir desviaciones por merma, rotura o descarte, auditando el origen de cualquier discrepancia documentada.</li>
                  </ul>
                </div>

                {/* PROCESO P3 */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                    <span className="text-xs bg-amber-700 text-white font-extrabold font-mono px-2 py-0.5 rounded">PROCESO P3</span>
                    <span className="font-bold text-stone-800 text-[11px] font-display uppercase tracking-wider">COORDINAR LOGÍSTICA DE ENTREGA</span>
                  </div>
                  <p className="text-xs text-stone-600 font-semibold leading-relaxed">
                    Resuelve de forma sistemática el control geográfico de entregas para vecinos y universitarios en los alrededores del Mirador Killi Killi y las zonas empinadas de Periférica.
                  </p>
                  <ul className="text-xs text-stone-505 space-y-1.5 pl-2 font-medium">
                    <li>• <strong className="text-stone-705">Sub-Proceso 3.1 (Planificación de Despachos):</strong> Filtra las ventas cobradas que requieren envío, agrupándolas geográficamente en hojas logísticas optimizadas de ruteo paceño.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 3.2 (Control de Direcciones y Clientes):</strong> Vincula y valida las coordenadas o referencias residenciales provistas por universitarios con el almacén histórico de clientes para asegurar consistencia en entregas complejas.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 3.3 (Gestión de Estados):</strong> Actualiza el ciclo de vida del pedido con cambios secuenciales de estado (Pendiente, En Tránsito, Completado), notificando al equipo interno para liberar el saldo logístico.</li>
                  </ul>
                </div>

                {/* PROCESO P4 */}
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/60 shadow-sm space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-stone-200/50">
                    <span className="text-xs bg-stone-700 text-white font-extrabold font-mono px-2 py-0.5 rounded">PROCESO P4</span>
                    <span className="font-bold text-stone-800 text-[11px] font-display uppercase tracking-wider">REPORTAR Y APOYAR A LA GERENCIA</span>
                  </div>
                  <p className="text-xs text-stone-600 font-semibold leading-relaxed">
                    Otorga a Don Raúl herramientas de inteligencia empresarial basadas en datos reales para tomar decisiones estratégicas de compra e inversión.
                  </p>
                  <ul className="text-xs text-stone-505 space-y-1.5 pl-2 font-medium">
                    <li>• <strong className="text-stone-705">Sub-Proceso 4.1 (Consolidar Cierre Diario):</strong> Genera un cuadre automático al final de la jornada sumando las transacciones de tarjeta, efectivo y Tigo Money, detectando posibles desfases financieros en caja.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 4.2 (Generar Analíticas por Rubro):</strong> Lee históricos de ventas del almacén para clasificar la rentabilidad y volumen comercial y plasmarlos en dinámicas gráficas científicas mediante indicadores clave.</li>
                    <li>• <strong className="text-stone-705">Sub-Proceso 4.3 (Registro de Historial de Auditoría):</strong> Registra las actividades de los operadores para evitar fugas de información, almacenando trazas históricas detalladas para resguardar la Tienda de abusos operacionales.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* DIAGRAMS SUBMISSION COMPONENT - FULLY INTERACTIVE DFD SIMULATOR */}
            <div className="p-6 bg-[#FAF8F5] border-2 border-[#5D4037]/20 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-stone-200">
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#5D4037] text-sm uppercase font-display flex items-center gap-1.5">
                    <span>⚡</span> Modelado de Procesos: Diagrama de Flujo de Datos (DFD)
                  </h4>
                  <p className="text-[10px] text-stone-500 font-sans">Visualiza el flujo de información interactivo del Micro Market Mirador.</p>
                </div>
                
                {/* Segmented control tab selector */}
                <div className="flex bg-stone-200/60 p-1 rounded-xl shrink-0 border border-stone-200">
                  <button 
                    onClick={() => { setSelectedDfdTab('nivel1'); setActiveDfdNode(null); }}
                    className={`px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg font-sans transition-all ${selectedDfdTab === 'nivel1' ? 'bg-[#5D4037] text-white shadow' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    DFD Nivel 1
                  </button>
                  <button 
                    onClick={() => { setSelectedDfdTab('nivel2'); setActiveDfdNode(null); }}
                    className={`px-3 py-1.5 text-[10px] font-extrabold uppercase rounded-lg font-sans transition-all ${selectedDfdTab === 'nivel2' ? 'bg-[#5D4037] text-white shadow' : 'text-stone-600 hover:text-stone-900'}`}
                  >
                    DFD Nivel 2 Detalle
                  </button>
                </div>
              </div>

              {/* DFD NIVEL 1 VIEW */}
              {selectedDfdTab === 'nivel1' && (
                <div className="space-y-6">
                  <p className="text-xs text-stone-600 font-semibold italic">
                    💡 <strong>Instrucciones:</strong> Haz clic sobre cualquier componente (Entidad, Proceso o Almacén) para ver la simulación en tiempo real de los flujos de entrada y salida asociados.
                  </p>

                  {/* Visual Map Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative items-stretch py-2">
                    
                    {/* Column 1: EXTERNAL ENTITIES */}
                    <div className="flex flex-col justify-around gap-4 min-h-[300px]">
                      <div className="text-center">
                        <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-wider block mb-1">Entidades Externas (Frontera)</span>
                        <div className="h-0.5 bg-stone-200 w-1/3 mx-auto"></div>
                      </div>

                      {/* E1: Cliente */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'E1' ? null : 'E1')}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${activeDfdNode === 'E1' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">E1</span>
                          <span className="text-xs">👤</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Sujeto: Cliente / Universitario</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Introduce pedidos en mostrador y recibe comprobantes de ticket.</p>
                      </button>

                      {/* E2: Proveedor */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'E2' ? null : 'E2')}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${activeDfdNode === 'E2' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">E2</span>
                          <span className="text-xs">🚜</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Sujeto: Proveedor Mayorista</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Entrega productos y remite facturas de reabastecimiento.</p>
                      </button>

                      {/* E3: Don Raul */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'E3' ? null : 'E3')}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${activeDfdNode === 'E3' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-stone-100 px-1.5 py-0.5 rounded text-stone-600">E3</span>
                          <span className="text-xs">🤵</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Gerente: Don Raúl Gutiérrez</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Recibe estadísticas consolidadas de ventas y cuadres financieros.</p>
                      </button>
                    </div>

                    {/* Column 2: CORE PROCESSES */}
                    <div className="flex flex-col justify-around gap-4 min-h-[300px] bg-stone-100/40 p-3 rounded-2xl border border-stone-200">
                      <div className="text-center">
                        <span className="text-[9px] font-extrabold text-amber-800 uppercase tracking-wider block mb-1">Procesos del Software (Nivel 1)</span>
                        <div className="h-0.5 bg-amber-200 w-1/3 mx-auto"></div>
                      </div>

                      {/* P1 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'P1' ? null : 'P1')}
                        className={`p-3.5 rounded-full border-2 text-center transition-all duration-300 ${activeDfdNode === 'P1' ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400/30 font-bold' : 'border-[#5D4037]/40 bg-white hover:border-amber-500'}`}
                      >
                        <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">P1</span>
                        <h5 className="font-extrabold text-stone-900 text-[11px] leading-tight uppercase font-display mt-1">Gestionar Pedidos</h5>
                      </button>

                      {/* P2 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'P2' ? null : 'P2')}
                        className={`p-3.5 rounded-full border-2 text-center transition-all duration-300 ${activeDfdNode === 'P2' ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400/30 font-bold' : 'border-[#5D4037]/40 bg-white hover:border-amber-500'}`}
                      >
                        <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">P2</span>
                        <h5 className="font-extrabold text-stone-900 text-[11px] leading-tight uppercase font-display mt-1">Abastecimiento y Stock</h5>
                      </button>

                      {/* P3 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'P3' ? null : 'P3')}
                        className={`p-3.5 rounded-full border-2 text-center transition-all duration-300 ${activeDfdNode === 'P3' ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400/30 font-bold' : 'border-[#5D4037]/40 bg-white hover:border-amber-500'}`}
                      >
                        <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">P3</span>
                        <h5 className="font-extrabold text-stone-900 text-[11px] leading-tight uppercase font-display mt-1">Coordinar Logística</h5>
                      </button>

                      {/* P4 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'P4' ? null : 'P4')}
                        className={`p-3.5 rounded-full border-2 text-center transition-all duration-300 ${activeDfdNode === 'P4' ? 'border-amber-500 bg-amber-100 shadow-md ring-2 ring-amber-400/30 font-bold' : 'border-[#5D4037]/40 bg-white hover:border-amber-500'}`}
                      >
                        <span className="text-[10px] font-mono font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">P4</span>
                        <h5 className="font-extrabold text-stone-900 text-[11px] leading-tight uppercase font-display mt-1">Reportes y Apoyo</h5>
                      </button>
                    </div>

                    {/* Column 3: DATA STORES (ALMACENES) */}
                    <div className="flex flex-col justify-around gap-4 min-h-[300px]">
                      <div className="text-center">
                        <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-wider block mb-1">Almacenes (Estructuras de Persistencia)</span>
                        <div className="h-0.5 bg-stone-200 w-1/3 mx-auto"></div>
                      </div>

                      {/* D1 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'D1' ? null : 'D1')}
                        className={`p-4 rounded-r-2xl border-l-[6px] border-2 text-left transition-all duration-300 ${activeDfdNode === 'D1' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 border-l-[#5D4037] bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-[#FFF3E0] text-[#5D4037] px-1.5 py-0.5 rounded">D1</span>
                          <span className="text-xs">📂</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Catálogo de Productos</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Detalle de mercadería, precios de venta y stock mínimo.</p>
                      </button>

                      {/* D2 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'D2' ? null : 'D2')}
                        className={`p-4 rounded-r-2xl border-l-[6px] border-2 text-left transition-all duration-300 ${activeDfdNode === 'D2' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 border-l-[#5D4037] bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-[#FFF3E0] text-[#5D4037] px-1.5 py-0.5 rounded">D2</span>
                          <span className="text-xs">💾</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Almacén de Ventas</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Histórico de cierres de caja y boletas.</p>
                      </button>

                      {/* D3 */}
                      <button 
                        onClick={() => setActiveDfdNode(activeDfdNode === 'D3' ? null : 'D3')}
                        className={`p-4 rounded-r-2xl border-l-[6px] border-2 text-left transition-all duration-300 ${activeDfdNode === 'D3' ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400/30' : 'border-stone-300 border-l-[#5D4037] bg-white hover:border-amber-400'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-extrabold bg-[#FFF3E0] text-[#5D4037] px-1.5 py-0.5 rounded">D3</span>
                          <span className="text-xs">🗺️</span>
                        </div>
                        <h5 className="font-extrabold text-stone-950 text-xs mt-1">Clientes y Direcciones</h5>
                        <p className="text-[10px] text-stone-500 mt-1">Ubicaciones y teléfonos (vecinos y universitarios).</p>
                      </button>
                    </div>

                  </div>

                  {/* FLOW ADAPTER CARDS */}
                  <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-3 min-h-[140px]">
                    {activeDfdNode === null ? (
                      <div className="flex flex-col items-center justify-center text-center py-6 space-y-1">
                        <span className="text-xl">👉</span>
                        <h5 className="font-bold text-stone-700 text-xs font-sans uppercase">Ningún elemento seleccionado</h5>
                        <p className="text-[11px] text-stone-500 max-w-sm">Haz clic en un Sujeto, Proceso o Almacén del mapa interactivo arriba para trazar y analizar científicamente el viaje de sus flujos de datos.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-fadeIn">
                        {/* Selected element header */}
                        <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                          <h5 className="font-extrabold text-[#5D4037] text-xs font-display flex items-center gap-1.5">
                            <span className="px-2 py-0.5 bg-amber-100 text-[#5D4037] font-mono text-[10px] rounded">DETALLE DE FLUJOS:</span>
                            {activeDfdNode === 'E1' && '👤 S1: Cliente / Universitario'}
                            {activeDfdNode === 'E2' && '🚜 S2: Proveedor Mayorista'}
                            {activeDfdNode === 'E3' && '🤵 S3: Gerente Don Raúl'}
                            {activeDfdNode === 'P1' && '⚙️ P1: Gestionar Pedidos de Clientes'}
                            {activeDfdNode === 'P2' && '⚙️ P2: Administración de Abastecimiento'}
                            {activeDfdNode === 'P3' && '⚙️ P3: Coordinar Logística de Entrega'}
                            {activeDfdNode === 'P4' && '⚙️ P4: Reportar y Apoyo a Gerencia'}
                            {activeDfdNode === 'D1' && '📂 D1: Almacén de Catálogo de Productos'}
                            {activeDfdNode === 'D2' && '💾 D2: Almacén de Transacciones y Ventas'}
                            {activeDfdNode === 'D3' && '🗺️ D3: Almacén de Clientes y Direcciones'}
                          </h5>
                          <button 
                            onClick={() => setActiveDfdNode(null)} 
                            className="text-stone-400 hover:text-stone-700 text-xs font-extrabold"
                          >
                            [Cerrar]
                          </button>
                        </div>

                        {/* Detailed flow list */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-[9px] font-extrabold text-[#D84315] uppercase tracking-wider block mb-1">⬇️ Flujos Entrantes (Inflows)</span>
                            <ul className="text-xs text-stone-600 space-y-1 bg-stone-50 p-2.5 rounded-lg border border-stone-100 font-semibold">
                              {activeDfdNode === 'E1' && (
                                <>
                                  <li>• <strong className="text-stone-800">Recibo de Venta Emitido</strong> (desde P1)</li>
                                  <li>• <strong className="text-stone-800">Caja de Abarrotes / Panes</strong> (desde P3)</li>
                                </>
                              )}
                              {activeDfdNode === 'E2' && (
                                <li>• <strong className="text-stone-800">Orden de compra aprobada</strong> (desde P2)</li>
                              )}
                              {activeDfdNode === 'E3' && (
                                <>
                                  <li>• <strong className="text-stone-800">Indicadores clave consolidados</strong> (desde P4)</li>
                                  <li>• <strong className="text-stone-800">Trazas de Auditoría e historial</strong> (desde P4)</li>
                                </>
                              )}
                              {activeDfdNode === 'P1' && (
                                <>
                                  <li>• <strong className="text-stone-800">Solicitud de Compra</strong> (desde E1)</li>
                                  <li>• <strong className="text-stone-800">Lectura de precio y stock</strong> (desde D1)</li>
                                </>
                              )}
                              {activeDfdNode === 'P2' && (
                                <>
                                  <li>• <strong className="text-stone-800">Control físico / Mermas</strong> (desde E3)</li>
                                  <li>• <strong className="text-stone-800">Remisión física de mercancía</strong> (desde E2)</li>
                                </>
                              )}
                              {activeDfdNode === 'P3' && (
                                <>
                                  <li>• <strong className="text-stone-800">Boleta pagada por despachar</strong> (desde D2)</li>
                                  <li>• <strong className="text-stone-800">Ubicación y número de celular</strong> (desde D3)</li>
                                </>
                              )}
                              {activeDfdNode === 'P4' && (
                                <>
                                  <li>• <strong className="text-stone-800">Datos históricos de ventas</strong> (desde D2)</li>
                                  <li>• <strong className="text-stone-800">Niveles acumulados de catálogo</strong> (desde D1)</li>
                                </>
                              )}
                              {activeDfdNode === 'D1' && (
                                <>
                                  <li>• <strong className="text-stone-800">Nueva Cantidad de Existencia</strong> (escribe P2)</li>
                                  <li>• <strong className="text-stone-800">Descuento de Cantidad por Venta</strong> (escribe P1)</li>
                                </>
                              )}
                              {activeDfdNode === 'D2' && (
                                <>
                                  <li>• <strong className="text-stone-800">Registro histórico de venta</strong> (escribe P1)</li>
                                  <li>• <strong className="text-stone-800">Actualización de estado de entrega</strong> (escribe P3)</li>
                                </>
                              )}
                              {activeDfdNode === 'D3' && (
                                <li>• <strong className="text-stone-800">Registro de celular y dirección del universitario</strong> (escribe P1 o P3)</li>
                              )}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wider block mb-1">⬆️ Flujos Salientes (Outflows)</span>
                            <ul className="text-xs text-stone-600 space-y-1 bg-stone-50 p-2.5 rounded-lg border border-stone-100 font-semibold">
                              {activeDfdNode === 'E1' && (
                                <li>• <strong className="text-stone-800">Solicitud de víveres / Dinero</strong> (va hacia P1)</li>
                              )}
                              {activeDfdNode === 'E2' && (
                                <li>• <strong className="text-stone-800">Remisión de productos del valle</strong> (va hacia P2)</li>
                              )}
                              {activeDfdNode === 'E3' && (
                                <li>• <strong className="text-stone-800">Consultas estadísticas</strong> (va hacia P4)</li>
                              )}
                              {activeDfdNode === 'P1' && (
                                <>
                                  <li>• <strong className="text-stone-800">Escritura de boleta histórica</strong> (va hacia D2)</li>
                                  <li>• <strong className="text-stone-800">Egresos físicos de inventario</strong> (va hacia D1)</li>
                                  <li>• <strong className="text-stone-800">Recibo numerado impreso</strong> (va hacia E1)</li>
                                </>
                              )}
                              {activeDfdNode === 'P2' && (
                                <>
                                  <li>• <strong className="text-stone-800">Inventario actualizado de productos</strong> (va hacia D1)</li>
                                  <li>• <strong className="text-stone-800">Alertas de falta de stock</strong> (va hacia E3 o P4)</li>
                                </>
                              )}
                              {activeDfdNode === 'P3' && (
                                <>
                                  <li>• <strong className="text-stone-800">Despacho físico en Killi Killi</strong> (va hacia E1)</li>
                                  <li>• <strong className="text-stone-800">Cruce de actualización coordinada</strong> (va hacia D2)</li>
                                </>
                              )}
                              {activeDfdNode === 'P4' && (
                                <>
                                  <li>• <strong className="text-stone-800">Reportes estadísticos amigables</strong> (va hacia E3)</li>
                                  <li>• <strong className="text-stone-800">Cierre diario sumado por caja</strong> (va hacia E3)</li>
                                </>
                              )}
                              {activeDfdNode === 'D1' && (
                                <>
                                  <li>• <strong className="text-stone-800">Lecturas de SKU y Precio de venta</strong> (va hacia P1)</li>
                                  <li>• <strong className="text-stone-800">Volumen crítico para auditoría</strong> (va hacia P4)</li>
                                </>
                              )}
                              {activeDfdNode === 'D2' && (
                                <>
                                  <li>• <strong className="text-stone-800">Filtro de ventas a despachar</strong> (va hacia P3)</li>
                                  <li>• <strong className="text-stone-800">Sumatoria mensual de cobros</strong> (va hacia P4)</li>
                                </>
                              )}
                              {activeDfdNode === 'D3' && (
                                <li>• <strong className="text-stone-800">Búsqueda de dirección de entrega de panes</strong> (va hacia P3)</li>
                              )}
                            </ul>
                          </div>
                        </div>

                        {/* Node theoretical commentary */}
                        <p className="text-[11px] text-[#5D4037] bg-stone-100 p-2.5 rounded border-l-4 border-amber-600 font-sans leading-normal">
                          {activeDfdNode === 'E1' && 'El cliente o estudiante de la UMSA es fundamental en mostrador. Este modelo estructurado asume un mostrador de autoservicio o atención inmediata asistida por teclado.'}
                          {activeDfdNode === 'E2' && 'La cadena de reabastecimiento conecta directamente con productores paceños de queso criollo e insumos básicos del valle paceño.'}
                          {activeDfdNode === 'E3' && 'Don Raúl lee las estadísticas de cierre integrales para planificar las compras con base científica y evitar roturas de stock.'}
                          {activeDfdNode === 'P1' && 'P1 resuelve analíticamente el algoritmo clásico del Punto de Venta (POS): escaneo, consulta en D1, evaluación de volumen disponible, mutación física y emisión de recibo.'}
                          {activeDfdNode === 'P2' && 'P2 gestiona el abastecimiento logístico. Integra algoritmos de inventario perpetuo y alerta de stock mínimo de seguridad.'}
                          {activeDfdNode === 'P3' && 'P3 coordina los despachos en moto o a pie a los universitarios que residen en el Mirador Killi Killi y zonas circundantes.'}
                          {activeDfdNode === 'P4' && 'P4 extrae trazas transaccionales consolidadas para modelar gráficas matemáticas en 2D de volumen y ganancias por rubros.'}
                          {activeDfdNode === 'D1' && 'El almacenamiento D1 representa lógicamente la tabla final "Product" del modelo relacional físico en memoria.'}
                          {activeDfdNode === 'D2' && 'La base D2 representa lógicamente la relación de "Sale" y "Transaction" que resguarda el patrimonio histórico comercial de la empresa.'}
                          {activeDfdNode === 'D3' && 'El almacén D3 conforma las direcciones de despacho de los clientes frecuentes de la zona de periférica de La Paz.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* DFD NIVEL 2 DETALLADO */}
              {selectedDfdTab === 'nivel2' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-stone-100 p-3 rounded-xl border border-stone-200">
                    <span className="text-xs text-stone-700 font-bold">Selecciona el Proceso Principal que deseas descomponer jerárquicamente:</span>
                    
                    {/* Select process mini tab */}
                    <div className="flex bg-white p-1 rounded-lg border border-stone-200 shrink-0">
                      {(['P1', 'P2', 'P3', 'P4'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedDfd2Process(p)}
                          className={`px-3 py-1 font-mono font-extrabold text-[10px] rounded transition-all ${selectedDfd2Process === p ? 'bg-amber-600 text-white shadow' : 'text-stone-500 hover:text-stone-900'}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SUB-PROCESS FLOWCHART CONTAINER */}
                  <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 space-y-4">
                    
                    <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                      <span className="text-xs font-mono font-extrabold text-amber-700 uppercase">Jerarquía de Detalle (Gane-Sarson / deMarco)</span>
                      <h5 className="font-extrabold text-stone-900 text-xs font-display">
                        {selectedDfd2Process === 'P1' && 'P1: GESTIONAR PEDIDOS DE CLIENTES'}
                        {selectedDfd2Process === 'P2' && 'P2: ADMINISTRAR ABASTECIMIENTO Y STOCK'}
                        {selectedDfd2Process === 'P3' && 'P3: COORDINAR LOGÍSTICA DE ENTREGA'}
                        {selectedDfd2Process === 'P4' && 'P4: REPORTAR Y APOYAR A LA GERENCIA'}
                      </h5>
                    </div>

                    {/* RENDER DFD NIVEL 2 VECTOR ARCHITECTURE */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center relative py-4">

                      {/* Entry entity representation */}
                      <div className="bg-stone-50 p-3 rounded-lg border border-dashed border-stone-400 text-center space-y-1">
                        <span className="text-xs font-bold text-stone-500 uppercase font-mono">Entrada de frontera</span>
                        <div className="font-extrabold text-[#5D4037] text-xs">
                          {selectedDfd2Process === 'P1' && 'E1: Cliente'}
                          {selectedDfd2Process === 'P2' && 'E2: Proveedor'}
                          {selectedDfd2Process === 'P3' && 'E1: Cliente'}
                          {selectedDfd2Process === 'P4' && 'E3: Gerente'}
                        </div>
                        <p className="text-[10px] text-stone-400">Detonante inicial del sub-flujo lúdico.</p>
                      </div>

                      {/* Line connector icon */}
                      <div className="hidden md:flex justify-center text-amber-500">
                        <ArrowRight size={20} className="animate-pulse" />
                      </div>

                      {/* Sub-processes details column */}
                      <div className="md:col-span-2 space-y-3">
                        {selectedDfd2Process === 'P1' && (
                          <>
                            {/* Sub 1.1 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-600 text-white font-mono text-[9px] rounded font-bold">1.1</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Seleccionar Ítem del Catálogo</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Lee SKU/barras o nombre para extraer el subtotal y descripción desde D1.</p>
                              </div>
                            </div>
                            
                            {/* Sub 1.2 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-600 text-white font-mono text-[9px] rounded font-bold">1.2</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Validar Disponibilidad en Góndola</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Compara stock demandado contra stock físico D1. Emite bandera si es menor al mínimo.</p>
                              </div>
                            </div>

                            {/* Sub 1.3 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-600 text-white font-mono text-[9px] rounded font-bold">1.3</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Registrar Venta de Caja</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Inyecta el estado de cobro en D2 y decrece físicamente las cantidades en D1.</p>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedDfd2Process === 'P2' && (
                          <>
                            {/* Sub 2.1 */}
                            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-300 flex gap-2 items-start hover:bg-orange-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-orange-600 text-white font-mono text-[9px] rounded font-bold">2.1</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Monitorear Alertas de Stock</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Monitorea y compila de forma constante alertas críticas sobre el catálogo de víveres D1.</p>
                              </div>
                            </div>

                            {/* Sub 2.2 */}
                            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-300 flex gap-2 items-start hover:bg-orange-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-orange-600 text-white font-mono text-[9px] rounded font-bold">2.2</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Registrar Entrada Proveedor</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Carga directas existencias compradas de ababarrotes y actualiza costo promedio en D1.</p>
                              </div>
                            </div>

                            {/* Sub 2.3 */}
                            <div className="p-3 bg-orange-50/50 rounded-xl border border-orange-300 flex gap-2 items-start hover:bg-orange-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-orange-600 text-white font-mono text-[9px] rounded font-bold">2.3</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Ajuste Físico de Pérdidas</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Módulo de control de mermas o rotura de productos perecederos (p. ej. lácteos).</p>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedDfd2Process === 'P3' && (
                          <>
                            {/* Sub 3.1 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-700 text-white font-mono text-[9px] rounded font-bold">3.1</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Planificación de Despachos</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Filtra facturas cobradas de Killi Killi y agrupa las guías en hojas de ruta eficientes.</p>
                              </div>
                            </div>

                            {/* Sub 3.2 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-700 text-white font-mono text-[9px] rounded font-bold">3.2</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Control de Direcciones</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Valida números telefónicos y referencias geográficas ingresadas por universitarios en D3.</p>
                              </div>
                            </div>

                            {/* Sub 3.3 */}
                            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300 flex gap-2 items-start hover:bg-amber-100/40 transition-all">
                              <span className="px-1.5 py-0.5 bg-amber-700 text-white font-mono text-[9px] rounded font-bold">3.3</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Gestión Integral de Estados</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Actualiza secuencias lógicas del ciclo de vida del despacho (Camino/Entregado) en D2.</p>
                              </div>
                            </div>
                          </>
                        )}

                        {selectedDfd2Process === 'P4' && (
                          <>
                            {/* Sub 4.1 */}
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-300 flex gap-2 items-start hover:bg-stone-100 transition-all">
                              <span className="px-1.5 py-0.5 bg-stone-700 text-white font-mono text-[9px] rounded font-bold">4.1</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Consolidar Cierre de Caja</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Agrupa y balancea cobros físicos contra depósitos directos Tigo Money finales en D2.</p>
                              </div>
                            </div>

                            {/* Sub 4.2 */}
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-300 flex gap-2 items-start hover:bg-stone-100 transition-all">
                              <span className="px-1.5 py-0.5 bg-stone-700 text-white font-mono text-[9px] rounded font-bold">4.2</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Analíticas e Indicadores por Rubro</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Estructura diagramación estadística del volumen comercial para la toma analítica gerencial.</p>
                              </div>
                            </div>

                            {/* Sub 4.3 */}
                            <div className="p-3 bg-stone-50 rounded-xl border border-stone-300 flex gap-2 items-start hover:bg-stone-100 transition-all">
                              <span className="px-1.5 py-0.5 bg-stone-700 text-white font-mono text-[9px] rounded font-bold">4.3</span>
                              <div className="space-y-0.5">
                                <h6 className="font-extrabold text-stone-900 text-xs uppercase leading-none">Historial de Auditoría de Operaciones</h6>
                                <p className="text-[10.5px] text-stone-500 font-sans leading-normal">Logea accesos de operadores a módulos críticos mercantiles regulando privilegios lógicos.</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </motion.div>
      )}

      {/* 4. VIEW: OO UML */}
      {currentTab === 'objetos' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">Análisis y Diseño Orientado a Objetos (ADOO)</h2>
            <p className="text-stone-500 text-xs mt-1">Modelado estático y dinámico mediante UML adaptado científicamente a Tienda Raul.</p>
          </div>

          {/* Diagrama de clases de Tienda Raul */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <FileCode className="text-amber-500" size={16} />
              <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Diagrama de Clases Estático</h3>
            </div>
            
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              Define los modelos lógicos orientados a objetos. Para este software de Tienda Raul se han resuelto las siguientes clases nucleares:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-[10px] font-bold uppercase text-stone-600">
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: Producto</span>
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: Categoría</span>
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: Cliente</span>
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: Venta</span>
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: DetalleVenta</span>
              <span className="p-2 bg-[#FFF3E0] rounded-lg border border-amber-200 text-[#5D4037]">Clase: Transacción</span>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-dashed border-amber-500/40 rounded-xl text-center space-y-3">
              <span className="text-4xl">🧱</span>
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display">Área del Diagrama de Clases UML</h4>
              <p className="text-[11px] text-stone-500 max-w-lg mx-auto font-sans leading-relaxed">
                [<strong>Espacio para tu Diagrama de Clases</strong>] Aquí debes apuntar la imagen del Diagrama de Clases con sus respectivos atributos (sku, stock, total, etc.) y operaciones de código (actualizarStock, registrarMovimiento).
              </p>
              <div className="inline-block bg-[#FFF3E0] text-[#D84315] font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200">
                Archivo sugerido: `/public/assets/diagramas/Diagrama_Clases.png`
              </div>
            </div>
          </div>

          {/* Diagrama de Casos de uso de negocio y sistema */}
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <FileCode className="text-amber-500" size={16} />
              <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Diagramas de Casos de Uso (UML)</h3>
            </div>
            
            <div className="p-6 bg-[#FAF8F5] border border-dashed border-amber-500/40 rounded-xl text-center space-y-3">
              <span className="text-4xl">🔮</span>
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display">Casos de Uso de Negocio y Sistema</h4>
              <p className="text-[11px] text-stone-500 max-w-lg mx-auto font-sans leading-relaxed">
                [<strong>Espacio para Diagrama de Casos de Uso</strong>] Aquí puedes enlazar los diagramas de interacciones. Incluyen dependencias funcionales clásicas de inclusión `&lt;&lt;include&gt;&gt;` y extensión `&lt;&lt;extend&gt;&gt;` relativas a Procesar Cobros y Validar Stock Mínimo.
              </p>
              <div className="inline-block bg-[#FFF3E0] text-[#D84315] font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200">
                Archivos: `/public/assets/diagramas/DCU_negocio.jpg` y `DCU_sistema.jpg`
              </div>
            </div>
          </div>

        </motion.div>
      )}

      {/* 5. VIEW: VIDEOS EXPLICATIVOS */}
      {currentTab === 'videos' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">Videos Explicativos & Tutoriales</h2>
            <p className="text-stone-500 text-xs mt-1">Exposiciones de los estudiantes que defienden la implementación teórica ante el comité de la UMSA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Video tutorial 1 */}
            <div className="bg-white rounded-2xl border-2 border-stone-200/60 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="aspect-video bg-black relative">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/8c1cTgWr43o" 
                  title="Tutorial Análisis Estructurado Tienda Raul" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className="p-4 space-y-1.5 bg-[#FAF8F5]">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Video 1: Defensa de Enfoque Estructurado</h4>
                <p className="text-[11px] text-stone-500 font-sans leading-relaxed">Mapeo conceptual del Modelo Ambiental, diccionarios procesales sobre acontecimientos y diagramación de flujos de datos.</p>
              </div>
            </div>

            {/* Video tutorial 2 */}
            <div className="bg-white rounded-2xl border-2 border-stone-200/60 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="aspect-video bg-black relative">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/JKU7hrO3F7g" 
                  title="Tutorial Orientado a Objetos Tienda Raul" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </div>
              <div className="p-4 space-y-1.5 bg-[#FAF8F5]">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Video 2: Casos de Uso y Clases UML</h4>
                <p className="text-[11px] text-stone-500 font-sans leading-relaxed">Explicación interactiva del diagrama de clases estático final, herencia, encapsulamientos de código y relaciones de cardinalidad.</p>
              </div>
            </div>

          </div>

        </motion.div>
      )}

      {/* 6. VIEW: CONTACTO / STUDENTS */}
      {currentTab === 'contacto' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="space-y-6"
        >
          <div className="pb-3 border-b border-stone-200">
            <h2 className="text-xl font-bold font-display text-[#5D4037]">Información y Contacto de Estudiantes</h2>
            <p className="text-stone-500 text-xs mt-1">Estudiantes de la Carrera de Informática de la UMSA para la materia de Análisis y Diseño de Sistemas.</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border-2 border-stone-200/60 shadow-lg space-y-6">
            
            {/* Header institution info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-stone-100 pb-5 text-center sm:text-left">
              <div className="w-14 h-14 bg-gradient-to-tr from-[#5D4037] to-[#3E2723] rounded-2xl text-white flex items-center justify-center font-extrabold text-base border-r-4 border-amber-500 tracking-wider">
                UMSA
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-stone-900 text-sm font-display tracking-tight uppercase">Universidad Mayor de San Andrés</h3>
                <p className="text-stone-500 text-xs font-semibold uppercase">Carrera de Informática • ADS</p>
                <div className="flex items-center gap-1 text-[10px] text-stone-400 justify-center sm:justify-start">
                  <MapPin size={10} />
                  <span>Av. Villazón Nro 1995 Monoblock Central, La Paz</span>
                </div>
              </div>
            </div>

            {/* List students table */}
            <div className="space-y-3">
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display tracking-wider">Equipo de Proyecto Académico</h4>
              
              <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs">
                
                {/* student 1 */}
                <div className="p-3.5 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Bacarreza Castro Cristian Carlos</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>78937703</span>
                  </div>
                </div>

                {/* student 2 */}
                <div className="p-3.5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Parra Nigañez Fabian Huascar</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>60508872</span>
                  </div>
                </div>

                {/* student 3 */}
                <div className="p-3.5 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Contreras Maidana Jorge Luis</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>67176271</span>
                  </div>
                </div>

                {/* student 4 */}
                <div className="p-3.5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Choque Luque Joel Isai</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>76560059</span>
                  </div>
                </div>

                {/* student 5 */}
                <div className="p-3.5 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Mamani Morales Ivar Mijail</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>63231690</span>
                  </div>
                </div>

              </div>
            </div>

            {/* University quick warning */}
            <div className="bg-amber-50 p-4 border-l-4 border-amber-500 rounded-r-xl flex gap-3 text-amber-900 text-xs leading-normal">
              <Info size={16} className="shrink-0 text-amber-600 mt-0.5" />
              <div className="space-y-1 font-sans font-medium">
                <p><strong>Régimen de Evaluación Académica:</strong></p>
                <p>Este sistema ha sido desarrollado bajo estrictas guías de modularidad, integrando base de datos persistente simulada en React para demostrar de forma empírica la viabilidad técnica del modelo resultante.</p>
              </div>
            </div>

          </div>
        </motion.div>
      )}

    </div>
  );
}
