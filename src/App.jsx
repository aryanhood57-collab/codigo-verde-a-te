import { useState, useEffect, useRef } from "react";

// ============================================================
// OPERACIÓN: CÓDIGO VERDE — VERSIÓN A
// Técnico Superior en Tecnologías Metalmecánicas
// Grupo TM | EDA1003 | II Cuatrimestre 2026
// Equipos: ALFA (impar) · GAMMA (impar)
// Contraseña de acceso: FRESADORAS
// ============================================================

const CONTRASENA = "FRESADORAS";
const VERSION = "A";
const EQUIPOS_VERSION = "ALFA · GAMMA";

const RETOS = [
  // ── BLOQUE 1: CALENTAMIENTO (3 × 10 min) ──
  {
    id: 1, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "¿Aspecto o impacto?",
    narrativa: "La planta «Aceros del Istmo» recibió hoy una notificación de MiAMBIENTE: no tiene registro de aspectos e impactos ambientales. El auditor llega en 10 minutos. Tú eres el técnico ambiental de turno.",
    p1: "El proceso de soldadura MIG genera humos metálicos, escoria y consume electricidad. Elige UNO de estos tres elementos y explica con precisión técnica: ¿es un aspecto o un impacto ambiental? ¿Por qué? Usa la lógica causa → efecto de ISO 14001.",
    p2: "Según ISO 14001:2015, ¿cuál es la definición correcta de ASPECTO AMBIENTAL?",
    opciones: [
      "A) El daño que una actividad industrial causa al ecosistema.",
      "B) El elemento de las actividades, productos o servicios que puede interactuar con el medio ambiente.",
      "C) La legislación ambiental que una empresa debe cumplir obligatoriamente.",
      "D) El residuo sólido generado durante un proceso de fabricación metálica.",
    ],
    correcta: "B",
    explicacion: "ISO 14001:2015 define aspecto ambiental como el elemento de las actividades, productos o servicios de una organización que puede interactuar con el medio ambiente. El impacto es la consecuencia (positiva o negativa) de esa interacción.",
    fragmento: "F",
  },
  {
    id: 2, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "El inventario olvidado",
    narrativa: "El almacén de la planta tiene bidones de aceite de corte usado, viruta de acero y trapos con solvente. Nadie los ha clasificado. El supervisor dice que 'si no huelen mal, no son peligrosos'.",
    p1: "¿Cuál de los tres residuos (aceite de corte usado, viruta de acero limpia, trapos con solvente) clasificarías como residuo peligroso según la legislación panameña? Justifica usando al menos DOS criterios de peligrosidad (toxicidad, inflamabilidad, reactividad, corrosividad).",
    p2: "¿Cuál de los siguientes residuos generados en un taller metalmecánico NO se clasifica como residuo peligroso?",
    opciones: [
      "A) Aceite hidráulico contaminado con partículas de cobre.",
      "B) Viruta de acero inoxidable sin contaminantes químicos.",
      "C) Trapos impregnados con solvente de limpieza de piezas.",
      "D) Electrolitos agotados de un baño de galvanizado.",
    ],
    correcta: "B",
    explicacion: "La viruta de acero inoxidable sin contaminantes es un residuo metálico recuperable y no peligroso. Los demás contienen sustancias tóxicas, inflamables o reactivas que los clasifican como peligrosos según la normativa panameña (Ley 41/1998 y Decreto 306/2002).",
    fragmento: "R",
  },
  {
    id: 3, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "La huella que pesa",
    narrativa: "El gerente de 'Aceros del Istmo' necesita presentar la huella de carbono mensual ante el consejo directivo. Los datos de consumo acaban de llegar del departamento de mantenimiento.",
    p1: "El proceso de galvanizado consume 1 200 kWh de electricidad al mes y genera 80 litros de efluentes con zinc por lote. Usando lo aprendido en clase sobre huellas ambientales, ¿cuál impacto consideras más crítico para el ambiente local? Propón UNA medida concreta para reducirlo.",
    p2: "El factor de emisión eléctrica de Panamá (ETESA/CEPAL 2023) es 0,264 kg CO₂eq/kWh. Si el taller consume 1 200 kWh/mes, ¿cuál es su huella de carbono mensual por electricidad?",
    opciones: [
      "A) 168,0 kg CO₂eq",
      "B) 216,8 kg CO₂eq",
      "C) 316,8 kg CO₂eq",
      "D) 480,0 kg CO₂eq",
    ],
    correcta: "C",
    explicacion: "1 200 kWh × 0,264 kg CO₂eq/kWh = 316,8 kg CO₂eq. Este factor es específico para Panamá y refleja su matriz energética predominantemente hidráulica con complemento termoeléctrico (ETESA/CEPAL 2023).",
    fragmento: "E",
  },
  // ── BLOQUE 2: NÚCLEO TÉCNICO (4 × 8 min) ──
  {
    id: 4, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#1565C0", minutos: 8,
    titulo: "Leopold en el taller",
    narrativa: "El informe de Fase 1 llegó con errores: el equipo asignó magnitud e importancia sin criterio. El auditor regresa en 8 minutos y exige una corrección.",
    p1: "El torneado CNC genera: (A) ruido industrial >85 dB, (B) viruta metálica, (C) consumo de agua de refrigeración. Elige UNO y asígnale valores de magnitud (escala -10 a +10) e importancia (1-10) en la Matriz de Leopold. Justifica ambos valores con criterios técnicos (intensidad, extensión, reversibilidad).",
    p2: "En la Matriz de Leopold, ¿cuál es el rango correcto de valores para la MAGNITUD de un impacto ambiental?",
    opciones: [
      "A) 1 a 5, donde 5 es el impacto más severo.",
      "B) -10 a +10, donde el signo indica la dirección del impacto.",
      "C) 0 a 100%, donde 100% indica impacto total sobre el componente.",
      "D) A, B, C o D, según categorías de riesgo ambiental.",
    ],
    correcta: "B",
    explicacion: "En la Matriz de Leopold la magnitud se valora de -10 (máximo impacto negativo) a +10 (máximo impacto positivo) y la importancia de 1 a 10. El signo indica la dirección del cambio; la importancia refleja la trascendencia del impacto independientemente de su dirección.",
    fragmento: "S",
  },
  {
    id: 5, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#1565C0", minutos: 8,
    titulo: "Ley 41 al banquillo",
    narrativa: "Un contratista nuevo asegura que la Ley 41/1998 'ya fue derogada' y que no hay que cumplirla. El jefe de planta te pide que desmontes el argumento antes de que cause un problema legal.",
    p1: "¿Por qué la Ley 41/1998 (Ley General de Ambiente de Panamá) sigue siendo el marco legal vigente? Menciona al menos DOS obligaciones concretas que impone a las empresas del sector metalmecánico en Panamá.",
    p2: "¿Cuál herramienta es EXIGIDA por el Decreto Ejecutivo 306/2002 para proyectos industriales con impacto ambiental significativo en Panamá?",
    opciones: [
      "A) Plan de Responsabilidad Social Empresarial (RSE).",
      "B) Estudio de Impacto Ambiental (EIA) categoría II o III.",
      "C) Certificación voluntaria ISO 14001:2015.",
      "D) Auditoría de calidad ISO 9001:2015.",
    ],
    correcta: "B",
    explicacion: "El Decreto Ejecutivo 306/2002 reglamenta el proceso de evaluación de impacto ambiental en Panamá y establece la obligatoriedad del EIA para categorías II y III. ISO 14001 es voluntaria; el EIA es legalmente mandatorio para actividades de impacto significativo.",
    fragmento: "A",
  },
  {
    id: 6, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#1565C0", minutos: 8,
    titulo: "ISO 14001: más que cumplir",
    narrativa: "La dirección de 'Aceros del Istmo' quiere implementar ISO 14001. El jefe de producción pregunta: '¿Para qué, si ya cumplimos la ley?' Tú tienes 8 minutos para convencerle.",
    p1: "Explica la diferencia entre CUMPLIMIENTO LEGAL ambiental (mínimo exigido por ley panameña) y un SISTEMA DE GESTIÓN AMBIENTAL ISO 14001 (mejora continua voluntaria). Da un ejemplo concreto aplicado al taller metalmecánico.",
    p2: "¿Cuál es el ciclo de gestión que estructura la norma ISO 14001:2015?",
    opciones: [
      "A) Identificar → Evaluar → Controlar → Reportar.",
      "B) Planificar → Hacer → Verificar → Actuar (PHVA / PDCA).",
      "C) Diagnosticar → Diseñar → Implementar → Cerrar.",
      "D) Medir → Analizar → Mejorar → Controlar (MAIC).",
    ],
    correcta: "B",
    explicacion: "ISO 14001:2015 está estructurada sobre el ciclo PHVA (Planificar-Hacer-Verificar-Actuar), también conocido como ciclo de Deming o PDCA. Este enfoque garantiza la mejora continua del desempeño ambiental más allá del mínimo legal.",
    fragmento: "D",
  },
  {
    id: 7, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#1565C0", minutos: 8,
    titulo: "Agua que no regresa",
    narrativa: "La fresadora CNC consume 4 800 litros de agua de refrigeración al mes. El agua sale contaminada con partículas metálicas. La gerente exige conocer la huella hídrica total antes del cierre del turno.",
    p1: "Además del volumen consumido (huella hídrica azul), el agua de refrigeración contaminada genera huella hídrica gris. Explica qué es la huella hídrica gris y cómo afecta la huella total del taller. Propón una medida para reducirla.",
    p2: "¿Cuál concepto describe mejor la HUELLA HÍDRICA GRIS?",
    opciones: [
      "A) El agua de lluvia captada y almacenada para uso industrial.",
      "B) El volumen de agua dulce necesario para diluir contaminantes hasta alcanzar estándares de calidad.",
      "C) El agua subterránea extraída para procesos de refrigeración industrial.",
      "D) El agua evaporada durante el proceso de galvanizado en caliente.",
    ],
    correcta: "B",
    explicacion: "La huella hídrica gris representa el volumen de agua dulce necesario para asimilar la carga contaminante de un efluente hasta valores normativos del cuerpo receptor. En industrias metalmecánicas con efluentes cargados de metales pesados, esta huella puede ser muy superior a la huella azul.",
    fragmento: "O",
  },
  // ── BLOQUE 3: SPRINT FINAL (3 × 5 min) ──
  {
    id: 8, bloque: "SPRINT FINAL", bloqueColor: "#6A1B9A", minutos: 5,
    titulo: "Ecoeficiencia o cierre",
    narrativa: "¡Sprint final, agente! El comité ambiental exige una propuesta de ecoeficiencia para el área de soldadura. Tienes 5 minutos antes de que empiece la reunión.",
    p1: "Propón UNA medida de ecoeficiencia para el área de soldadura de 'Aceros del Istmo' que reduzca simultáneamente el consumo de recursos Y la generación de residuos. Especifica: ¿qué cambias?, ¿cómo lo implementas?, ¿qué impacto ambiental reduce?",
    p2: "¿Cuál de las siguientes acciones en un taller metalmecánico es un ejemplo CORRECTO de ecoeficiencia?",
    opciones: [
      "A) Aumentar la velocidad de producción sin modificar el consumo energético.",
      "B) Reutilizar el aceite de corte mediante filtración y reciclaje interno.",
      "C) Trasladar los residuos peligrosos a un terreno baldío fuera de la planta.",
      "D) Apagar los filtros de extracción de humos para ahorrar electricidad.",
    ],
    correcta: "B",
    explicacion: "Reutilizar el aceite de corte mediante filtración reduce simultáneamente el consumo de aceite nuevo (recurso) y la generación de aceite usado (residuo peligroso). Eso es ecoeficiencia: más valor con menos impacto. Las otras opciones aumentan el impacto o son ilegales.",
    fragmento: "R",
  },
  {
    id: 9, bloque: "SPRINT FINAL", bloqueColor: "#6A1B9A", minutos: 5,
    titulo: "Círculo de acero",
    narrativa: "El director de planta quiere presentar un caso de economía circular en la Feria Industrial de Chiriquí. Tienes 5 minutos para construir el ejemplo más sólido del sector.",
    p1: "Propón un ejemplo concreto de economía circular en 'Aceros del Istmo'. Debe incluir: (1) qué residuo o subproducto se valoriza, (2) cómo se reintegra al ciclo productivo, (3) qué beneficio ambiental Y económico genera.",
    p2: "La economía circular se diferencia de la economía lineal porque:",
    opciones: [
      "A) Elimina completamente la generación de residuos en todos los procesos.",
      "B) Produce más bienes utilizando menos trabajadores en la línea de producción.",
      "C) Mantiene los materiales en uso el mayor tiempo posible, reduciendo extracción de recursos vírgenes y generación de residuos.",
      "D) Sustituye los procesos industriales automatizados por procesos artesanales.",
    ],
    correcta: "C",
    explicacion: "La economía circular busca mantener materiales y productos en uso durante el mayor tiempo posible mediante estrategias de reutilización, reparación, remanufactura y reciclaje. No elimina todos los residuos (opción A), sino que los minimiza y los reintegra como recursos.",
    fragmento: "A",
  },
  {
    id: 10, bloque: "SPRINT FINAL", bloqueColor: "#6A1B9A", minutos: 5,
    titulo: "La certificación se salva",
    narrativa: "¡Último reto! El auditor de MiAMBIENTE pide una propuesta de Plan de Mejora Ambiental en una sola página. Si la entregas bien, 'Aceros del Istmo' conserva su certificación.",
    p1: "Resume en máximo 5 puntos concretos tu PLAN DE MEJORA AMBIENTAL para 'Aceros del Istmo'. Cada punto debe incluir: acción específica, impacto que reduce y plazo estimado (corto/mediano/largo). Piensa en todo lo trabajado durante la sesión.",
    p2: "¿Cuál de los siguientes elementos NO forma parte de un Plan de Gestión Ambiental (PGA) según la metodología de ISO 14001?",
    opciones: [
      "A) Objetivos y metas ambientales medibles.",
      "B) Programa de capacitación del personal en gestión ambiental.",
      "C) Análisis de rentabilidad financiera por línea de producto.",
      "D) Indicadores de seguimiento del desempeño ambiental.",
    ],
    correcta: "C",
    explicacion: "El análisis de rentabilidad financiera por línea de producto corresponde a la gestión financiera o comercial, no al Plan de Gestión Ambiental. Un PGA incluye objetivos, metas, responsables, plazos, recursos e indicadores de desempeño ambiental, pero no análisis de rentabilidad por producto.",
    fragmento: "S",
  },
];

const C = {
  fondo: "#0D1117", panel: "#161B22", panelClaro: "#1C2128", borde: "#30363D",
  acero: "#8B9CB6", aceroClaro: "#C9D1D9", verde: "#2EA043", verdeOscuro: "#196127",
  azul: "#1F6FEB", purpura: "#8957E5", dorado: "#D29922", rojo: "#DA3633",
  blanco: "#F0F6FC", texto: "#E6EDF3", textoMuted: "#8B949E",
};

const estiloBase = { fontFamily: "'Courier New', monospace", background: C.fondo, color: C.texto, minHeight: "100vh", padding: 0, margin: 0 };

export default function CodigoVerdeA() {
  const [fase, setFase] = useState("sala");
  const [retoActual, setRetoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [respuestaAbierta, setRespuestaAbierta] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [fragmentos, setFragmentos] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [timerActivo, setTimerActivo] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerActivo && tiempoRestante > 0) {
      intervalRef.current = setInterval(() => setTiempoRestante(t => t - 1), 1000);
    } else if (tiempoRestante === 0) { clearInterval(intervalRef.current); setTimerActivo(false); }
    return () => clearInterval(intervalRef.current);
  }, [timerActivo, tiempoRestante]);

  const iniciarReto = (idx) => {
    setRetoActual(idx); setRespuestaAbierta(""); setOpcionSeleccionada("");
    setMostrarFeedback(false); setTiempoRestante(RETOS[idx].minutos * 60);
    setTimerActivo(true); setFase("reto");
  };

  const formatTiempo = (seg) => `${Math.floor(seg/60).toString().padStart(2,"0")}:${(seg%60).toString().padStart(2,"0")}`;

  const verificarRespuesta = () => {
    const reto = RETOS[retoActual];
    if (opcionSeleccionada === reto.correcta) {
      setPuntaje(p => p + 1);
      setFragmentos(f => [...f, reto.fragmento]);
    }
    setRespuestas(r => ({ ...r, [reto.id]: opcionSeleccionada }));
    setMostrarFeedback(true); setTimerActivo(false); clearInterval(intervalRef.current);
  };

  const siguienteReto = () => {
    const sig = retoActual + 1;
    if (sig < RETOS.length) iniciarReto(sig); else setFase("resultado");
  };

  const claveCompleta = fragmentos.join("");
  const tiempoPorc = tiempoRestante !== null ? (tiempoRestante / (RETOS[retoActual]?.minutos * 60)) * 100 : 100;
  const tiempoColor = tiempoPorc > 50 ? C.verde : tiempoPorc > 25 ? C.dorado : C.rojo;

  // ── SALA ──
  if (fase === "sala") return (
    <div style={{ ...estiloBase, padding:24, maxWidth:740, margin:"0 auto" }}>
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ color:C.verde, fontSize:11, letterSpacing:4, marginBottom:4 }}>⚙️ OPERACIÓN CÓDIGO VERDE — VERSIÓN {VERSION}</div>
        <h1 style={{ color:C.blanco, fontSize:22, margin:"0 0 4px" }}>Aceros del Istmo: Gestión Ambiental en Crisis</h1>
        <div style={{ color:C.textoMuted, fontSize:12 }}>{EQUIPOS_VERSION} · EDA1003 · II Cuatrimestre 2026</div>
      </div>
      <div style={{ background:C.panelClaro, border:`1px solid ${C.dorado}`, borderRadius:4, padding:20, marginBottom:24, fontSize:13, lineHeight:1.7, color:C.aceroClaro }}>
        <div style={{ color:C.dorado, fontWeight:"bold", marginBottom:8, fontSize:11, letterSpacing:2 }}>📋 BRIEFING CLASIFICADO</div>
        La Planta «Aceros del Istmo» enfrenta una auditoría ambiental de emergencia por MiAMBIENTE. Como agente de Gestión Ambiental, debes superar 10 retos técnicos organizados en tres bloques. Cada respuesta correcta desbloquea una letra de la contraseña ambiental final. ¡El equipo que complete la clave primero gana el trofeo ambiental!
      </div>
      {["CALENTAMIENTO","NÚCLEO TÉCNICO","SPRINT FINAL"].map(bloque => (
        <div key={bloque} style={{ marginBottom:20 }}>
          <div style={{ fontSize:10, color:C.textoMuted, letterSpacing:3, marginBottom:8, borderBottom:`1px solid ${C.borde}`, paddingBottom:4 }}>{bloque}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {RETOS.filter(r => r.bloque === bloque).map((reto, idx) => {
              const completado = respuestas[reto.id] !== undefined;
              const globalIdx = RETOS.findIndex(r => r.id === reto.id);
              return (
                <div key={reto.id} onClick={() => !completado && iniciarReto(globalIdx)}
                  style={{ background:C.panel, border:`1px solid ${completado ? C.verde : C.borde}`, borderLeft:`4px solid ${reto.bloqueColor}`, borderRadius:4, padding:14, display:"flex", alignItems:"center", gap:14, cursor:completado?"default":"pointer", opacity:completado?0.7:1 }}>
                  <div style={{ width:36, height:36, background:completado?C.verdeOscuro:C.panelClaro, border:`2px solid ${completado?C.verde:reto.bloqueColor}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, color:completado?C.verde:C.blanco, flexShrink:0 }}>
                    {completado ? "✓" : reto.id}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:C.textoMuted, letterSpacing:2, marginBottom:2 }}>{reto.minutos} MIN</div>
                    <div style={{ fontSize:13, color:C.blanco, fontWeight:"bold" }}>{reto.titulo}</div>
                  </div>
                  {!completado && <div style={{ color:reto.bloqueColor, fontSize:16 }}>▶</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{ background:C.panelClaro, border:`1px solid ${C.borde}`, borderRadius:4, padding:16, textAlign:"center", marginTop:8 }}>
        <div style={{ fontSize:10, color:C.textoMuted, letterSpacing:2, marginBottom:8 }}>🔐 CONTRASEÑA AMBIENTAL DESBLOQUEADA</div>
        <div style={{ fontSize:10, color:C.textoMuted, marginBottom:6 }}>
          {RETOS.map((r,i) => (
            <span key={i} style={{ display:"inline-block", width:28, textAlign:"center", color: i < fragmentos.length ? C.verde : C.borde }}>{i < fragmentos.length ? fragmentos[i] : "_"}</span>
          ))}
        </div>
        <div style={{ fontSize:26, fontWeight:900, letterSpacing:8, color:C.verde, background:C.fondo, border:`1px solid ${C.verde}`, borderRadius:4, padding:"10px 20px", display:"inline-block", minWidth:320, fontFamily:"'Courier New',monospace" }}>
          {claveCompleta.padEnd(10,"_").split("").join(" ")}
        </div>
        <div style={{ fontSize:11, color:C.textoMuted, marginTop:8 }}>Letras desbloqueadas: {fragmentos.length} / {RETOS.length}</div>
      </div>
    </div>
  );

  // ── RETO ──
  if (fase === "reto") {
    const reto = RETOS[retoActual];
    return (
      <div style={{ ...estiloBase, padding:24, maxWidth:740, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:10, color:reto.bloqueColor, letterSpacing:2 }}>{reto.bloque} — RETO {reto.id} DE {RETOS.length}</div>
            <div style={{ fontSize:18, fontWeight:900, color:C.blanco }}>{reto.titulo}</div>
          </div>
          <div style={{ fontFamily:"'Courier New',monospace", fontSize:26, fontWeight:900, color:tiempoColor, background:C.panelClaro, border:`2px solid ${tiempoColor}`, borderRadius:4, padding:"6px 14px", minWidth:80, textAlign:"center" }}>
            {tiempoRestante !== null ? formatTiempo(tiempoRestante) : `${reto.minutos}:00`}
          </div>
        </div>
        <div style={{ background:C.borde, borderRadius:2, height:4, marginBottom:18 }}>
          <div style={{ width:`${tiempoPorc}%`, height:4, background:tiempoColor, borderRadius:2, transition:"width 1s linear, background 0.5s" }}/>
        </div>
        <div style={{ background:C.panelClaro, borderLeft:`4px solid ${reto.bloqueColor}`, padding:16, borderRadius:"0 4px 4px 0", fontSize:13, lineHeight:1.7, color:C.aceroClaro, marginBottom:18 }}>
          🏭 {reto.narrativa}
        </div>
        {/* P1 */}
        <div style={{ background:C.panel, border:`1px solid ${C.borde}`, borderRadius:4, padding:18, marginBottom:14 }}>
          <div style={{ fontSize:10, color:C.dorado, letterSpacing:2, marginBottom:8 }}>📝 PREGUNTA 1 — ANÁLISIS TÉCNICO (evaluación docente)</div>
          <div style={{ fontSize:13, color:C.blanco, lineHeight:1.7, marginBottom:10 }}>{reto.p1}</div>
          <textarea value={respuestaAbierta} onChange={e => setRespuestaAbierta(e.target.value)} placeholder="Escribe tu análisis aquí..." disabled={mostrarFeedback}
            style={{ width:"100%", minHeight:90, background:C.fondo, border:`1px solid ${C.borde}`, borderRadius:4, color:C.texto, padding:10, fontSize:13, fontFamily:"'Courier New',monospace", resize:"vertical", boxSizing:"border-box", outline:"none" }}/>
        </div>
        {/* P2 */}
        <div style={{ background:C.panel, border:`1px solid ${C.borde}`, borderRadius:4, padding:18, marginBottom:18 }}>
          <div style={{ fontSize:10, color:C.azul, letterSpacing:2, marginBottom:8 }}>🔒 PREGUNTA 2 — CLAVE AMBIENTAL (validación automática)</div>
          <div style={{ fontSize:13, color:C.blanco, lineHeight:1.7, marginBottom:14 }}>{reto.p2}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {reto.opciones.map((op, i) => {
              const letra = ["A","B","C","D"][i];
              const esCorrecta = letra === reto.correcta;
              const esSeleccionada = opcionSeleccionada === letra;
              let bc = C.borde, bg = C.panelClaro;
              if (mostrarFeedback) { if (esCorrecta) { bc=C.verde; bg=`${C.verde}22`; } else if (esSeleccionada) { bc=C.rojo; bg=`${C.rojo}22`; } }
              else if (esSeleccionada) { bc=C.azul; bg=`${C.azul}22`; }
              return (
                <div key={letra} onClick={() => !mostrarFeedback && setOpcionSeleccionada(letra)}
                  style={{ background:bg, border:`1px solid ${bc}`, borderRadius:4, padding:"10px 14px", cursor:mostrarFeedback?"default":"pointer", fontSize:13, color:C.texto, transition:"all 0.2s" }}>
                  {op}
                </div>
              );
            })}
          </div>
          {mostrarFeedback && (
            <div style={{ marginTop:14, background:opcionSeleccionada===reto.correcta?`${C.verde}22`:`${C.rojo}22`, border:`1px solid ${opcionSeleccionada===reto.correcta?C.verde:C.rojo}`, borderRadius:4, padding:14, fontSize:12, color:C.aceroClaro, lineHeight:1.7 }}>
              <strong style={{ color:opcionSeleccionada===reto.correcta?C.verde:C.rojo }}>{opcionSeleccionada===reto.correcta?"✓ ¡CORRECTO!":"✗ INCORRECTO"}</strong><br/>
              {reto.explicacion}
              {opcionSeleccionada===reto.correcta && <div style={{ marginTop:8, color:C.dorado, fontWeight:"bold" }}>🔓 Letra desbloqueada: <span style={{ letterSpacing:4, fontSize:18 }}>"{reto.fragmento}"</span></div>}
            </div>
          )}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {!mostrarFeedback
            ? <button onClick={verificarRespuesta} disabled={!opcionSeleccionada} style={{ flex:1, padding:13, background:opcionSeleccionada?C.azul:C.panelClaro, border:`1px solid ${opcionSeleccionada?C.azul:C.borde}`, borderRadius:4, color:opcionSeleccionada?"#fff":C.textoMuted, fontSize:13, fontWeight:"bold", letterSpacing:1, cursor:opcionSeleccionada?"pointer":"not-allowed" }}>VERIFICAR RESPUESTA</button>
            : <button onClick={siguienteReto} style={{ flex:1, padding:13, background:C.verde, border:"none", borderRadius:4, color:"#fff", fontSize:13, fontWeight:"bold", letterSpacing:1, cursor:"pointer" }}>{retoActual < RETOS.length-1 ? "SIGUIENTE RETO ▶" : "VER RESULTADOS ▶"}</button>
          }
          <button onClick={() => { setFase("sala"); setTimerActivo(false); clearInterval(intervalRef.current); }} style={{ padding:"13px 18px", background:"transparent", border:`1px solid ${C.borde}`, borderRadius:4, color:C.textoMuted, fontSize:12, cursor:"pointer" }}>SALA</button>
        </div>
      </div>
    );
  }

  // ── RESULTADO ──
  if (fase === "resultado") {
    return (
      <div style={{ ...estiloBase, padding:24, maxWidth:740, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:14 }}>{puntaje >= 7 ? "🏆" : "⚙️"}</div>
        <div style={{ color:C.verde, fontSize:11, letterSpacing:4, marginBottom:8 }}>MISIÓN COMPLETADA — VERSIÓN {VERSION}</div>
        <h1 style={{ color:C.blanco, fontSize:22, margin:"0 0 24px" }}>Resultados Finales</h1>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:24 }}>
          {[["RETOS CORRECTOS",`${puntaje}/${RETOS.length}`,C.verde],["EFECTIVIDAD",`${Math.round(puntaje/RETOS.length*100)}%`,C.azul],["LETRAS OBTENIDAS",`${fragmentos.length}/${RETOS.length}`,C.dorado]].map(([l,v,c]) => (
            <div key={l} style={{ background:C.panelClaro, border:`1px solid ${C.borde}`, borderRadius:4, padding:16 }}>
              <div style={{ fontSize:26, fontWeight:900, color:c }}>{v}</div>
              <div style={{ fontSize:9, color:C.textoMuted, letterSpacing:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background:C.panelClaro, border:`2px solid ${puntaje>=7?C.verde:C.dorado}`, borderRadius:4, padding:24, marginBottom:20 }}>
          <div style={{ fontSize:10, color:C.textoMuted, letterSpacing:2, marginBottom:8 }}>🔐 TU CONTRASEÑA AMBIENTAL FINAL</div>
          <div style={{ fontSize:30, fontWeight:900, letterSpacing:8, color:C.verde, fontFamily:"'Courier New',monospace" }}>{claveCompleta.padEnd(10,"_").split("").join(" ")}</div>
        </div>
        <div style={{ background:C.panelClaro, border:`1px solid ${C.borde}`, borderRadius:4, padding:14, fontSize:12, color:C.textoMuted, lineHeight:1.7 }}>
          Presenta esta contraseña a tu instructora junto con tus respuestas de análisis escrito.<br/>
          Equipo: <strong style={{ color:C.blanco }}>{EQUIPOS_VERSION}</strong> · EDA1003 · II Cuatrimestre 2026
        </div>
      </div>
    );
  }

  return null;
}
