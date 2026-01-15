/**
 * Comprehensive Library Catalog for El Fuego del Conocimiento Real
 * Sacred texts, hermetic works, and foundational knowledge organized by tradition
 */

export type BookCategory = 
  | 'hermeticism-alchemy'
  | 'masonry-initiation'
  | 'universal-sapiential'
  | 'physics-mathematics'
  | 'language-symbol';

export interface BookSource {
  name: 'gutenberg' | 'archive' | 'wikisource' | 'hathitrust' | 'sacred-texts';
  url?: string;
  id?: string;
}

export interface CatalogBook {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  year?: number;
  category: BookCategory;
  subcategory?: string;
  description: string;
  language: string;
  publicDomain: boolean;
  sources: BookSource[];
  degreeRecommendation?: number; // Masonic degree 1-33
  hermeticSymbols?: string[];
  keywords: string[];
  importance: 'essential' | 'recommended' | 'supplementary';
}

export interface CategoryInfo {
  id: BookCategory;
  name: string;
  symbol: string;
  description: string;
  color: string;
}

/**
 * Category definitions with metadata
 */
export const CATALOG_CATEGORIES: Record<BookCategory, CategoryInfo> = {
  'hermeticism-alchemy': {
    id: 'hermeticism-alchemy',
    name: 'Hermetismo y Alquimia',
    symbol: '🜂',
    description: 'Textos fundacionales del hermetismo, alquimia operativa y transmutación',
    color: 'amber',
  },
  'masonry-initiation': {
    id: 'masonry-initiation',
    name: 'Masonería y Órdenes Iniciáticas',
    symbol: '🜁',
    description: 'Núcleo simbólico masónico, grados filosóficos y tradición iniciática',
    color: 'blue',
  },
  'universal-sapiential': {
    id: 'universal-sapiential',
    name: 'Tradición Sapiencial Universal',
    symbol: '🜄',
    description: 'Vectores sapienciales de la humanidad: Oriente, Mesoamérica y Cábala',
    color: 'purple',
  },
  'physics-mathematics': {
    id: 'physics-mathematics',
    name: 'Física y Matemática del Límite Moderno',
    symbol: '🜃',
    description: 'Ciencia cuántica, teoría de la información y cognición sistémica',
    color: 'emerald',
  },
  'language-symbol': {
    id: 'language-symbol',
    name: 'Lenguaje, Símbolo y Forma',
    symbol: '🜔',
    description: 'Metatextos sobre símbolo, energía, verbo y estructura cognitiva',
    color: 'rose',
  },
};

/**
 * 🜂 CATEGORY 1: HERMETISMO Y ALQUIMIA
 */
export const HERMETICISM_ALCHEMY_BOOKS: CatalogBook[] = [
  {
    id: 'corpus-hermeticum',
    title: 'Corpus Hermeticum',
    originalTitle: 'Corpus Hermeticum',
    author: 'Hermes Trismegistus',
    year: 100,
    category: 'hermeticism-alchemy',
    description: 'Tratados herméticos fundamentales sobre la naturaleza divina, el cosmos y la ascensión del alma.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'sacred-texts', url: 'https://sacred-texts.com/chr/herm/' },
      { name: 'archive', url: 'https://archive.org/details/corpushermeticum' },
    ],
    degreeRecommendation: 3,
    hermeticSymbols: ['caduceus', 'ouroboros', 'hermetic-seal'],
    keywords: ['hermetismo', 'trismegisto', 'gnosis', 'alquimia', 'cosmos'],
    importance: 'essential',
  },
  {
    id: 'tabula-smaragdina',
    title: 'Tabula Smaragdina',
    originalTitle: 'The Emerald Tablet',
    author: 'Hermes Trismegistus',
    year: 600,
    category: 'hermeticism-alchemy',
    description: 'La tabla de esmeralda: texto críptico fundamental de la alquimia hermética.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'sacred-texts', url: 'https://sacred-texts.com/alc/emerald.htm' },
      { name: 'wikisource', url: 'https://en.wikisource.org/wiki/The_Emerald_Tablet' },
    ],
    degreeRecommendation: 1,
    hermeticSymbols: ['emerald', 'as-above-so-below'],
    keywords: ['alquimia', 'transmutación', 'hermetismo', 'tabla-esmeralda'],
    importance: 'essential',
  },
  {
    id: 'kybalion',
    title: 'El Kybalion',
    originalTitle: 'The Kybalion',
    author: 'Tres Iniciados',
    year: 1908,
    category: 'hermeticism-alchemy',
    description: 'Estudio de la filosofía hermética del antiguo Egipto y Grecia. Los siete principios herméticos.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '14209', url: 'https://www.gutenberg.org/ebooks/14209' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/eso/kyb/' },
    ],
    degreeRecommendation: 7,
    hermeticSymbols: ['seven-principles', 'mental-universe'],
    keywords: ['kybalion', 'hermetismo', 'principios', 'mentalismo', 'vibración'],
    importance: 'essential',
  },
  {
    id: 'atalanta-fugiens',
    title: 'Atalanta Fugiens',
    originalTitle: 'Atalanta Fugiens',
    author: 'Michael Maier',
    year: 1617,
    category: 'hermeticism-alchemy',
    description: 'Emblemas alquímicos con música y poesía: obra multimedia del siglo XVII sobre transmutación.',
    language: 'la',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/atalantafugiens00maie' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/alc/atalanta.htm' },
    ],
    degreeRecommendation: 18,
    hermeticSymbols: ['philosophical-egg', 'rebis', 'hermetic-marriage'],
    keywords: ['emblemas', 'alquimia', 'maier', 'música-hermética'],
    importance: 'essential',
  },
  {
    id: 'mutus-liber',
    title: 'Mutus Liber',
    originalTitle: 'Mutus Liber',
    author: 'Altus (Anónimo)',
    year: 1677,
    category: 'hermeticism-alchemy',
    description: 'El libro mudo: obra alquímica sin palabras, solo imágenes simbólicas de la Gran Obra.',
    language: 'none',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/mutusliber00altu' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/alc/mutuslibr.htm' },
    ],
    degreeRecommendation: 21,
    hermeticSymbols: ['great-work', 'philosopher-stone', 'solve-coagula'],
    keywords: ['alquimia', 'libro-mudo', 'emblemas', 'gran-obra'],
    importance: 'essential',
  },
  {
    id: 'rosarium-philosophorum',
    title: 'Rosarium Philosophorum',
    originalTitle: 'Rosarium Philosophorum',
    author: 'Arnaldus de Villa Nova (atribuido)',
    year: 1550,
    category: 'hermeticism-alchemy',
    description: 'Rosario de los filósofos: emblemas fundamentales del proceso alquímico.',
    language: 'la',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/rosariumphilosop00unse' },
    ],
    degreeRecommendation: 18,
    hermeticSymbols: ['chemical-wedding', 'conjunctio', 'red-king-white-queen'],
    keywords: ['alquimia', 'rosarium', 'conjunción', 'opus'],
    importance: 'essential',
  },
  {
    id: 'amphitheatrum-sapientiae',
    title: 'Amphitheatrum Sapientiae Aeternae',
    originalTitle: 'Amphitheatrum Sapientiae Aeternae',
    author: 'Heinrich Khunrath',
    year: 1595,
    category: 'hermeticism-alchemy',
    description: 'Anfiteatro de la sabiduría eterna: conexión entre alquimia, cábala y misticismo cristiano.',
    language: 'la',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/amphitheatrumsa00khun' },
    ],
    degreeRecommendation: 30,
    hermeticSymbols: ['laboratory-oratory', 'divine-wisdom'],
    keywords: ['khunrath', 'alquimia', 'cábala', 'sabiduría-eterna'],
    importance: 'essential',
  },
  {
    id: 'de-occulta-philosophia',
    title: 'De Occulta Philosophia',
    originalTitle: 'De Occulta Philosophia Libri Tres',
    author: 'Heinrich Cornelius Agrippa',
    year: 1533,
    category: 'hermeticism-alchemy',
    description: 'Tres libros de filosofía oculta: magia natural, celestial y ceremonial.',
    language: 'la',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/deoccultaphiloso00agriiala' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/eso/pnm/' },
    ],
    degreeRecommendation: 24,
    hermeticSymbols: ['three-worlds', 'planetary-magic', 'angelic-hierarchy'],
    keywords: ['agrippa', 'magia', 'ocultismo', 'filosofía-hermética'],
    importance: 'essential',
  },
  {
    id: 'eliade-forja-alquimia',
    title: 'Herreros y Alquimistas',
    originalTitle: 'Forgerons et Alchimistes',
    author: 'Mircea Eliade',
    year: 1956,
    category: 'hermeticism-alchemy',
    subcategory: 'modern-bridge',
    description: 'Puente moderno: historia de las religiones y la alquimia como técnica espiritual.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/forjaslquimia0000elia' },
    ],
    degreeRecommendation: 15,
    keywords: ['eliade', 'alquimia', 'antropología', 'simbolismo'],
    importance: 'recommended',
  },
  {
    id: 'jung-psychology-alchemy',
    title: 'Psicología y Alquimia',
    originalTitle: 'Psychology and Alchemy',
    author: 'Carl Gustav Jung',
    year: 1944,
    category: 'hermeticism-alchemy',
    subcategory: 'modern-bridge',
    description: 'Puente moderno: interpretación psicológica de los símbolos alquímicos.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/psychologyalchem0000jung' },
    ],
    degreeRecommendation: 20,
    keywords: ['jung', 'psicología', 'alquimia', 'arquetipos', 'individuación'],
    importance: 'recommended',
  },
];

/**
 * 🜁 CATEGORY 2: MASONERÍA Y ÓRDENES INICIÁTICAS
 */
export const MASONRY_BOOKS: CatalogBook[] = [
  {
    id: 'anderson-constitutions',
    title: 'Constituciones de Anderson',
    originalTitle: 'The Constitutions of the Free-Masons',
    author: 'James Anderson',
    year: 1723,
    category: 'masonry-initiation',
    description: 'Documento fundacional de la masonería especulativa moderna.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/constitutionsoff00ande' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/mas/morgan/index.htm' },
    ],
    degreeRecommendation: 1,
    hermeticSymbols: ['square-compass', 'all-seeing-eye', 'pillars'],
    keywords: ['masonería', 'constituciones', 'anderson', 'landmarks'],
    importance: 'essential',
  },
  {
    id: 'scottish-rite-ritual',
    title: 'Ritual del Rito Escocés Antiguo y Aceptado',
    originalTitle: 'Ancient and Accepted Scottish Rite',
    author: 'Albert Pike (y otros)',
    year: 1871,
    category: 'masonry-initiation',
    description: 'Grados filosóficos del 4° al 33°: el sistema de altos grados masónicos.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/scottishriteofma00pike' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/mas/md/index.htm' },
    ],
    degreeRecommendation: 4,
    hermeticSymbols: ['double-eagle', 'rose-cross', 'degrees-ladder'],
    keywords: ['rito-escocés', 'grados-filosóficos', '33-grados'],
    importance: 'essential',
  },
  {
    id: 'york-rite',
    title: 'Rito de York',
    originalTitle: 'York Rite of Freemasonry',
    author: 'Varios autores',
    year: 1800,
    category: 'masonry-initiation',
    description: 'Sistema de grados masónicos complementarios: Arco Real, Críptico y Templario.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/yorkrite00free' },
    ],
    degreeRecommendation: 7,
    keywords: ['york-rite', 'arco-real', 'templarios', 'masonería'],
    importance: 'essential',
  },
  {
    id: 'monitorial-readings',
    title: 'Lecturas Monitoras',
    originalTitle: 'Monitor of the Lodge',
    author: 'Thomas Smith Webb',
    year: 1797,
    category: 'masonry-initiation',
    description: 'Instrucciones rituales y simbólicas para los tres primeros grados.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/freemasonmonitor00webb' },
    ],
    degreeRecommendation: 1,
    keywords: ['monitor', 'ritual', 'webb', 'aprendiz-compañero-maestro'],
    importance: 'essential',
  },
  {
    id: 'mackey-landmarks',
    title: 'Los Landmarks de la Masonería',
    originalTitle: 'The Principles of Masonic Law',
    author: 'Albert G. Mackey',
    year: 1856,
    category: 'masonry-initiation',
    description: 'Principios fundamentales e inmutables de la tradición masónica.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/principlesofmaso00mack' },
    ],
    degreeRecommendation: 3,
    keywords: ['landmarks', 'mackey', 'principios', 'tradición-masónica'],
    importance: 'essential',
  },
  {
    id: 'pike-morals-dogma',
    title: 'Moral y Dogma',
    originalTitle: 'Morals and Dogma of the Ancient and Accepted Scottish Rite',
    author: 'Albert Pike',
    year: 1871,
    category: 'masonry-initiation',
    description: 'Interpretación filosófica y esotérica de los 33 grados del Rito Escocés.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '19987', url: 'https://www.gutenberg.org/ebooks/19987' },
      { name: 'archive', url: 'https://archive.org/details/moralsdogmaofanc00pike' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/mas/md/index.htm' },
    ],
    degreeRecommendation: 18,
    hermeticSymbols: ['scottish-rite-symbols', 'philosophical-degrees'],
    keywords: ['pike', 'moral-dogma', 'filosofía-masónica', 'grado-33'],
    importance: 'essential',
  },
  {
    id: 'hall-lost-keys',
    title: 'Las Llaves Perdidas de la Masonería',
    originalTitle: 'The Lost Keys of Freemasonry',
    author: 'Manly P. Hall',
    year: 1923,
    category: 'masonry-initiation',
    description: 'Interpretación mística del simbolismo masónico y la iniciación interior.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/lostkeysoffreema00hall' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/mas/lkf/index.htm' },
    ],
    degreeRecommendation: 11,
    keywords: ['hall', 'simbolismo', 'llaves-perdidas', 'iniciación'],
    importance: 'essential',
  },
  {
    id: 'hall-secret-teachings',
    title: 'Las Enseñanzas Secretas de Todos los Tiempos',
    originalTitle: 'The Secret Teachings of All Ages',
    author: 'Manly P. Hall',
    year: 1928,
    category: 'masonry-initiation',
    description: 'Enciclopedia de filosofía hermética, masonería y simbolismo universal.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/secretteachings00hall' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/eso/sta/index.htm' },
    ],
    degreeRecommendation: 30,
    hermeticSymbols: ['universal-symbols', 'mystery-schools'],
    keywords: ['hall', 'enseñanzas-secretas', 'hermetismo', 'simbolismo-universal'],
    importance: 'essential',
  },
  {
    id: 'guenon-masonic-tradition',
    title: 'Estudios sobre la Masonería',
    originalTitle: 'Études sur la Franc-Maçonnerie',
    author: 'René Guénon',
    year: 1964,
    category: 'masonry-initiation',
    description: 'Análisis tradicional de la masonería como vía iniciática y su simbolismo.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/estudiossobrela00guen' },
    ],
    degreeRecommendation: 24,
    keywords: ['guénon', 'tradicionalismo', 'iniciación', 'simbolismo-masónico'],
    importance: 'essential',
  },
];

/**
 * 🜄 CATEGORY 3: TRADICIÓN SAPIENCIAL UNIVERSAL
 */
export const UNIVERSAL_SAPIENTIAL_BOOKS: CatalogBook[] = [
  {
    id: 'upanishads',
    title: 'Upanishads',
    originalTitle: 'उपनिषद्',
    author: 'Diversos sabios védicos',
    year: -800,
    category: 'universal-sapiential',
    description: 'Textos filosóficos védicos sobre la naturaleza del Brahman y el Atman.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '3283', url: 'https://www.gutenberg.org/ebooks/3283' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/hin/upan/index.htm' },
    ],
    degreeRecommendation: 11,
    keywords: ['upanishads', 'vedanta', 'brahman', 'atman', 'india'],
    importance: 'essential',
  },
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad Gita',
    originalTitle: 'भगवद्गीता',
    author: 'Vyasa (atribuido)',
    year: -200,
    category: 'universal-sapiential',
    description: 'Diálogo entre Krishna y Arjuna sobre dharma, yoga y naturaleza divina.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '2388', url: 'https://www.gutenberg.org/ebooks/2388' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/hin/gita/index.htm' },
    ],
    degreeRecommendation: 7,
    keywords: ['gita', 'krishna', 'yoga', 'dharma', 'india'],
    importance: 'essential',
  },
  {
    id: 'tao-te-ching',
    title: 'Tao Te Ching',
    originalTitle: '道德經',
    author: 'Lao Tzu',
    year: -400,
    category: 'universal-sapiential',
    description: 'Texto fundamental del taoísmo sobre el Tao y el wu wei.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '216', url: 'https://www.gutenberg.org/ebooks/216' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/tao/taote.htm' },
    ],
    degreeRecommendation: 3,
    keywords: ['tao', 'lao-tzu', 'wu-wei', 'taoísmo', 'china'],
    importance: 'essential',
  },
  {
    id: 'i-ching',
    title: 'I Ching (Libro de las Mutaciones)',
    originalTitle: '易經',
    author: 'Tradición china antigua',
    year: -1000,
    category: 'universal-sapiential',
    description: 'Sistema de adivinación y filosofía basado en 64 hexagramas.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '57161', url: 'https://www.gutenberg.org/ebooks/57161' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/ich/index.htm' },
    ],
    degreeRecommendation: 18,
    keywords: ['i-ching', 'hexagramas', 'mutaciones', 'adivinación', 'china'],
    importance: 'essential',
  },
  {
    id: 'dhammapada',
    title: 'Dhammapada',
    originalTitle: 'धम्मपद',
    author: 'Buda Gautama',
    year: -300,
    category: 'universal-sapiential',
    description: 'Colección de enseñanzas del Buda sobre el camino hacia el nirvana.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '2017', url: 'https://www.gutenberg.org/ebooks/2017' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/bud/sbe10/index.htm' },
    ],
    degreeRecommendation: 7,
    keywords: ['dhammapada', 'buda', 'dharma', 'budismo', 'nirvana'],
    importance: 'essential',
  },
  {
    id: 'popol-vuh',
    title: 'Popol Vuh',
    originalTitle: 'Popol Vuh',
    author: 'Tradición maya quiché',
    year: 1550,
    category: 'universal-sapiential',
    description: 'Libro sagrado maya quiché: cosmogonía, mitología y genealogía.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '37911', url: 'https://www.gutenberg.org/ebooks/37911' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/nam/maya/popol.htm' },
    ],
    degreeRecommendation: 15,
    keywords: ['popol-vuh', 'maya', 'quiché', 'cosmogonía', 'mesoamérica'],
    importance: 'essential',
  },
  {
    id: 'sefer-yetzirah',
    title: 'Sefer Yetzirah',
    originalTitle: 'ספר יצירה',
    author: 'Tradición cabalística',
    year: 200,
    category: 'universal-sapiential',
    description: 'Libro de la Creación: cosmogonía cabalística basada en letras y números.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'sacred-texts', url: 'https://sacred-texts.com/jud/yetzirah.htm' },
      { name: 'archive', url: 'https://archive.org/details/seferyetzirah00kala' },
    ],
    degreeRecommendation: 24,
    keywords: ['sefer-yetzirah', 'cábala', 'creación', 'letras-hebreas'],
    importance: 'essential',
  },
  {
    id: 'zohar',
    title: 'Zohar (El Libro del Esplendor)',
    originalTitle: 'זֹהַר',
    author: 'Moisés de León (atribuido)',
    year: 1280,
    category: 'universal-sapiential',
    description: 'Texto fundamental de la cábala: comentario místico sobre la Torah.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'sacred-texts', url: 'https://sacred-texts.com/jud/zdm/index.htm' },
      { name: 'archive', url: 'https://archive.org/details/zohar00leon' },
    ],
    degreeRecommendation: 30,
    keywords: ['zohar', 'cábala', 'esplendor', 'sefirot', 'misticismo-judío'],
    importance: 'essential',
  },
  {
    id: 'quran',
    title: 'Corán',
    originalTitle: 'القرآن',
    author: 'Revelación profética',
    year: 632,
    category: 'universal-sapiential',
    description: 'Texto sagrado del Islam: revelación divina a través del profeta Muhammad.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '2800', url: 'https://www.gutenberg.org/ebooks/2800' },
      { name: 'sacred-texts', url: 'https://sacred-texts.com/isl/quran/index.htm' },
    ],
    degreeRecommendation: 11,
    keywords: ['corán', 'islam', 'revelación', 'muhammad'],
    importance: 'essential',
  },
];

/**
 * 🜃 CATEGORY 4: FÍSICA, MATEMÁTICA Y LÍMITE MODERNO
 */
export const PHYSICS_MATHEMATICS_BOOKS: CatalogBook[] = [
  {
    id: 'maxwell-electromagnetism',
    title: 'Tratado sobre Electricidad y Magnetismo',
    originalTitle: 'A Treatise on Electricity and Magnetism',
    author: 'James Clerk Maxwell',
    year: 1873,
    category: 'physics-mathematics',
    description: 'Teoría del campo electromagnético: unificación de electricidad y magnetismo.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '37200', url: 'https://www.gutenberg.org/ebooks/37200' },
      { name: 'archive', url: 'https://archive.org/details/treatiseonelectr01maxw' },
    ],
    degreeRecommendation: 21,
    keywords: ['maxwell', 'electromagnetismo', 'campo', 'luz', 'ondas'],
    importance: 'essential',
  },
  {
    id: 'planck-quantum',
    title: 'Teoría de la Radiación del Calor',
    originalTitle: 'The Theory of Heat Radiation',
    author: 'Max Planck',
    year: 1913,
    category: 'physics-mathematics',
    description: 'Cuantización de la energía: nacimiento de la física cuántica.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '40030', url: 'https://www.gutenberg.org/ebooks/40030' },
      { name: 'archive', url: 'https://archive.org/details/theoryofheatradi00plan' },
    ],
    degreeRecommendation: 24,
    keywords: ['planck', 'cuántica', 'cuantización', 'energía', 'quantum'],
    importance: 'essential',
  },
  {
    id: 'einstein-relativity',
    title: 'Relatividad: La Teoría Especial y General',
    originalTitle: 'Relativity: The Special and General Theory',
    author: 'Albert Einstein',
    year: 1916,
    category: 'physics-mathematics',
    description: 'Teorías de la relatividad especial y general explicadas para el público.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'gutenberg', id: '5001', url: 'https://www.gutenberg.org/ebooks/5001' },
      { name: 'archive', url: 'https://archive.org/details/relativityspecia00eins' },
    ],
    degreeRecommendation: 27,
    keywords: ['einstein', 'relatividad', 'espacio-tiempo', 'gravedad'],
    importance: 'essential',
  },
  {
    id: 'schrodinger-wave-mechanics',
    title: 'Cuatro Conferencias sobre Mecánica Ondulatoria',
    originalTitle: 'Four Lectures on Wave Mechanics',
    author: 'Erwin Schrödinger',
    year: 1928,
    category: 'physics-mathematics',
    description: 'Mecánica cuántica ondulatoria: ecuación de Schrödinger y función de onda.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/fourlecturesonwa00schr' },
    ],
    degreeRecommendation: 28,
    keywords: ['schrödinger', 'mecánica-cuántica', 'función-onda', 'quantum'],
    importance: 'essential',
  },
  {
    id: 'heisenberg-uncertainty',
    title: 'Los Principios Físicos de la Teoría Cuántica',
    originalTitle: 'The Physical Principles of the Quantum Theory',
    author: 'Werner Heisenberg',
    year: 1930,
    category: 'physics-mathematics',
    description: 'Principio de incertidumbre y fundamentos de la mecánica cuántica.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/physicalprincip00heis' },
    ],
    degreeRecommendation: 28,
    keywords: ['heisenberg', 'incertidumbre', 'cuántica', 'complementariedad'],
    importance: 'essential',
  },
  {
    id: 'dirac-quantum-mechanics',
    title: 'Principios de Mecánica Cuántica',
    originalTitle: 'The Principles of Quantum Mechanics',
    author: 'Paul Dirac',
    year: 1930,
    category: 'physics-mathematics',
    description: 'Ecuación relativista del electrón y teoría del spin.',
    language: 'en',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/principlesofquan00dira' },
    ],
    degreeRecommendation: 30,
    keywords: ['dirac', 'ecuación-dirac', 'spin', 'antimateria', 'cuántica-relativista'],
    importance: 'essential',
  },
  {
    id: 'wheeler-it-from-bit',
    title: 'Información, Física, Quantum',
    originalTitle: 'Information, Physics, Quantum',
    author: 'John Archibald Wheeler',
    year: 1989,
    category: 'physics-mathematics',
    description: 'It from Bit: el universo como información, física participativa.',
    language: 'en',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/wheeler-it-from-bit' },
    ],
    degreeRecommendation: 32,
    keywords: ['wheeler', 'it-from-bit', 'información', 'universo-participativo'],
    importance: 'essential',
  },
  {
    id: 'prigogine-non-equilibrium',
    title: 'Del Ser al Devenir',
    originalTitle: 'From Being to Becoming',
    author: 'Ilya Prigogine',
    year: 1980,
    category: 'physics-mathematics',
    description: 'Estructuras disipativas y termodinámica de no equilibrio.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/frombeingtobecom00prig' },
    ],
    degreeRecommendation: 30,
    keywords: ['prigogine', 'termodinámica', 'complejidad', 'autoorganización'],
    importance: 'essential',
  },
  {
    id: 'shannon-information-theory',
    title: 'Una Teoría Matemática de la Comunicación',
    originalTitle: 'A Mathematical Theory of Communication',
    author: 'Claude Shannon',
    year: 1948,
    category: 'physics-mathematics',
    description: 'Fundamentos de la teoría de la información y la entropía informacional.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/mathematicaltheo00shan' },
    ],
    degreeRecommendation: 27,
    keywords: ['shannon', 'información', 'entropía', 'comunicación', 'bits'],
    importance: 'essential',
  },
  {
    id: 'von-neumann-automata',
    title: 'Teoría de Autómatas Autorreproductores',
    originalTitle: 'Theory of Self-Reproducing Automata',
    author: 'John von Neumann',
    year: 1966,
    category: 'physics-mathematics',
    description: 'Autómatas celulares y fundamentos de la computación y la vida artificial.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/theoryofselfrepr00vonn' },
    ],
    degreeRecommendation: 30,
    keywords: ['von-neumann', 'autómatas', 'computación', 'ia-protohistórica'],
    importance: 'recommended',
  },
  {
    id: 'wiener-cybernetics',
    title: 'Cibernética',
    originalTitle: 'Cybernetics: Or Control and Communication',
    author: 'Norbert Wiener',
    year: 1948,
    category: 'physics-mathematics',
    description: 'Control y comunicación en el animal y la máquina: nacimiento de la cibernética.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/cyberneticsorcon00wien' },
    ],
    degreeRecommendation: 27,
    keywords: ['wiener', 'cibernética', 'feedback', 'control', 'información'],
    importance: 'essential',
  },
  {
    id: 'bateson-patterns',
    title: 'Pasos hacia una Ecología de la Mente',
    originalTitle: 'Steps to an Ecology of Mind',
    author: 'Gregory Bateson',
    year: 1972,
    category: 'physics-mathematics',
    description: 'Patrones que conectan: cibernética, epistemología y teoría de sistemas.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/stepstoecologyo00bate' },
    ],
    degreeRecommendation: 30,
    keywords: ['bateson', 'patrones', 'cibernética', 'ecología-mental', 'double-bind'],
    importance: 'essential',
  },
];

/**
 * 🜔 CATEGORY 5: LENGUAJE, SÍMBOLO Y FORMA
 */
export const LANGUAGE_SYMBOL_BOOKS: CatalogBook[] = [
  {
    id: 'saussure-linguistics',
    title: 'Curso de Lingüística General',
    originalTitle: 'Cours de Linguistique Générale',
    author: 'Ferdinand de Saussure',
    year: 1916,
    category: 'language-symbol',
    description: 'Fundamentos de la lingüística estructural: signo, significante y significado.',
    language: 'es',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/coursoflinguisti00saus' },
    ],
    degreeRecommendation: 18,
    keywords: ['saussure', 'lingüística', 'estructuralismo', 'signo', 'significante'],
    importance: 'essential',
  },
  {
    id: 'peirce-semiotics',
    title: 'Obra Lógico-Semiótica',
    originalTitle: 'Collected Papers of Charles Sanders Peirce',
    author: 'Charles Sanders Peirce',
    year: 1931,
    category: 'language-symbol',
    description: 'Semiótica triádica: signo, objeto e interpretante.',
    language: 'en',
    publicDomain: true,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/collectedpaperso01peir' },
    ],
    degreeRecommendation: 21,
    keywords: ['peirce', 'semiótica', 'pragmatismo', 'triada-sígnica'],
    importance: 'essential',
  },
  {
    id: 'jakobson-poetic-function',
    title: 'Ensayos de Lingüística General',
    originalTitle: 'Essais de Linguistique Générale',
    author: 'Roman Jakobson',
    year: 1963,
    category: 'language-symbol',
    description: 'Función poética del lenguaje: poesía, comunicación y estructura.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/essaisdelinguist00jako' },
    ],
    degreeRecommendation: 24,
    keywords: ['jakobson', 'poética', 'funciones-lenguaje', 'estructuralismo'],
    importance: 'essential',
  },
  {
    id: 'levi-strauss-myth',
    title: 'Antropología Estructural',
    originalTitle: 'Anthropologie Structurale',
    author: 'Claude Lévi-Strauss',
    year: 1958,
    category: 'language-symbol',
    description: 'Mito y estructura: análisis estructural de mitos y parentesco.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/anthropologiestr00levi' },
    ],
    degreeRecommendation: 27,
    keywords: ['lévi-strauss', 'mito', 'estructura', 'antropología', 'bricolaje'],
    importance: 'essential',
  },
  {
    id: 'varela-maturana-autopoiesis',
    title: 'De Máquinas y Seres Vivos',
    originalTitle: 'De Máquinas y Seres Vivos: Autopoiesis',
    author: 'Humberto Maturana y Francisco Varela',
    year: 1973,
    category: 'language-symbol',
    description: 'Autopoiesis: la organización de lo vivo y la cognición.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/autopoiesisorgani00matu' },
    ],
    degreeRecommendation: 30,
    keywords: ['autopoiesis', 'varela', 'maturana', 'cognición', 'vida'],
    importance: 'essential',
  },
  {
    id: 'luhmann-systems',
    title: 'Sistemas Sociales',
    originalTitle: 'Soziale Systeme',
    author: 'Niklas Luhmann',
    year: 1984,
    category: 'language-symbol',
    description: 'Teoría de sistemas sociales autopoiéticos y comunicación.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/sozialesysteme00luhm' },
    ],
    degreeRecommendation: 30,
    keywords: ['luhmann', 'sistemas', 'autopoiesis-social', 'comunicación'],
    importance: 'essential',
  },
  {
    id: 'deleuze-difference',
    title: 'Diferencia y Repetición',
    originalTitle: 'Différence et Répétition',
    author: 'Gilles Deleuze',
    year: 1968,
    category: 'language-symbol',
    description: 'Filosofía de la diferencia: repetición, devenir y ritornelo.',
    language: 'es',
    publicDomain: false,
    sources: [
      { name: 'archive', url: 'https://archive.org/details/differenceetrepe00dele' },
    ],
    degreeRecommendation: 32,
    keywords: ['deleuze', 'diferencia', 'repetición', 'devenir', 'ritornelo'],
    importance: 'essential',
  },
];

/**
 * Combine all books into a single catalog
 */
export const COMPLETE_CATALOG: CatalogBook[] = [
  ...HERMETICISM_ALCHEMY_BOOKS,
  ...MASONRY_BOOKS,
  ...UNIVERSAL_SAPIENTIAL_BOOKS,
  ...PHYSICS_MATHEMATICS_BOOKS,
  ...LANGUAGE_SYMBOL_BOOKS,
];

/**
 * Get books by category
 */
export function getBooksByCategory(category: BookCategory): CatalogBook[] {
  return COMPLETE_CATALOG.filter(book => book.category === category);
}

/**
 * Get books recommended for a specific degree
 */
export function getBooksByDegree(degree: number): CatalogBook[] {
  return COMPLETE_CATALOG.filter(
    book => book.degreeRecommendation && book.degreeRecommendation <= degree
  ).sort((a, b) => (a.degreeRecommendation || 0) - (b.degreeRecommendation || 0));
}

/**
 * Get essential books only
 */
export function getEssentialBooks(): CatalogBook[] {
  return COMPLETE_CATALOG.filter(book => book.importance === 'essential');
}

/**
 * Search books by keyword
 */
export function searchBooks(query: string): CatalogBook[] {
  const lowerQuery = query.toLowerCase();
  return COMPLETE_CATALOG.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
    book.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get catalog statistics
 */
export function getCatalogStats() {
  return {
    totalBooks: COMPLETE_CATALOG.length,
    byCategory: {
      hermeticism: HERMETICISM_ALCHEMY_BOOKS.length,
      masonry: MASONRY_BOOKS.length,
      sapiential: UNIVERSAL_SAPIENTIAL_BOOKS.length,
      physics: PHYSICS_MATHEMATICS_BOOKS.length,
      language: LANGUAGE_SYMBOL_BOOKS.length,
    },
    publicDomain: COMPLETE_CATALOG.filter(b => b.publicDomain).length,
    essential: COMPLETE_CATALOG.filter(b => b.importance === 'essential').length,
  };
}
