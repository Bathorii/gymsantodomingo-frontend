// src/data/santodomingo/content.ts

export const homeContent = {
  hero: {
    h1: 'Encuentra los mejores gimnasios en Santo Domingo',
    subtitle: 'Gimnasios, estudios, entrenadores y bienestar en todos los sectores de la ciudad',
  },
  stats: {
    gyms: 'TBD',
    barrios: 'TBD',
    localidades: 'TBD',
    categories: '5',
  },
  faq: [
    {
      q: '¿Cuánto cuesta un gimnasio en Santo Domingo?',
      a: 'Los precios varían según el sector y el tipo de gimnasio. Una membresía mensual en Santo Domingo cuesta en promedio entre RD$1.500 y RD$6.000 DOP. Los gimnasios boutique y clubes deportivos premium pueden superar los RD$10.000 DOP al mes.',
    },
    {
      q: '¿Cuáles son los mejores sectores para encontrar gimnasios en Santo Domingo?',
      a: 'Piantini, Naco y Bella Vista concentran la mayor cantidad de gimnasios de calidad. Los sectores del norte como Los Alcarrizos y Villa Mella ofrecen opciones más económicas con amplia cobertura.',
    },
    {
      q: '¿Hay gimnasios abiertos 24 horas en Santo Domingo?',
      a: 'Sí, algunas cadenas y gimnasios independientes operan las 24 horas los 7 días de la semana. Usa el filtro "24 horas" en GymSantoDomingo.com para encontrar los más cercanos.',
    },
    {
      q: '¿Cómo puedo agregar mi gimnasio a GymSantoDomingo.com?',
      a: 'Es gratis y sencillo. Haz clic en "Agregar negocio" en el menú y completa el formulario con los datos de tu establecimiento. Nuestro equipo revisará la información y publicará tu perfil en 24-48 horas.',
    },
    {
      q: '¿Puedo encontrar entrenadores personales en Santo Domingo por sector?',
      a: 'Sí. En GymSantoDomingo.com puedes buscar entrenadores personales filtrando por sector o barrio. Muchos entrenadores trabajan a domicilio, en parques o en gimnasios específicos.',
    },
  ],
}

export const categoryContent: Record<string, { h1: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  gimnasios: {
    h1: 'Gimnasios en Santo Domingo',
    intro: `Santo Domingo tiene una escena fitness en crecimiento. La ciudad está a solo 14 metros sobre el nivel del mar, lo que significa que el rendimiento cardiovascular no se ve afectado por la altitud — aquí el reto es el calor y la humedad, no el oxígeno. Eso cambia cómo tienes que entrenar y recuperarte.

Los sectores con más oferta de calidad son Piantini, Naco, Bella Vista y Serralles — zonas con instalaciones modernas, buen equipamiento y variedad de horarios. Si buscas precios más accesibles, Los Alcarrizos, Villa Mella y Los Minas tienen opciones sólidas que no siempre salen en las listas principales.

El clima dominicano hace que la hidratación sea crítica. Entrenar en Santo Domingo en verano con altas temperaturas y humedad drena el cuerpo mucho más rápido que en ciudades templadas. Los gimnasios con buena climatización marcan una diferencia real para sostener intensidad alta.

En esta guía encuentras los gimnasios organizados por sector, con información sobre precios y servicios. No te vendemos ningún gimnasio — te damos la información para que decidas tú.`,
    faq: [
      { q: '¿Cuántos gimnasios hay en Santo Domingo?', a: 'Santo Domingo cuenta con una amplia red de gimnasios distribuidos en sus distintos sectores. Las zonas con mayor concentración son Piantini, Naco y Bella Vista.' },
      { q: '¿Cuánto cuesta el day pass en un gimnasio en Santo Domingo?', a: 'El pase de un día en Santo Domingo suele costar entre RD$300 y RD$800 DOP según el tipo de establecimiento.' },
      { q: '¿Hay gimnasios con piscina en Santo Domingo?', a: 'Sí, varios gimnasios y clubes deportivos en los sectores premium de Santo Domingo cuentan con piscina. Usa el filtro correspondiente en nuestra búsqueda.' },
      { q: '¿Qué gimnasios ofrecen clases grupales en Santo Domingo?', a: 'La mayoría de los gimnasios medianos y grandes incluyen clases grupales: spinning, zumba, yoga, pilates y funcional.' },
      { q: '¿Se acepta USD en los gimnasios de Santo Domingo?', a: 'Algunos gimnasios en zonas turísticas aceptan USD, aunque el precio oficial siempre está en DOP. Consulta directamente con cada establecimiento.' },
    ],
  },
  estudios: {
    h1: 'Estudios fitness en Santo Domingo',
    intro: `Los estudios boutique de fitness en Santo Domingo han crecido significativamente en los últimos años. La oferta cubre yoga, pilates, spinning, boxeo, CrossFit, funcional y artes marciales. La mayor concentración está en Piantini, Naco y Bella Vista.

Un estudio especializado te da algo que el gimnasio masivo no puede: atención personalizada en grupos pequeños. Con máximo 15 personas por clase, el instructor puede corregirte a ti específicamente.

El yoga y el pilates tienen mucha demanda en Santo Domingo, impulsados por una comunidad wellness en expansión. Para los que entrenan con hierro, añadir trabajo de movilidad y core mejora notablemente la calidad del movimiento.

Los precios de una clase suelta en un estudio boutique de Santo Domingo oscilan entre RD$500 y RD$1.500 DOP. Los paquetes mensuales de 8 a 12 clases suelen ofrecer mejor relación precio-valor.`,
    faq: [
      { q: '¿Qué tipos de estudios fitness existen en Santo Domingo?', a: 'En Santo Domingo encontrarás estudios de yoga, pilates, CrossFit, boxeo, spinning, funcional y artes marciales. Piantini y Naco concentran la mayor variedad.' },
      { q: '¿Cuánto cuesta una clase de yoga en Santo Domingo?', a: 'Una clase de yoga en Santo Domingo cuesta entre RD$500 y RD$1.200 DOP la sesión individual. Los paquetes de 8-10 clases resultan más económicos.' },
      { q: '¿Hay estudios de pilates con máquinas en Santo Domingo?', a: 'Sí, varios estudios en Piantini y Bella Vista ofrecen pilates con Reformer. Las clases son más personalizadas y los precios algo más altos.' },
      { q: '¿Puedo probar una clase antes de comprar un paquete?', a: 'La mayoría de estudios boutique en Santo Domingo ofrecen una clase de prueba a precio especial. Consulta directamente desde su perfil en GymSantoDomingo.com.' },
      { q: '¿Cuáles son los mejores estudios de CrossFit en Santo Domingo?', a: 'Piantini, Naco y sectores del este concentran los mejores boxes de CrossFit. Usa el filtro "CrossFit" en nuestra plataforma para encontrar el más cercano.' },
    ],
  },
  entrenadores: {
    h1: 'Entrenadores personales en Santo Domingo',
    intro: `Santo Domingo tiene una oferta creciente de entrenadores personales certificados disponibles para sesiones individuales, semiprivadas o grupales — en gimnasio, a domicilio, en urbanizaciones privadas o en formato online.

Las credenciales importan. Pregunta directamente: ¿tienes certificación NSCA, ACE o ISSA? Un entrenador serio responde esa pregunta con confianza. El valor real de un buen entrenador no es darte la rutina — es corregirte el movimiento cuando la técnica falla con la fatiga, empujarte cuando tú solo te habrías rendido, y sacarte del estancamiento cuando llevas semanas sin progresar.

En cuanto a tarifas, una sesión en Santo Domingo cuesta en promedio entre RD$1.000 y RD$3.500 DOP por hora, según experiencia, certificaciones y modalidad.`,
    faq: [
      { q: '¿Cuánto cobra un entrenador personal en Santo Domingo?', a: 'El precio de una sesión varía entre RD$1.000 y RD$3.500 DOP por hora, dependiendo de la experiencia, certificaciones y modalidad (domicilio, parque o gimnasio).' },
      { q: '¿Los entrenadores van a domicilio en Santo Domingo?', a: 'Sí, muchos entrenadores personales en Santo Domingo ofrecen servicio a domicilio, especialmente en urbanizaciones de Piantini, Naco y Bella Vista.' },
      { q: '¿Cómo encuentro un entrenador especializado en pérdida de peso?', a: 'En GymSantoDomingo.com puedes filtrar entrenadores por especialización.' },
      { q: '¿Ofrecen entrenadores personales sesiones online en Santo Domingo?', a: 'Sí, muchos entrenadores ofrecen sesiones online, una opción práctica para personas con horarios exigentes.' },
      { q: '¿Qué certificaciones debe tener un buen entrenador personal?', a: 'Busca entrenadores con certificación ACE, NSCA, ISSA o equivalentes reconocidos internacionalmente. Valora también la experiencia práctica y referencias documentadas.' },
    ],
  },
  eventos: {
    h1: 'Eventos fitness en Santo Domingo',
    intro: `Santo Domingo tiene una agenda fitness activa durante todo el año. Competencias de CrossFit, carreras, talleres de nutrición y ferias de bienestar forman parte del calendario regular.

Los eventos son también la mejor forma de encontrar tu comunidad. La gente que entrena en serio se junta en estos espacios, y ese entorno te empuja a otro nivel. GymSantoDomingo.com publica competencias, workshops, carreras y ferias fitness con fecha, lugar y enlace de inscripción.`,
    faq: [
      { q: '¿Cuáles son los eventos fitness más populares en Santo Domingo?', a: 'Los torneos de CrossFit, las carreras urbanas y los talleres de bienestar en Piantini y Naco son de los más concurridos.' },
      { q: '¿Cómo me puedo inscribir a eventos fitness en Santo Domingo?', a: 'Cada evento en GymSantoDomingo.com incluye el enlace de inscripción oficial. Revisa las fechas límite de registro.' },
      { q: '¿Hay eventos fitness gratuitos en Santo Domingo?', a: 'Sí, algunos talleres comunitarios y activaciones de marcas son completamente gratuitos.' },
      { q: '¿Con qué frecuencia se realizan competencias de CrossFit en Santo Domingo?', a: 'Regularmente, con competencias organizadas por los principales boxes de la ciudad.' },
      { q: '¿Dónde se realizan los eventos de running en Santo Domingo?', a: 'El malecón, el Parque Mirador Sur y el Parque Mirador Norte son los escenarios más frecuentes para carreras y eventos de running.' },
    ],
  },
  bienestar: {
    h1: 'Bienestar en Santo Domingo',
    intro: `Santo Domingo tiene una oferta sólida de centros de bienestar: masajes terapéuticos, fisioterapia, nutrición deportiva, psicología del deporte, meditación y spa. Si entrenas en serio, varios de estos servicios son parte del protocolo de recuperación, no un lujo.

La fisioterapia es especialmente importante en el trópico, donde la combinación de calor, humedad y entrenamientos intensos genera una carga adicional sobre articulaciones y tejido conectivo. Tener un fisioterapeuta de confianza que entienda de deporte es una inversión preventiva que vale la pena.

El nutricionista deportivo puede marcar una diferencia real. La alimentación en un clima cálido como el dominicano requiere ajustes específicos de hidratación y electrolitos que van más allá de los consejos genéricos.`,
    faq: [
      { q: '¿Qué servicios de bienestar se pueden encontrar en Santo Domingo?', a: 'Masajes terapéuticos, spas, fisioterapia, nutrición deportiva, psicología del deporte y meditación. La oferta se concentra en Piantini, Naco y Bella Vista.' },
      { q: '¿Cuánto cuesta un masaje en Santo Domingo?', a: 'Un masaje relajante o terapéutico en Santo Domingo cuesta entre RD$1.200 y RD$3.500 DOP por sesión de 60 minutos.' },
      { q: '¿Hay fisioterapeutas deportivos en Santo Domingo?', a: 'Sí. Santo Domingo tiene fisioterapeutas especializados en deporte y rehabilitación, muchos asociados a gimnasios y clubes deportivos.' },
      { q: '¿Cómo encuentro un nutricionista deportivo en Santo Domingo?', a: 'En GymSantoDomingo.com puedes filtrar profesionales de bienestar por especialización.' },
      { q: '¿Qué es la recuperación activa y dónde se practica en Santo Domingo?', a: 'La recuperación activa incluye técnicas como crioterapia, baños de contraste y movilidad guiada. Algunos centros premium la ofrecen como servicio complementario.' },
    ],
  },
}

export const staticPageContent = {
  sobreNosotros: {
    title: 'Sobre nosotros',
    h1: '¿Quiénes somos?',
    body: `GymSantoDomingo.com es el directorio de referencia para encontrar gimnasios, estudios fitness, entrenadores personales y centros de bienestar en Santo Domingo, República Dominicana.\n\nNació de una necesidad real: encontrar un buen lugar para entrenar en Santo Domingo no debería ser complicado. GymSantoDomingo.com organiza esa información para que puedas tomar la mejor decisión en segundos.\n\nNuestra misión es conectar a los dominicanos con el lugar ideal para moverse, entrenar y cuidarse, sin importar su sector, presupuesto u objetivo fitness.`,
  },
  agregarNegocio: {
    title: 'Agregar negocio',
    h1: 'Agrega tu gimnasio o estudio gratis',
    body: `¿Tienes un gimnasio, estudio fitness, servicio de entrenamiento personal o centro de bienestar en Santo Domingo? Aparece en GymSantoDomingo.com de forma completamente gratuita.\n\nMiles de personas usan nuestra plataforma cada mes para buscar lugares donde entrenar. Tener un perfil actualizado y completo puede significar nuevos clientes directamente a tu puerta.`,
  },
  faqPage: {
    title: 'Preguntas frecuentes',
    h1: 'Preguntas frecuentes sobre GymSantoDomingo.com',
    items: [
      { q: '¿GymSantoDomingo.com es gratuito para los usuarios?', a: 'Sí, buscar y explorar el directorio es completamente gratuito para cualquier persona que quiera encontrar un gimnasio, estudio o entrenador en Santo Domingo.' },
      { q: '¿Cómo se seleccionan los negocios que aparecen?', a: 'Los negocios aparecen a través de tres vías: importación de fuentes públicas verificadas, registro voluntario del dueño del negocio, o reporte de la comunidad. Todos los perfiles son revisados antes de publicarse.' },
      { q: '¿Puedo dejar una reseña sobre un gimnasio?', a: 'Sí. En cada perfil de establecimiento encontrarás un formulario para dejar tu opinión.' },
      { q: '¿Con qué frecuencia se actualiza la información?', a: 'El directorio se actualiza continuamente. Si ves información incorrecta, puedes reportarla directamente desde la página del establecimiento.' },
      { q: '¿GymSantoDomingo.com tiene app móvil?', a: 'Por ahora, GymSantoDomingo.com está optimizado para móvil a través del navegador.' },
    ],
  },
  contacto: {
    title: 'Contacto',
    h1: '¿Tienes alguna pregunta?',
    body: `Estamos aquí para ayudarte. Si tienes dudas sobre el directorio, quieres reportar información incorrecta o simplemente quieres ponerte en contacto con el equipo de GymSantoDomingo.com, escríbenos.`,
    email: 'hola@gymsantodomingo.com',
  },
  terminos: {
    title: 'Términos de uso',
    h1: 'Términos y condiciones de uso',
    lastUpdated: 'Junio 2026',
  },
  privacidad: {
    title: 'Política de privacidad',
    h1: 'Política de privacidad',
    lastUpdated: 'Junio 2026',
  },
}

export const categories = [
  { slug: 'gimnasios',    label: 'Gimnasios',    icon: '🏋️', count: 0, description: 'Gimnasios en Santo Domingo' },
  { slug: 'estudios',     label: 'Estudios',     icon: '🧘', count: 0, description: 'Estudios fitness en Santo Domingo' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 0, description: 'Entrenadores personales en Santo Domingo' },
  { slug: 'eventos',      label: 'Eventos',      icon: '📅', count: 0, description: 'Eventos fitness en Santo Domingo' },
  { slug: 'bienestar',    label: 'Bienestar',    icon: '🌿', count: 0, description: 'Bienestar en Santo Domingo' },
] as const
