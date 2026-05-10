const img = (name) => `/images/${name}`
const commons = (file) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`

export const media = {
  heroSlides: [
    {
      src: commons('Salto Angel - Cañon del Diablo.JPG'),
      title: 'Angel Falls',
      place: 'Canaima National Park',
    },
    {
      src: commons('Clear water of Cayo de Agua - Agua cristalina de Cayo de Agua.JPG'),
      title: 'Los Roques',
      place: 'Federal Dependencies',
    },
    {
      src: commons('Gran Sabana, Venezuela 01.jpg'),
      title: 'La Gran Sabana',
      place: 'Bolívar',
    },
    {
      src: commons('Casco central Santa Ana de Coro, estado Falcon, Venezuela.jpg'),
      title: 'Santa Ana de Coro',
      place: 'Falcón',
    },
    {
      src: commons('Canaima panoramic.jpg'),
      title: 'Canaima Lagoon',
      place: 'Gran Sabana',
    },
  ],
  hero: '/hero/angel-falls.jpg',
  about: '/about/choroni-coast.jpg',
  destinations: [
    img('b70b23b57c726856e15df38aa7d641a9.jpg'),
    img('55784e1d6d6a2360f48c4b8e69c14060.jpg'),
    commons('Tepuyes Ilu, Tramen y Karaurin (Gran Sabana).jpg'),
    img('c3bf99e047f661c0bf19e13c7f6a302a.jpg'),
    commons('Comunidad Warao.jpg'),
    commons('Playa Grande in Choroni.jpg'),
    commons('Mochima y su variedad de playas.jpg'),
    img('bcace9b0c257bf45095636a7929ea6f0.jpg'),
    img('eb64e1065145710979dbf780d40c78d8.jpg'),
    img('a890ae9b1fe6655726385c582bc0251f.jpg'),
    img('5378366b0f8069a87146a418cca2ce4b.jpg'),
    commons('Las Majadas.jpg'),
    commons('Chorrerón de Paraíso.jpg'),
  ],
  journeys: {
    gabo: img('ca2934e2b91430d7ee4dd0df7b37eddf.jpg'),
    wildlife: img('98d07eac12d19d9ad9ece1d4535a967d.jpg'),
    lost: img('0e20b9da622fb8e70185076cf538f921.jpg'),
    andes: img('eb64e1065145710979dbf780d40c78d8.jpg'),
    indigenous: img('f290d0e7f6bea14e33b7f29c66afb8a6.jpg'),
  },
  gallery: [
    img('0545ad6d923c5e7cb60d4648a94d5d7a.jpg'),
    img('284b6f732ddc669f0105f2f0ea983b19.jpg'),
    img('5378366b0f8069a87146a418cca2ce4b.jpg'),
    img('55a5a4b004b3d62e3ef613c00eb54472.jpg'),
    img('8db4afd2f0a60fc8cfc44d8a2f7f0d61.jpg'),
    img('9aac6dc0411415527551fb366fa208ee.jpg'),
    img('a2fb6251d4ec52600557b54d9a688ece.jpg'),
    img('e5049ad99b73fac4a9631406a0792ecc.jpg'),
    img('e52e08e6a8bc7408ff670a4b1fe3cae9.jpg'),
    img('ef057ed8544f3ce98220fb3739b8821b.jpg'),
    img('db568be0e0c7beb54a6de317e3adc09f.jpg'),
    img('ff24341ab0a6501b15f913826b9ad614.jpg'),
  ],
}
