# ORINOCO DMC — Paquete completo para Cursor

> Copia y pega TODO este archivo en el chat de Cursor. Incluye: prompt + handoff + los 3 archivos fuente (`option-1-editorial.html`, `shared.css`, `i18n.js`).

---

# Orinoco DMC — Handoff a Cursor

> **Opción elegida: 01 — Editorial Cinemascope**
> **Tipografía: DM Serif Display (display) + Geist (sans) + Geist Mono (etiquetas)**

Pega este README al chat de Cursor junto con los tres archivos de referencia:
- `option-1-editorial.html`
- `shared.css`
- `i18n.js`

---

## 1 · Stack

- **Vite + React 18** (JSX, sin TypeScript salvo que prefieras añadirlo)
- **Node 20+**
- **Framer Motion** para reveals/transiciones cinematográficas
- **react-router-dom** (solo si vas a crecer a multi-página)
- **i18n** simple via Context (no necesitas `react-i18next` para este alcance)
- **Sin Tailwind** — el sistema es editorial y se ve mejor en CSS Modules con custom properties. Si quieres Tailwind igualmente, dile a Cursor que lo migre conservando las CSS variables del `:root`.

---

## 2 · Estructura de carpetas

```
orinoco-dmc/
├─ public/
│  ├─ images/
│  │  ├─ hero/hero-canaima.jpg
│  │  ├─ about/about.jpg
│  │  ├─ destinations/01-salto-angel.jpg
│  │  ├─ destinations/02-roraima.jpg
│  │  └─ ... (13 destinos)
│  ├─ journeys/01-gabo.jpg ... (5 itinerarios)
│  └─ favicon.svg
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles/
│  │  ├─ tokens.css
│  │  └─ global.css
│  ├─ context/
│  │  └─ LangContext.jsx
│  ├─ data/
│  │  └─ copy.js
│  ├─ hooks/
│  │  ├─ useReveal.js
│  │  └─ useStatCounter.js
│  ├─ components/
│  │  ├─ Nav.jsx
│  │  ├─ LangToggle.jsx
│  │  ├─ IntroMask.jsx
│  │  ├─ Marquee.jsx
│  │  ├─ ImagePlaceholder.jsx
│  │  ├─ CursorDot.jsx
│  │  └─ Footer.jsx
│  └─ sections/
│     ├─ Hero.jsx
│     ├─ About.jsx
│     ├─ Services.jsx
│     ├─ WhyVenezuela.jsx
│     ├─ Destinations.jsx
│     ├─ Inspired.jsx
│     └─ Contact.jsx
├─ server/
│  └─ api/
│     └─ contact.js
├─ index.html
├─ package.json
└─ vite.config.js
```

---

## 3 · Tipografía y paleta — `tokens.css`

```css
/* index.html: cargar Google Fonts */
/* <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400;500&display=swap" rel="stylesheet"> */

:root{
  /* Paleta */
  --cream:#f5f1e8;
  --cream-warm:#ede6d3;
  --cream-deep:#e2d8be;
  --ink:#14271a;
  --ink-soft:#2a3d31;
  --leather:#8b6f47;
  --leather-deep:#5c4a30;
  --rule:#d4cab2;

  /* Tipografía */
  --serif:"DM Serif Display", Georgia, serif;
  --sans:"Geist", system-ui, -apple-system, sans-serif;
  --mono:"Geist Mono", ui-monospace, monospace;

  /* Easing */
  --ease-cine:cubic-bezier(.22,1,.36,1);
  --ease-soft:cubic-bezier(.4,0,.2,1);
}

body{ background:var(--cream); color:var(--ink); font-family:var(--sans); -webkit-font-smoothing:antialiased }
```

---

## 4 · Bilingüe (ES / EN) — `LangContext.jsx`

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import { copy } from "../data/copy";

const LangCtx = createContext();
export const useLang = () => useContext(LangCtx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("orinoco_lang") || "es");
  useEffect(() => {
    localStorage.setItem("orinoco_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LangCtx.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}
```

Uso:

```jsx
const { t, lang, setLang } = useLang();
<h1>{t.hero.slogan_l1}</h1>
```

El objeto `copy` (con todo el texto ES + EN, los 13 destinos y los 5 itinerarios) está en `i18n.js` — cópialo entero como `data/copy.js` y exporta `export const copy = { es, en };`.

---

## 5 · Animaciones cinematográficas

**Reveal on-scroll** — `useReveal.js`:

```jsx
import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, shown];
}
```

Aplicación:

```jsx
const [ref, shown] = useReveal();
<div ref={ref} className={`reveal ${shown ? "in" : ""}`}>...</div>
```

CSS:

```css
.reveal{ opacity:0; transform:translateY(40px); transition:opacity 1.2s var(--ease-cine), transform 1.2s var(--ease-cine) }
.reveal.in{ opacity:1; transform:none }
```

**Para más control** (parallax, ken burns en hero, transiciones por sección): añade `framer-motion` y usa `<motion.div whileInView={{ opacity:1, y:0 }} initial={{ opacity:0, y:40 }} transition={{ duration:1.2, ease:[.22,1,.36,1] }} viewport={{ once:true }}>`.

**Cursor custom**: componente `CursorDot.jsx` con `requestAnimationFrame` siguiendo `mousemove` (deshabilitado en `pointer:coarse`).

**Counter de stats**: `useStatCounter(target)` devuelve un valor animado de 0 a `target` cuando el elemento entra en viewport.

---

## 6 · Imágenes — flujo de reemplazo

Cada placeholder tiene una etiqueta `SALTO ÁNGEL · 760×1010`. Mapeo sugerido:

| Sección       | Etiqueta                       | Archivo final                            | Ratio |
|---------------|--------------------------------|------------------------------------------|-------|
| Hero          | `HERO · 1920×1080`             | `/images/hero/hero.jpg`                  | 16:9  |
| About         | `ABOUT · 900×1200`             | `/images/about/about.jpg`                | 3:4   |
| Destinos × 13 | `<NOMBRE> · 760×1010`          | `/images/destinations/01-salto-angel.jpg` … | 3:4   |
| Inspired hover| `HOVER PREVIEW · 560×760`      | `/images/journeys/<id>.jpg`              | 3:4   |

`<ImagePlaceholder src? label />`: si recibe `src`, pinta la imagen. Si no, pinta el rayado con la etiqueta. Así migras una a una sin tocar layout.

---

## 7 · Backend ligero — `server/api/contact.js`

```js
export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, company, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  // TODO: integrar Resend / Postmark / SendGrid
  console.log('Lead:', { name, email, company, message, at: new Date().toISOString() });
  res.status(200).json({ ok: true });
}
```

Front-end (sección Contact):

```jsx
async function submit(form){
  const r = await fetch('/api/contact', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(form)
  });
  return r.ok;
}
```

---

## 8 · Prompt para Cursor — copia y pega

> "Crea un proyecto **Vite + React 18** llamado **orinoco-dmc**. Voy a adjuntar tres archivos: `option-1-editorial.html` (el diseño objetivo), `shared.css` (sistema de tokens y utilidades) y `i18n.js` (todo el copy ES/EN + datos de 13 destinos y 5 itinerarios).
>
> Tu trabajo:
>
> 1. Replica el HTML como una **SPA**: cada `<section>` del HTML debe vivir en `src/sections/<Name>.jsx`. Estructura el árbol de componentes como propongo en este README.
> 2. Convierte `shared.css` en `src/styles/tokens.css` + `src/styles/global.css`. Conserva **todas las custom properties del `:root`** y todas las clases utilitarias (`.eyebrow`, `.reveal`, `.marquee`, `.btn`, `.link-arr`, `.img-ph`, `.intro-mask`, `.cursor-dot`).
> 3. Tipografía locked: **DM Serif Display + Geist + Geist Mono**. Carga las tres familias desde Google Fonts en `index.html`.
> 4. Convierte el objeto `ORINOCO.copy` de `i18n.js` en `src/data/copy.js` con `export const copy = { es, en };`. Crea `LangContext` con persistencia en localStorage y un componente `<LangToggle>`.
> 5. Reemplaza los placeholders rayados con `<ImagePlaceholder src? label />` que pinta el rayado si no hay `src`.
> 6. Animaciones: usa **Framer Motion** con `whileInView`, `transition: { duration:1.2, ease:[.22,1,.36,1] }`. Implementa el **cursor custom** (deshabilitado en touch) y el **intro mask** que sale hacia arriba al cargar.
> 7. **Carrusel de destinos** horizontal con scroll-snap, controles prev/next y barra de progreso (como en el HTML).
> 8. **Stat counters** que animan de 0 a target cuando entran en viewport.
> 9. **Marquees** infinitos con duplicación de track via React.
> 10. **Form de contacto** que hace POST a `/api/contact`. Crea `server/api/contact.js` como serverless function (Vercel-compatible).
> 11. NO uses Tailwind. CSS Modules por componente.
> 12. Mantén la **nav fija** con `mix-blend-mode: difference` sobre el hero y que se vuelva sólida (`.nav--solid`) al scrollear.
>
> Stack: React 18, Vite, framer-motion. Despliegue objetivo: Vercel."

---

## 9 · Pasos en Cursor

```bash
npm create vite@latest orinoco-dmc -- --template react
cd orinoco-dmc
npm i framer-motion
# (opcional) npm i lenis  → smooth scroll
```

1. Pega el prompt de §8 al chat de Cursor con los tres archivos adjuntos.
2. Sube tus 13 fotos a `public/images/destinations/` (3:4, mín. 760×1010).
3. Sube el hero a `public/images/hero/` (16:9, mín. 1920×1080).
4. Configura `RESEND_API_KEY` (o el provider que uses) en `.env.local`.
5. `vercel --prod`.

---

## 10 · Checklist final antes de despegar

- [ ] Logo definitivo (reemplaza el wordmark "ORINOCO DMC")
- [ ] 13 fotos de destinos en ratio 3:4
- [ ] Foto hero (16:9, ojalá con peso aéreo, ej. Salto Ángel)
- [ ] Foto about (3:4, equipo o mapa de papel)
- [ ] 5 fotos para hover preview de itinerarios
- [ ] Email final del DMC + teléfono + dirección
- [ ] Provider de email para el form (Resend / Postmark)
- [ ] Dominio en Vercel
- [ ] OG image + favicon
- [ ] Analytics (Plausible / Vercel Analytics)


---

# ANEXO A — `option-1-editorial.html`

```html
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Orinoco DMC · Editorial Cinemascope</title>
<link rel="stylesheet" href="shared.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --serif:"DM Serif Display", Georgia, serif;
    --sans:"Geist", system-ui, -apple-system, sans-serif;
    --mono:"Geist Mono", ui-monospace, monospace;
  }
</style>
<style>
  /* ---------- Font picker ---------- */
  .font-picker{position:fixed;right:24px;bottom:24px;z-index:60;background:rgba(245,241,232,.96);backdrop-filter:blur(10px);border:1px solid var(--rule);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 20px 60px rgba(20,39,26,.18);max-width:240px}
  .font-picker .fp-head{display:flex;justify-content:space-between;align-items:center;padding:0 4px 8px;border-bottom:1px solid var(--rule);margin-bottom:4px}
  .font-picker .fp-title{font-family:var(--mono);font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--leather-deep)}
  .font-picker .fp-toggle{font-family:var(--mono);font-size:11px;cursor:pointer;color:var(--leather-deep);padding:0 4px;line-height:1}
  .font-picker.collapsed .fp-list{display:none}
  .font-picker.collapsed{padding:10px 14px}
  .font-picker.collapsed .fp-head{padding:0;border:0;margin:0}
  .fp-list{display:flex;flex-direction:column;gap:4px}
  .fp-opt{display:flex;flex-direction:column;gap:2px;padding:10px 12px;border-radius:8px;border:1px solid transparent;cursor:pointer;text-align:left;transition:background .25s,border-color .25s}
  .fp-opt:hover{background:var(--cream-warm)}
  .fp-opt.active{background:var(--ink);color:var(--cream);border-color:var(--ink)}
  .fp-opt .fp-sample{font-size:22px;line-height:1;letter-spacing:-.01em}
  .fp-opt .fp-sample em{font-style:italic}
  .fp-opt .fp-name{font-family:"Geist Mono",ui-monospace,monospace;font-size:9px;letter-spacing:.16em;text-transform:uppercase;opacity:.7}

  /* ---------- HERO cinemascope ---------- */
  .hero{position:relative;height:100vh;min-height:760px;overflow:hidden;color:var(--cream);padding:0}
  .hero-bg{position:absolute;inset:0;animation:kenburns 18s ease-in-out infinite alternate}
  @keyframes kenburns{from{transform:scale(1.04) translate(-1%,1%)}to{transform:scale(1.12) translate(2%,-2%)}}
  .hero-bg::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,39,26,.45) 0%,rgba(20,39,26,.15) 40%,rgba(20,39,26,.7) 100%);z-index:1}
  .hero-bg .img-ph{width:100%;height:100%}
  .hero-bg .img-ph::after{left:auto;right:24px;bottom:24px;background:rgba(245,241,232,.92);border-color:transparent}
  .hero-content{position:relative;z-index:2;height:100%;padding:120px 56px 56px;display:flex;flex-direction:column;justify-content:flex-end}
  .hero-eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.85;margin-bottom:32px;display:flex;align-items:center;gap:14px}
  .hero-eyebrow::before{content:"";width:32px;height:1px;background:var(--cream)}
  .hero h1{font-family:var(--serif);font-weight:300;font-size:clamp(80px,13vw,220px);line-height:.88;letter-spacing:-.02em;max-width:14ch}
  .hero h1 .it{font-style:italic;font-weight:300}
  .hero-foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:60px;gap:40px}
  .hero-sub{max-width:36ch;font-family:var(--serif);font-style:italic;font-size:22px;line-height:1.4;font-weight:300}
  .scroll-hint{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.7;display:flex;flex-direction:column;align-items:center;gap:10px}
  .scroll-hint::after{content:"";width:1px;height:50px;background:var(--cream);animation:scroll 2.4s ease-in-out infinite}
  @keyframes scroll{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

  /* ---------- ABOUT ---------- */
  .about{display:grid;grid-template-columns:1fr 1fr;gap:80px;padding-top:160px;padding-bottom:160px}
  .about-img{aspect-ratio:3/4;align-self:start}
  .about-text{padding-top:60px}
  .about-text .display{font-size:clamp(42px,5vw,80px);margin:24px 0 40px;font-weight:300}
  .about-text .display .it{font-style:italic;color:var(--leather)}
  .about-text p{font-size:17px;line-height:1.65;color:var(--ink-soft);max-width:48ch;margin-bottom:36px}
  @media(max-width:880px){.about{grid-template-columns:1fr;gap:40px}.about-text{padding-top:0}}

  /* ---------- SERVICES ---------- */
  .services{background:var(--cream-warm);padding-top:140px;padding-bottom:140px}
  .services-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:90px;gap:40px}
  .services-head h2{font-family:var(--serif);font-weight:300;font-size:clamp(40px,5.4vw,84px);line-height:1;max-width:14ch}
  .services-list{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
  .service{background:var(--cream-warm);padding:48px 36px;display:flex;flex-direction:column;gap:24px;min-height:340px;transition:background .5s var(--ease-soft)}
  .service:hover{background:var(--cream)}
  .service-num{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--leather-deep)}
  .service h3{font-family:var(--serif);font-size:48px;font-weight:400;line-height:1}
  .service p{color:var(--ink-soft);max-width:38ch}
  .service .link-arr{margin-top:auto}
  @media(max-width:880px){.services-list{grid-template-columns:1fr}}

  /* ---------- WHY ---------- */
  .why{padding-top:160px;padding-bottom:160px}
  .why-head{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-bottom:120px;align-items:end}
  .why-head h2{font-family:var(--serif);font-weight:300;font-size:clamp(48px,7vw,120px);line-height:.95;letter-spacing:-.01em}
  .why-head h2 .it{font-style:italic;color:var(--leather)}
  .why-head p{color:var(--ink-soft);max-width:42ch;font-size:17px;line-height:1.65}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:40px;border-top:1px solid var(--rule);padding-top:60px}
  .stat{display:flex;flex-direction:column}
  @media(max-width:880px){.stats{grid-template-columns:1fr 1fr;gap:48px 24px}.why-head{grid-template-columns:1fr}}

  /* ---------- DESTINATIONS (horizontal carousel) ---------- */
  .dest{background:var(--ink);color:var(--cream);padding:140px 0}
  .dest .container{padding:0 56px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:80px}
  .dest h2{font-family:var(--serif);font-weight:300;font-size:clamp(48px,7vw,120px);line-height:.95}
  .dest h2 .it{font-style:italic;color:var(--leather)}
  .dest .container p{color:rgba(245,241,232,.75);max-width:46ch;font-size:17px;line-height:1.65}
  .dest-track{display:flex;gap:40px;padding:0 56px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .dest-track::-webkit-scrollbar{display:none}
  .dest-card{flex:0 0 380px;scroll-snap-align:start;display:flex;flex-direction:column;gap:20px}
  .dest-card .img-ph{aspect-ratio:3/4;border-radius:0}
  .dest-card .img-ph::after{background:var(--ink);color:var(--cream);border-color:rgba(245,241,232,.2)}
  .dest-card .img-ph{background:#1f3326;background-image:repeating-linear-gradient(45deg,transparent 0 14px,rgba(245,241,232,.05) 14px 15px)}
  .dest-meta{display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,241,232,.5)}
  .dest-card h3{font-family:var(--serif);font-size:32px;font-weight:400;line-height:1.05}
  .dest-card p{color:rgba(245,241,232,.75);font-size:14px;line-height:1.55;max-width:38ch}
  .dest-nav{padding:0 56px;margin-top:50px;display:flex;justify-content:space-between;align-items:center}
  .dest-nav .arrows{display:flex;gap:14px}
  .dest-nav .arrows button{border:1px solid rgba(245,241,232,.4);width:48px;height:48px;border-radius:50%;display:grid;place-items:center;color:var(--cream)}
  .dest-nav .arrows button:hover{background:var(--cream);color:var(--ink);border-color:var(--cream)}
  .dest-nav .progress{flex:1;height:1px;background:rgba(245,241,232,.18);margin:0 32px;position:relative}
  .dest-nav .progress div{position:absolute;left:0;top:0;height:100%;background:var(--leather);width:8%;transition:width .4s var(--ease-soft)}
  .dest-nav .count{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:rgba(245,241,232,.5)}

  /* ---------- INSPIRED ---------- */
  .inspired{padding:160px 56px}
  .inspired-head{margin-bottom:80px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end}
  .inspired-head h2{font-family:var(--serif);font-weight:300;font-size:clamp(48px,7vw,120px);line-height:.95}
  .inspired-head h2 .it{font-style:italic;color:var(--leather)}
  .inspired-head p{color:var(--ink-soft);max-width:42ch;font-size:17px}
  .journey{display:grid;grid-template-columns:80px 1fr 280px 200px 60px;gap:40px;align-items:center;padding:36px 0;border-top:1px solid var(--rule);position:relative;cursor:pointer;transition:padding-left .4s var(--ease-soft)}
  .journey:hover{padding-left:24px}
  .journey:last-child{border-bottom:1px solid var(--rule)}
  .journey-num{font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--leather-deep)}
  .journey-name{font-family:var(--serif);font-size:clamp(28px,3.4vw,48px);line-height:1;font-weight:400;transition:transform .5s var(--ease-cine)}
  .journey:hover .journey-name{transform:translateX(8px)}
  .journey-name .it{font-style:italic;color:var(--leather)}
  .journey-meta{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-soft);line-height:1.7}
  .journey-note{color:var(--ink-soft);font-size:14px;line-height:1.5}
  .journey-arr{justify-self:end;font-size:24px;transition:transform .4s var(--ease-soft)}
  .journey:hover .journey-arr{transform:translateX(10px) rotate(-45deg)}
  /* hover preview image */
  .journey-img{position:fixed;width:280px;height:380px;pointer-events:none;opacity:0;transform:translate(-50%,-50%) scale(.92);transition:opacity .35s var(--ease-soft),transform .55s var(--ease-cine);z-index:40}
  .journey-img.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
  @media(max-width:1024px){.journey{grid-template-columns:60px 1fr 60px;gap:20px}.journey-meta,.journey-note{display:none}.journey-img{display:none}}

  /* ---------- CONTACT ---------- */
  .contact{background:var(--cream-warm);padding:160px 56px}
  .contact-head{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-bottom:80px;align-items:end}
  .contact-head h2{font-family:var(--serif);font-weight:300;font-size:clamp(48px,7vw,120px);line-height:.95}
  .contact-head h2 .it{font-style:italic;color:var(--leather)}
  .contact-head p{color:var(--ink-soft);max-width:42ch}
  .form{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px}
  .form .full{grid-column:1/-1}
  .form input,.form textarea{background:transparent;border:0;border-bottom:1px solid var(--rule);padding:18px 0 12px;font:inherit;color:var(--ink);outline:none;transition:border-color .4s}
  .form input:focus,.form textarea:focus{border-color:var(--ink)}
  .form input::placeholder,.form textarea::placeholder{color:var(--ink-soft);opacity:.6}
  .form textarea{resize:vertical;min-height:120px;font-family:var(--serif);font-size:24px;line-height:1.4}
  .form .actions{grid-column:1/-1;display:flex;justify-content:flex-end;margin-top:24px}
  @media(max-width:880px){.form{grid-template-columns:1fr}.contact-head{grid-template-columns:1fr}}
</style>
</head>
<body>
  <div class="intro-mask"><div class="brand">ORINOCO <sup>DMC</sup></div></div>

  <nav class="nav" id="nav">
    <a href="index.html" class="brand">ORINOCO <sup>DMC</sup></a>
    <div class="nav-links">
      <a href="#destinations" data-i18n="nav.destinations">Destinos</a>
      <a href="#services" data-i18n="nav.services">Servicios</a>
      <a href="#journeys" data-i18n="nav.journeys">Itinerarios</a>
      <a href="#about" data-i18n="nav.about">Nosotros</a>
      <a href="#contact" data-i18n="nav.contact">Contacto</a>
    </div>
    <div class="lang-toggle">
      <button data-lang="es" class="active"><span>ES</span></button>
      <button data-lang="en"><span>EN</span></button>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg">
      <div class="img-ph" data-label="HERO · 1920×1080 · Salto Ángel desde curiara"></div>
    </div>
    <div class="hero-content">
      <div class="hero-eyebrow" data-i18n="hero.eyebrow">Destination Management Company · Venezuela</div>
      <h1>
        <span data-i18n="hero.slogan_l1">Venezuela,</span><br>
        <span class="it" data-i18n="hero.slogan_l2">en su forma</span><br>
        <span data-i18n="hero.slogan_l3">más íntima.</span>
      </h1>
      <div class="hero-foot">
        <p class="hero-sub" data-i18n="hero.sub">Curamos viajes para los que buscan el país antes que la postal.</p>
        <div class="scroll-hint">scroll</div>
      </div>
    </div>
  </section>

  <!-- MARQUEE filete -->
  <div class="marquee" style="background:var(--ink);color:var(--cream);padding:18px 0;border-top:1px solid var(--ink);border-bottom:1px solid var(--ink)">
    <div class="marquee-track" data-dup>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Salto Ángel</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— 5°58′N 62°32′W —</span>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Roraima</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— 2,810 m —</span>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Los Llanos</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— Apure —</span>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Delta del Orinoco</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— Warao —</span>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Los Roques</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— 50 cayos —</span>
      <span style="font-family:var(--serif);font-style:italic;font-size:22px">Mérida & Andes</span><span style="font-family:var(--mono);font-size:10px;letter-spacing:.2em;align-self:center">— 4,978 m —</span>
    </div>
  </div>

  <!-- ABOUT -->
  <section id="about" class="about">
    <div class="about-img reveal">
      <div class="img-ph" data-label="ABOUT · 900×1200 · Equipo / mapa de papel" style="height:100%"></div>
    </div>
    <div class="about-text">
      <div class="eyebrow eyebrow-line reveal" data-i18n="about.eyebrow">Quiénes somos</div>
      <h2 class="display reveal reveal-delay-1">
        <span data-i18n="about.title_l1">Un DMC que abre</span><br>
        <span data-i18n="about.title_l2">Venezuela como</span><br>
        <span class="it" data-i18n="about.title_l3">se abre un libro.</span>
      </h2>
      <p class="reveal reveal-delay-2" data-i18n="about.body">Orinoco DMC es una compañía de gestión de destino...</p>
      <a href="#" class="link-arr reveal reveal-delay-3"><span data-i18n="about.cta">Sobre Orinoco</span><span class="arr">→</span></a>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="services">
    <div class="services-head">
      <div>
        <div class="eyebrow eyebrow-line reveal" data-i18n="services.eyebrow">Servicios</div>
        <h2 class="reveal reveal-delay-1" style="margin-top:24px" data-i18n="services.title">Diseñados para tres formas de viajar.</h2>
      </div>
      <div class="muted reveal reveal-delay-2" style="font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase">[ FITs · Groups · M.I.C.E. ]</div>
    </div>
    <div class="services-list" id="services-list"></div>
  </section>

  <!-- WHY -->
  <section class="why">
    <div class="why-head">
      <div>
        <div class="eyebrow eyebrow-line reveal" data-i18n="why.eyebrow">Por qué Venezuela</div>
        <h2 class="reveal reveal-delay-1" style="margin-top:24px">
          <span data-i18n="why.title_l1">Un país que cabe</span><br>
          <span class="it" data-i18n="why.title_l2">muchos países dentro.</span>
        </h2>
      </div>
      <p class="reveal reveal-delay-2">2.800.000 km² entre el Caribe, el Amazonas y los Andes. Cuatro horas de vuelo separan un atardecer en Los Roques de un amanecer en la Gran Sabana.</p>
    </div>
    <div class="stats" id="stats"></div>
  </section>

  <!-- DESTINATIONS -->
  <section id="destinations" class="dest">
    <div class="container">
      <div>
        <div class="eyebrow eyebrow-line reveal" style="color:var(--leather)" data-i18n="destinations.eyebrow">Destinos</div>
        <h2 class="reveal reveal-delay-1" style="margin-top:24px">
          <span data-i18n="destinations.title_l1">Trece lugares,</span><br>
          <span class="it" data-i18n="destinations.title_l2">trece formas de país.</span>
        </h2>
      </div>
      <p class="reveal reveal-delay-2" data-i18n="destinations.sub">Una selección curada...</p>
    </div>
    <div class="dest-track" id="dest-track"></div>
    <div class="dest-nav">
      <span class="count"><span id="dest-cur">01</span> / 13</span>
      <div class="progress"><div id="dest-prog"></div></div>
      <div class="arrows">
        <button id="dest-prev" aria-label="prev"><svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M14 5H1m4-4L1 5l4 4" stroke="currentColor"/></svg></button>
        <button id="dest-next" aria-label="next"><svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5h13M9 1l4 4-4 4" stroke="currentColor"/></svg></button>
      </div>
    </div>
  </section>

  <!-- INSPIRED -->
  <section id="journeys" class="inspired">
    <div class="inspired-head">
      <div>
        <div class="eyebrow eyebrow-line reveal" data-i18n="inspired.eyebrow">Get Inspired</div>
        <h2 class="reveal reveal-delay-1" style="margin-top:24px">
          <span data-i18n="inspired.title_l1">Itinerarios</span><br>
          <span class="it" data-i18n="inspired.title_l2">para empezar a imaginar.</span>
        </h2>
      </div>
      <p class="reveal reveal-delay-2" data-i18n="inspired.sub">Plantillas que rediseñamos contigo.</p>
    </div>
    <div id="journeys-list"></div>
    <div class="journey-img" id="journey-preview"><div class="img-ph" data-label="HOVER PREVIEW · 560×760" style="height:100%"></div></div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="contact">
    <div class="contact-head">
      <div>
        <div class="eyebrow eyebrow-line" data-i18n="contact.eyebrow">Empieza el viaje</div>
        <h2 style="margin-top:24px">
          <span data-i18n="contact.title_l1">Cuéntanos qué</span><br>
          <span class="it" data-i18n="contact.title_l2">Venezuela buscas.</span>
        </h2>
      </div>
      <p data-i18n="contact.sub">Respondemos en 24 horas hábiles.</p>
    </div>
    <form class="form" onsubmit="event.preventDefault();this.querySelector('button').textContent='✓ ' + this.querySelector('button').textContent">
      <input type="text" data-i18n-placeholder="contact.placeholder_name" placeholder="Nombre">
      <input type="email" placeholder="Email">
      <input type="text" class="full" data-i18n-placeholder="contact.placeholder_company" placeholder="Compañía / agencia (opcional)">
      <textarea class="full" rows="3" data-i18n-placeholder="contact.placeholder_message" placeholder="Cuéntanos en qué piensas"></textarea>
      <div class="actions"><button class="btn" type="submit"><span data-i18n="contact.cta">Enviar mensaje</span><span class="arr">→</span></button></div>
    </form>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="display reveal" style="font-style:italic;font-weight:300">
      <span data-i18n="footer.tag">Venezuela, en su forma más íntima.</span>
    </div>
    <div class="footer-grid">
      <div>
        <h4 data-i18n="footer.contact">Contacto</h4>
        <ul>
          <li>hello@orinocodmc.com</li>
          <li>+58 212 000 0000</li>
          <li data-i18n="footer.address">Av. Francisco de Miranda · Caracas</li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.explore">Explora</h4>
        <ul>
          <li data-i18n="nav.destinations">Destinos</li>
          <li data-i18n="nav.services">Servicios</li>
          <li data-i18n="nav.journeys">Itinerarios</li>
        </ul>
      </div>
      <div>
        <h4>Social</h4>
        <ul>
          <li>Instagram</li>
          <li>LinkedIn</li>
          <li>Vimeo</li>
        </ul>
      </div>
      <div>
        <h4 data-i18n="footer.legal">Legal</h4>
        <ul>
          <li>Privacy</li>
          <li>Terms</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span data-i18n="footer.rights">© 2026 Orinoco DMC</span>
      <span>Sister DMC of Macondo · Caracas — Bogotá</span>
    </div>
  </footer>

  <script src="i18n.js"></script>
  <script>
    // ---------- Render dynamic content ----------
    ORINOCO.render = function(){
      const c = ORINOCO.copy[ORINOCO.lang];
      ORINOCO.applyDataI18n();

      // Services
      const sl = document.getElementById('services-list');
      sl.innerHTML = c.services.list.map((s,i)=>`
        <div class="service reveal reveal-delay-${i}">
          <div class="service-num">0${i+1} / ${c.services.list.length} — ${s.id}</div>
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <a class="link-arr" href="#contact"><span>${ORINOCO.lang==='es'?'Conversar':'Get in touch'}</span><span class="arr">→</span></a>
        </div>`).join('');

      // Stats
      const st = document.getElementById('stats');
      st.innerHTML = c.why.stats.map((s,i)=>`
        <div class="stat reveal reveal-delay-${i}">
          <div class="stat-num" data-counter data-target="${s.n}">0</div>
          <div class="stat-label">${s.l}</div>
        </div>`).join('');

      // Destinations
      const dt = document.getElementById('dest-track');
      dt.innerHTML = c.destinations.list.map((d,i)=>`
        <div class="dest-card">
          <div class="img-ph" data-label="${d.name.toUpperCase()} · 760×1010"></div>
          <div class="dest-meta"><span>${d.n}</span><span>${d.region}</span></div>
          <h3>${d.name}</h3>
          <p>${d.note}</p>
        </div>`).join('');

      // Journeys
      const jl = document.getElementById('journeys-list');
      jl.innerHTML = c.inspired.list.map((j,i)=>`
        <div class="journey reveal" data-id="${j.id}">
          <span class="journey-num">0${i+1}</span>
          <span class="journey-name">${j.name.replace(/Gabo|Wonders|Lost|Coast|Heritage/, m=>'<span class="it">'+m+'</span>')}</span>
          <span class="journey-meta"><span>${j.days}</span><br><span>${j.path}</span></span>
          <span class="journey-note">${j.note}</span>
          <span class="journey-arr">↗</span>
        </div>`).join('');

      // Re-init reveal + counters for newly rendered nodes
      ORINOCO.initReveal();
      ORINOCO.initStatCounters();
      ORINOCO.duplicateMarquee();
      attachJourneyHover();
      initDest();
    };

    // ---------- Destinations carousel logic ----------
    function initDest(){
      const track = document.getElementById('dest-track');
      const prev = document.getElementById('dest-prev');
      const next = document.getElementById('dest-next');
      const prog = document.getElementById('dest-prog');
      const cur = document.getElementById('dest-cur');
      const step = ()=> track.querySelector('.dest-card')?.getBoundingClientRect().width + 40 || 420;
      next.onclick = ()=>track.scrollBy({left:step(),behavior:'smooth'});
      prev.onclick = ()=>track.scrollBy({left:-step(),behavior:'smooth'});
      track.onscroll = ()=>{
        const t = track.scrollLeft/(track.scrollWidth - track.clientWidth || 1);
        prog.style.width = (8 + t*92) + '%';
        const idx = Math.round(track.scrollLeft/step()) + 1;
        cur.textContent = String(Math.min(idx,13)).padStart(2,'0');
      };
    }

    // ---------- Journey preview hover ----------
    function attachJourneyHover(){
      const preview = document.getElementById('journey-preview');
      const ph = preview.querySelector('.img-ph');
      document.querySelectorAll('.journey').forEach(j=>{
        j.addEventListener('mouseenter',()=>{ ph.dataset.label = j.dataset.id.toUpperCase()+' · 560×760'; preview.classList.add('show'); });
        j.addEventListener('mouseleave',()=>preview.classList.remove('show'));
        j.addEventListener('mousemove',e=>{ preview.style.left = e.clientX+'px'; preview.style.top = e.clientY+'px'; });
      });
    }

    // ---------- Nav state ----------
    addEventListener('scroll',()=>{
      document.getElementById('nav').classList.toggle('nav--solid', scrollY > window.innerHeight - 100);
    });

    // ---------- Boot ----------
    ORINOCO.playIntro();
    ORINOCO.setLang(ORINOCO.lang);
    document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>ORINOCO.setLang(b.dataset.lang)));
    ORINOCO.initCursor();
  </script>
</body>
</html>

```

---

# ANEXO B — `shared.css`

```css
/* ORINOCO DMC — sistema compartido */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@300;400;500&display=swap');

:root{
  --cream:#f5f1e8;
  --cream-warm:#ede6d3;
  --cream-deep:#e2d8be;
  --ink:#14271a;
  --ink-soft:#2a3d31;
  --leather:#8b6f47;
  --leather-deep:#5c4a30;
  --rule:#d4cab2;
  --shadow:rgba(20,39,26,.08);

  --serif:"Instrument Serif", "Times New Roman", serif;
  --sans:"Geist", system-ui, -apple-system, sans-serif;
  --mono:"Geist Mono", ui-monospace, monospace;

  --ease-cine:cubic-bezier(.22,1,.36,1);
  --ease-soft:cubic-bezier(.4,0,.2,1);
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  background:var(--cream);
  color:var(--ink);
  font-family:var(--sans);
  font-weight:400;
  font-size:16px;
  line-height:1.55;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
}

img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}

/* ---------- Tipografía editorial ---------- */
.display{font-family:var(--serif);font-weight:400;letter-spacing:-.02em;line-height:.92}
.italic{font-style:italic;font-weight:400}
.eyebrow{
  font-family:var(--mono);
  font-size:11px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--leather-deep);
}
.eyebrow-line{
  display:inline-flex;align-items:center;gap:14px;
}
.eyebrow-line::before{
  content:"";width:32px;height:1px;background:var(--leather);
}

/* ---------- Navbar compartida ---------- */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:50;
  display:flex;align-items:center;justify-content:space-between;
  padding:22px 40px;
  mix-blend-mode:difference;
  color:#f5f1e8;
  pointer-events:none;
}
.nav > *{pointer-events:auto}
.nav--solid{mix-blend-mode:normal;color:var(--ink);background:rgba(245,241,232,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--rule)}

.brand{
  font-family:var(--serif);
  font-size:20px;
  letter-spacing:.32em;
  font-weight:500;
}
.brand sup{font-family:var(--mono);font-size:9px;letter-spacing:.1em;margin-left:6px;opacity:.7;vertical-align:super}

.nav-links{display:flex;gap:28px;align-items:center;font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase}
.nav-links a:hover{opacity:.6}

.lang-toggle{
  display:inline-flex;border:1px solid currentColor;border-radius:99px;font-family:var(--mono);font-size:10px;letter-spacing:.12em;
}
.lang-toggle button{padding:6px 10px;opacity:.55;border-radius:99px}
.lang-toggle button.active{background:currentColor;opacity:1}
.lang-toggle button.active span{color:var(--cream);mix-blend-mode:difference}

/* ---------- Reveal on scroll ---------- */
.reveal{opacity:0;transform:translateY(40px);transition:opacity 1.2s var(--ease-cine),transform 1.2s var(--ease-cine)}
.reveal.in{opacity:1;transform:none}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}

/* ---------- Image placeholder (rayado editorial) ---------- */
.img-ph{
  position:relative;overflow:hidden;background:var(--cream-warm);
  background-image:repeating-linear-gradient(45deg,transparent 0 14px,rgba(139,111,71,.08) 14px 15px);
}
.img-ph::after{
  content:attr(data-label);
  position:absolute;left:16px;bottom:16px;
  font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;
  color:var(--leather-deep);
  background:var(--cream);padding:4px 8px;border:1px solid var(--rule);
}
.img-ph--dark{background:var(--ink);background-image:repeating-linear-gradient(45deg,transparent 0 14px,rgba(245,241,232,.06) 14px 15px)}
.img-ph--dark::after{color:var(--cream);background:var(--ink-soft);border-color:rgba(245,241,232,.2)}

/* Marca de imagen real (Unsplash demo) */
.img-real{position:relative;overflow:hidden;background:var(--ink)}
.img-real img{width:100%;height:100%;object-fit:cover;display:block}
.img-real .swap-hint{
  position:absolute;left:14px;bottom:14px;z-index:2;
  font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase;
  background:rgba(245,241,232,.92);color:var(--ink);padding:5px 9px;border-radius:99px;
}

/* ---------- Hairline rule ---------- */
.hr{height:1px;background:var(--rule);width:100%;border:0}

/* ---------- Section paddings ---------- */
section{padding:140px 40px;position:relative}
@media (max-width:880px){
  section{padding:90px 24px}
  .nav{padding:18px 20px}
  .nav-links{display:none}
}

/* ---------- Footer ---------- */
.footer{
  background:var(--ink);color:var(--cream);
  padding:120px 40px 50px;
}
.footer .display{font-size:clamp(48px,8vw,128px)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-top:80px;padding-top:50px;border-top:1px solid rgba(245,241,232,.18)}
.footer-grid h4{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;opacity:.6;margin-bottom:20px;font-weight:400}
.footer-grid ul{list-style:none;display:flex;flex-direction:column;gap:10px;font-family:var(--serif);font-size:18px}
.footer-grid li:hover{color:var(--leather)}
.footer-bottom{margin-top:80px;padding-top:24px;border-top:1px solid rgba(245,241,232,.18);display:flex;justify-content:space-between;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.55}
@media (max-width:880px){.footer-grid{grid-template-columns:1fr 1fr;gap:40px}}

/* ---------- Loading mask (cinematic intro) ---------- */
.intro-mask{
  position:fixed;inset:0;z-index:100;background:var(--ink);
  display:grid;place-items:center;color:var(--cream);
  transition:transform 1.4s var(--ease-cine);
}
.intro-mask.gone{transform:translateY(-100%)}
.intro-mask .brand{font-size:28px}

/* ---------- Custom cursor (opt-in) ---------- */
.cursor-on{cursor:none}
.cursor-on *{cursor:none}
.cursor-dot{
  position:fixed;width:8px;height:8px;background:var(--ink);border-radius:50%;
  pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
  transition:transform .18s var(--ease-soft),background .3s,width .3s,height .3s;
}
.cursor-dot.hover{width:60px;height:60px;background:rgba(245,241,232,.2);border:1px solid var(--cream);mix-blend-mode:difference}

/* ---------- Marquee ---------- */
.marquee{overflow:hidden;white-space:nowrap;display:flex}
.marquee-track{display:inline-flex;gap:60px;padding-right:60px;animation:marquee 50s linear infinite}
@keyframes marquee{to{transform:translateX(-50%)}}

/* ---------- Stats counter ---------- */
.stat-num{font-family:var(--serif);font-size:clamp(64px,9vw,140px);line-height:.9;font-weight:300}
.stat-label{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--leather-deep);margin-top:14px;max-width:240px}

/* ---------- Buttons / pills ---------- */
.btn{
  display:inline-flex;align-items:center;gap:14px;
  font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  padding:16px 24px;border:1px solid currentColor;border-radius:99px;
  transition:background .4s var(--ease-soft),color .4s var(--ease-soft);
}
.btn:hover{background:var(--ink);color:var(--cream);border-color:var(--ink)}
.btn .arr{display:inline-block;transition:transform .4s var(--ease-soft)}
.btn:hover .arr{transform:translateX(6px)}

.link-arr{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;border-bottom:1px solid currentColor;padding-bottom:4px}
.link-arr:hover .arr{transform:translateX(6px)}
.link-arr .arr{transition:transform .4s var(--ease-soft)}

/* utility */
.muted{color:var(--ink-soft)}
.center{text-align:center}
[hidden]{display:none!important}

```

---

# ANEXO C — `i18n.js`

```js
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

```
