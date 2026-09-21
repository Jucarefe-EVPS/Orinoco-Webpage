const commons = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`

export const services = [
  {
    id: 'fits',
    num: '01',
    image: commons('Kukenan Tepuy at Sunset.jpg'),
    focus: 'center 48%',
    name: { es: 'FITs y Leisure', en: 'FITs and Leisure' },
    desc: {
      es: 'Desde viajes a la medida hasta programas listos para operar y salidas programadas, Orinoco DMC crea experiencias de viaje diseñadas en torno a los intereses, el ritmo, el presupuesto y el estilo de cada viajero. Ya sea que busquen naturaleza, cultura, aventura o encuentros locales significativos, nuestros programas combinan autenticidad, comodidad y una logística impecable, creando conexiones genuinas con los paisajes, las culturas y las personas que hacen única a Venezuela.',
      en: 'From tailor-made journeys to ready-to-operate programs and scheduled departures, Orinoco DMC creates travel experiences designed around each traveler’s interests, pace, budget, and travel style. Whether seeking nature, culture, adventure, or meaningful local encounters, our programs combine authenticity, comfort, and seamless logistics, creating genuine connections with the landscapes, cultures, and people that make Venezuela unique.',
    },
    meta: [
      { label: { es: 'TAILOR-MADE', en: 'TAILOR-MADE' }, strong: true },
      { label: { es: 'DESDE 7 DÍAS', en: 'FROM 7 DAYS' } },
      { label: { es: '1–6 PAX', en: '1–6 PAX' } },
      { label: { es: 'GUÍAS PRIVADOS', en: 'PRIVATE GUIDES' } },
    ],
  },
  {
    id: 'groups',
    num: '02',
    image: commons('Andes mountains panoramic view.jpg'),
    focus: 'center 48%',
    name: { es: 'Groups', en: 'Groups' },
    desc: {
      es: 'Desde programas grupales a la medida hasta series garantizadas y salidas con fechas fijas, Orinoco DMC crea experiencias de viaje impecables diseñadas en torno a los objetivos, el perfil y las expectativas de cada grupo. Ya sea para viajes educativos, culturales, religiosos, académicos o de intereses especiales, nuestros programas combinan servicio personalizado, planificación experta y conocimiento local de confianza. Más que simplemente organizar viajes, creamos experiencias que unen a las personas, inspiran conexiones significativas y dejan recuerdos duraderos.',
      en: 'From tailor-made group programs to guaranteed series and fixed-date departures, Orinoco DMC creates seamless travel experiences designed around each group’s objectives, profile, and expectations. Whether for educational, cultural, religious, academic, or special interest travel, our programs combine personalized service, expert planning, and trusted local expertise. More than simply organizing trips, we create journeys that bring people together, inspire meaningful connections, and leave lasting memories.',
    },
    meta: [
      { label: { es: 'GROUPS', en: 'GROUPS' }, strong: true },
      { label: { es: 'DESDE 5 DÍAS', en: 'FROM 5 DAYS' } },
      { label: { es: '8–24 PAX', en: '8–24 PAX' } },
      { label: { es: 'COORDINADOR EN CAMPO', en: 'FIELD COORDINATOR' } },
    ],
  },
  {
    id: 'mice',
    num: '03',
    image: commons('Teatro Municipal de Caracas.jpg'),
    focus: 'center 54%',
    name: { es: 'M.I.C.E.', en: 'M.I.C.E.' },
    desc: {
      es: 'En Orinoco DMC creamos experiencias corporativas que van más allá de la logística y la gestión de eventos. Desde programas de incentivos y retiros ejecutivos hasta conferencias, reuniones y eventos especiales, diseñamos soluciones a la medida que reflejan los objetivos y la cultura de cada cliente. Al combinar conocimiento local, creatividad y una coordinación impecable, transformamos los encuentros de negocios en experiencias significativas que fomentan la participación, fortalecen relaciones e inspiran nuevas perspectivas. Cada detalle se coordina cuidadosamente para que los participantes puedan enfocarse en lo más importante: crear conexiones, celebrar logros y construir recuerdos duraderos.',
      en: 'At Orinoco DMC, we create corporate experiences that go beyond logistics and event management. From incentive programs and executive retreats to conferences, meetings, and special events, we design tailored solutions that reflect each client’s objectives and company culture. By combining local expertise, creativity, and seamless coordination, we transform business gatherings into meaningful experiences that foster engagement, strengthen relationships, and inspire new perspectives. Every detail is carefully orchestrated so participants can focus on what matters most: building connections, celebrating success, and creating lasting memories.',
    },
    meta: [
      { label: { es: 'CORPORATE', en: 'CORPORATE' }, strong: true },
      { label: { es: '50+ PAX', en: '50+ PAX' } },
      { label: { es: 'VENUE SOURCING', en: 'VENUE SOURCING' } },
      { label: { es: 'PRODUCCIÓN COMPLETA', en: 'FULL PRODUCTION' } },
    ],
  },
]
