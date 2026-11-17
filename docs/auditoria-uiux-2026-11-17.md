# Auditoría UI/UX — Ensilados Santa Cruz (web y vCard) · 2026-11-17

Alcance: `ensilados.cerice360.com` (app Coolify `web-ensilados`, repo `Reqiudex/web-ensilados`; también responde en
`test1.cerice360.com` y `escz.cerice360.com`) y `mucarzelvcard.cerice360.com` (app `vcard-ensilados`, repo
`Reqiudex/vcard-ensilados`). Rama de trabajo en ambos repos: `mejora-uiux-2026-11-17`.

Método: Chromium sin pantalla (Playwright) a 360, 768, 1366 y 1920 px con capturas de página completa y del primer
pliegue; axe-core 4.10 (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas); Lighthouse 11.7 en perfil móvil (Moto G4,
4G lenta simulada) y escritorio; revisión de cabeceras con `curl -I`; pruebas de interacción automatizadas (menú,
teclado, galería, descargas, enlaces). Capturas e informes JSON en `docs/capturas-2026-11-17/{antes,despues}/`.

## 1. Resumen de medidas

| Métrica | Web antes | Web después | vCard antes | vCard después |
|---|---|---|---|---|
| Lighthouse rendimiento móvil | 54 | 99 | 62 | 95 |
| LCP móvil | 13,8 s | 1,9 s | 7,3 s | 2,7 s |
| Lighthouse rendimiento escritorio | 80 | 99 | 92 | 93 (con video) |
| Peso total móvil | 4.060 KiB | 120 KiB | 13.937 KiB | 231 KiB |
| Lighthouse accesibilidad | 95 | 100 | 77 | 100 |
| Lighthouse buenas prácticas | 96 | 100 | 100 | 100 |
| Lighthouse SEO | 80 | 93 (*) | 85 | 92 (*) |
| Violaciones axe (360 / 1366 px) | 2 / 1 tipos | 0 / 0 | 4 / 4 tipos | 0 / 0 |
| Peticiones con error | `app.js` 404 en cada visita | 0 | 0 (propias) | 0 |
| Desborde horizontal a 360 px | sí (449 px) | no | no | no |
| Terceros cargados | Tailwind CDN, AOS, Swiper, Google Fonts ×2, fotos de googleusercontent | solo el beacon de Cloudflare | Font Awesome CDN, YouTube (también en móvil) | YouTube sin cookies solo ≥ 900 px + beacon de Cloudflare |

Todas las cifras de "antes" y "después" son de producción (`https://…cerice360.com`), medidas el 2026-11-17.
(*) El único punto SEO que falta es `robots.txt`: lo genera Cloudflare (robots.txt gestionado, con la directiva
`Content-Signal`) y Lighthouse 11 no la conoce. Es configuración de la zona en Cloudflare; no se tocó.

## 2. Hallazgos de la web (`web-ensilados`), por impacto

| # | Hallazgo | Severidad | Estado |
|---|---|---|---|
| W1 | **Todos los flujos principales llevaban a 404**: "Servicios", "Pedidos", "Acceso", "Cotizar envío", "Realizar pedido", "Añadir al pedido", "Ir a cotización rápida". Vite solo empaqueta `index.html`; `servicios.html`, `pedidos.html`, `cotizacion.html`, `login.html`, `register.html` y `app.js` nunca llegan a `dist/`. Además, cada visita pedía `app.js` y recibía 404. | Crítica | Arreglado: todos los botones llevan a secciones de la página o a WhatsApp; las cinco URL viejas redirigen (302) a la sección equivalente. |
| W2 | **El botón de menú en móvil no hacía nada** (sin manejador): en teléfonos no había navegación. | Crítica | Arreglado: menú con `aria-expanded`/`aria-controls`, cierra con Escape, al elegir enlace o al tocar fuera. |
| W3 | **Datos de contacto falsos**: `ventas@ensiladosantacruz.com` y `+591 (3) 123-4567`. El dominio no existe (tampoco `ensiladossantacruz.com`, el que figura en el PDF y en la vCard). Un cliente que copiara esos datos no llegaba a nadie. | Crítica | Arreglado: se muestran los cinco WhatsApp reales de la vCard, Instagram, Facebook y "Guardar contacto" (.vcf). Sin correo hasta que exista uno que funcione. |
| W4 | **Contenido sin respaldo**: testimonios con nombres y fotos de banco ("Ricardo Gomez", "Sofia Mendez", "Jorge Valdes"), "+24 % promedio de rendimiento", "Calidad certificada", "Con la confianza de los granjeros". Riesgo de publicidad engañosa. | Alta | Retirado de la página (sigue en el historial de git). Pendiente de Luciano: testimonios reales con permiso. |
| W5 | Formulario de contacto sin envío ni etiquetas asociadas (`<label>` sin `for`), botón que llevaba a una página 404. | Alta | Reemplazado por contacto directo por WhatsApp (no se recogen datos en el sitio). |
| W6 | Rendimiento móvil 54, LCP 13,8 s: Tailwind compilado en el navegador (`cdn.tailwindcss.com`, que el propio Tailwind desaconseja en producción), AOS, Swiper, dos hojas de Google Fonts (una con toda la fuente de íconos Material Symbols) e imágenes de 1–2 MB desde `lh3.googleusercontent.com`. | Alta | Arreglado: CSS propio de 9 KB, JS de 1 KB, fotos reales en WebP 640/1280 con `srcset`, `loading="lazy"`, dimensiones fijas (CLS 0). |
| W7 | Contraste: verde de marca `#5bec13` usado como texto sobre claro (1,4:1 en "Potencial", "Calidad certificada", enlace activo). | Alta (WCAG 1.4.3) | Arreglado: el verde de marca queda solo como fondo con texto oscuro (10,9:1); el texto verde usa `#2f6f0d` (5,8:1). |
| W8 | Carruseles con puntos de 8×8 px (WCAG 2.5.8 pide 24×24) y autoplay sin pausa en testimonios (WCAG 2.2.2). | Media | Eliminados: dos productos no necesitan carrusel; galería en rejilla. Todos los objetivos táctiles ≥ 44 px. |
| W9 | Desborde horizontal a 360 px (documento de 449 px). | Media | Arreglado. |
| W10 | Íconos de pie sin nombre (`href="#"`, el lector leía "public", "mail", "share"); íconos Material leídos como texto en botones. | Media | Arreglado: íconos SVG con `aria-hidden`, enlaces con texto. |
| W11 | Sin enlace para saltar al contenido, foco poco visible, jerarquía de encabezados con saltos. | Media | Arreglado: enlace de salto, `:focus-visible` de 3 px, h1 → h2 → h3. |
| W12 | Marca confusa: logo de tractor genérico y "SANTA CRUZ" sin "Ensilados". | Media | Arreglado: logo real (espiga) y nombre completo. |
| W13 | Información técnica real (tabla bromatológica, ficha BM709) solo existía en la vCard. | Media | Añadida sección "Ficha técnica" con tabla accesible (`caption`, `th scope`) y descarga de ambos PDF. |
| W14 | SEO: sin meta descripción, sin canónico, sin Open Graph, sin favicon, página 404 genérica de nginx. | Media | Arreglado (canónico a `ensilados.cerice360.com` porque el mismo sitio responde en `test1` y `escz`). |
| W15 | Copyright 2024, textos de plantilla ("La productividad comienza aquí", "Selección Premium"). | Baja | Actualizado y con lenguaje directo. |
| W16 | Deuda técnica: `src/` (React) y `README.md` de plantilla Vite no se usan en el sitio publicado; `tsc -b` los compila igual. | Baja | Sin tocar (no se borra nada). Ver pendientes. |

### Formularios, estados vacíos y de error

- La web ya no tiene formularios: el único "envío" es abrir WhatsApp con un texto inicial; no se guardan datos.
- Error 404: página propia con marca y salidas a inicio y contacto (antes, la de nginx en inglés).
- Sin JavaScript: todo el contenido y los enlaces funcionan; solo el menú móvil depende de JS (el botón flotante
  de WhatsApp y las secciones siguen accesibles).
- `pedidos.html`, `cotizacion.html`, `login.html`, `register.html` y `app.js` siguen en el repo **sin publicar**:
  simulan registro con contraseña en `localStorage` en texto plano, un usuario de prueba fijo, pedidos con precios
  en dólares y un costo de envío aleatorio en "MXN". Tocan autenticación, pedidos y pagos, así que no se publican
  ni se rehacen sin decisión de Luciano (ver sección 7).

## 3. Hallazgos de la vCard (`vcard-ensilados`), por impacto

| # | Hallazgo | Severidad | Estado |
|---|---|---|---|
| V1 | **Botones de PDF cruzados**: "Acerca de nuestros Silos Maíz" descargaba la tabla bromatológica y "Descargar Tabla Bromatológica" la ficha del silo. | Alta | Arreglado y con prueba automática que verifica texto ↔ archivo. |
| V2 | Texto blanco sobre video claro (campos y cielo): ilegible en varias escenas. | Alta | Capa oscura sobre el fondo + sombra de texto. |
| V3 | Video de YouTube cargado también en móviles: ~14 MB por visita, LCP móvil 7,3 s, cookies de YouTube sin aviso, iframe sin título. | Alta | Video solo en pantallas ≥ 900 px sin "reducir movimiento" ni ahorro de datos, con `youtube-nocookie.com` y título; en móvil, foto fija real (220 KiB en total). |
| V4 | Botones verdes `#00b818` con texto blanco: 2,7:1. | Alta (WCAG 1.4.3) | `#0b6b17`: 6,7:1. |
| V5 | Íconos de WhatsApp, Instagram y Facebook sin nombre accesible (Font Awesome, 3 enlaces). | Alta (WCAG 4.1.2) | SVG propios + `aria-label`. |
| V6 | Galería: botones `❮ ❯` sin nombre, `alt="Imagen 1…7"`, fotos JPEG de 250–620 KB, sin teclado ni gesto de deslizar. | Media | Botones etiquetados de 44 px, contador "Foto n de 7" anunciado, textos alternativos descriptivos, WebP, flechas del teclado y deslizar. |
| V7 | `body` con `height:100%` y `overflow-x:hidden` convertía al body en el contenedor de scroll (rompe el ocultado de la barra del navegador en móviles y las capturas). Secciones con `height:100vh` fijo que pueden recortar contenido. | Media | Scroll del documento normal; secciones con `min-height: 100svh`. |
| V8 | Ortografía y textos: "Con quien te gustaria", "Camelidos", "Bromatologica", "Maiz", "Vcard"; `alt="VCard de Cherry Tech"` en el logo de Ensilados. | Media | Corregido. |
| V9 | Sin landmarks, varios `h1`, flechas "⬇" sin nombre. | Media | `main`, un solo `h1`, flechas con `aria-label`. |
| V10 | El `.vcf` se servía como `application/octet-stream`: algunos teléfonos lo descargan en vez de abrir Contactos. | Media | Servido como `text/vcard`. |
| V11 | Sin enlace a la web de la empresa. | Baja | Añadidos "Sitio web" (inicio) y un tercer ícono en redes. |
| V12 | `script.js` (no referenciado, apunta a clases que no existen) y carpeta `images/`. | Baja | Sin tocar (no se borra nada). |

## 4. Cabeceras de seguridad

Antes (ambas apps): HSTS, `nosniff`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy` correctas, pero la
CSP solo tenía `frame-ancestors`, `base-uri`, `object-src` y `upgrade-insecure-requests`: no limitaba scripts.
No podía endurecerse porque las páginas cargaban scripts y estilos en línea y de cinco CDN.

Después:

- Web: `default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self';
  img-src 'self' data:; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; object-src 'none';
  base-uri 'self'; form-action 'none'; frame-ancestors 'self'` + COOP `same-origin`. Sin `unsafe-inline`; el único
  origen externo es el beacon de Cloudflare Web Analytics, que Cloudflare inyecta en la página (la primera versión
  publicada lo bloqueaba y se corrigió).
- vCard: igual, más `frame-src https://www.youtube-nocookie.com` para el video.
- `Permissions-Policy`: también se niega `geolocation` (antes `self`; ninguna página la usa), `payment` y `usb`.
- nginx: `server_tokens off` se mantiene; la página va con `Cache-Control: no-cache`; 404 propia (web); `.vcf` como `text/vcard`; caché de 1 año para
  `/assets/` (archivos con huella de Vite) y 30 días para `/img/`; `deny` para archivos ocultos; `absolute_redirect
  off` para que las redirecciones no salgan como `http://`.
- `.dockerignore` en ambos repos: en la vCard el `Dockerfile` copia todo el repo al directorio público, así que sin
  él `docs/` (esta auditoría y sus capturas) quedaría publicado.

Advertencia para quien edite `nginx-sitio.conf`: no usar `add_header` dentro de `server`/`location`; nginx deja de
heredar las cabeceras de `security-headers.conf` en cuanto un bloque define la suya.

## 5. Pruebas realizadas

- `prueba-web.js` (33 comprobaciones): menú móvil (abre, `aria-expanded`, cierra al elegir y con Escape, navega
  a la sección), botón flotante, primer Tab = "Saltar al contenido" y visible, menú de escritorio, todas las anclas
  existen, todos los recursos internos (PDF, .vcf, logo) responden 200, todos los externos son https, ninguna imagen
  rota, consola sin errores. Resultado: 0 fallos.
- `prueba-vcard.js` (17 comprobaciones): móvil sin peticiones a YouTube, galería (siguiente, anterior con vuelta,
  deslizar), PDFs con el archivo correcto y 200, `.vcf` en `text/vcard`, flecha a contactos, escritorio con video
  inyectado, con título y desde youtube-nocookie, sin violaciones de CSP, salto de teclado al primer contacto.
  Resultado: 0 fallos.
- axe a 360 y 1366 px: 0 violaciones en ambos sitios. Sin desborde horizontal en los cuatro anchos.
- Construcción con el mismo `Dockerfile` que usa Coolify y servido en contenedor local antes de publicar.

## 6. Publicación

Solo cambios de interfaz (HTML, CSS, imágenes, configuración de nginx); nada de pagos, datos, autenticación ni
envío de mensajes. Pasos: respaldo → merge de `mejora-uiux-2026-11-17` a `main` → redeploy en Coolify →
verificación → `~/check-webs.sh`.

Respaldo previo (en `~/respaldo/ensilados-uiux-2026-11-17/`): imágenes Docker en producción
(`imagen-web-ensilados-de2fcce.tar.gz`, `imagen-vcard-ensilados-5ebf7e8.tar.gz`), espejo `wget` de ambos sitios,
JSON de configuración de ambas apps en Coolify y salida de `check-webs.sh` antes del cambio. Etiqueta git
`antes-uiux-2026-11-17` en ambos repos apuntando al commit que estaba en producción.

Resultados en producción (capturas en `docs/capturas-2026-11-17/produccion/`): tabla de la sección 1, 0 fallos en
las 50 comprobaciones de `prueba-web.js` y `prueba-vcard.js` contra los dominios reales, 0 violaciones axe y
`~/check-webs.sh` igual que antes (16 ok, 0 fallas, 5 apagadas a propósito; salidas en
`~/respaldo/ensilados-uiux-2026-11-17/check-webs-{antes,despues}.txt`). `test1` y `escz` responden 200.

Incidencias durante la publicación, ya resueltas:
1. La CSP nueva bloqueaba el beacon de Cloudflare Web Analytics → se permitió explícitamente.
2. Cloudflare guarda `styles.css` 4 h (`cf-cache-status: HIT`): la vCard nueva salió unos minutos con la hoja
   vieja. Ahora `index.html` pide `v20261117b/styles.css` y `v20261117b/js/vcard.js` (nginx quita el prefijo).
   **Al cambiar esos archivos hay que subir la versión en `index.html`.** Se usa ruta y no `?v=` porque
   `actualizar-copias.sh` del guardián descarta las URL con `?` y la copia de emergencia quedaba sin estilos
   (verificado con el mismo `wget`). La web no lo necesita: Vite pone huella a sus archivos.
3. La copia de emergencia del guardián se actualizará sola en el cron de las 08:30 UTC; no se forzó.

### Vuelta atrás

1. Rápida (minutos), desde Coolify: app `web-ensilados` o `vcard-ensilados` → Deployments → el despliegue anterior
   (commit `de2fcce` en la web, `5ebf7e8` en la vCard) → Redeploy. La imagen anterior sigue en el servidor.
2. Por git (deja historial):
   ```bash
   cd ~/CODING/codigo/web/web-ensilados        # o vcard-ensilados
   git checkout main && git pull
   git revert --no-edit antes-uiux-2026-11-17..main   # revierte todos los commits de esta mejora
   git push origin main
   # redeploy desde Coolify (o API: GET /api/v1/deploy?uuid=<uuid de la app>)
   ```
3. Último recurso si Coolify no pudiera construir: `docker load < ~/respaldo/ensilados-uiux-2026-11-17/imagen-…tar.gz`
   y redeploy desde Coolify apuntando a esa imagen. No levantar contenedores a mano en los puertos 8081/8082.

UUID en Coolify: web `q10x2z79vdkx89bljfm3d89g`, vCard `qejwar5xz9gsjv4sag1a0ltj`.

## 7. Pendiente y lo que depende de Luciano

1. **Correo de la empresa**: `ensiladossantacruz.com` (PDF y .vcf: `info@`, `gerencia@`, web) y
   `ensiladosantacruz.com` (sitio anterior: `ventas@`) no resuelven en DNS. Confirmar un correo que funcione para
   mostrarlo; mientras, solo WhatsApp.
2. **Dirección**: hay dos distintas — el .vcf (2023) dice "Manzana 40, Av. San Martín 4to anillo, Torre 2, piso 9,
   HUB40" y la tabla bromatológica (2024) "8vo anillo y doble vía La Guardia #8120". No se publicó ninguna hasta
   saber cuál es la vigente.
3. **Roles de los contactos**: solo se conoce el de José Gabriel Zabala Mercado (gerente general, por el .vcf). Saber
   quién atiende ventas, asesoría técnica y despacho ayuda al cliente a elegir; el botón principal de la web va al
   gerente general.
4. **Ensilado de sorgo**: las fotos son de sorgo y el sitio anterior lo ofrecía, pero no hay ficha técnica. Confirmar
   que se vende y, si existe, su análisis bromatológico. Confirmar también si hay entrega o solo retiro (el texto
   dice "retiro o entrega").
5. **Testimonios**: los anteriores eran inventados. Si hay clientes reales que acepten aparecer, se puede añadir la
   sección otra vez.
6. **Pedidos/cotizador/cuentas** (`pedidos.html`, `cotizacion.html`, `login.html`, `register.html`, `app.js`): son
   una maqueta que nunca se publicó. Si se quiere un sistema real de pedidos o cotización de flete, debe hacerse con
   backend (posiblemente ligado a `flete-ensilados`), autenticación real y sin contraseñas en el navegador. Queda sin
   publicar.
7. **Video de fondo de la vCard**: es un video genérico de campos en otoño (no parece Santa Cruz). Si la empresa
   tiene video propio, reemplazar el id `Bj3R61S_iZs` en `js/vcard.js`.
8. **Dominio**: la vCard vive en `mucarzelvcard.cerice360.com` y `escz.cerice360.com` figura en Coolify para la vCard
   pero el túnel lo envía a la web (8081). No se tocó (infraestructura protegida); decidir si se quiere un dominio
   propio para la empresa.
9. Limpieza opcional (no se borró nada): `src/` React y `README.md` de plantilla en la web; `script.js` e `images/`
   en la vCard; JPEG originales, `RECT.png` y `ensilados.svg` (86 KB) que ya no usa ninguna página.
