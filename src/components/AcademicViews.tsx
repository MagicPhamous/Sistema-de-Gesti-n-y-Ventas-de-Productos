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

interface AcademicViewsProps {
  currentTab: 'historia' | 'marco' | 'estructurado' | 'objetos' | 'videos' | 'contacto';
}

export default function AcademicViews({ currentTab }: AcademicViewsProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

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
            <h2 className="text-xl font-bold font-display text-[#5D4037]">La Historia de Éxito de "Tienda Raul"</h2>
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
                    "Empezamos con un solo cajón y el sueño de traer alimentos de calidad directly from local valleys to our neighbors' kitchens."
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="md:col-span-8 space-y-4 leading-relaxed text-sm text-stone-600 font-medium">
              <p>
                En el centro de la concurrida zona de <strong>Sopocachi, en la ciudad de La Paz, Bolivia</strong>, se encuentra un pilar fundamental de la alimentación del vecindario: <strong>"Tienda Raul"</strong>. Fundada el <strong>12 de octubre de 2012</strong> por Don Raúl Gutiérrez, esta prestigiosa tienda de abarrotes y productos del valle nació de una premisa humilde: ofrecer productos de alta calidad, quesos criollos recién traídos del lago de Huatajata, y pan caliente de Laja directamente a las familias de la zona.
              </p>
              <p>
                Don Raúl nos comparte: <em>"Nosotros somos paceños de corazón, y creamos esta tienda para apoyar a nuestros hermanos productores rurales. Apostamos por Sopocachi por el gran cariño que le tenemos a esta zona y a su gente trabajadora"</em>. Con el tiempo, lo que comenzó como un pequeño anaquel en una esquina residencial se expandió y consolidó, requiriendo hoy en día una coordinación logística minuciosa de compras, cálculo de inventario mínimo para evitar desabastecimientos de productos clave como la leche o el aceite, y facturación ágil diario.
              </p>
              <p>
                Hoy en día, junto a un equipo apasionado de colaboradores, "Tienda Raul" ha decidido dar el paso hacia la <strong>transformación digital de sus operaciones</strong>. El desarrollo de este Sistema de Gestión y Ventas simboliza la unión de los esfuerzos familiares paceños con tecnologías modernas de software desarrolladas en la <strong>Universidad Mayor de San Andrés (UMSA)</strong>, permitiendo planificar con precisión científica el stock y dar un servicio instantáneo y transparente a cada cliente.
              </p>
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
          <div className="bg-white p-5 rounded-2xl border-2 border-stone-200/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <FileCode className="text-amber-500" size={16} />
              <h3 className="font-bold text-stone-900 text-xs uppercase font-display">Modelo de Comportamiento: DFD Nivel 1 y Nivel 2</h3>
            </div>
            
            <p className="text-xs text-stone-500 leading-relaxed font-sans">
              La vista de procesos de Nivel 1 descompone el sistema único centralizado en <strong>cuatro módulos del software estructurados para Tienda Raul</strong>:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xl">📥</span>
                <p className="font-bold text-stone-800 text-[10px] uppercase mt-1">P1: Procesar Caja POS</p>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xl">📦</span>
                <p className="font-bold text-stone-800 text-[10px] uppercase mt-1">P2: Control de Stock</p>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xl">🏷️</span>
                <p className="font-bold text-stone-800 text-[10px] uppercase mt-1">P3: Catálogo Rubros</p>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <span className="text-xl">📊</span>
                <p className="font-bold text-stone-800 text-[10px] uppercase mt-1">P4: Reportar Ventas</p>
              </div>
            </div>

            <div className="p-6 bg-[#FAF8F5] border border-dashed border-amber-500/40 rounded-xl text-center space-y-3">
              <span className="text-4xl">✏️</span>
              <h4 className="font-bold text-[#5D4037] text-xs uppercase font-display">Diagramas de Procesamiento de Información</h4>
              <p className="text-[11px] text-stone-500 max-w-lg mx-auto font-sans leading-relaxed">
                [<strong>Espacio para tus DFDs de Procesos</strong>] Aquí puedes mapear la arquitectura paso a paso de los DFDs. Puedes configurar el Nivel 1 y el Nivel 2 detallado de flujos.
              </p>
              <div className="inline-block bg-[#FFF3E0] text-[#D84315] font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-amber-200">
                Ubicación recomendada: `/public/assets/diagramas/M_Comportamiento_nivel_1.png`
              </div>
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
                    <span className="font-bold text-stone-800">Kate Lucero Fernandez Saavedra</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>77580155</span>
                  </div>
                </div>

                {/* student 2 */}
                <div className="p-3.5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Nelson Paul Lopez Gutierrez</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>69723730</span>
                  </div>
                </div>

                {/* student 3 */}
                <div className="p-3.5 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Alejandro Quintela Aguilar</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>68099764</span>
                  </div>
                </div>

                {/* student 4 */}
                <div className="p-3.5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2 w-2/3">
                    <span className="p-1.5 bg-amber-100 text-[#D84315] rounded-full shrink-0"><User size={12} /></span>
                    <span className="font-bold text-stone-800">Hernan Viscarra Arias</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-500 font-mono">
                    <Phone size={11} className="text-stone-400" />
                    <span>73081425</span>
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
