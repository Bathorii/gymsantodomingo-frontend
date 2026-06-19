// src/data/caba/content.ts

export const homeContent = {
  hero: {
    h1: 'Encuentra los mejores gimnasios en Buenos Aires',
    subtitle:
      'Gimnasios, estudios, entrenadores y bienestar en todos los barrios de la Ciudad de Buenos Aires',
  },
  stats: {
    gyms: '950+',
    barrios: '48',
    localidades: '15',
    categories: '5',
  },
  faq: [
    {
      q: '¿Cuánto cuesta un gimnasio en Buenos Aires?',
      a: 'Los precios varían considerablemente. Una membresía mensual en CABA cuesta entre ARS 8.000 y ARS 35.000 según el barrio y el tipo de gimnasio. Cadenas como Megatlon y Smart Fit Argentina ofrecen planes accesibles. Los clubes premium en Palermo y Recoleta pueden superar los ARS 40.000 al mes.',
    },
    {
      q: '¿Cuáles son los mejores barrios para gimnasios en Buenos Aires?',
      a: 'Palermo, Belgrano y Recoleta concentran la mayor oferta de calidad. Caballito y Flores son zonas con muy buena densidad de gimnasios a precios accesibles. Villa Crespo y Almagro son opciones populares con propuesta boutique creciente.',
    },
    {
      q: '¿Hay gimnasios 24 horas en Buenos Aires?',
      a: 'Sí. Algunas sedes de Smart Fit Argentina y ciertos gimnasios independientes en Palermo, Belgrano y Caballito operan 24/7. Consultá el horario específico de cada sede en su perfil en GymCABA.com.',
    },
    {
      q: '¿Cómo puedo agregar mi negocio a GymCABA.com?',
      a: 'Es completamente gratuito. Hacé clic en "Agregar negocio" y completá el formulario. Tu perfil será revisado y publicado en 24-48 horas.',
    },
    {
      q: '¿Puedo encontrar entrenadores personales por barrio en CABA?',
      a: 'Sí. En GymCABA.com podés filtrar entrenadores por barrio. Muchos trabajan en el Parque Tres de Febrero, Parque Rivadavia y Parque Centenario, además de sesiones a domicilio en Palermo, Belgrano y Recoleta.',
    },
  ],
}

export const categoryContent: Record<
  string,
  { h1: string; intro: string; faq: Array<{ q: string; a: string }> }
> = {
  gimnasios: {
    h1: 'Gimnasios en Buenos Aires',
    intro: `Mirá, te voy a ser directo: Buenos Aires tiene gimnasios para todos los gustos y para todos los bolsillos — el problema es que la mitad te rompe el bolsillo sin darte nada que valga la pena. Soy de Palermo, entreno CrossFit desde los 24 después de colgar los botines del rugby, y en estos cinco años recorrí gimnasios desde Belgrano hasta Caballito buscando lo que realmente necesito: 4 plataformas de levantamiento, 3 racks de sentadilla, tiza disponible, barras que no estén dobladas. En Buenos Aires eso es más raro de lo que parece, y con más de 950 gimnasios distribuidos en 48 barrios, saber cuál vale la pena te ahorra tiempo, plata y frustraciones.

Lo primero que mirás cuando entrás a un gimnasio: la zona de peso libre. No las máquinas, no la pantalla con Netflix en la cinta — los racks. Si tienen dos smith machines y un solo rack con fila de esperar 20 minutos a las 7 de la tarde, te das media vuelta y te vas. En Palermo hay lugares que lo tienen claro: boxes y centros de musculación con equipamiento serio, mancuernas hasta 50 kg, barras olímpicas en condiciones. En Caballito y Villa Urquiza encontrás gimnasios de barrio con menos glamour pero más sustancia — espacios donde el profe te conoce por el nombre y no te venden el upgrade premium cada vez que ponés un pie adentro.

El tema de los barrios en Buenos Aires importa y mucho, viste. Palermo es caro, punto. Una membresía en un lugar decente arranca en ARS 20.000 y puede llegar a ARS 45.000 sin piscina ni nada extraordinario. Belgrano y Recoleta van por el mismo camino — barrios de guita, precios de guita. Caballito y Flores son otra historia: misma o mejor calidad en muchos casos, y la membresía te sale entre ARS 10.000 y ARS 20.000 según el lugar. Villa Crespo y Almagro están en un punto medio interesante, con propuestas boutique que crecieron mucho en los últimos años a precios todavía razonables. Cada barrio tiene su lógica y su comunidad.

Ahora, el contexto económico — porque esto es Argentina y no podés ignorarlo. Los precios en pesos cambian cada tres meses, a veces más seguido. Lo que hoy figura en la web del gimnasio puede estar desactualizado para cuando llegás. Para tener una referencia que no se mueva tanto: un gimnasio básico equivale a USD 10-15 por mes, uno mediano USD 20-30, y un premium USD 40-60. Las cadenas como Smart Fit arrancan barato en pesos pero ajustan igual que todos. Megatlon y Sportclub están en el rango medio-alto y ofrecen infraestructura seria — piscinas, canchas de squash, clases grupales numerosas. Valen lo que cobran si usás todo eso. Si solo vas a levantar pesas, quizás no.

Lo que aprendí del rugby es que el entorno importa tanto como el equipamiento. En una cancha de rugby sabés inmediatamente si el equipo entrena en serio o si están ahí para la foto. Con los gimnasios pasa igual: entrá a cualquier hora pico, mirá quién está entrenando, cómo está el espacio, si hay alguien limpiando y si los socios se respetan entre sí. Un gimnasio con buena cultura vale más que uno con maquinaria importada y cero ambiente. En Palermo hay boxes de CrossFit donde eso está clarísimo desde el primer WOD; en otros lugares del corredor de Santa Fe encontrás centros de musculación que son lo que dicen ser, sin venderme un sueño.

La infraestructura varía enormemente. Los lugares de primer nivel tienen racks de sentadilla libres, plataformas con acolchado, piletas semiolímpicas, clases de spinning con cupo limitado, sauna, y profesionales de nutrición y kinesiología en el mismo edificio. Los gimnasios de barrio más modestos tienen lo básico pero bien mantenido. Lo que no perdonás — en ningún rango de precio — es equipamiento roto que nadie repara, vestuarios sucios y personal que no sabe nada de entrenamiento. Eso pasa más de lo que debería en esta ciudad, te lo digo de pana.

Para usar bien GymCABA.com: filtrá por tu barrio primero, porque la adherencia al ejercicio cae en picada cuando el gimnasio queda a 40 minutos de casa. Después mirá qué equipamiento tiene y si se adapta a tu objetivo. Si vas a levantar en serio, buscá racks y peso libre; si querés pileta, filtrá por eso; si preferís clases grupales, fijate la grilla. Y antes de pagar la membresía — siempre, siempre — pedí una clase de prueba. En Buenos Aires casi todos te la dan, y es la única forma honesta de saber si el lugar es para vos.`,
    faq: [
      {
        q: '¿Cuál es el gimnasio más grande de Buenos Aires?',
        a: 'Megatlon cuenta con algunas de las sedes más grandes de la ciudad, especialmente en Palermo y Belgrano, con piletas, canchas de squash, sala de musculación extensa y más de 50 clases grupales semanales. Sportclub también tiene centros de gran superficie en zonas premium de CABA.',
      },
      {
        q: '¿Puedo probar un gimnasio antes de pagar la membresía?',
        a: 'La mayoría de los gimnasios en CABA ofrecen una clase o visita de prueba gratuita o a precio reducido. Algunos, como Smart Fit Argentina, tienen períodos de prueba formales. Te recomendamos visitar el gimnasio en el horario en que vas a entrenar habitualmente para evaluar el nivel de ocupación real.',
      },
      {
        q: '¿Qué diferencia hay entre un gimnasio boutique y uno tradicional?',
        a: 'Los gimnasios boutique en Buenos Aires (muy presentes en Palermo, Villa Crespo y Recoleta) se especializan en un tipo de entrenamiento específico —CrossFit, yoga, pilates reformer, spinning— con clases de cupo limitado, mayor atención del instructor y ambiente más personalizado. Suelen ser más caros que los gimnasios tradicionales pero ofrecen una experiencia más enfocada.',
      },
      {
        q: '¿Qué gimnasios tienen pileta en Buenos Aires?',
        a: 'Megatlon, Sportclub y varios clubes deportivos en Belgrano, Palermo y Núñez cuentan con piletas climatizadas. Los clubes de barrio más tradicionales en Flores, Caballito y Villa Urquiza también suelen incluir natación. Filtrá por "pileta" en GymCABA.com para ver todas las opciones disponibles.',
      },
      {
        q: '¿Los gimnasios en Buenos Aires tienen estacionamiento?',
        a: 'Pocos gimnasios en CABA tienen estacionamiento propio dado el alto valor del suelo urbano. Los grandes centros de Megatlon y Sportclub en zonas con más espacio suelen tener o estar próximos a playas de estacionamiento. En barrios como Palermo o Recoleta, la mayoría de los socios llegan en transporte público, bicicleta o a pie.',
      },
    ],
  },

  estudios: {
    h1: 'Estudios fitness en Buenos Aires',
    intro: `Cuando dejé el rugby a los 24 y empecé con CrossFit, la primera vez que entré a un box en Palermo pensé que me había equivocado de lugar. Barras en el piso, pizarrón con tiempos, gente gritando en los últimos rounds. Después de la primera clase entendí: era el mismo caos ordenado de un scrum, pero en un espacio de 300 metros cuadrados. Esa experiencia me abrió la cabeza sobre lo que puede ser un estudio especializado en Buenos Aires — y desde entonces recorrí cajas de CrossFit, estudios de yoga, academias de boxeo y estudios de pilates que te cambian la forma de pararte. La ciudad tiene más de 260 de estos espacios, y la diferencia entre uno bueno y uno mediocre no está en el equipamiento: está en quién te está mirando mientras entrenás.

El CrossFit es donde empiezo siempre que le recomiendo algo a alguien. Buenos Aires tiene una densidad de boxes que te sorprende: Palermo, Villa Crespo, Colegiales, Belgrano — prácticamente cada barrio con peso de clase media para arriba tiene al menos uno. La cultura del WOD, el tablero de resultados, el coach que te corrige la postura antes de que te lastimaras — eso es lo que diferencia un box serio de uno que vende el nombre pero no tiene la metodología. Del rugby aprendí que la técnica mala se cobra cara con los años: en el tackle te la llevan puesta, en el snatch te rompen la espalda baja. Los boxes donde el coach para el WOD si ves la forma cayendo son los que busco. Hay varios así en Palermo y Colegiales. Los que priorizan el tiempo en la pizarra sobre la mecánica del movimiento, los evito.

El yoga tiene en Buenos Aires una historia larga y una comunidad que no para de crecer. Palermo, San Telmo y Recoleta concentran los estudios más sólidos, con profesores formados en tradiciones serias — no el yoga de Instagram sino el trabajo real de vinyasa, ashtanga y yin. Me costó años de rugby convencerme de pisar un estudio de yoga, pero después de mi primera lesión de hombro seria, el kinesiólogo me mandó directo. Lo que encontré en un estudio de San Telmo cambió mi movilidad en seis meses. Lo que veo ahora es que los corredores y levantadores serios de esta ciudad van al yoga no como complemento sino como parte del plan, y tienen razón. Los estudios de pilates reformer van por el mismo camino — trabajo de estabilidad profunda que ninguna máquina del gimnasio te da.

El boxeo técnico y las artes marciales son una parte de la escena que mucha gente no asocia con el fitness pero que tiene una comunidad enorme en Buenos Aires. Almagro, Boedo y Barracas tienen una tradición de boxeo que viene de lejos, con gimnasios donde el trabajo de guantes y el sparring técnico te meten un cardio que ninguna elíptica te va a dar. El jiu-jitsu brasileño también creció muchísimo en la última década, con academias en Palermo y Belgrano donde el componente físico es brutal. Si venís del deporte de contacto, estos espacios te van a resultar naturales desde el primer día.

El cycling indoor y los estudios de funcional completaron la oferta en los últimos años. Estudios en Palermo y Belgrano con clases de cycling a oscuras, música a volumen serio y instructores que trabajan la potencia — no es la bicicleta de siempre. El entrenamiento funcional con kettlebells, TRX y trabajo de circuito proliferó entre ejecutivos con poco tiempo y plata para gastar: los mejores de estos estudios tienen coaches que saben lo que hacen, los peores te cobran caro por mirarte hacer burpees sin corrección técnica.

El tema económico en los estudios boutique es el mismo que en todos lados en Argentina: los precios en pesos se mueven solos. Un paquete de clases en un box de CrossFit o un estudio de yoga puede ir de ARS 18.000 a ARS 40.000 por mes, dependiendo del barrio y de cuántas clases incluye. En dólares, estamos hablando de USD 20-50 mensuales — que en comparación internacional no es caro, pero en Buenos Aires te rompe el bolsillo si tu sueldo está en pesos. La clase suelta ronda ARS 3.000-6.000. Los estudios buenos suelen tener planes de membresía ilimitada que convienen si vas tres veces o más por semana. Siempre preguntá por la primer clase de prueba — los lugares que cobran la prueba sin que conozcas el espacio me generan desconfianza.

Lo que distingue los estudios buenos de los regulares en Buenos Aires es sencillo: la atención del coach. En un gimnasio masivo sos un número; en un buen estudio boutique, el instructor sabe tu nombre, recuerda tu lesión del hombro y no te deja cargar más barra hasta que la postura esté. Eso fue lo que me enganchó del CrossFit después del rugby, y es lo mismo que busco en cualquier estudio especializado. Buenos Aires tiene muchos lugares así — hay que saber dónde buscar.`,
    faq: [
      {
        q: '¿Qué es un box de CrossFit y cómo funciona en Buenos Aires?',
        a: 'Un box es el nombre que recibe el espacio donde se practica CrossFit. En Buenos Aires funcionan de manera similar a los afiliados internacionales: clases guiadas de 60 minutos con un WOD (entrenamiento del día) diferente cada jornada, en grupos pequeños con instructor certificado. La mayoría exige una clase de fundamentos para principiantes antes de sumarse a las clases regulares.',
      },
      {
        q: '¿Dónde hay buenos estudios de yoga en Buenos Aires?',
        a: 'Palermo, San Telmo y Recoleta concentran la mayor oferta de estudios de yoga de calidad. Barrios como Villa Crespo y Colegiales también tienen estudios muy reconocidos por la comunidad porteña. Algunos combinan yoga con meditación, pranayama y retiros de fin de semana en las afueras de la ciudad.',
      },
      {
        q: '¿Puedo tomar clases de tango como ejercicio en Buenos Aires?',
        a: 'Absolutamente. Buenos Aires tiene decenas de academias y milongas donde el tango funciona como una forma genuina de fitness. Es especialmente recomendado para mejorar la postura, el equilibrio y la coordinación. Muchas academias en Palermo y San Telmo ofrecen clases de nivel inicial sin experiencia previa.',
      },
      {
        q: '¿Cuánto cuesta un pase de clase suelta en un estudio boutique?',
        a: 'El precio de una clase suelta en un estudio boutique de Buenos Aires ronda los ARS 3.000-6.000 según la disciplina y el barrio, equivalente a unos USD 4-8. Los paquetes de clases y las membresías mensuales ilimitadas suelen ofrecer un costo por clase mucho menor, generalmente ARS 1.500-2.500 por sesión.',
      },
      {
        q: '¿Qué estudios de pilates recomiendan los kinesiólogos en CABA?',
        a: 'Los kinesiólogos en CABA suelen derivar pacientes a estudios de pilates clínico con reformer, donde el trabajo se adapta a patologías específicas. Estos estudios —presentes en Palermo, Recoleta, Belgrano y Caballito— trabajan con grupos muy pequeños o sesiones individuales y sus instructores tienen formación específica en anatomía y rehabilitación.',
      },
    ],
  },

  entrenadores: {
    h1: 'Entrenadores personales en Buenos Aires',
    intro: `Del rugby saqué muchas cosas, pero la más duradera fue saber reconocer un buen entrenador en menos de cinco minutos. No hablo del papel ni de los títulos en la pared — hablo de cómo te mira cuando movés, si te para antes de que te lastimes, si sabe explicar el por qué de cada cosa que te pide. Tuve entrenadores de rugby brillantes y tuve algunos que no sabían nada: los diferenciás enseguida cuando el trabajo es exigente de verdad. Con los personal trainers en Buenos Aires pasa exactamente lo mismo — y la ciudad tiene más de 370 registrados activos, con la cifra real del mercado siendo bastante más alta. El problema no es encontrar uno; es saber cuál vale tu plata.

La formación en Buenos Aires es genuinamente sólida cuando es la correcta. Los egresados del ISEF, de la UBA y de las instituciones privadas con carrera completa de Educación Física tienen una base teórica y práctica que no tiene nada que envidiarle a ningún país de la región. El problema son los cursos de 3 meses que te dan un certificado que dice "personal trainer" y te mandan a trabajar sin haber visto una lesión en la vida. Cómo diferenciás: pedí el título. Un licenciado o profesorado en Educación Física tiene 4-5 años de formación, tiene matrícula, responde profesionalmente. El que evita hablar de su formación y cambia el tema hacia su Instagram tiene una bandera roja enorme.

Los parques son el escenario natural del personal trainer porteño y te digo por qué me gustan: ves al entrenador trabajar en tiempo real, sin el control del ambiente del gimnasio. En el Bosque de Palermo — el Parque Tres de Febrero para los que no son de acá — los fines de semana es un desfile de duplas trabajando. Observá un rato: los buenos coaches corrigen la postura en cada repetición, miran el movimiento completo, ajustan la carga según lo que ven. Los que están mirando el teléfono mientras el cliente hace press de hombros con técnica espantosa, los descartás. El Parque Rivadavia en Caballito y el Parque Centenario en Almagro tienen la misma dinámica, con entrenadores a precios más accesibles que los de Palermo.

Los precios cambian según el barrio, la experiencia y la modalidad. Una sesión individual en domicilio o parque cuesta entre ARS 6.000 y ARS 20.000 — en dólares, USD 7-25 según el tipo de cambio del momento. Un entrenador senior con especialización en fuerza o rehabilitación puede cobrar más y está justificado. Palermo y Recoleta son los barrios más caros por la demanda; en Caballito, Villa Urquiza y Belgrano encontrás muy buenos profesionales a precios más razonables. Los paquetes de 8-12 sesiones casi siempre salen más baratos por sesión — cuando encontrás a alguien bueno, comprometete de entrada.

Las especializaciones importan mucho según lo que necesitás. Si venís de una lesión o cirugía, buscás alguien que trabaje articulado con kinesiología — no un generalista que improvisa. Si tu objetivo es fuerza y potencia, querés un coach que maneje periodización, no uno que te haga circuitos de burpees indefinidamente. Para adultos mayores hay un perfil muy específico de entrenador con formación en trabajo de equilibrio y movilidad articular que hace una diferencia enorme. Y para corredores que quieren mejorar su maratón, los entrenadores especializados en running con manejo de zonas de frecuencia cardíaca son otra categoría. Buenos Aires tiene todo esto — el trabajo es encontrarlo bien.

Un tip que aprendí a los golpes: la primera sesión tiene que ser de evaluación, no de entrenamiento. El entrenador te tiene que preguntar sobre tu historial de lesiones, tus objetivos concretos, tus limitaciones de tiempo y de presupuesto. Te tiene que ver mover en los patrones básicos — sentadilla, bisagra de cadera, empuje, jalón — antes de ponerte una carga encima. Si en la primera sesión ya te metió full WOD sin preguntarte nada, o bien tiene mucha confianza o bien no le importa demasiado tu historial. Del rugby sé que la preparación sin contexto es la receta para la lesión. Un entrenador serio en Buenos Aires lo sabe igual.

Usá GymCABA.com para filtrar por barrio, especialización y modalidad. Leé las reseñas con ojo crítico — las reseñas que dicen "increíble, me cambió la vida" sin detallar nada concreto me generan menos confianza que una que dice "me corrigió la técnica del peso muerto en dos sesiones y desapareció el dolor de espalda". El detalle específico indica que el entrenamiento fue real. Eso es lo que buscás.`,
    faq: [
      {
        q: '¿Qué titulación debe tener un entrenador personal en Argentina?',
        a: 'En Argentina, la titulación habitual es la Licenciatura o Profesorado en Educación Física, obtenida en universidades como la UBA, ISEF o instituciones privadas. También existe la formación como Instructor de Fitness a través de cursos certificados. Es recomendable verificar que el profesional esté matriculado en el colegio de educación física de CABA o en alguna asociación como la FADeF.',
      },
      {
        q: '¿Puedo entrenar con un personal trainer en los parques de Buenos Aires?',
        a: 'Sí, y es muy común. El Parque Tres de Febrero en Palermo, el Parque Rivadavia en Caballito y el Parque Centenario son los espacios más utilizados. El entrenamiento al aire libre es especialmente popular en primavera y verano. Algunos entrenadores trabajan exclusivamente en parques y llevan su propio equipamiento.',
      },
      {
        q: '¿Cuántas sesiones por semana son recomendables con un entrenador personal?',
        a: 'La mayoría de los entrenadores en Buenos Aires recomiendan 2 a 3 sesiones semanales para obtener resultados sostenibles. Las sesiones suelen durar entre 45 y 60 minutos. Para quienes están comenzando, 2 sesiones por semana con entrenamiento autónomo en los días restantes es un buen punto de partida.',
      },
      {
        q: '¿Hay entrenadores personales especializados en adultos mayores en CABA?',
        a: 'Sí. Buenos Aires tiene una oferta creciente de entrenadores con formación específica en actividad física para personas mayores de 60 años, incluyendo trabajo de equilibrio, prevención de caídas, movilidad articular y fuerza funcional. Muchos trabajan en coordinación con médicos clínicos y traumatólogos. Filtrá por "adultos mayores" en GymCABA.com para encontrarlos.',
      },
      {
        q: '¿Cómo diferencia GymCABA.com entre entrenadores certificados y no certificados?',
        a: 'Los perfiles en GymCABA.com incluyen un campo de titulación y certificaciones donde cada entrenador puede detallar su formación. Te recomendamos siempre solicitar al profesional que muestre su título o matrícula profesional antes de comenzar. Un entrenador transparente en su formación es siempre una buena señal.',
      },
    ],
  },

  eventos: {
    h1: 'Eventos fitness en Buenos Aires',
    intro: `La Maratón de Buenos Aires la corrí por primera vez hace tres años, 21K, y te lo juro que en el kilómetro 18 por Palermo me acordé de todos los partidos de rugby donde había querido parar y no podía. La diferencia es que en el rugby te van a matar si aflojas; en la maratón solo te juzgás vos mismo. La largada frente al Obelisco, 20.000 personas, octubre en Buenos Aires con el otoño encima — eso es un evento que va más allá del deporte. Y es el mejor ejemplo de lo que hace Buenos Aires cuando se organiza en torno al movimiento: mezcla el alto rendimiento con el vecino que corre sus primeros 5K, sin que nadie se sienta fuera de lugar.

La Maratón es el ancla del calendario, pero el año fitness en Buenos Aires empieza mucho antes. En primavera y verano, las carreras populares se acumulan — decenas de eventos organizados por clubes de barrio, marcas deportivas, ONGs y el Gobierno de la Ciudad. El Circuito BA Running agrupa varios de estos eventos en un calendario integrado. Las carreras nocturnas en Puerto Madero con el río de fondo tienen un ambiente que las diurnas no tienen; los grupos de running que entrenan en los alrededores del Hipódromo de Palermo y en Cañitas son de los más activos de la ciudad. Si venís del deporte de equipo como yo y querés meter estructura en el cardio, las carreras populares son la excusa perfecta: el objetivo concreto te organiza el entrenamiento de las semanas anteriores de una manera que el "hoy corro un rato" nunca logra.

El CrossFit Buenos Aires Open es el evento que más me genera adrenalina desde que empecé con CrossFit. El Open anual tiene categorías para todos los niveles, pero el evento local es otra cosa: boxes de toda Argentina mandan atletas, hay categorías Masters y Scaled para los que no somos Games athletes, y el ambiente de tribuna es el más parecido a un partido de rugby que encontré en el fitness. El Argentine CrossFit Championship eleva la apuesta — si nunca fuiste a ver una competencia de CrossFit sin competir, te recomiendo ir como espectador una vez. No te vas a aburrir.

El Buenos Aires Triatlón combina natación en el Río de la Plata —que ya solo eso tiene mérito simbólico enorme— con ciclismo por los parques costeros y running por Puerto Madero. La comunidad de triatlón en Buenos Aires es seria y lleva años organizándose con clubes de entrenamiento en Palermo, Belgrano y Núñez. Lo que me gusta de este evento es que tiene distancias sprint para quienes empiezan, entonces no es solo un evento de elite: es una entrada al mundo de los deportes de resistencia que te cambia la perspectiva del entrenamiento cruzado. Varios compañeros del rugby derivaron al triatlón cuando se retiraron y hoy entrenan más disciplinado que nunca.

En verano, los parques de Buenos Aires se llenan de actividad grutuita organizada por el GCBA: yoga al amanecer en el Parque Tres de Febrero, clases de spinning al aire libre, running grupales en el Parque Rivadavia. No tienen el nivel de un coach privado pero son un punto de entrada para alguien que recién arranca o que quiere variar la rutina sin gastar plata. El Estado porteño tiene más propuestas de movimiento gratuito de lo que la gente cree — el problema es que no están centralizadas en ningún lado.

Los eventos de bienestar completan el calendario: retiros de yoga de fin de semana en el Delta del Tigre, ferias de nutrición deportiva en Palermo y Belgrano, workshops de movilidad y recuperación que varios boxes de CrossFit organizan para sus comunidades. No son eventos masivos, pero para alguien que lleva años entrenando son momentos donde parás la rutina y trabajás en algo específico con gente que toma el entrenamiento en serio. A mí los workshops de movilidad me cambiaron más que cualquier programa de fuerza en el año en que los hice con constancia.

GymCABA.com centraliza todo este calendario para que no te pierdas nada y no tengas que rastrear por separado el Instagram de cada carrera, cada box y cada estudio. En Buenos Aires el problema nunca es que no haya eventos — es que están dispersos en veinte canales distintos y te enterás tarde. Dale una vuelta al calendario antes de arrancar cada mes.`,
    faq: [
      {
        q: '¿Cuándo se realiza la Maratón de Buenos Aires?',
        a: 'La Maratón de Buenos Aires se realiza habitualmente en octubre, con inscripciones que abren varios meses antes y se agotan rápidamente. Incluye distancias de 5K, 10K, 21K (media maratón) y 42K (maratón completa). El recorrido pasa por Puerto Madero, Palermo y el microcentro porteño.',
      },
      {
        q: '¿Cómo puedo inscribirme a carreras populares en Buenos Aires?',
        a: 'La mayoría de las carreras en CABA se inscriben a través de plataformas online como CrowdEngage, Deportico o los sitios propios de cada evento. GymCABA.com centraliza los eventos próximos con links directos a la inscripción. Algunas carreras también permiten inscripción presencial en días previos al evento.',
      },
      {
        q: '¿Hay eventos de CrossFit abiertos al público en Buenos Aires?',
        a: 'Sí. El CrossFit Buenos Aires Open y el Argentine CrossFit Championship son los eventos más grandes, con categorías para distintos niveles. Muchos boxes locales también organizan competencias internas o interboxes a lo largo del año que son abiertas a la comunidad. Son excelentes oportunidades para medir el progreso y conectar con la comunidad.',
      },
      {
        q: '¿Hay eventos fitness gratuitos en Buenos Aires?',
        a: 'Sí, y muchos. El Gobierno de la Ciudad organiza regularmente clases grupales gratuitas de yoga, pilates, running y gimnasia en los parques. El programa Buenos Aires Activo incluye actividades en el Parque Tres de Febrero, Parque Centenario, Parque Chacabuco y muchos otros espacios verdes. Consultá la agenda en el sitio del GCBA y en GymCABA.com.',
      },
      {
        q: '¿Puedo participar en un triatlón en Buenos Aires siendo principiante?',
        a: 'El Buenos Aires Triatlón incluye una distancia sprint pensada para participantes que se inician en la disciplina. Existen también clubes de triatlón en Palermo, Belgrano y Núñez que ofrecen grupos de entrenamiento para principiantes con programa estructurado. Se recomienda al menos seis meses de entrenamiento específico antes de la competencia.',
      },
    ],
  },

  bienestar: {
    h1: 'Bienestar en Buenos Aires',
    intro: `Te voy a decir algo que tardé años en aprender: en el rugby, los que se lastimaban y no volvían eran los que ignoraban la recuperación, no los que entrenaban fuerte. El entrenamiento serio no es lo que te rompe — es el entrenamiento serio sin recuperación lo que te destruye. Llegué a esa conclusión después de mi segunda lesión de hombro a los 26, cuando el kinesiólogo me dijo literalmente "Matías, el problema no es tu entrenamiento, es lo que hacés los días que no entrenás". Desde entonces, lo que la gente llama "bienestar" — kinesiología, nutrición deportiva, masaje, incluso meditación — es para mí parte del plan de entrenamiento, no un extra de spa para los que tienen guita de sobra.

El kinesiólogo en Argentina es el profesional que más subutilizado está entre los deportistas amateurs. En Buenos Aires hay una densidad altísima de kinesiólogos excelentes — es una carrera universitaria seria, con formación en rehabilitación, biomecánica y técnicas manuales que en otros países llamarían fisioterapia avanzada. Palermo, Belgrano y Recoleta tienen centros de kinesiología de alta complejidad con equipamiento de electroterapia, ultrasonido y pilates clínico integrado. En Caballito, Flores y Almagro encontrás la misma calidad profesional a precios más accesibles. Mi regla personal: si tengo una molestia que dura más de una semana, no espero — voy al kinesiólogo. El costo de ignorar una lesión temprana siempre es mayor que el de una sesión.

El masaje deportivo es otra herramienta que dejó de ser lujo para los que entrenan cinco veces por semana. No hablo del masaje de spa con velas aromáticas — hablo del masaje de tejido profundo, la técnica miofascial y el trabajo de liberación de puntos gatillo que le permite a tu cuerpo recuperarse en 24 horas lo que sin intervención llevaría 48. Los precios en Buenos Aires van de ARS 8.000 a ARS 25.000 por sesión según el profesional y la zona — en dólares, USD 10-30 — y ajustan con la inflación como todo. Para corredores preparando maratón y para CrossFitters con alta carga de entrenamiento, una sesión semanal o quincenal de masaje deportivo hace una diferencia medible en el rendimiento.

La nutrición deportiva es donde Buenos Aires tiene mucho para ofrecer y donde también hay mucho ruido. Los licenciados en nutrición con especialización en deporte son excelentes cuando encontrás uno serio — te diseñan un plan de alimentación basado en tu composición corporal, tu carga de entrenamiento y tus objetivos reales, no en una plantilla genérica de Instagram. El mercado de suplementos es el caos típico argentino: proteínas importadas carísimas en dólares alternativas con nacionales de calidad creciente a mejor precio. La creatina, que es el suplemento con más evidencia científica del mundo, la comprás localmente sin gastar una fortuna. El resto depende de tus objetivos y de lo que te diga un profesional que te vio mover, no un influencer de California.

La psicología del deporte es una especialidad que creció enormemente en Buenos Aires en la última década, y tiene sentido en la ciudad con más psicólogos per cápita del mundo. Para el porteño, hablar con un profesional de salud mental no tiene el estigma que tiene en otros contextos culturales — es parte de la vida. Los deportistas amateurs que trabajan la ansiedad competitiva, la adherencia al entrenamiento y el manejo de la frustración ante lesiones o mesetas de rendimiento tienen resultados diferentes a los que se bancan todo solos. Los centros de bienestar integral en Palermo y Recoleta que combinan kinesiología, nutrición y psicología del deporte bajo el mismo techo son el modelo más completo que existe en la ciudad.

La meditación y el mindfulness cerraron el círculo para mí el año pasado. No lo busqué por convicción filosófica — lo probé porque el kinesiólogo y el nutricionista me dijeron que el estrés crónico eleva el cortisol y frena la recuperación. Práctico. Los centros de meditación en Buenos Aires van desde el budismo tibetano serio en el Once hasta aplicaciones locales de meditación guiada en porteño que te hacen gracia la primera vez y después funcionan. Lo que encontré en un estudio de San Telmo con práctica de meditación integrada al yoga cambió mi calidad de sueño en tres semanas — y el sueño es la primera variable de recuperación. Para el que entrena en serio, subestimar eso es un error.

Usá GymCABA.com para encontrar los centros de bienestar cerca de tu barrio. En Palermo y Belgrano hay opciones top de todo tipo; en Caballito y Villa Urquiza encontrás calidad similar a menor costo. El bienestar en Buenos Aires es caro si lo tratás como lujo y accesible si lo tratás como parte del plan de entrenamiento — que es exactamente lo que es.`,
    faq: [
      {
        q: '¿Cuál es la diferencia entre un kinesiólogo y un masajista en Argentina?',
        a: 'El kinesiólogo es un profesional universitario matriculado que diagnóstica y trata patologías musculoesqueléticas, neurológicas y respiratorias mediante técnicas físicas. El masajista puede tener formación certificada de menor extensión y se enfoca en el bienestar general y la recuperación muscular. Para lesiones deportivas o post-operatorios, siempre consultá a un kinesiólogo.',
      },
      {
        q: '¿Dónde puedo encontrar un nutricionista deportivo en Buenos Aires?',
        a: 'Los licenciados en nutrición con especialización deportiva trabajan en centros de kinesiología, gimnasios de alta gama y consultorios independientes. En Palermo, Belgrano y Recoleta encontrás la mayor concentración de profesionales. Muchos también atienden de forma virtual, lo que amplía el acceso desde cualquier barrio. Filtrá por "nutrición" en GymCABA.com.',
      },
      {
        q: '¿Cuánto cuesta una sesión de kinesiología en CABA?',
        a: 'Una sesión de kinesiología en Buenos Aires cuesta entre ARS 8.000 y ARS 20.000 según el profesional, la zona y las técnicas utilizadas, equivalente a unos USD 10-25. Muchas obras sociales y prepagas cubren total o parcialmente las sesiones con derivación médica. Consultá tu cobertura antes de abonar de manera particular.',
      },
      {
        q: '¿Hay centros de bienestar integral en Buenos Aires?',
        a: 'Sí. Buenos Aires tiene varios centros de bienestar integral —especialmente en Palermo, Recoleta y Belgrano— que combinan bajo el mismo techo kinesiología, masajes, nutrición, yoga y psicología del deporte. Estos espacios ofrecen abordajes multidisciplinarios para quienes buscan una mejora integral de su salud y rendimiento.',
      },
      {
        q: '¿Dónde puedo aprender meditación o mindfulness en Buenos Aires?',
        a: 'Buenos Aires tiene centros de meditación de diversas tradiciones: budismo tibetano en Once y Palermo, meditación laica basada en mindfulness (MBSR) en centros terapéuticos de Palermo y Belgrano, y retiros de fin de semana que parten desde la ciudad. Muchos estudios de yoga también incluyen meditación en su propuesta. GymCABA.com organiza todos estos centros por barrio y modalidad.',
      },
    ],
  },
}

export const staticPageContent = {
  sobreNosotros: {
    title: 'Sobre nosotros',
    h1: '¿Quiénes somos?',
    body: `GymCABA.com es el directorio de referencia para encontrar gimnasios, estudios fitness, entrenadores personales y centros de bienestar en la Ciudad Autónoma de Buenos Aires.\n\nNació de una necesidad real: encontrar un buen lugar para entrenar en Buenos Aires no debería ser complicado. Con más de 950 establecimientos distribuidos en sus barrios, la oferta es enorme pero difícil de navegar. GymCABA.com organiza esa información para que puedas tomar la mejor decisión en segundos.\n\nNuestra misión es conectar a los porteños con el lugar ideal para moverse, entrenar y cuidarse, sin importar el barrio, presupuesto u objetivo fitness.`,
  },
  agregarNegocio: {
    title: 'Agregar negocio',
    h1: 'Agregá tu gimnasio o estudio gratis',
    body: `¿Tenés un gimnasio, estudio fitness, servicio de entrenamiento personal o centro de bienestar en Buenos Aires? Aparecé en GymCABA.com de forma completamente gratuita.\n\nMiles de porteños usan nuestra plataforma cada mes para buscar lugares donde entrenar. Un perfil completo puede significar nuevos clientes directamente a tu puerta.`,
  },
  faqPage: {
    title: 'Preguntas frecuentes',
    h1: 'Preguntas frecuentes sobre GymCABA.com',
    items: [
      {
        q: '¿GymCABA.com es gratuito?',
        a: 'Sí, buscar y explorar el directorio es completamente gratuito.',
      },
      {
        q: '¿Cómo se seleccionan los negocios?',
        a: 'A través de fuentes públicas verificadas, registro voluntario o reporte de la comunidad. Todos los perfiles son revisados.',
      },
      {
        q: '¿Puedo dejar una reseña?',
        a: 'Sí, en cada perfil encontrarás un formulario para dejar tu opinión, moderada para garantizar autenticidad.',
      },
      {
        q: '¿Con qué frecuencia se actualiza la información?',
        a: 'Continuamente. Si ves información incorrecta, podés reportarla desde la página del establecimiento.',
      },
      {
        q: '¿Tienen app móvil?',
        a: 'Por ahora está optimizado para móvil a través del navegador. Una app nativa está en nuestros planes.',
      },
    ],
  },
  contacto: {
    title: 'Contacto',
    h1: '¿Tenés alguna pregunta?',
    body: `Estamos aquí para ayudarte. Si tenés dudas sobre el directorio o querés ponerte en contacto con el equipo de GymCABA.com, escribinos.`,
    email: 'hola@gymcaba.com',
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
  { slug: 'gimnasios',    label: 'Gimnasios',    icon: '🏋️', count: 950,  description: 'Gimnasios en Buenos Aires' },
  { slug: 'estudios',     label: 'Estudios',     icon: '🧘', count: 261,  description: 'Estudios fitness en Buenos Aires' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 378,  description: 'Entrenadores personales en Buenos Aires' },
  { slug: 'eventos',      label: 'Eventos',      icon: '📅', count: 201,  description: 'Eventos fitness en Buenos Aires' },
  { slug: 'bienestar',    label: 'Bienestar',    icon: '🌿', count: 213,  description: 'Bienestar en Buenos Aires' },
] as const
