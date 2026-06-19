// src/data/santiago/content.ts

export const homeContent = {
  hero: {
    h1: 'Encuentra los mejores gimnasios en Santiago',
    subtitle: 'Gimnasios, estudios, entrenadores y bienestar en todas las comunas de Santiago',
  },
  stats: {
    gyms: '1.100+',
    barrios: '200+',
    localidades: '31',
    categories: '5',
  },
  faq: [
    {
      q: '¿Cuánto cuesta un gimnasio en Santiago?',
      a: 'Una membresía mensual en Santiago cuesta entre $15.000 y $80.000 CLP según la comuna y tipo de gimnasio. Smart Fit ofrece planes desde $14.990 CLP/mes. Sportlife y Megasport tienen precios entre $40.000 y $90.000 CLP. Los clubes premium en Vitacura y Las Condes pueden superar los $100.000 CLP.',
    },
    {
      q: '¿Cuáles son las mejores comunas para encontrar gimnasios en Santiago?',
      a: 'Providencia, Las Condes y Vitacura concentran los gimnasios de mayor calidad. Ñuñoa y Santiago Centro ofrecen buena mezcla de opciones. La Florida y Maipú tienen amplia oferta económica en el sector sur.',
    },
    {
      q: '¿Hay gimnasios 24 horas en Santiago?',
      a: 'Sí. Smart Fit opera 24/7 en varias sedes en Providencia, Las Condes y La Florida. Algunos gimnasios independientes en zonas de alta actividad también tienen horario extendido.',
    },
    {
      q: '¿Cómo puedo agregar mi negocio a GymSantiago.com?',
      a: 'Es completamente gratuito. Haz clic en "Agregar negocio" y completa el formulario. Tu perfil será revisado y publicado en 24-48 horas.',
    },
    {
      q: '¿Puedo encontrar entrenadores personales por comuna en Santiago?',
      a: 'Sí. En GymSantiago.com puedes filtrar entrenadores por comuna. Muchos trabajan en Parque Bicentenario, Parque Araucano y a domicilio en Providencia, Las Condes y Vitacura.',
    },
  ],
}

export const categoryContent: Record<string, { h1: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  gimnasios: {
    h1: 'Gimnasios en Santiago',
    intro: `Mira, te voy a ser directo: yo uso el gimnasio como herramienta. Desde mayo hasta septiembre bajo de los cerros, el trail queda suspendido, y el gym pasa a ser el centro de mi preparación para la siguiente temporada de montaña. Lo que evalúo no es lo mismo que lo que evalúa alguien que entrena para verse bien en verano. Necesito racks de sentadilla libres, zona de peso libre con espacio suficiente para hacer Bulgarian split squat sin chocar con nadie, mancuernas que lleguen a 40 kg mínimo, y una zona funcional donde pueda hacer trabajo unilateral, hip thrust y movilidad de cadera sin que me miren raro. Si el gimnasio es básicamente un depósito de máquinas con cardio, no me sirve.

Santiago tiene más de 1.100 gimnasios en 31 comunas, y la diferencia entre comunas es real y notable. No te voy a decir que todas las opciones son iguales porque no lo son. Las Condes y Vitacura tienen instalaciones de primera línea: zonas de peso libre de verdad, salas funcionales separadas, equipamiento que se mantiene. Pero también los precios reflejan eso. En Providencia —donde vivo— hay buena oferta con mejor relación calidad-precio que el sector de El Golf. Ñuñoa tiene opciones interesantes, especialmente boxes de CrossFit, sin los precios inflados de las comunas oriente premium. Más al sur y poniente, La Florida y Maipú tienen bastante volumen con cadenas masivas como Smart Fit y Megasport, que sirven bien si solo necesitas sala de pesas básica.

Para trail runners en temporada de gimnasio, el criterio que más importa es el ratio peso libre / máquinas. Un gym con veinte máquinas guiadas y dos racks de sentadilla no funciona para lo que necesito. Busco mínimo tres racks, zona de halterofilia o plataformas de levantamiento, espacio abierto para movimientos compuestos y —si tienen— plataformas de salto o cajas pliométricas. El trabajo de fuerza que más me importa para el trail es exactamente el que más falta en los gimnasios masivos: progresiones de single-leg, glute bridges pesados, hip hinge con carga, sentadilla búlgara en distintos rangos. Eso requiere espacio y equipamiento, no solo máquinas.

Las cadenas grandes resuelven el problema del precio. Smart Fit desde $14.990 CLP al mes, acceso a múltiples sedes con la membresía Black —bacán si necesitas flexibilidad de horario. Sportlife es la referencia premium: Vitacura, Las Condes, Providencia, La Reina, con piscina y spa incluidos entre $55.000 y $110.000 CLP según la sede. Si usas la piscina y el sauna después del entrenamiento de fuerza, el precio se justifica. Megasport cubre bien el sector sur con instalaciones grandes y precios medios. Para alguien que solo quiere hacer acondicionamiento invernal serio, el punto dulce está entre $25.000 y $50.000 CLP mensuales en un gimnasio mediano con buena zona libre, sin pagar por servicios que no vas a usar.

Un detalle que mucha gente no considera: la época del año cambia completamente la saturación de los gimnasios en Santiago. En verano —diciembre a marzo— buena parte de los clientes habituales está en modo outdoor: trail, trekking, playa, vacaciones. Los gimnasios se vacían un poco, especialmente los que tienen perfil activo. En invierno —mayo a agosto— el flujo se invierte al tiro: la cordillera está con nieve, hace frío, el gimnasio se llena. Si buscas los racks libres en agosto un martes a las 19:00, prepárate para esperar. Ese mismo rack en enero a la misma hora probablemente lo tienes solo po. Tener en cuenta la estacionalidad ayuda a elegir el tipo de membresía —mensual flexible en temporada alta invernal, o contrato anual si igual vas a entrenar todo el año.

La proximidad a los Andes también crea un patrón de uso específico en Santiago que no existe en otras ciudades. Hay un porcentaje real de usuarios —corredores de montaña, ciclistas, esquiadores— que usan el gym como complemento a su deporte principal, no como actividad central. Esto se nota en algunos gimnasios de Lo Barnechea, Vitacura norte y La Dehesa: clientela con perfil más atlético, mayor demanda de zonas funcionales, menos máquinas de aislamiento, más trabajo con kettlebell y peso libre. Si entrenas de forma similar, esos gimnasios a veces ofrecen el ambiente más compatible con lo que buscas.

Para comparar opciones con datos reales —cantidad de racks, metros de zona funcional, horarios punta, política de reservas— GymSantiago.com lista más de 1.100 establecimientos con filtros por comuna, precio, tipo de instalación y servicios específicos. Revisa el perfil completo antes de ir: ahorra tiempo y evita darte el viaje hasta un sitio que, bien mirado, no tiene lo que necesitas.`,
    faq: [
      { q: '¿Cuántos gimnasios hay en Santiago?', a: 'Santiago cuenta con más de 1.100 gimnasios distribuidos en sus 31 comunas. Las zonas con mayor concentración son Providencia, Las Condes, Vitacura y Ñuñoa.' },
      { q: '¿Cuál es el gimnasio más barato de Santiago?', a: 'Smart Fit es la cadena con precios más bajos, con planes desde $14.990 CLP/mes. También encontrarás gimnasios de barrio en Maipú, La Florida y San Miguel desde $15.000–$20.000 CLP mensuales.' },
      { q: '¿Hay gimnasios con piscina en Santiago?', a: 'Sí. Sportlife en Vitacura, Las Condes y Providencia cuenta con piscinas temperadas. Algunos clubes deportivos en La Reina y Ñuñoa también las ofrecen. Usa el filtro "piscina" en GymSantiago.com.' },
      { q: '¿Qué es Sportlife y cuánto cuesta?', a: 'Sportlife es la principal cadena de clubes deportivos premium de Chile. Opera en Vitacura, Las Condes, Providencia y La Reina. Los precios van entre $55.000 y $110.000 CLP mensuales según la sede y el plan elegido.' },
      { q: '¿Cuánto cuesta el day pass en un gimnasio de Santiago?', a: 'Un pase diario en Santiago cuesta entre $3.000 y $10.000 CLP según el tipo de gimnasio. Las cadenas grandes como Smart Fit tienen tarifas de pase diario desde $3.990 CLP.' },
    ],
  },
  estudios: {
    h1: 'Estudios fitness en Santiago',
    intro: `Seré honesto: soy escéptico de la mayoría de estudios boutique en Santiago. Hay una cantidad importante de lugares que venden estética, comunidad de Instagram y "experiencia" antes que resultado medible. El espejo de cuerpo completo con luz Ring, la playlist curada, el smoothie de la bienvenida — nada de eso me dice si voy a entrenar mejor o no. Lo que me importa es si la metodología tiene lógica, si el coach sabe lo que hace, y si lo que aprendo o desarrollé ahí se traduce en algo fuera de esas cuatro paredes.

Dicho eso, hay lugares en Santiago que sí respeto. Los boxes de CrossFit afiliados son el ejemplo más claro. No todos, pero los buenos tienen algo que es difícil de conseguir en un gimnasio convencional: comunidad real, programación con lógica de periodización, coaches que observan tu técnica y te corrigen, y una cultura donde la intensidad es colectiva. Para alguien que viene de una temporada de trail en la cordillera, el CrossFit en invierno ofrece exactamente el tipo de trabajo metabólico y de fuerza explosiva que complementa la base aeróbica acumulada en los meses anteriores. Los mejores boxes en Providencia, Ñuñoa y La Florida tienen comunidades serias, no solo gente que va a sacar foto.

El yoga es otra categoría donde hay mucho ruido y poca señal, pero cuando encuentras el estudio correcto, el impacto es real. Para trail running, la movilidad de cadera, el trabajo de tobillo, la estabilidad de core y la conciencia propioceptiva son directamente relevantes para el rendimiento y la prevención de lesiones. Un buen profesor de Yin yoga o de Vinyasa técnico en Providencia o Las Condes puede ayudarte a resolver compensaciones posturales que llevas arrastrando kilómetros. He incorporado una clase semanal de yoga en mi temporada invernal y la diferencia en la gestión de carga en las bajadas de montaña es concreta, no solo filosófica. Busca profesores con formación sólida — certificación Yoga Alliance 200 horas mínimo, idealmente con especialización en yoga para deportistas o yoga terapéutico.

El pilates con Reformer es la disciplina que más me costó entender pero que más respeto ahora. Cuando un kinesiólogo me mandó a pilates después de un esguince de tobillo recurrente, pensé que era para recuperación blanda. No es así. El trabajo en Reformer —con los resortes, la inestabilidad controlada, los planos de movimiento múltiples— ataca exactamente las debilidades que los trail runners acumulamos: glúteos medios flojos, tobillo inestable, cadena posterior tensa, hip flexors acortados por las cuestas. Estudios en Vitacura, Las Condes y Ñuñoa tienen equipamiento completo y profesores certificados por escuelas con respaldo real. No es barato —entre $50.000 y $100.000 CLP mensual en grupos de 4 a 6— pero si tienes historial de lesiones recurrentes, la inversión se paga sola.

El spinning moderno merece un párrafo separado porque evolucionó bastante. Los estudios en Providencia y Las Condes que trabajan con bicicletas de monitoreo de potencia en tiempo real no son lo mismo que el ciclismo indoor de los años 90. La posibilidad de trabajar con zonas de potencia, medir progresión y comparar sesiones con datos reales lo convierte en una herramienta válida de entrenamiento cardiovascular. Para la temporada invernal, cuando salir a la ruta es menos viable, una o dos sesiones semanales de spinning de alta intensidad son un complemento razonable al trabajo de fuerza. Eso sí — que tengan las bicicletas calibradas y que el coach sepa de potencia, no solo de motivación con micrófono.

El problema del segmento boutique en Santiago es el precio respecto al valor real. Una clase individual entre $8.000 y $20.000 CLP, paquete mensual de 8 clases entre $50.000 y $120.000 CLP — es plata seria po. Para justificar ese costo frente a una membresía de gym convencional, el estudio tiene que darte algo que el gimnasio no puede darte: instrucción técnica individual, metodología específica, o comunidad con objetivos compatibles. Si el estudio te da solo ambiente Instagram, el gimnasio de $25.000 al mes con buena zona libre te sirve mejor. La mayoría de los estudios listados en GymSantiago.com ofrece clase de prueba — úsala antes de comprar el paquete mensual.`,
    faq: [
      { q: '¿Qué tipos de estudios fitness hay en Santiago?', a: 'En Santiago encontrarás estudios de yoga, pilates con Reformer, CrossFit, spinning, boxeo, funcional, danza fitness y artes marciales. Providencia y Las Condes concentran la mayor variedad boutique.' },
      { q: '¿Cuánto cuesta una clase de yoga en Santiago?', a: 'Una clase de yoga en Santiago cuesta entre $7.000 y $18.000 CLP la sesión individual. Los paquetes de 8 clases mensuales suelen salir entre $45.000 y $90.000 CLP según el estudio y la comuna.' },
      { q: '¿Hay estudios de pilates con Reformer en Santiago?', a: 'Sí, varios estudios en Vitacura, Las Condes y Ñuñoa ofrecen pilates con Reformer, Cadillac, Chair y Barrel. Las clases son en grupos reducidos (4-6 personas) con profesores certificados internacionalmente.' },
      { q: '¿Puedo probar una clase de estudio boutique antes de comprar un paquete?', a: 'La mayoría de estudios boutique en Santiago ofrecen una clase de prueba gratuita o a precio especial para nuevos clientes. Consulta cada perfil en GymSantiago.com para ver la oferta de bienvenida.' },
      { q: '¿Dónde están los mejores boxes de CrossFit en Santiago?', a: 'Los boxes de CrossFit afiliado más reconocidos se encuentran en Providencia, Ñuñoa, Las Condes y La Florida. Filtra por "CrossFit" en GymSantiago.com para ver los más cercanos a tu comuna.' },
    ],
  },
  entrenadores: {
    h1: 'Entrenadores personales en Santiago',
    intro: `El entrenador personal más importante que tuve en Santiago no me enseñó a hacer más sentadillas — me enseñó a periodizar. Había diferencia entre el bloque de fuerza máxima de junio, la fase de potencia de agosto y el trabajo específico de septiembre antes de volver a los cerros. Eso es lo que separa a un preparador físico serio de alguien que simplemente te da ejercicios. En Santiago hay más de 300 entrenadores registrados, y la diferencia de calidad entre ellos es amplia. Saber qué buscar te ahorra tiempo y plata.

La primera señal de alerta que uso es sencilla: le pregunto al entrenador si tiene experiencia con deportistas de deportes de resistencia outdoor — corredores de montaña, ciclistas de ruta, esquiadores de travesía. Si la respuesta es vaga o empieza a hablar de "tonificación" y "definición muscular", no es lo que necesito. Lo que me importa es que entienda periodización para deportes de base aeróbica, que sepa estructurar una fase de fuerza máxima en invierno sin sobrecargar las articulaciones que ya vienen cargadas del trail, y que comprenda el trabajo unilateral y de estabilidad que requiere correr en terreno irregular. Si el entrenador solo conoce el modelo hipertrofia-definición del fisioculturismo clásico, va a diseñarte un programa de culturista aunque le digas que corres 60 kilómetros semanales.

Santiago tiene entrenadores con formación universitaria en Educación Física, preparadores físicos con postgrado en ciencias del deporte y profesionales con certificaciones internacionales vigentes como NSCA-CSCS, NASM o ACE. Las certificaciones importan pero no lo son todo: un titulado universitario con cinco años de experiencia trabajando con corredores puede superar en criterio práctico a alguien con certificado internacional reciente sin historial. Pide referencias concretas. Pregunta cuántos clientes con objetivos similares al tuyo ha trabajado, cuánto tiempo llevan con él y qué resultados han medido. Un entrenador serio tendrá esa información disponible.

La señal roja más concreta que conozco es el entrenador que empieza a trabajar sin evaluación previa. Una evaluación seria incluye mínimo: test de movilidad articular (hombros, caderas, tobillos), evaluación postural, test funcional básico (overhead squat, single-leg squat), y una conversación detallada sobre el historial de lesiones y la planificación anual del deporte principal. Alguien que llega el primer día al rack de sentadilla sin haber visto cómo te movés no tiene los datos suficientes para diseñar tu programa. En el mejor caso es pérdida de tiempo; en el peor, te lesiona.

Las modalidades varían. Entrenadores en gimnasio, a domicilio, en parque al aire libre — Parque Bicentenario en Vitacura, Parque Araucano en Las Condes, el Parque Metropolitano al pie del San Cristóbal son puntos habituales. El entrenamiento online también se consolidó y hay preparadores físicos santiaguinos que trabajan con atletas de todo Chile con seguimiento semanal por video, planificación mensual y ajuste de cargas en tiempo real. Para quien ya sabe entrenar y necesita solo la planificación y el seguimiento, el formato online con un buen profesional es una opción eficiente y más económica.

En precios: una sesión de 60 minutos con entrenador de nivel medio ronda los $20.000 a $40.000 CLP. Preparadores físicos especializados en rendimiento deportivo con certificación vigente y cartera de atletas documentada cobran entre $40.000 y $80.000 CLP por sesión, especialmente en Las Condes y Vitacura. Los paquetes de 8 a 12 sesiones mensuales suelen bajar entre un 10 y un 20% respecto al precio individual. Para deportistas con temporada definida —como el trail running en primavera-verano— tiene sentido contratar por bloque estacional: 3 meses de invierno con enfoque fuerza máxima, bien planificados, valen más que un año de entrenamiento genérico.`,
    faq: [
      { q: '¿Cuánto cobra un entrenador personal en Santiago?', a: 'Una sesión de entrenamiento personal en Santiago cuesta entre $15.000 y $50.000 CLP por hora según la experiencia, certificaciones y modalidad (domicilio, parque o gimnasio). Los profesionales especializados en deportes de competencia pueden cobrar más.' },
      { q: '¿Los entrenadores van a domicilio en Santiago?', a: 'Sí, muchos entrenadores en Santiago ofrecen servicio a domicilio, especialmente en Providencia, Las Condes, Vitacura y Ñuñoa. Algunos también trabajan en Parque Bicentenario y Parque Araucano.' },
      { q: '¿Cómo encuentro un entrenador especializado en running en Santiago?', a: 'En GymSantiago.com puedes filtrar por especialización. Para running, busca entrenadores con experiencia en planificación de temporadas y preparación para carreras como la Maratón de Santiago.' },
      { q: '¿Hay entrenadores personales online en Santiago?', a: 'Sí. Muchos entrenadores santiaguinos ofrecen sesiones online con seguimiento por WhatsApp y planificación semanal. Es una opción muy práctica para personas con horarios exigentes o en comunas con menor oferta presencial.' },
      { q: '¿Qué certificaciones debe tener un entrenador personal en Chile?', a: 'En Chile los títulos más reconocidos son el de Profesor de Educación Física universitario, Preparador Físico y certificaciones internacionales como ACE, NSCA-CSCS, ISSA o NASM. Verifica que la certificación esté vigente y avalada por una institución reconocida.' },
    ],
  },
  eventos: {
    h1: 'Eventos fitness en Santiago',
    intro: `Si hay una cosa que tiene Santiago que pocas capitales de América del Sur tienen, es el acceso inmediato a la montaña. A cuarenta minutos desde Providencia estás en la entrada del Cajón del Maipo con 3.000 metros de desnivel disponible arriba tuyo. A veinte estás en el acceso al Manquehue. Esa proximidad hace que el calendario de eventos deportivos en la ciudad tenga una dimensión que no existe en Buenos Aires o Lima: las carreras de montaña son eventos serios, con distancias largas, técnicas y bien organizadas, no solo excursiones con dorsal.

El evento de ruta que más me importa en el calendario es la Maratón de Santiago en abril. No porque sea trail — no lo es — sino porque llega en el momento perfecto del año para medir la base aeróbica acumulada durante el verano de montaña. Abril en Santiago es ideal para correr: 10 a 18°C en la largada, sin humedad, sin viento fuerte, luz de otoño. Más de 30.000 participantes en las distancias de 42K, 21K, 10K y 5K familiar. Los cupos para la maratón completa y la media se agotan en semanas una vez abiertas las inscripciones en diciembre — si la tienes en el radar, inscríbete al tiro cuando abran. Yo la uso como carrera de control: si mi 21K sale bien en abril, la temporada de montaña que sigue va a partir desde un lugar sólido.

Las carreras de trail alrededor de Santiago son el centro del calendario para mí. El Cerro Manquehue tiene carreras organizadas con distancias de 10 a 25 kilómetros y desniveles que hacen trabajar de verdad — no es jogging en cerro, es trail técnico con tramos de manos. El Cajón del Maipo es otro escenario habitual: el Ultra Trail Cajón del Maipo y otras carreras del circuito regional convocaron en ediciones recientes a más de mil corredores con distancias hasta los 80 kilómetros. La altitud base de Santiago —520 metros— y los primeros 1.000 metros de cordillera a pocos kilómetros de la ciudad crean condiciones de entrenamiento y competencia que muy pocas ciudades del mundo pueden igualar. La Santiago Trail Series organiza un circuito con varias fechas al año en distintos cerros, ideal para competir de forma regular sin salir de la región metropolitana.

El CrossFit Chile Open pasa regularmente por Santiago y los boxes afiliados en Providencia, Ñuñoa y La Florida organizan su propio circuito de torneos durante el año. No compito en CrossFit pero respeto el formato: el ambiente en esas competencias es genuinamente distinto a una carrera masiva. La comunidad importa, la gente conoce a los atletas de otros boxes, hay cultura real de deporte. El Open también sirve como termómetro de condición física general — si alguien que hace CrossFit serio quiere comparar su nivel con otros en Santiago, el circuito local les da referencias concretas.

Más allá del running y el CrossFit, el calendario también tiene eventos de ciclismo de montaña en los alrededores de Santiago, torneos de triatlón con el Ironman 70.3 de Viña del Mar como referente regional a poco más de una hora, y un creciente circuito de eventos de bienestar: retiros de yoga de uno o dos días en los faldeos cordilleranos, workshops de nutrición para deportistas de resistencia, talleres de entrenamiento de altura en el sector de Farellones. La altitud y el entorno hacen que muchos de estos eventos tengan una dimensión que no se consigue en una sala cerrada de la ciudad.

Lo que me parece interesante del ecosistema de eventos en Santiago es cómo refleja la cultura deportiva de la ciudad: hay una masa crítica de personas que usa el entrenamiento físico como acceso al entorno natural, no solo como actividad urbana. Eso hace que los eventos más interesantes del año no sean los masivos de ciudad sino las carreras de montaña de fin de semana donde te cruzas con gente que vive en esas rutas. Fome sería perdérselas solo por no estar anotado con tiempo.`,
    faq: [
      { q: '¿Cuándo es la Maratón de Santiago?', a: 'La Maratón de Santiago se celebra habitualmente en abril, con distancias de 42K, 21K, 10K y 5K familiar. Las inscripciones abren generalmente en diciembre. Es el evento de running masivo más importante del año en Chile.' },
      { q: '¿Hay carreras de trail running cerca de Santiago?', a: 'Sí. Cerro San Cristóbal, Cerro Manquehue, Lo Barnechea y el Cajón del Maipo son escenarios habituales de trail running. El Ultra Trail Cajón del Maipo y las Santiago Trail Series son los eventos más reconocidos.' },
      { q: '¿Dónde se celebra el Ironman 70.3 más cercano a Santiago?', a: 'El Ironman 70.3 más cercano se celebra en Viña del Mar, a poco más de una hora de Santiago. Es un referente para la comunidad triatleta santiaguina, que usa la región metropolitana como base de entrenamiento.' },
      { q: '¿Hay eventos de CrossFit en Santiago?', a: 'Sí. Los boxes afiliados en Providencia, Ñuñoa y La Florida organizan competencias durante todo el año. El Open de CrossFit Chile y torneos locales generan un calendario activo para atletas de todos los niveles.' },
      { q: '¿Cómo puedo publicar un evento fitness en GymSantiago.com?', a: 'Es gratuito. Escríbenos a hola@gymsantiago.com con los detalles del evento —fecha, lugar, distancias o categorías y enlace de inscripción— y lo publicaremos en el directorio en 24-48 horas.' },
    ],
  },
  bienestar: {
    h1: 'Bienestar en Santiago',
    intro: `Llegué a la kinesiología por las malas. Primer esguince de tobillo grado II en el Manquehue, ignorado, mal rehabilitado. Segundo esguince seis meses después en el mismo tobillo, mismo cerro, peor caída. El kinesiólogo que me vio la segunda vez me dijo algo que cambió cómo entiendo el bienestar: el problema no era el tobillo, era la debilidad del peronéo y la inestabilidad de cadera que lo hacía vulnerable en cada bajada técnica. Desde entonces el trabajo de prevención y recuperación es parte estructural de mi temporada, no algo que hago solo cuando me lastimo.

La kinesiología deportiva en Santiago es buena. Chile tiene formación universitaria sólida en kinesiología, y los profesionales especializados en deportes de resistencia outdoor —trail running, ciclismo de montaña, escalada— no son difíciles de encontrar, especialmente en Las Condes y Providencia donde hay una masa crítica de deportistas con esos perfiles. Lo que busco en un kinesiólogo es que no me trate solo el síntoma sino que me identifique el patrón de movimiento que generó la lesión. Un tobillo que se esguinza dos veces seguidas no tiene solo un problema de tobillo — tiene un problema de control neuromuscular de cadera y rodilla que se expresa en el eslabón más débil. El kinesiólogo que entiende eso es el que vale la pena. Una sesión está entre $25.000 y $60.000 CLP; un plan de rehabilitación de 8 a 12 sesiones es lo habitual para una lesión seria.

El masaje terapéutico post-entrenamiento es la herramienta de recuperación que más uso en semanas de alta carga. Después de una semana con 70 kilómetros de trail más tres sesiones de fuerza, la musculatura posterior de pierna y los glúteos acumulan tensión que el descanso pasivo no resuelve del todo. Un masaje de tejido profundo de 60 minutos en cuadriceps, isquiotibiales y zona lumbar acelera la recuperación mediblemente. No es relajación — duele bastante cuando el músculo está cargado — pero la diferencia en la calidad del entrenamiento siguiente es concreta. En Santiago hay masajistas serios en Providencia, Las Condes y Ñuñoa entre $20.000 y $50.000 CLP la sesión. Los spas de hotel del sector oriente ofrecen paquetes con sauna o jacuzzi incluidos que, después de un ultra de fin de semana, se justifican solos.

La nutrición es el área donde más gente improvisa y donde más se nota la diferencia cuando se hace bien. Para trail running con cargas variables según la temporada —volumen bajo en invierno de gimnasio, volumen alto en temporada de montaña— los requerimientos nutricionales cambian bastante. La distribución de macros, el timing de ingesta alrededor del entrenamiento, la hidratación en altura, la gestión del déficit energético en semanas de alto volumen — nada de eso es intuitivo sin formación. Un nutricionista con especialización en deportes de resistencia en Santiago cobra entre $30.000 y $70.000 CLP la consulta inicial, con seguimiento mensual disponible en paquete. Algunos centros tienen análisis de composición corporal con InBody incluido — útil para hacer seguimiento del ratio músculo/grasa durante el ciclo anual.

La psicología del deporte es la categoría que más ha crecido en credibilidad en Santiago en los últimos años. Antes era algo que hacían solo los deportistas de elite; hoy hay psicólogos deportivos en Las Condes y Providencia que trabajan con atletas amateur con objetivos serios. Para trail running, la gestión mental en los últimos kilómetros de un ultra, el control del miedo en bajadas técnicas con poca visibilidad, y la gestión de la ansiedad competitiva antes de una carrera con meses de preparación encima son aspectos reales del rendimiento. No es autoayuda — es entrenamiento de habilidades cognitivas con metodología validada. Si llevas varios años entrenando y sientes que el techo que toca ahora es mental más que físico, es la especialización que vale explorar.

El ecosistema completo —kinesiología, masaje, nutrición, psicología— funciona mejor cuando está integrado. El kinesiólogo sabe lo que el nutricionista está ajustando; el preparador físico conoce el plan de rehabilitación. En Santiago hay algunos centros en Las Condes y Providencia que operan con ese modelo interdisciplinario. No son baratos, pero para alguien que trata el entrenamiento en serio y quiere un plan coherente de año a año, es la opción más eficiente. GymSantiago.com lista los centros de bienestar con filtros por especialización y comuna para que puedas ubicar lo que necesitas sin buscar en diez sitios distintos.`,
    faq: [
      { q: '¿Qué servicios de bienestar se pueden encontrar en Santiago?', a: 'En Santiago hay centros de kinesiología deportiva, masajes terapéuticos, spas, nutrición deportiva, psicología del deporte, meditación y acupuntura. La oferta más completa está en Providencia, Las Condes y Vitacura.' },
      { q: '¿Cuánto cuesta una sesión de kinesiología en Santiago?', a: 'Una sesión de kinesiología (fisioterapia) en Santiago cuesta entre $25.000 y $60.000 CLP, dependiendo del tipo de tratamiento y la especialización del profesional. Los planes de rehabilitación de varias sesiones suelen incluir descuento.' },
      { q: '¿Cuánto cuesta un masaje en Santiago?', a: 'Un masaje terapéutico o relajante en Santiago cuesta entre $20.000 y $60.000 CLP por sesión de 60 minutos. Los spas en Las Condes y Vitacura pueden ofrecer paquetes con sauna o jacuzzi a precios especiales.' },
      { q: '¿Cómo encuentro un nutricionista deportivo en Santiago?', a: 'En GymSantiago.com puedes filtrar profesionales de bienestar por especialización. Para nutrición deportiva, busca nutricionistas con experiencia en composición corporal y rendimiento atlético según tu objetivo.' },
      { q: '¿Hay psicólogos del deporte en Santiago?', a: 'Sí. Santiago cuenta con psicólogos especializados en rendimiento deportivo, gestión de la ansiedad competitiva y bienestar mental. Muchos atienden también en formato online. Encuéntralos filtrando por "psicología del deporte" en el directorio.' },
    ],
  },
}

export const staticPageContent = {
  sobreNosotros: {
    title: 'Sobre nosotros',
    h1: '¿Quiénes somos?',
    body: `GymSantiago.com es el directorio de referencia para encontrar gimnasios, estudios fitness, entrenadores personales y centros de bienestar en Santiago de Chile.\n\nNació de una necesidad real: encontrar un buen lugar para entrenar en Santiago no debería ser complicado. Con más de 1.100 establecimientos distribuidos en sus comunas, la oferta es amplia pero difícil de navegar. GymSantiago.com organiza esa información para que puedas tomar la mejor decisión en segundos.\n\nNuestra misión es conectar a los santiaguinos con el lugar ideal para moverse, entrenar y cuidarse, sin importar su comuna, presupuesto u objetivo fitness.`,
  },
  agregarNegocio: {
    title: 'Agregar negocio',
    h1: 'Agrega tu gimnasio o estudio gratis',
    body: `¿Tienes un gimnasio, estudio fitness, entrenador personal o centro de bienestar en Santiago? Aparece en GymSantiago.com de forma completamente gratuita.\n\nMiles de santiaguinos usan nuestra plataforma cada mes para buscar lugares donde entrenar. Un perfil completo puede significar nuevos clientes directamente a tu puerta.`,
  },
  faqPage: {
    title: 'Preguntas frecuentes',
    h1: 'Preguntas frecuentes sobre GymSantiago.com',
    items: [
      { q: '¿GymSantiago.com es gratuito?', a: 'Sí, buscar y explorar el directorio es completamente gratuito.' },
      { q: '¿Cómo se seleccionan los negocios?', a: 'A través de fuentes públicas verificadas, registro voluntario o reporte de la comunidad. Todos los perfiles son revisados.' },
      { q: '¿Puedo dejar una reseña?', a: 'Sí, en cada perfil encontrarás un formulario para dejar tu opinión, moderada para garantizar autenticidad.' },
      { q: '¿Con qué frecuencia se actualiza la información?', a: 'Continuamente. Si ves información incorrecta, puedes reportarla desde la página del establecimiento.' },
      { q: '¿Tienen app móvil?', a: 'Por ahora está optimizado para móvil a través del navegador. Una app nativa está en nuestros planes.' },
    ],
  },
  contacto: {
    title: 'Contacto',
    h1: '¿Tienes alguna pregunta?',
    body: `Estamos aquí para ayudarte. Si tienes dudas sobre el directorio o quieres ponerte en contacto con el equipo de GymSantiago.com, escríbenos.`,
    email: 'hola@gymsantiago.com',
  },
  terminos: {
    title: 'Términos de uso',
    h1: 'Términos y condiciones de uso',
    lastUpdated: 'Mayo 2026',
  },
  privacidad: {
    title: 'Política de privacidad',
    h1: 'Política de privacidad',
    lastUpdated: 'Mayo 2026',
  },
}

export const categories = [
  { slug: 'gimnasios',    label: 'Gimnasios',    icon: '🏋️', count: 1100, description: 'Gimnasios en Santiago' },
  { slug: 'estudios',     label: 'Estudios',     icon: '🧘', count: 245,  description: 'Estudios fitness en Santiago' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 312,  description: 'Entrenadores personales en Santiago' },
  { slug: 'eventos',      label: 'Eventos',      icon: '📅', count: 145,  description: 'Eventos fitness en Santiago' },
  { slug: 'bienestar',    label: 'Bienestar',    icon: '🌿', count: 178,  description: 'Bienestar en Santiago' },
] as const
