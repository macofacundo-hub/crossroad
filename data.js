/* Crossroad catalog data — extracted from crossroad.com.uy on 2026-11-15.
   Images are the client's own product photos, served from their store. */
const SITE = 'https://www.crossroad.com.uy';
const UP = SITE + '/wp-content/uploads/';

const NEW_ARRIVALS = [
  { id: 'vj74-sb', name: 'Bajo Vintage VJ74 ReIssued', detail: 'Sunset Sunburst', price: 570, img: '2026/03/JBASS-SB1', brand: 'Vintage', url: '/producto/bajo-electrico-vintage-vj74-reissued-sunset-sunburst/' },
  { id: 'v52-bs', name: 'Guitarra Vintage V52 ReIssued', detail: 'Butterscotch', price: 590, img: '2024/11/V52BS', brand: 'Vintage', url: '/producto/guitarra-electrica-vintage-v52-reissued-telecaster-butterscotch/' },
  { id: 'v62-ab', name: 'Guitarra Vintage V62 ReIssued', detail: 'Ash Blonde', price: 590, img: '2026/03/V62-1', brand: 'Vintage', url: '/producto/guitarra-electrica-vintage-v62-reissued-ash-blonde/' },
  { id: 'cort-lcj', name: 'Cort Little CJ Adirondack', detail: 'Electroacústica · acero · open pore', price: 649, img: '2026/09/little-cj-WEB', brand: 'Cort', url: '/producto/guitarra-electroacustica-cort-cuerdas-de-acero-little-cj-adirondack-open-pore/' },
  { id: 'v4-sb', name: 'Bajo Vintage V4 ReIssued', detail: 'Sunset Sunburst', price: 530, img: '2026/03/pbass-sb1', brand: 'Vintage', url: '/producto/bajo-electrico-vintage-v4-reissued-sunset-sunburst/' },
  { id: 'vs6-bk', name: 'Guitarra Vintage VS6 ReIssued', detail: 'Boulevard Black', price: 565, img: '2026/03/VS6-BK1', brand: 'Vintage', url: '/producto/guitarra-electrica-vintage-vs6-reissued-boulevard-black/' },
  { id: 'cort-cec5', name: 'Cort CEC5-NAT', detail: 'Electroacústica · nylon', price: 479, img: '2026/10/ELECTRO-NYLON-para-web-1', brand: 'Cort', url: '/producto/guitarra-electroacustica-cort-cuerdas-de-nylon-cec5-nat/' },
  { id: 'vj74-bk', name: 'Bajo Vintage VJ74 ReIssued', detail: 'Boulevard Black', price: 540, img: '2026/03/JBASS-BK1', brand: 'Vintage', url: '/producto/bajo-electrico-vintage-vj74-reissued-boulevard-black/' },
  { id: 'v120', name: 'Guitarra Vintage V120 ReIssued', detail: 'Two Tone Sunburst', price: 490, img: '2025/07/V120TB-web-1', brand: 'Vintage', url: '/producto/guitarra-electrica-vintage-v120-reissued-les-paul-junior-two-tone-sunburst/' }
];

const FEATURED = [
  { id: 'smiger-st', name: 'Guitarra ST Pro Smiger', detail: 'Vintage White · micrófonos Alnico 5', cut: 'smigerst', price: 350, img: '2023/05/STRATO-PRO-VW-2', brand: 'Smiger', url: '/producto/guitarra-electrica-stratocaster-pro-smiger-vintage-white-alnico-5/' },
  { id: 'wvs', name: 'Set micrófonos single coil Wilkinson WVS', detail: 'Alnico 5 · directo desde Corea', cut: 'wvs', price: 144, img: '2024/12/WVS', brand: 'Wilkinson', url: '/producto/set-microfonos-single-coil-wilkinson-alnico-5-wvs/' },
  { id: 'joyo-307', name: 'Pre Amp Joyo JE-307', detail: 'Preamplificador', cut: 'joyo307', price: 65, img: '2022/09/pre', brand: 'Joyo', url: '/producto/pre-mic-joyo-je-307/' },
  { id: 'soporte-5', name: 'Soporte de 5 instrumentos', detail: 'Guitarras y bajos', cut: 'soporte5', price: 48, img: '2022/09/soporte-de-5-instrumentos', url: '/producto/soporte-de-5-instrumentos/' }
];

/* Rest of the searchable catalog: these link to their category page. */
const CATALOG_MORE = [
  ['Amplificador de bajo Laney RB2 30W', 410, '2026/03/amp-bajo-Laney-1', 'amplificadores'],
  ['Amplificador acústica Laney LA 15C 15W', 195, '2023/06/ACUSTICO-22', 'amplificadores'],
  ['Amplificador Cort CM15R 15W Black', 129, '2026/09/AMPLI-CORT-WEB2-1', 'amplificadores'],
  ['Amplificador Cort CM15R 15W Dark Blue', 129, '2026/11/ampli-cort-azul-2-1', 'amplificadores'],
  ['Guitarra LP Smiger Black', 298, '2023/05/LES-PAUL-SMIGER1', 'instrumentos-de-cuerda/guitarras/electricas'],
  ['Guitarra LP Smiger Cherry Sunburst', 298, '2023/05/LES-PAUL-CSNEGFRO', 'instrumentos-de-cuerda/guitarras/electricas'],
  ['Guitarra Semi-Hollow Smiger Cherry', 480, '2023/05/335-CHER', 'instrumentos-de-cuerda/guitarras/electricas'],
  ['Guitarra Semi-Hollow Smiger Sunburst', 480, '2023/05/335-SB', 'instrumentos-de-cuerda/guitarras/electricas'],
  ['Electroacústica Cort L710F-NS', 489, '2026/09/L710-WEB1', 'instrumentos-de-cuerda/guitarras/electroacusticas'],
  ['Guitarra clásica Stagg SCL50 4/4', 130, '2022/09/SCL50', 'instrumentos-de-cuerda/guitarras/clasicas'],
  ['Guitarra clásica Yamaha C40 natural', 210, '2026/06/PARA-WEB-C40-3', 'instrumentos-de-cuerda/guitarras/clasicas'],
  ['Ukelele Naneki soprano con funda', 52, '2023/05/uke-amarillo', 'instrumentos-de-cuerda/ukeleles'],
  ['Cuerdas de bajo D’Addario 45-100', 39, '2023/04/45-100-1', 'cuerdas'],
  ['Cuerdas acústica acero Alice .011', 9, '2022/09/acu', 'cuerdas'],
  ['Cable 1/4 plug de 3 y 5 metros', 10, '2024/05/cable-giant', 'cables-y-conectores'],
  ['Funda de bajo acolchonada', 45, '2023/05/FUNDA-BAJO-1', 'fundas'],
  ['Funda de guitarra eléctrica acolchonada', 45, '2023/05/2-FUNDAS', 'fundas'],
  ['Auriculares de estudio Takstar HD 2000', 59, '2022/09/auriculares-takstar-hd2000', 'home-studio'],
  ['Anti pop', 9, '2022/09/anti-pop-1', 'home-studio'],
  ['Pedal afinador Swiff C20', 89, '2022/09/SWIFF-C20-3', 'pedales-y-accesorios/pedales'],
  ['Pedal compressor Cuvave (M-VAVE)', 86, '2022/09/compre', 'pedales-y-accesorios/pedales'],
  ['Pedal delay Cuvave (M-VAVE)', 66, '2022/09/DELAY-2', 'pedales-y-accesorios/pedales'],
  ['Pedal looper Cuvave (M-VAVE)', 104, '2022/09/LOOPER-1', 'pedales-y-accesorios/pedales'],
  ['Afinador mini Joyo', 16, '2022/09/mini-joyo', 'otros-accesorios'],
  ['Afinador Smiger GD-JA22', 10, '2025/08/AFINADOR-WEB-2', 'otros-accesorios'],
  ['Asiento de teclado plegable', 30, '2021/08/asiento-teclado', 'otros-accesorios'],
  ['Aceite de limón D’Addario', 10, '2024/03/ACEITE-DADDARIO', 'limpieza-y-mantenimiento'],
  ['D’Addario limpiador de cuerdas XLR8', 15, '2022/09/XLR-8', 'limpieza-y-mantenimiento'],
  ['Cajón peruano Stagg con funda', 135, '2022/09/CAJONES', 'percusion'],
  ['Baquetas de batería 5A y 7A', 6.25, '2022/09/baquetas-bateria', 'percusion'],
  ['Bajadores de cuerda para guitarra eléctrica', 3.75, '2022/09/bajadores', 'repuestos'],
  ['Clavijas guitarra clásica perno fino', 11, '2022/09/clavijas-espanolas', 'repuestos'],
  ['Jirafa para micrófono brazo BOOM', 42, '2023/07/JIRAFA-2', 'soportes'],
  ['Atril de partituras', 14.5, '2022/09/atril-de-partituras', 'soportes']
].map(([name, price, img, cat], i) => ({ id: 'm' + i, name, detail: '', price, img, url: '/categoria-producto/' + cat + '/' }));

/* Category tiles for the hero row. */
const CATEGORY_TILES = [
  ['Eléctricas', '2024/11/V52BS', 'instrumentos-de-cuerda/guitarras/electricas'],
  ['Bajos', '2026/03/JBASS-SB1', 'instrumentos-de-cuerda/bajos'],
  ['Electroacústicas', '2026/09/little-cj-WEB', 'instrumentos-de-cuerda/guitarras/electroacusticas'],
  ['Clásicas', '2026/06/PARA-WEB-C40-3', 'instrumentos-de-cuerda/guitarras/clasicas'],
  ['Amplificadores', '2026/09/AMPLI-CORT-WEB2-1', 'amplificadores'],
  ['Pedales', '2022/09/DELAY-2', 'pedales-y-accesorios'],
  ['Repuestos', '2022/11/varias-perillas', 'repuestos'],
  ['Cuerdas', '@assets/cuerda-enrollada.png', 'cuerdas'],
  ['Home studio', '2022/09/auriculares-takstar-hd2000', 'home-studio'],
  ['Soportes', '2022/09/soporte-de-5-instrumentos', 'soportes'],
  ['Ukeleles', '2023/05/uke-amarillo', 'instrumentos-de-cuerda/ukeleles'],
  ['Percusión', '2022/09/CAJONES', 'percusion'],
  ['Fundas', '2023/05/2-FUNDAS', 'fundas'],
  ['Accesorios', '2022/09/mini-joyo', 'otros-accesorios']
];

/* Full category tree, as on the current store. */
const CATEGORY_TREE = [
  ['Instrumentos de cuerda', 'instrumentos-de-cuerda', [['Guitarras eléctricas', 'guitarras/electricas'], ['Electroacústicas', 'guitarras/electroacusticas'], ['Acústicas', 'guitarras/acusticas'], ['Clásicas', 'guitarras/clasicas'], ['Bajos', 'bajos'], ['Ukeleles', 'ukeleles']]],
  ['Amplificadores', 'amplificadores', [['Guitarra eléctrica', 'guitarra-electrica'], ['Guitarra acústica', 'guitarra-acustica'], ['Bajo', 'bajo-amplificadores']]],
  ['Pedales y accesorios', 'pedales-y-accesorios', [['Pedales', 'pedales'], ['Pedal board', 'pedal-board'], ['Alimentación', 'alimentacion'], ['Cables y conectores', 'cables-y-conectores-pedales-y-accesorios'], ['Otros', 'otros-pedales-y-accesorios']]],
  ['Repuestos', 'repuestos', [['Micrófonos', 'microfonos'], ['Puentes', 'puentes'], ['Clavijas', 'clavijas'], ['Cejuelas', 'cejuelas'], ['Trastes', 'trastes'], ['Perillas', 'perillas'], ['Pickguard', 'pickguard'], ['Jacks', 'jacks'], ['Llaves', 'llaves'], ['Otros', 'otros-ferreteria-de-instrumentos']]],
  ['Cuerdas', 'cuerdas', [['Guitarra eléctrica', 'guitarra-cuerdas/electrica'], ['Guitarra acústica', 'guitarra-cuerdas/acustica'], ['Guitarra clásica', 'guitarra-cuerdas/clasica'], ['Bajo', 'bajo'], ['Ukelele', 'ukelele-cuerdas']]],
  ['Otros accesorios', 'otros-accesorios', [['Afinadores', 'afinadores'], ['Capos', 'capos'], ['Correas', 'correas'], ['Strap locks', 'straplocks'], ['Púas y porta púas', 'puas-y-porta-puas'], ['Slide', 'slide'], ['Luz de atril', 'luz-de-atril'], ['Pedal sustain teclado', 'pedal-sustain-teclado'], ['Asiento de teclado', 'asiento-de-teclado'], ['Cañas de saxo y almohadillas', 'canas-de-saxo-y-almohadillas']]],
  ['Soportes', 'soportes', [['Guitarra y bajo', 'guitarra-y-bajo'], ['Amplificador', 'amplificador'], ['Micrófono', 'microfono'], ['Teclado', 'teclado'], ['Partituras', 'partituras'], ['Otros', 'otros']]],
  ['Cables y conectores', 'cables-y-conectores', [['Instrumentos', 'instrumentos'], ['Audio', 'audio']]],
  ['Fundas', 'fundas', [['Guitarra y bajo', 'guitarra-y-bajo-fundas'], ['Teclado', 'teclado-fundas']]],
  ['Percusión', 'percusion', [['Cajones peruanos', 'cajones-peruanos'], ['Practicables', 'practicables'], ['Accesorios', 'accesorios']]],
  ['Limpieza y mantenimiento', 'limpieza-y-mantenimiento', [['Instrumentos', 'instrumentos-limpieza-y-mantenimiento'], ['Vinilos', 'vinilos']]],
  ['Home studio', 'home-studio', []]
];

const REPUESTOS_CHIPS = [['Micrófonos', 'microfonos'], ['Puentes', 'puentes'], ['Clavijas', 'clavijas'], ['Cejuelas', 'cejuelas'], ['Trastes', 'trastes'], ['Perillas', 'perillas'], ['Pickguard', 'pickguard'], ['Jacks', 'jacks'], ['Llaves', 'llaves']];
