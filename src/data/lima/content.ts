// src/data/lima/content.ts

export const homeContent = {
  hero: {
    h1: 'Encuentra los mejores gimnasios en Lima',
    subtitle: 'Gimnasios, estudios, entrenadores y bienestar en todos los distritos de Lima Metropolitana',
  },
  stats: {
    gyms: '850+',
    barrios: '180+',
    localidades: '20',
    categories: '5',
  },
  faq: [
    { q: '¿Cuánto cuesta un gimnasio en Lima?', a: 'Una membresía mensual en Lima cuesta entre S/. 80 y S/. 400 según el distrito y tipo de gimnasio. Smart Fit ofrece planes desde S/. 99/mes. Los clubes premium en San Isidro y Miraflores pueden superar los S/. 400 al mes.' },
    { q: '¿Cuáles son los mejores distritos para encontrar gimnasios en Lima?', a: 'Surco, Miraflores y San Isidro concentran los gimnasios de mayor calidad. Los Olivos y San Martín de Porres tienen amplia oferta a precios más accesibles en el cono norte.' },
    { q: '¿Hay gimnasios 24 horas en Lima?', a: 'Sí. Smart Fit opera 24/7 en varias sedes en Miraflores, Surco y San Miguel. Algunos gimnasios independientes en Miraflores también tienen horario extendido.' },
    { q: '¿Cómo puedo agregar mi negocio a GymLima.com?', a: 'Es completamente gratuito. Haz clic en "Agregar negocio" y completa el formulario. Tu perfil será revisado y publicado en 24-48 horas.' },
    { q: '¿Puedo encontrar entrenadores personales por distrito en Lima?', a: 'Sí. En GymLima.com puedes filtrar entrenadores por distrito. Muchos trabajan en Parque Kennedy, Parque El Olivar y Costa Verde, además de sesiones a domicilio en Miraflores y San Isidro.' },
  ],
}

export const categoryContent: Record<string, { h1: string; intro: string; faq: Array<{ q: string; a: string }> }> = {
  gimnasios: {
    h1: 'Gimnasios en Lima',
    intro: `Mira, te voy a contar cómo es esto de los gimnasios en Lima desde mi experiencia real, porque hay de todo y no todos vale la pena. Soy de Miraflores, entreno CrossFit desde hace varios años y lo que más me importa cuando entro a cualquier box o gym: que haya racks de sentadilla libres, una zona de peso libre decente y que no me toque esperar veinte minutos para usar una barra. Con ese criterio he revisado bastante la oferta de la ciudad, y te puedo decir que Lima sorprende bastante bien si sabes dónde mirar.

Lo primero que tienes que tener claro es el tráfico, pe. Eso que parece obvio define todo. Yo vivo en Miraflores y tengo suerte: puedo ir caminando al malecón, pedalear hasta San Isidro, o llegar en diez minutos a varios boxes por Reducto o Benavides. Pero si empiezas a cruzar la ciudad en hora punta ya la cosa cambia radicalmente. De Miraflores a Surco en rush hour puedes fácil tardar 45 minutos, y eso en un día normal. A La Molina, ni te cuento. Entonces cuando alguien me pregunta "¿cuál es el mejor gym de Lima?", siempre le respondo lo mismo: el mejor es el que queda cerca de tu casa o tu trabajo, porque si el traslado es un martirio, a los dos meses lo dejas.

Dicho eso, Miraflores es bacán para entrenar. Hay opciones cerca del malecón que tienen vista parcial al Pacífico, lo que ya es un plus mental antes de entrar a sudar. Los boxes de CrossFit en este distrito son generalmente bien equipados: barras olímpicas, bumper plates, rigs decentes, y las comunidades son activas. El precio sube comparado con otros distritos —membresías entre S/. 200 y S/. 350 al mes en los boxes serios— pero la calidad se nota. Además, después de entrenar puedes bajar al malecón a estirar con vista al mar, o meterte a la playa si es verano. Eso no tiene precio, causa.

Surco es el distrito con más oferta de todo Lima, más de 168 centros registrados. Si vives por ahí, estás de suerte porque tienes para elegir entre grandes cadenas como Smart Fit —que opera 24/7, ideal si tu horario es irregular— y boxes de CrossFit más pequeños y especializados. El tema es que Surco es grande y el tráfico interno puede ser traicionero: la Panamericana Sur en hora punta es un martirio, y entre el cruce de Primavera y Benavides puedes perderte fácilmente veinte minutos por dos kilómetros. Así que busca el gym según tu zona exacta dentro del distrito, no solo "que sea en Surco".

El cono norte —Los Olivos, San Martín de Porres— tiene una oferta fitness que mucha gente de Miraflores ignora y está bien desarrollada. Más de 130 gimnasios en cada uno de esos distritos, con precios entre S/. 80 y S/. 150 al mes que hacen ver caros a los de mi zona. No es que sean inferiores: he visto boxes de CrossFit en Los Olivos con equipamiento completo y coaches certificados. El detalle obvio es el traslado: si vives en San Miguel o más al norte, tiene todo el sentido. Si vives en Barranco y piensas ir allá, el tráfico en la Panamericana Norte te va a cobrar el precio en tiempo.

San Isidro tiene los gimnasios más corporativos y algunos clubes privados de primer nivel. Es el distrito financiero, así que hay mucha gente que entrena en el almuerzo o antes de la jornada. Los precios son los más altos de Lima pero las instalaciones suelen justificarlo. Para mí, que vengo del surf y el CrossFit, no es necesariamente mi ambiente favorito —los gyms corporativos tienen mucho cardio y poca barra— pero si buscas una experiencia completa con piscina, sauna y clases grupales, ahí lo encuentras.

En resumen: Lima tiene más de 850 gimnasios y la oferta es real, bacán y variada. Mi consejo es simple — antes de pagar cualquier membresía, haz el recorrido de prueba en hora punta. Si llegar al gym te cuesta más de 20 minutos de tu día a día, ese gym no es para ti, no importa qué tan bueno sea.`,
    faq: [
      { q: '¿Cuáles son las mejores cadenas de gimnasios en Lima?', a: 'Las principales cadenas son Smart Fit Perú (más de 20 sedes, desde S/. 99/mes), Gold\'s Gym Lima (alta gama, varios distritos), Bodytech Perú (premium con piscina y spa) y Regimenta (funcional y alto rendimiento). También hay numerosos gimnasios independientes de calidad en todos los distritos.' },
      { q: '¿Cuánto cuesta una membresía de gimnasio en Lima?', a: 'Los precios varían entre S/. 80 y S/. 400 al mes. Smart Fit ofrece planes desde S/. 99. Gimnasios de barrio en Los Olivos o San Martín de Porres rondan los S/. 80-130. Clubes premium en San Isidro o Miraflores pueden superar los S/. 350 mensuales.' },
      { q: '¿Hay gimnasios 24 horas en Lima?', a: 'Sí. Smart Fit opera 24/7 en sedes de Miraflores, Surco, San Miguel y otros distritos. Algunos gimnasios independientes en Miraflores y San Isidro también tienen horario extendido hasta las 22:00 o 23:00 horas.' },
      { q: '¿En qué distrito hay más gimnasios en Lima?', a: 'Surco lidera con más de 168 gimnasios registrados, seguido de Miraflores (145), Los Olivos (134) y San Isidro (122). En el cono norte, San Martín de Porres tiene 112 centros, lo que lo convierte en el más activo de esa zona de la ciudad.' },
      { q: '¿Puedo entrenar al aire libre en Lima como complemento al gimnasio?', a: 'Sí. Lima ofrece excelentes espacios al aire libre: el malecón de Miraflores y Barranco, la Costa Verde, el Parque El Olivar en San Isidro y el Parque Kennedy son muy usados para running, calistenia y entrenamiento funcional, especialmente en verano (diciembre-marzo).' },
    ],
  },
  estudios: {
    h1: 'Estudios fitness en Lima',
    intro: `Los estudios boutique son, para mí, lo mejor que le ha pasado al fitness en Lima en los últimos años. Digo esto como alguien que lleva tiempo en el CrossFit y que también ha probado pilates, yoga y spinning por distintas razones: el CrossFit para el acondicionamiento general, el pilates porque mi fisio me lo recomendó para la postura de remo en el surf, y el yoga porque hay días que necesito bajar las pulsaciones y desinflamar antes de que mi cuerpo explote. Cada cosa tiene su momento, y Lima tiene de todo si sabes dónde buscar.

Mi mundo es el CrossFit, así que por ahí empiezo. Los boxes en Miraflores y Barranco tienen una comunidad que se siente de verdad. No es el gym donde te pones los auriculares y desapareces: hay WODs en pizarra, coaches que te corrigen el snatch sin que les preguntes, y gente que te pregunta cómo te fue en el evento del fin de semana. La vez que probé un box nuevo por Benavides me quedé tres meses sin pensarlo, porque el ambiente enganchó al toque. Los grupos no suelen pasar de doce personas por clase, que para mí es fundamental — si hay veinte personas en el box no te pueden corregir la técnica ni con la mejor voluntad del mundo.

El pilates reformer lo encontré por recomendación de mi kinesióloga, que me dijo que era bacán para la movilidad escapular, clave en el surf. Fui un poco escéptica al principio, pe, pero al segundo mes notaba la diferencia en el paddling. Los estudios de pilates en Miraflores y San Isidro son generalmente de muy buen nivel: equipos Balanced Body, instructoras con certificación internacional, clases de máximo seis personas. No es barato — entre S/. 80 y S/. 120 por clase suelta— pero si lo necesitas para algo específico vale la inversión.

Para yoga hay opciones muy distintas según lo que busques. Cerca del malecón en Miraflores hay estudios con terraza y brisa del Pacífico que hacen clases al amanecer; eso suena turístico pero te juro que es otra experiencia mental completamente distinta entrenar con el olor a mar a las 7am. En Barranco los estudios tienen onda más alternativa — casonas republicanas con patios, kundalini, meditación guiada — con precios un poco más bajos que Miraflores, entre S/. 45 y S/. 80 por clase. Para mí que mezclo surf y CrossFit, Barranco tiene el ambiente que más resuena.

El factor tráfico importa mucho al elegir un estudio, más que al elegir un gym grande con horarios flexibles. Los estudios boutique tienen horarios específicos: si pierdes la clase de las 7pm porque el tráfico en la Vía Expresa estaba imposible, perdiste y ya. Así que mi criterio siempre es: estudio a menos de 15 minutos de casa o trabajo, sin tráfico. De Miraflores a San Isidro está bien. De Miraflores a Surco en tarde-noche ya hay que calcularlo. Yo no cruzo Lima para ir a una clase de una hora — aprendo de mis errores.

Hay una escena que mucha gente no conoce fuera de los distritos premium: Los Olivos y San Martín de Porres tienen boxes de CrossFit bien equipados y academias de artes marciales con nivel real, a precios entre S/. 80 y S/. 150 al mes. No es que sean inferiores; simplemente no están en Instagram con fotos bonitas del malecón. Si vives en el cono norte, antes de cruzar la ciudad en tráfico para ir a un box en Miraflores, primero revisa lo que tienes cerca. Puede que te lleves una sorpresa bacán.

En total Lima tiene más de 212 estudios boutique registrados y la oferta crece cada año. Mi recomendación: prueba siempre una clase antes de comprar un pack mensual — casi todos los estudios serios lo ofrecen — y prioriza la comunidad y el coach por encima de la estética del local. Un box con fotos lindas en Instagram pero con coach mediocre no vale lo que uno sencillo donde el entrenador sabe lo que hace y te empuja de verdad.`,
    faq: [
      { q: '¿Cuánto cuesta una clase en un estudio boutique en Lima?', a: 'Una clase suelta cuesta entre S/. 35 y S/. 120 según el tipo de estudio y distrito. Packs mensuales de clases ilimitadas oscilan entre S/. 200 y S/. 450. Los estudios de Barranco y Pueblo Libre suelen ser más económicos que los de Miraflores o San Isidro.' },
      { q: '¿Qué tipos de estudios fitness hay en Lima?', a: 'La oferta incluye pilates reformer, yoga (Vinyasa, Iyengar, Kundalini), spinning/cycling indoor, CrossFit boxes, barre, TRX, kickboxing, muay thai, zumba, danza latina, HIIT boutique y meditación. Miraflores y San Isidro tienen mayor variedad de formatos premium.' },
      { q: '¿Necesito experiencia previa para ir a un estudio boutique?', a: 'No. La mayoría de estudios en Lima ofrecen clases para principiantes o niveles mixtos. En pilates y yoga siempre hay opciones para quienes empiezan. Se recomienda consultar el nivel de la clase al hacer la reserva.' },
      { q: '¿Los estudios en Lima permiten clases de prueba?', a: 'Sí. Muchos estudios en Lima ofrecen una primera clase gratuita o a precio reducido (S/. 20-35) para nuevos visitantes. Consulta directamente con el estudio antes de adquirir un pack mensual.' },
      { q: '¿Puedo reservar clases en estudios de Lima por internet?', a: 'Sí. La mayoría de estudios boutique en Miraflores, San Isidro y Barranco tienen sistemas de reserva online o por WhatsApp. Algunos usan plataformas como Mindbody o sistemas propios. GymLima.com incluye el enlace de reserva en cada perfil.' },
    ],
  },
  entrenadores: {
    h1: 'Entrenadores personales en Lima',
    intro: `Buscar un buen entrenador personal en Lima puede ser confuso porque hay de todo: desde coaches con certificaciones internacionales serias y años de experiencia, hasta gente que hizo un curso de dos semanas y ya se llama trainer. Te cuento desde mi perspectiva lo que hay que mirar, porque yo he pasado por buenos y malos y la diferencia se nota en el cuerpo al toque.

Para mí, que mezclo CrossFit y surf, el perfil ideal de un coach es alguien que entienda movimiento funcional de verdad: técnica en levantamientos olímpicos, movilidad, periodización. No me sirve un trainer que solo sabe de máquinas y rutinas de gym tradicional. En Lima hay coaches CrossFit certificados por CF-L1 y CF-L2 que trabajan tanto en boxes como de forma independiente, y la diferencia en la calidad de corrección técnica es enorme. Cuando empecé a trabajar con un coach que entendía el snatch y el clean me di cuenta de todos los defectos que arrastraba yo sola desde hacía meses. Eso no tiene reemplazo.

Si entrenas para surf o cualquier deporte de playa y quieres un preparador físico específico, busca alguien que entienda de conditioning: trabajo de core, estabilidad de hombro, explosividad. He probado trainers que no tienen idea de lo que significa prepararse para surfear y terminan dándote una rutina de culturismo que no te ayuda en nada en el agua. La pregunta clave al contratar: "¿Has trabajado con surfistas o deportistas de playa antes?" Si dice que no, busca otro.

El tráfico es determinante para decidir si quieres un trainer presencial en gym o uno a domicilio. Esto es Lima, causa — no es que el domicilio sea para flojos, es que hay días en que salir de Miraflores hacia Surco en la tarde te consume 40 minutos de ida y 40 de vuelta, y cuando llegas al gym ya gastaste más energía en el tráfico que en el entrenamiento. Muchos trainers de Lima trabajan a domicilio llevando su propio equipamiento: bandas, kettlebells, TRX, colchonetas. Para sesiones de movilidad, fuerza funcional o acondicionamiento sin barra, funciona perfectamente. El suplemento por desplazamiento suele ser S/. 15-30, que sale más barato que la gasolina o el taxi de ida y vuelta.

En cuanto a precios, una sesión de 60 minutos con un trainer competente en Lima está entre S/. 70 y S/. 150. Los coaches con más trayectoria y certificaciones internacionales NASM o NSCA en distritos como Miraflores o San Isidro pueden pedir hasta S/. 200, sobre todo si el paquete incluye programa personalizado y seguimiento por WhatsApp. Los packs de 8 o 12 sesiones mensuales generalmente tienen descuento del 10 al 20%, y es la forma más inteligente de trabajar porque el trainer puede hacer una planificación real semana a semana.

Para los que entrenan en el exterior, Lima tiene espacios bacanes: el malecón de Miraflores y Barranco, el Parque El Olivar en San Isidro, el Parque Kennedy, la Costa Verde. Yo he visto sesiones increíbles en la Costa Verde al atardecer, con el Pacífico de fondo — eso es algo que en una ciudad sin costa no tienes. En verano (diciembre a marzo) el clima es ideal para entrenar afuera: 27-30 grados, sol, ambiente playero. En invierno con la garúa ya es otro cuento, pero los trainers que trabajan en exteriores se adaptan o te proponen interiores.

Lo que te recomiendo antes de contratar cualquier trainer: pide una sesión de diagnóstico o prueba, que la mayoría ofrece gratis o a precio reducido. Fíjate si te hace evaluación de movimiento, si te pregunta sobre tu historial de lesiones, si tiene un plan claro para lo que quieres lograr. Si en la primera sesión ya te está poniendo a levantar peso máximo sin evaluarte antes, huye. Un buen coach entra despacio, observa, y construye desde ahí.`,
    faq: [
      { q: '¿Cuánto cobra un entrenador personal en Lima?', a: 'Una sesión de 60 minutos cuesta entre S/. 50 y S/. 150. Trainers senior con certificaciones internacionales en Miraflores o San Isidro pueden llegar a S/. 200/sesión. Los packs de 8 o 12 sesiones mensuales ofrecen descuentos del 10-20%.' },
      { q: '¿Los entrenadores personales en Lima trabajan a domicilio?', a: 'Sí. Es un servicio muy extendido en Lima, especialmente en Miraflores, San Isidro, Surco y La Molina. Los trainers llevan su propio equipamiento portátil (bandas, kettlebells, TRX). Suelen cobrar un suplemento de S/. 10-30 por desplazamiento.' },
      { q: '¿Qué certificaciones tienen los entrenadores personales en Lima?', a: 'Los más reconocidos tienen licenciaturas en ciencias del deporte o educación física de universidades peruanas, complementadas con certificaciones internacionales NASM, ACE, NSCA o ACSM. Muchos también tienen especialización en nutrición deportiva, kinesiología o fisioterapia preventiva.' },
      { q: '¿Puedo encontrar entrenadores especializados en adultos mayores en Lima?', a: 'Sí. En GymLima.com puedes filtrar por especialidad. Lima cuenta con trainers certificados en trabajo con adultos mayores, personas con diabetes, osteoporosis o lesiones musculares. La kinesiología deportiva tiene mucha presencia en distritos como San Borja y Jesús María.' },
      { q: '¿Dónde suelen trabajar los entrenadores personales al aire libre en Lima?', a: 'Los espacios más populares son el Parque Kennedy y el malecón de Miraflores, el Parque El Olivar en San Isidro, los senderos de la Costa Verde y el Parque Sinchi Roca en Comas. El clima templado de Lima permite entrenar al aire libre casi todo el año.' },
    ],
  },
  eventos: {
    h1: 'Eventos fitness en Lima',
    intro: `Lima tiene una escena de eventos deportivos que te puede sorprender si no la conoces. No es solo maratones y gym — hay surf, vóleibol de playa, CrossFit, obstacle racing, y toda una vida deportiva que gira en torno a los 22 kilómetros de litoral que tenemos. Yo vivo eso de primera mano, así que te cuento lo que hay y lo que vale la pena.

La Maratón Lima 42K es el evento de running más grande del país, y lo digo habiendo participado en la modalidad de 10K un par de veces. Más de 15.000 personas, el recorrido pasa por el malecón de Miraflores con vista al Pacífico, baja por la Costa Verde y sube por San Isidro y Barranco. Se corre en agosto, que es perfecto porque el clima en invierno limeño es fresco y sin lluvia — esa garúa fina que tenemos no molesta tanto al correr. El ambiente es bacán, la gente sale a animar en el malecón, y si vives por Miraflores literalmente corres por tu barrio. Lo que sí: la inscripción se llena rápido, así que hay que estar pendiente desde que abre el registro, meses antes.

Los CrossFit Lima Games son mi evento favorito del año, sin dudarlo. Lo he seguido desde espectadora y una vez participé en la categoría scaled, que fue una experiencia intensa pero que recomiendo a cualquiera que lleve al menos seis meses en el CrossFit serio. Vienen atletas de Chile, Ecuador, Colombia, Bolivia — es un clasificatorio regional para los CrossFit Open — y el nivel es alto. Lo que más me gusta es la energía: la comunidad CrossFit limeña es vocal, apoya fuerte, y ver lifts pesados y movimientos gimnásticos de primer nivel en un evento local es inspirador. Si compites o quieres ver de qué va el CrossFit de verdad, anota esta fecha en el calendario.

El Spartan Race Perú lleva varios años en Lima y sus alrededores, y es un evento que mezcla running con obstáculos que exigen fuerza real: cuerdas, muros, arrastres, barro. He ido como espectadora y como participante al Sprint (5 km, unos 20 obstáculos) y es un buen test de si tu acondicionamiento físico es funcional o solo estético. Los circuitos aprovechan las quebradas y playas del litoral — hay ediciones en Lurín y en las afueras de Lima que tienen un setting impresionante con el Pacífico al fondo. Para alguien que mezcla CrossFit con surf, es el tipo de evento donde la preparación que haces en el box se prueba en la realidad.

Luego están los eventos de playa, que son mi mundo natural. Los torneos de vóleibol en la Costa Verde, las competencias de surf en Punta Hermosa y La Herradura, los torneos de longboard en Waikiki — eso es Lima deportiva de verdad, pe. Las competencias de surf en Punta Hermosa son las más importantes del país; he ido varias veces a verlas y el nivel de los surfistas peruanos es impresionante. En verano la Costa Verde se llena de vida: la Municipalidad organiza ciclovías dominicales, eventos de activación física, clases masivas de yoga y zumba en la playa. Ese circuito de enero a marzo es gratis, masivo, y es la mejor cara del deporte popular en Lima.

Para mí, el calendario deportivo de Lima tiene un ritmo claro: verano (diciembre-marzo) para los eventos de playa y surf; invierno (junio-agosto) para running y obstacle racing, que aprovechan el frío seco. CrossFit Lima Games suele caer en el primer semestre. Si quieres participar en algo, planifica con meses de anticipación porque las inscripciones se llenan y el tráfico para llegar a los eventos puede ser un factor real — especialmente si el evento es en Lurín o Punta Hermosa, que está a 45 minutos de Miraflores sin tráfico, y con tráfico de fin de semana puede ser más de una hora.

La escena de eventos en Lima es genuina y crece cada año. No es una agenda artificial: detrás hay comunidades de runners en Strava, grupos de surf, comunidades CrossFit que se organizan solos en WhatsApp y Facebook. Eso hace que los eventos tengan energía real, no solo marketing de marca.`,
    faq: [
      { q: '¿Cuándo es la Maratón Lima 42K?', a: 'La Maratón Lima 42K se celebra habitualmente en agosto, durante el invierno limeño. Ofrece modalidades de 42 km, 21 km, 10 km y 5 km familiar. El recorrido incluye el malecón de Miraflores y la Costa Verde. El registro suele abrirse con 4-5 meses de antelación.' },
      { q: '¿Qué es el CrossFit Lima Games?', a: 'Es la competencia de fitness funcional más importante del Perú. Se celebra anualmente e incluye levantamiento olímpico, movimientos gimnásticos y acondicionamiento metabólico. Sirve como clasificatorio regional para los CrossFit Open mundiales y convoca atletas de toda la región andina.' },
      { q: '¿Hay carreras de obstáculos en Lima?', a: 'Sí. Spartan Race Perú organiza en Lima varias fechas al año de sus formatos Sprint (5 km) y Super (13 km). Los circuitos aprovechan las quebradas y playas del litoral limeño. También hay eventos locales de obstacle racing organizados por comunidades de CrossFit.' },
      { q: '¿Dónde puedo hacer running en Lima?', a: 'Los circuitos más populares son el malecón de Miraflores (6 km de vista al mar), el circuito de la Costa Verde, el Parque El Olivar en San Isidro y el Parque Reducto en Miraflores. En verano, el Circuito de Playas entre Barranco y Chorrillos es el favorito de los runners limeños.' },
      { q: '¿Cómo me entero de los próximos eventos fitness en Lima?', a: 'GymLima.com mantiene un calendario actualizado de eventos. También puedes seguir comunidades de running y CrossFit en Facebook, Instagram y grupos de Strava. La Municipalidad Metropolitana de Lima publica su agenda deportiva en su sitio web oficial.' },
    ],
  },
  bienestar: {
    h1: 'Bienestar en Lima',
    intro: `El bienestar para mí no es spa ni velas aromáticas — aunque también, pe. Es poder entrenar fuerte, recuperarme bien, comer con inteligencia y mantener el cuerpo funcionando para lo que me gusta: surfear en verano, hacer CrossFit todo el año, y no terminar lesionada en el proceso. Lima tiene recursos reales para eso, algunos de los mejores que he encontrado, y te cuento cuáles uso y por qué.

Lo más importante en mi rutina de bienestar es la kinesiología. Tengo una kinesióloga en San Isidro a la que voy después de sesiones de surf intensas, especialmente cuando noto tensión en el hombro derecho — el paddling sobrecarga mucho el manguito rotador si no tienes buen acondicionamiento. San Isidro y San Borja concentran las mejores clínicas de kinesiología deportiva de Lima: equipos modernos, kinesiólogos que conocen el deporte y trabajan en coordinación con traumatólogos. No es barato — entre S/. 80 y S/. 150 por sesión dependiendo del tratamiento — pero me parece la inversión más inteligente que hago. Una lesión de hombro no atendida puede sacarte del agua por meses.

El tema de ir a San Isidro desde Miraflores en horario laboral es algo que hay que planificar. Por la mañana, antes de las 8am, el trayecto es de 10 minutos. A mediodía puede subir a 20-25 minutos. En la tarde entre las 5 y las 7pm, ese mismo trayecto puede ser 35-40 minutos fácil. Así que si puedo, agendo las sesiones en la mañana temprano. Para alguien que vive en Barranco y quiere ir a un kinesiólogo en San Borja, que calcule bien los horarios porque el tráfico en ese eje puede ser frustrante.

La nutrición es donde Lima tiene una ventaja brutal que mucha gente no aprovecha. Tenemos acceso a superalimentos andinos que en el resto del mundo son caros y difíciles de conseguir: quinoa, kiwicha, maca, camu camu, chía, moringa. En el mercado de Surquillo o el Mercado Central los encuentras frescos y baratos. Trabajo con una nutricionista deportiva que me ayudó a estructurar la alimentación para el surf y el CrossFit — más proteína de calidad, carbohidratos estratégicos alrededor del entrenamiento, y un uso inteligente de los superalimentos locales. La gastronomía limeña también ayuda: comer rico y nutritivo en Lima es fácil si sabes qué pedir, desde ceviche con leche de tigre hasta sopas de quinoa. No hay excusa para comer mal acá.

Para la recuperación post-CrossFit, empecé a usar masaje de tejido profundo después de cycles de fuerza intensos. Hay centros en Miraflores y San Isidro que ofrecen masaje deportivo, crioterapia localizada y compresión neumática — lo que los atletas de alto rendimiento usan para acelerar la recuperación. No tienes que ser atleta de élite para beneficiarte: si haces WODs pesados cuatro o cinco veces por semana y además surfeas en verano, tu cuerpo agradece una sesión de recuperación cada dos semanas. Los precios están entre S/. 80 y S/. 250 según el tratamiento.

El yoga lo uso como herramienta de recuperación activa, no como deporte principal. Hay estudios cerca del malecón en Miraflores que hacen clases de mañana temprano, antes del tráfico y antes de que la ciudad empiece a moverse. Eso es un ritual que vale la pena: una hora de movilidad y respiración con brisa del Pacífico de fondo, antes de meterte al caos limeño del día. En Barranco también hay centros con onda más meditativa si buscas algo más tranquilo y a precios un poco más accesibles.

En resumen, el ecosistema de bienestar en Lima es sólido si sabes usarlo. Mi stack personal: kinesiología preventiva después de surf intenso, masaje deportivo cada dos semanas en temporada alta de entrenamiento, nutricionista para ajustes de plan cada temporada, y yoga de mañana como recovery. No necesitas hacer todo al mismo tiempo ni gastar una fortuna — empieza por lo que más necesita tu cuerpo ahora mismo.`,
    faq: [
      { q: '¿Qué es la kinesiología y dónde encontrarla en Lima?', a: 'La kinesiología es la disciplina del movimiento que trabaja tanto en rehabilitación de lesiones como en mejora del rendimiento deportivo. En Lima, los mejores centros de kinesiología están en San Borja, Jesús María y San Isidro. Trabajan en equipo con traumatólogos y médicos deportivos.' },
      { q: '¿Hay nutricionistas especializados en deporte en Lima?', a: 'Sí. Lima cuenta con numerosos nutricionistas deportivos que trabajan tanto en clínicas como de forma independiente. Muchos están certificados por universidades como la UNMSM o la PUCP y tienen experiencia con atletas de CrossFit, running, natación y culturismo. Los precios oscilan entre S/. 80 y S/. 200 por consulta.' },
      { q: '¿Qué tratamientos de recuperación muscular están disponibles en Lima?', a: 'Los centros de Lima ofrecen crioterapia localizada, baños de hielo, masaje de tejido profundo, electro-estimulación muscular (EMS), compresión neumática y magnetoterapia. Están disponibles principalmente en Miraflores y San Isidro, con precios entre S/. 80 y S/. 250 por sesión.' },
      { q: '¿Dónde practicar yoga y meditación en Lima?', a: 'Miraflores, Barranco y San Isidro tienen la mayor concentración de centros de yoga y meditación. Se enseñan tradiciones como Hatha, Ashtanga, Iyengar, Kundalini y Vinyasa. También hay centros de mindfulness y meditación Vipassana en Jesús María y Pueblo Libre.' },
      { q: '¿Lima ofrece retiros de bienestar cerca de la ciudad?', a: 'Sí. Los destinos más populares son Cieneguilla (a 40 minutos), con ecolodges que ofrecen retiros de yoga y meditación, y Lunahuaná (3 horas), conocida por sus deportes de aventura y su tranquilidad. Algunos centros de Miraflores organizan retiros de fin de semana con transporte incluido.' },
    ],
  },
}

export const staticPageContent = {
  sobreNosotros: {
    title: 'Sobre nosotros',
    h1: '¿Quiénes somos?',
    body: `GymLima.com es el directorio de referencia para encontrar gimnasios, estudios fitness, entrenadores personales y centros de bienestar en Lima Metropolitana.\n\nNació de una necesidad real: encontrar un buen lugar para entrenar en Lima no debería ser complicado. Con más de 850 establecimientos distribuidos en sus distritos, la oferta es amplia pero difícil de navegar. GymLima.com organiza esa información para que puedas tomar la mejor decisión en segundos.\n\nNuestra misión es conectar a los limeños con el lugar ideal para moverse, entrenar y cuidarse, sin importar su distrito, presupuesto u objetivo fitness.`,
  },
  agregarNegocio: {
    title: 'Agregar negocio',
    h1: 'Agrega tu gimnasio o estudio gratis',
    body: `¿Tienes un gimnasio, estudio fitness, entrenador personal o centro de bienestar en Lima? Aparece en GymLima.com de forma completamente gratuita.\n\nMiles de limeños usan nuestra plataforma cada mes para buscar lugares donde entrenar. Un perfil completo puede significar nuevos clientes directamente a tu puerta.`,
  },
  faqPage: {
    title: 'Preguntas frecuentes',
    h1: 'Preguntas frecuentes sobre GymLima.com',
    items: [
      { q: '¿GymLima.com es gratuito?', a: 'Sí, buscar y explorar el directorio es completamente gratuito.' },
      { q: '¿Cómo se seleccionan los negocios?', a: 'A través de fuentes públicas verificadas, registro voluntario o reporte de la comunidad. Todos los perfiles son revisados.' },
      { q: '¿Puedo dejar una reseña?', a: 'Sí, en cada perfil encontrarás un formulario para dejar tu opinión, moderada para garantizar su autenticidad.' },
      { q: '¿Con qué frecuencia se actualiza la información?', a: 'El directorio se actualiza continuamente. Puedes reportar información incorrecta desde la página del establecimiento.' },
      { q: '¿Tienen app móvil?', a: 'Por ahora está optimizado para móvil a través del navegador. Una app nativa está en nuestros planes.' },
    ],
  },
  contacto: {
    title: 'Contacto',
    h1: '¿Tienes alguna pregunta?',
    body: `Estamos aquí para ayudarte. Si tienes dudas sobre el directorio o quieres ponerte en contacto con el equipo de GymLima.com, escríbenos.`,
    email: 'hola@gymlima.com',
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
  { slug: 'gimnasios',    label: 'Gimnasios',    icon: '🏋️', count: 850,  description: 'Gimnasios en Lima' },
  { slug: 'estudios',     label: 'Estudios',     icon: '🧘', count: 212,  description: 'Estudios fitness en Lima' },
  { slug: 'entrenadores', label: 'Entrenadores', icon: '🚶', count: 294,  description: 'Entrenadores personales en Lima' },
  { slug: 'eventos',      label: 'Eventos',      icon: '📅', count: 132,  description: 'Eventos fitness en Lima' },
  { slug: 'bienestar',    label: 'Bienestar',    icon: '🌿', count: 167,  description: 'Bienestar en Lima' },
] as const
