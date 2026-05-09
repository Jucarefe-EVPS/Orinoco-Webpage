const commons = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`

export const services = [
  {
    id: 'fits',
    num: '01',
    image: commons('Carrao river and tepuys.jpg'),
    focus: 'center 45%',
    name: { es: 'FITs', en: 'FITs' },
    desc: {
      es: 'Viajeros independientes que buscan itinerarios a la medida, guías privados y acceso a experiencias que no están en ningún catálogo. Cada ruta se diseña a mano, persona por persona.',
      en: "Independent travelers seeking tailor-made itineraries, private guides and access to experiences that aren't in any catalogue. Each route is designed by hand.",
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
      es: 'Programas para grupos pequeños y medianos: diseño de ruta, logística end-to-end y un coordinador en terreno en cada parada.',
      en: 'Programs for small and mid-size groups: route design, end-to-end logistics, and a coordinating team on the ground at every stop.',
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
    image: commons('ISS052-E-44675 - View of Venezuela - Orinoco Delta - Barrancas del Orinoco - Isla Chivera - Isla Varadero - Isla Tortola - Isla Portuguesa - Isla Sacoroco (cropped).jpg'),
    focus: 'center 52%',
    name: { es: 'M.I.C.E.', en: 'M.I.C.E.' },
    desc: {
      es: 'Reuniones, incentivos, conferencias y eventos. Venues singulares, producción local y gestión integral de la experiencia.',
      en: 'Meetings, incentives, conferences and events. Singular venues, local production, full experience management end-to-end.',
    },
    meta: [
      { label: { es: 'CORPORATE', en: 'CORPORATE' }, strong: true },
      { label: { es: '50+ PAX', en: '50+ PAX' } },
      { label: { es: 'VENUE SOURCING', en: 'VENUE SOURCING' } },
      { label: { es: 'PRODUCCIÓN COMPLETA', en: 'FULL PRODUCTION' } },
    ],
  },
]
