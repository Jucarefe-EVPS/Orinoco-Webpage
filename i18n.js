// Bilingual content + reveal/scroll utilities
window.ORINOCO = window.ORINOCO || {};

// ---------- Copy bilingüe ----------
ORINOCO.copy = {
  es: {
    nav: { destinations:"Destinos", services:"Servicios", journeys:"Itinerarios", about:"Nosotros", contact:"Contacto" },
    hero: {
      eyebrow: "Destination Management Company · Venezuela",
      slogan_l1: "Venezuela,",
      slogan_l2: "en su forma",
      slogan_l3: "más íntima.",
      sub: "Curamos viajes para los que buscan el país antes que la postal.",
      cta: "Conoce nuestros itinerarios"
    },
    about: {
      eyebrow: "Quiénes somos",
      title_l1: "Un DMC que abre",
      title_l2: "Venezuela como",
      title_l3: "se abre un libro.",
      body: "Orinoco DMC es una compañía de gestión de destino fundada para conectar a viajeros, agencias y operadores con la Venezuela real: la del Salto Ángel y la de los pueblos del Delta, la de los tepuyes y la de los Llanos. Operamos desde dentro, con red local, logística probada y obsesión por el detalle. Cada viaje se diseña a mano, persona por persona.",
      cta: "Sobre Orinoco"
    },
    services: {
      eyebrow: "Servicios",
      title: "Diseñados para tres formas de viajar.",
      list: [
        { id:"FITs", name:"FITs", desc:"Viajeros independientes que quieren itinerarios a medida, guías privados y acceso a experiencias que no están en catálogo." },
        { id:"Groups", name:"Grupos", desc:"Programas para grupos pequeños y medianos: definición de ruta, logística punto a punto, y un equipo coordinador en terreno." },
        { id:"MICE", name:"M.I.C.E.", desc:"Meetings, incentivos, congresos y eventos. Sedes singulares, producción local y gestión integral de la experiencia." }
      ]
    },
    why: {
      eyebrow: "Por qué Venezuela",
      title_l1: "Un país que cabe",
      title_l2: "muchos países dentro.",
      stats: [
        { n:"43", l:"Parques nacionales en una superficie del tamaño de Francia y España juntas." },
        { n:"1,417", l:"Especies de aves registradas. Solo Colombia tiene más en todo el continente." },
        { n:"979", l:"Metros de caída del Salto Ángel, la cascada más alta del mundo." },
        { n:"9", l:"Ecosistemas distintos: del Caribe al Amazonas, del páramo al Llano." }
      ]
    },
    destinations: {
      eyebrow: "Destinos",
      title_l1: "Trece lugares,",
      title_l2: "trece formas de país.",
      sub: "Una selección curada de los enclaves que mejor explican Venezuela. Cada uno se opera con guías locales y red propia.",
      list: [
        { n:"01", name:"Salto Ángel", region:"Canaima, Bolívar", note:"La caída de agua más alta del mundo, sólo accesible por avioneta y curiara." },
        { n:"02", name:"Monte Roraima", region:"Gran Sabana", note:"El tepuy que inspiró 'El mundo perdido'. Trekking de 6 días por meseta prehistórica." },
        { n:"03", name:"Gran Sabana", region:"Sureste de Venezuela", note:"Una sabana sin árboles puntuada por tepuyes, ríos rojos y comunidades pemones." },
        { n:"04", name:"Los Llanos", region:"Apure / Barinas", role:"Safari", note:"Capibaras, anacondas, caimanes y miles de aves a caballo o en lancha." },
        { n:"05", name:"Delta del Orinoco", region:"Estado Delta Amacuro", note:"Una red de caños donde vive el pueblo Warao. Posadas sobre el agua." },
        { n:"06", name:"Choroní", region:"Costa Aragua", note:"Pueblo colonial entre selva y mar, tambores afrovenezolanos los fines de semana." },
        { n:"07", name:"Mochima", region:"Anzoátegui / Sucre", note:"Archipiélago de islas y bahías. Snorkel, pesca y posadas familiares." },
        { n:"08", name:"Médanos de Coro", region:"Estado Falcón", note:"Dunas de hasta 40 m a minutos del Caribe. La Venezuela inesperada." },
        { n:"09", name:"Mérida y los Andes", region:"Cordillera de Mérida", note:"El teleférico más alto y largo del mundo, páramos y café de altura." },
        { n:"10", name:"Los Roques", region:"Mar Caribe", note:"Archipiélago coralino de 50 cayos. Aguas turquesa, posadas en Gran Roque." },
        { n:"11", name:"Margarita", region:"Nueva Esparta", note:"Isla con dos caras: la histórica y la del Caribe abierto. Castillos del XVII." },
        { n:"12", name:"Río Caura", region:"Bolívar", note:"La cuenca de selva primaria más intacta del país. Comunidades Ye'kwana." },
        { n:"13", name:"P.N. Henri Pittier", region:"Estado Aragua", note:"Selva nublada con uno de los corredores migratorios de aves más densos del planeta." }
      ]
    },
    inspired: {
      eyebrow: "Get Inspired",
      title_l1: "Itinerarios",
      title_l2: "para empezar a imaginar.",
      sub: "Plantillas que rediseñamos contigo. Un punto de partida, no una jaula.",
      list: [
        { id:"gabo", name:"In the footsteps of Gabo", days:"10 días", path:"Caracas · Aracataca cultural · Costa Aragua", note:"Un viaje literario por los lugares que cruzaron García Márquez y la Venezuela de los años 50." },
        { id:"wildlife", name:"Wildlife Wonders", days:"12 días", path:"Llanos · Río Caura · Delta del Orinoco", note:"Tres ecosistemas, un mismo país. Capibara, jaguar avistable, aves endémicas." },
        { id:"lost", name:"The Lost World", days:"9 días", path:"Canaima · Salto Ángel · Roraima", note:"Tepuyes, cascadas y la meseta que inspiró a Conan Doyle. Trekking moderado." },
        { id:"andes", name:"Andes & Coast", days:"11 días", path:"Mérida · Choroní · Mochima", note:"De los páramos a 4.000 m al Caribe afrovenezolano en una semana y media." },
        { id:"indigenous", name:"Indigenous Heritage", days:"8 días", path:"Pemón (Gran Sabana) · Warao (Delta) · Ye'kwana (Caura)", note:"Tres pueblos originarios, en sus territorios y sus términos." }
      ]
    },
    contact: {
      eyebrow: "Empieza el viaje",
      title_l1: "Cuéntanos qué",
      title_l2: "Venezuela buscas.",
      sub: "Respondemos en 24 horas hábiles. Atendemos a agencias, operadores y viajeros directos.",
      placeholder_name:"Nombre",
      placeholder_company:"Compañía / agencia (opcional)",
      placeholder_message:"Cuéntanos en qué piensas",
      cta:"Enviar mensaje"
    },
    footer: {
      tag:"Venezuela, en su forma más íntima.",
      contact:"Contacto",
      explore:"Explora",
      legal:"Legal",
      address:"Av. Francisco de Miranda · Caracas",
      rights:"© 2026 Orinoco DMC · Todos los derechos reservados"
    }
  },

  en: {
    nav: { destinations:"Destinations", services:"Services", journeys:"Journeys", about:"About", contact:"Contact" },
    hero: {
      eyebrow: "Destination Management Company · Venezuela",
      slogan_l1: "Venezuela,",
      slogan_l2: "in its most",
      slogan_l3: "intimate form.",
      sub: "We craft travel for those who want the country before the postcard.",
      cta: "See our journeys"
    },
    about: {
      eyebrow: "Who we are",
      title_l1: "A DMC that opens",
      title_l2: "Venezuela the way",
      title_l3: "you open a book.",
      body: "Orinoco DMC is a destination management company built to connect travelers, agencies and tour operators with the real Venezuela: the one of Angel Falls and the one of the Delta villages, the tepuis and the savannahs. We operate from the inside — local network, proven logistics, obsessive attention to detail. Every trip is designed by hand, person by person.",
      cta: "About Orinoco"
    },
    services: {
      eyebrow: "Services",
      title: "Designed for three ways of traveling.",
      list: [
        { id:"FITs", name:"FITs", desc:"Independent travelers seeking tailor-made itineraries, private guides and access to experiences that aren't in any catalogue." },
        { id:"Groups", name:"Groups", desc:"Programs for small and mid-size groups: route design, end-to-end logistics, and a coordinating team on the ground." },
        { id:"MICE", name:"M.I.C.E.", desc:"Meetings, incentives, conferences and events. Singular venues, local production, full experience management." }
      ]
    },
    why: {
      eyebrow: "Why Venezuela",
      title_l1: "A country that holds",
      title_l2: "many countries inside.",
      stats: [
        { n:"43", l:"National parks across a territory the size of France and Spain combined." },
        { n:"1,417", l:"Recorded bird species. Only Colombia tops it across the entire continent." },
        { n:"979", l:"Meters of free fall at Angel Falls, the world's tallest waterfall." },
        { n:"9", l:"Distinct ecosystems: from the Caribbean to the Amazon, from páramo to plains." }
      ]
    },
    destinations: {
      eyebrow: "Destinations",
      title_l1: "Thirteen places,",
      title_l2: "thirteen versions of a country.",
      sub: "A curated selection of the locations that best explain Venezuela. Each one is operated with local guides and our own ground network.",
      list: [
        { n:"01", name:"Angel Falls", region:"Canaima, Bolívar", note:"The world's highest waterfall — only reachable by light aircraft and dugout canoe." },
        { n:"02", name:"Mt. Roraima", region:"Gran Sabana", note:"The tepui that inspired 'The Lost World'. A six-day trek across a prehistoric plateau." },
        { n:"03", name:"Gran Sabana", region:"Southeastern Venezuela", note:"A treeless savannah punctuated by tepuis, red rivers and Pemón communities." },
        { n:"04", name:"Los Llanos", region:"Apure / Barinas", role:"Safari", note:"Capybaras, anacondas, caimans and thousands of birds — by horseback or boat." },
        { n:"05", name:"Orinoco Delta", region:"Delta Amacuro", note:"A web of waterways home to the Warao people. Stilt lodges over the river." },
        { n:"06", name:"Choroní", region:"Aragua coast", note:"A colonial town wedged between jungle and sea. Afro-Venezuelan drums on weekends." },
        { n:"07", name:"Mochima", region:"Anzoátegui / Sucre", note:"An archipelago of islets and bays. Snorkeling, fishing, family-run posadas." },
        { n:"08", name:"Coro Dunes", region:"Falcón State", note:"Dunes up to 40 m, minutes from the Caribbean. The unexpected Venezuela." },
        { n:"09", name:"Mérida & the Andes", region:"Cordillera de Mérida", note:"The world's highest, longest cable car, páramo plateaus and high-altitude coffee." },
        { n:"10", name:"Los Roques", region:"Caribbean Sea", note:"A coral archipelago of 50 cays. Turquoise waters, posadas on Gran Roque." },
        { n:"11", name:"Margarita Island", region:"Nueva Esparta", note:"An island with two faces: the historic one and the open Caribbean. 17th-c. forts." },
        { n:"12", name:"Caura River", region:"Bolívar", note:"The most intact primary-forest watershed in the country. Ye'kwana communities." },
        { n:"13", name:"Henri Pittier N.P.", region:"Aragua State", note:"Cloud forest with one of the densest bird-migration corridors on the planet." }
      ]
    },
    inspired: {
      eyebrow: "Get Inspired",
      title_l1: "Journeys",
      title_l2: "to begin imagining.",
      sub: "Templates we rebuild with you. A starting point — never a cage.",
      list: [
        { id:"gabo", name:"In the footsteps of Gabo", days:"10 days", path:"Caracas · Aragua coast · Cultural pilgrimage", note:"A literary trail through the places that crossed García Márquez and the Venezuela of the 50s." },
        { id:"wildlife", name:"Wildlife Wonders", days:"12 days", path:"Llanos · Caura River · Orinoco Delta", note:"Three ecosystems, one country. Capybara, jaguar sightings, endemic birdlife." },
        { id:"lost", name:"The Lost World", days:"9 days", path:"Canaima · Angel Falls · Roraima", note:"Tepuis, waterfalls and the plateau that inspired Conan Doyle. Moderate trekking." },
        { id:"andes", name:"Andes & Coast", days:"11 days", path:"Mérida · Choroní · Mochima", note:"From the 4,000 m páramos to the Afro-Venezuelan Caribbean in ten days." },
        { id:"indigenous", name:"Indigenous Heritage", days:"8 days", path:"Pemón (Gran Sabana) · Warao (Delta) · Ye'kwana (Caura)", note:"Three indigenous peoples, on their territories and on their terms." }
      ]
    },
    contact: {
      eyebrow: "Begin the journey",
      title_l1: "Tell us what",
      title_l2: "Venezuela you're after.",
      sub: "We reply within 24 business hours. We work with agencies, operators and direct travelers.",
      placeholder_name:"Name",
      placeholder_company:"Company / agency (optional)",
      placeholder_message:"Tell us what you're thinking",
      cta:"Send message"
    },
    footer: {
      tag:"Venezuela, in its most intimate form.",
      contact:"Contact",
      explore:"Explore",
      legal:"Legal",
      address:"Av. Francisco de Miranda · Caracas",
      rights:"© 2026 Orinoco DMC · All rights reserved"
    }
  }
};

// ---------- i18n engine ----------
ORINOCO.lang = localStorage.getItem('orinoco_lang') || 'es';
ORINOCO.setLang = function(l){
  ORINOCO.lang = l;
  localStorage.setItem('orinoco_lang', l);
  document.documentElement.lang = l;
  ORINOCO.render && ORINOCO.render();
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang===l);
  });
};

// helper: replace text nodes via data-i18n="hero.slogan_l1"
ORINOCO.applyDataI18n = function(){
  const dict = ORINOCO.copy[ORINOCO.lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const path = el.dataset.i18n.split('.');
    let v = dict;
    for(const k of path){ v = v?.[k]; }
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const path = el.dataset.i18nPlaceholder.split('.');
    let v = dict;
    for(const k of path){ v = v?.[k]; }
    if (typeof v === 'string') el.placeholder = v;
  });
};

// ---------- Reveal observer ----------
ORINOCO.initReveal = function(){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.12, rootMargin:"0px 0px -10% 0px" });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
};

// ---------- Cinematic intro mask ----------
ORINOCO.playIntro = function(){
  const m = document.querySelector('.intro-mask');
  if(!m) return;
  setTimeout(()=>m.classList.add('gone'), 1100);
  setTimeout(()=>m.remove(), 2600);
};

// ---------- Custom cursor ----------
ORINOCO.initCursor = function(){
  if (matchMedia('(pointer:coarse)').matches) return;
  document.body.classList.add('cursor-on');
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);
  let x=0,y=0,tx=0,ty=0;
  addEventListener('mousemove',e=>{ tx=e.clientX; ty=e.clientY });
  function tick(){ x+=(tx-x)*.22; y+=(ty-y)*.22; dot.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`; requestAnimationFrame(tick); }
  tick();
  document.querySelectorAll('a,button,.hoverable').forEach(el=>{
    el.addEventListener('mouseenter',()=>dot.classList.add('hover'));
    el.addEventListener('mouseleave',()=>dot.classList.remove('hover'));
  });
};

// ---------- Marquee builder ----------
ORINOCO.duplicateMarquee = function(){
  document.querySelectorAll('.marquee-track[data-dup]').forEach(t=>{
    t.innerHTML = t.innerHTML + t.innerHTML;
  });
};

// ---------- Stat counter ----------
ORINOCO.initStatCounters = function(){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target.replace(/,/g,''));
      const dec = (el.dataset.target.match(/,/g)||[]).length;
      const dur = 1800; const start = performance.now();
      function step(t){
        const p = Math.min(1,(t-start)/dur);
        const eased = 1-Math.pow(1-p,3);
        const v = Math.floor(eased*target);
        el.textContent = dec ? v.toLocaleString('en-US') : v.toString();
        if(p<1) requestAnimationFrame(step);
        else el.textContent = el.dataset.target;
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  },{threshold:.4});
  document.querySelectorAll('[data-counter]').forEach(el=>io.observe(el));
};
