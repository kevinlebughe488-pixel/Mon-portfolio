/**
 * Contenu du portfolio : c'est le SEUL fichier à modifier pour mettre à jour les textes.
 * Écris normalement : les espaces insécables du français (avant « : ; ? ! », dans « Licence 3 »,
 * dans les numéros de téléphone) sont ajoutées automatiquement par la fonction `typo` en bas du fichier.
 *
 * À VÉRIFIER avant publication (ajouts faits à partir de ta demande, pas de ton CV) :
 *  - skills : la liste des technologies (Python, JavaScript, Git, Merise, UML, SQL…).
 *  - projects : remplace ou complète avec tes vrais projets.
 *  - socials : ajoute tes liens GitHub / LinkedIn (rien ne s'affiche tant que la liste est vide).
 *  - profile.whatsapp : le numéro utilisé par les boutons WhatsApp de la section Services.
 *  - services.packs[].price : les tarifs (rien ne s'affiche tant qu'ils sont vides).
 */
import {
  Braces,
  BrainCircuit,
  GraduationCap,
  Languages,
  MapPin,
  Route,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Identité                                                             */
/* ------------------------------------------------------------------ */
export const profile = typo({
  firstName: 'Kevin',
  lastName: 'Lebughe Yoka',
  fullName: 'Kevin Lebughe Yoka',
  shortName: 'Kevin Lebughe',
  monogram: 'KL',
  role: 'Développeur',
  passion: "Passionné d'intelligence artificielle",
  status: 'Licence 3 terminée',
  availability: 'Ouvert à une alternance',
  lead: "Je conçois des applications claires et utiles, et j'explore chaque jour ce que l'intelligence artificielle peut apporter aux projets de demain.",
  location: 'Kinshasa, RDC',
  timeZone: 'Africa/Kinshasa',
  utcLabel: 'UTC+1',
  email: 'kevinlebughe488@gmail.com',
  emailSubject: "Proposition d'alternance",
  phones: [
    { display: '+243 834 900 635', tel: '+243834900635' },
    { display: '+243 980 746 037', tel: '+243980746037' },
  ],
  /** Numéro WhatsApp au format international, chiffres seulement (pas de « + » ni d'espaces). */
  whatsapp: '243834900635',
  cv: { href: '/cv/CV-Kevin-Lebughe-Yoka.pdf', fileName: 'CV-Kevin-Lebughe-Yoka.pdf' },
} as const)

export type Social = { label: string; href: string }
/** Exemple : { label: 'GitHub', href: 'https://github.com/ton-pseudo' } */
export const socials: readonly Social[] = []

/* ------------------------------------------------------------------ */
/* Navigation et textes d'interface                                     */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const
export type SectionId = (typeof navLinks)[number]['id']
export const sectionIds: readonly SectionId[] = navLinks.map((l) => l.id)

export const ui = typo({
  skipLink: 'Aller au contenu',
  navCta: 'Me contacter',
  themeToDark: 'Passer au thème sombre',
  themeToLight: 'Passer au thème clair',
  menuOpen: 'Ouvrir le menu',
  menuClose: 'Fermer le menu',
  menuLabel: 'Menu principal',
  homeLabel: "Kevin Lebughe Yoka, retour à l'accueil",
  backToTop: 'Retour en haut',
  footerCredit: 'Conçu et développé avec React et Framer Motion',
} as const)

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
export const hero = typo({
  ctaPrimary: 'Voir mes projets',
  ctaSecondary: 'Télécharger mon CV',
  ctaSecondaryTag: 'PDF',
  ctaTertiary: 'Me contacter',
  motivation: {
    eyebrow: "Ce qui m'anime",
    title: 'Développement & intelligence artificielle',
    loop: 'construire → expérimenter → apprendre',
    link: 'Voir mes compétences',
  },
  place: {
    eyebrow: 'Basé à',
    caption: 'Heure locale · UTC+1',
  },
  photoAlt: 'Portrait de Kevin Lebughe Yoka en costume gris et cravate bleue, en pleine prise de parole',
} as const)

/* ------------------------------------------------------------------ */
/* En-têtes de sections                                                 */
/* ------------------------------------------------------------------ */
export const sections = typo({
  about: { id: 'a-propos', index: '01', label: 'À propos', title: 'Analyser avec rigueur, créer avec curiosité.' },
  skills: {
    id: 'competences',
    index: '02',
    label: 'Compétences',
    title: "Des fondations solides, un regard tourné vers l'IA.",
    intro: "Ce que je pratique au quotidien, et ce que j'explore avec passion.",
  },
  projects: {
    id: 'projets',
    index: '03',
    label: 'Projets',
    title: "Ce que je construis, ce que j'explore.",
    intro: 'Des projets concrets, académiques et personnels, menés avec soin.',
  },
  journey: {
    id: 'parcours',
    index: '04',
    label: 'Parcours',
    title: "Étape par étape, jusqu'à la Licence 3.",
    intro: 'Formation, certification et diplôme : une progression régulière.',
  },
  services: {
    id: 'services',
    index: '05',
    label: 'Services',
    title: 'Votre CV et votre portfolio en ligne, prêts en quelques jours',
    intro:
      'Un CV moderne et un site personnel qui montre concrètement ce que vous savez faire. Pour vous démarquer auprès des recruteurs, au Congo comme à l\'international.',
  },
  contact: {
    id: 'contact',
    index: '06',
    label: 'Contact',
    title: 'Vous recrutez en alternance ? Parlons-en.',
    intro: 'Le plus simple : un e-mail. Je vous réponds dans les meilleurs délais.',
  },
} as const)

/* ------------------------------------------------------------------ */
/* À propos                                                             */
/* ------------------------------------------------------------------ */
/** Chaque paragraphe est une suite de segments ; `strong: true` = phrase clé mise en avant (couleur fg). */
export type Segment = { text: string; strong?: boolean }

export const about = typo({
  paragraphs: [
    [
      { text: 'Je viens de terminer ma ' },
      { text: 'Licence 3 en Informatique de Gestion', strong: true },
      { text: " à l'École Informatique des Finances (EIF), dans le parcours " },
      { text: "Conception des Systèmes d'Information", strong: true },
      { text: ". Cette formation m'a appris à analyser un besoin, à le modéliser avec rigueur et à le transformer en solutions concrètes." },
    ],
    [
      { text: 'Ma passion : ' },
      { text: "le développement logiciel et l'intelligence artificielle", strong: true },
      { text: ". Je construis, j'expérimente et j'apprends chaque jour. Aujourd'hui, je recherche une " },
      { text: 'alternance', strong: true },
      { text: " pour mettre ces compétences au service d'une équipe et continuer à progresser." },
    ],
  ] as Segment[][],
  photoAlt: 'Kevin Lebughe Yoka à son poste de travail, devant des écrans',
  facts: [
    { icon: GraduationCap, label: 'Formation', value: 'Licence 3 en Informatique de Gestion (terminée)' },
    { icon: Route, label: 'Parcours', value: "Conception des Systèmes d'Information" },
    { icon: Languages, label: 'Langues', value: 'Français, Anglais professionnel' },
    { icon: MapPin, label: 'Basé à', value: 'Kinshasa, RDC' },
  ] as { icon: LucideIcon; label: string; value: string }[],
})

/* ------------------------------------------------------------------ */
/* Compétences (aucune barre, aucun niveau inventé)                     */
/* ------------------------------------------------------------------ */
export type SkillGroup = {
  id: 'dev' | 'ai' | 'systems' | 'tools' | 'languages'
  icon: LucideIcon
  title: string
  description: string
  items: string[]
  /** Domaine de passion en cours d'exploration : affiche le badge « En exploration » */
  exploring?: boolean
  note?: string
}

export const skills: SkillGroup[] = typo([
  {
    id: 'dev',
    icon: Braces,
    title: 'Développement',
    description: 'Les fondamentaux pour concevoir des applications claires et fiables.',
    items: ['Algorithmique', 'Python', 'JavaScript', 'HTML & CSS', 'Développement web'],
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    title: 'Intelligence artificielle',
    description: "Une passion que j'explore chaque jour : comprendre les modèles et imaginer des usages concrets.",
    items: ['Machine learning', 'IA générative & LLM', 'Prompt engineering', 'Veille technologique'],
    exploring: true,
  },
  {
    id: 'systems',
    icon: Workflow,
    title: 'Conception de systèmes',
    description: 'Le cœur de ma formation : analyser un besoin, puis le modéliser avec rigueur.',
    items: ['Analyse des besoins', 'Modélisation (Merise, UML)', 'Bases de données & SQL'],
  },
  {
    id: 'tools',
    icon: Wrench,
    title: 'Outils',
    description: 'Pour versionner, documenter et présenter mon travail.',
    items: ['Git', 'Microsoft Office (Word, Excel, PowerPoint)'],
  },
  {
    id: 'languages',
    icon: Languages,
    title: 'Langues',
    description: 'Pour travailler et documenter dans les deux langues.',
    items: ['Français', 'Anglais professionnel'],
    note: 'Certificat CALI',
  },
] as SkillGroup[])
export const exploringBadge = 'En exploration'

/* ------------------------------------------------------------------ */
/* Projets (formulations honnêtes : pas de chiffres ni de faux liens)   */
/* ------------------------------------------------------------------ */
export type ProjectStatus = 'Réalisé' | 'Académique' | 'En cours'
export type Project = {
  id: 'portfolio' | 'si' | 'ai'
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
  /** Petite note en bas de carte (facultative) */
  note?: string
  /** Illustration SVG décorative de la carte */
  art: 'bento' | 'entities' | 'network'
  /** Liens facultatifs : n'apparaissent que s'ils sont remplis */
  href?: string
  repo?: string
}

export const projects: Project[] = typo([
  {
    id: 'portfolio',
    title: 'Ce portfolio',
    description:
      'Conçu et développé de zéro avec React, TypeScript, Tailwind CSS et Framer Motion, pour une expérience fluide, rapide et accessible.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'Réalisé',
    note: 'Vous y êtes déjà.',
    art: 'bento',
  },
  {
    id: 'si',
    title: "Conception de systèmes d'information",
    description:
      'Analyse des besoins, modélisation des données et des processus, documentation technique : le cœur de mon parcours CSI.',
    tags: ['Merise', 'UML', 'SQL'],
    status: 'Académique',
    art: 'entities',
  },
  {
    id: 'ai',
    title: 'Explorations en IA',
    description:
      'Des expérimentations personnelles autour du machine learning et des modèles de langage, pour imaginer des usages concrets.',
    tags: ['Python', 'Machine learning', 'LLM'],
    status: 'En cours',
    art: 'network',
  },
] as Project[])

/* ------------------------------------------------------------------ */
/* Parcours                                                             */
/* ------------------------------------------------------------------ */
export type TimelineEntry = {
  id: 'licence' | 'cali' | 'diplome'
  period: string
  title: string
  org: string
  detail?: string
  milestones?: { label: string; period: string }[]
  checklist?: string[]
  badge?: string
}

export const timeline: TimelineEntry[] = typo([
  {
    id: 'licence',
    period: '2023 – 2026',
    title: 'Licence en Informatique de Gestion',
    org: 'École Informatique des Finances (EIFI) · Kinshasa',
    detail: "Parcours Conception des Systèmes d'Information",
    milestones: [
      { label: 'L1', period: '2023 – 2024' },
      { label: 'L2', period: '2024 – 2025' },
      { label: 'L3', period: '2025 – 2026' },
    ],
    badge: 'Licence 3 terminée',
  },
  {
    id: 'cali',
    period: '2022 – 2024',
    title: 'Certificat en anglais professionnel',
    org: 'Congo American Language Institute (CALI) · Kinshasa',
    checklist: ['Compréhension technique', 'Rédaction de documentation technique', 'Communication professionnelle'],
  },
  {
    id: 'diplome',
    period: '2021 – 2022',
    title: "Diplôme d'État — Mathématiques et Physique",
    org: 'Lycée Madame de Sévigné · Kinshasa',
  },
] as TimelineEntry[])
export const progressLabel = 'Progression'

/* ------------------------------------------------------------------ */
/* Services (aucun témoignage, aucun chiffre ni nom de client inventé)  */
/* ------------------------------------------------------------------ */
export type Pack = {
  id: 'essentiel' | 'pro' | 'premium'
  name: string
  audience: string
  /** Tarif affiché sous le nom, ex. « 50 $ ». Laisse vide pour ne rien afficher. */
  price?: string
  features: string[]
  cta: string
  /** Message pré-rempli dans WhatsApp */
  message: string
  /** Pack mis en avant (badge + couleur d'accent) */
  featured?: boolean
}

export const services = typo({
  eyebrow: 'Pack',
  featuredBadge: 'Le plus choisi',
  packs: [
    {
      id: 'essentiel',
      name: 'Pack Essentiel',
      audience: 'Pour les jeunes diplômés et les stagiaires.',
      features: [
        'Refonte moderne de votre CV (PDF)',
        "Portfolio d'une page : présentation, compétences, contact",
        'Hébergé gratuitement sur une adresse du type votrenom.vercel.app',
        'Livré en 5 jours',
        '2 séries de corrections incluses',
      ],
      cta: "Choisir l'Essentiel",
      message: 'Bonjour, je suis intéressé(e) par le Pack Essentiel pour mon CV-portfolio.',
    },
    {
      id: 'pro',
      name: 'Pack Pro',
      audience: 'Pour les professionnels en recherche active.',
      features: [
        'Refonte de votre CV avec un QR code vers votre portfolio',
        'Site complet : parcours, projets, compétences, bouton WhatsApp',
        'Votre propre nom de domaine pendant 1 an (ex. votrenom.com)',
        'Optimisation de votre profil LinkedIn',
        'Livré en 7 jours',
        '2 séries de corrections incluses',
      ],
      cta: 'Choisir le Pro',
      message: 'Bonjour, je suis intéressé(e) par le Pack Pro pour mon CV-portfolio.',
      featured: true,
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      audience: "Pour les cadres, les freelances et les profils qui visent l'international.",
      features: [
        'Tout le pack Pro',
        'CV et site en français et en anglais',
        'Une page détaillée pour chacun de vos projets',
        'Lettre de motivation rédigée',
        '1 mois de petites retouches après la mise en ligne',
        'Livré en 10 jours',
        '2 séries de corrections incluses',
      ],
      cta: 'Choisir le Premium',
      message: 'Bonjour, je suis intéressé(e) par le Pack Premium pour mon CV-portfolio.',
    },
  ] as Pack[],
  steps: {
    title: 'Comment ça marche',
    items: [
      'Vous choisissez votre pack et m\'écrivez sur WhatsApp.',
      'Vous remplissez un court questionnaire et versez 50 % d\'acompte.',
      'Je vous envoie un aperçu de votre CV et de votre site. Vous pouvez demander jusqu\'à 2 séries de corrections.',
      'Vous réglez le solde, je mets votre site en ligne et vous remets votre CV final.',
    ],
  },
  terms: {
    title: 'Conditions',
    items: [
      'Paiement : 50 % à la commande, 50 % à la livraison, par M-Pesa, Orange Money ou Airtel Money.',
      'Le délai démarre à la réception de l\'acompte et du questionnaire complet.',
      'Une série de corrections = toutes vos remarques envoyées en une seule fois. Série supplémentaire : 10 $.',
      "L'acompte n'est pas remboursable une fois le travail commencé.",
      'Après la première année, le renouvellement du nom de domaine est à votre charge.',
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        question: "Je n'ai pas de photo professionnelle, c'est un problème ?",
        answer: 'Non. Une photo nette, sur fond uni, prise avec un bon téléphone suffit.',
      },
      {
        question: 'Je ne sais pas quel pack choisir.',
        answer: 'Écrivez-moi sur WhatsApp, je vous conseille selon votre profil et votre objectif.',
      },
      {
        question: 'Combien de temps mon site reste-t-il en ligne ?',
        answer:
          "Avec l'Essentiel, il reste en ligne gratuitement. Avec le Pro et le Premium, le nom de domaine est inclus la première année, puis renouvelable chaque année.",
      },
    ],
  },
  final: {
    title: 'Prêt à vous démarquer ?',
    cta: 'Discuter sur WhatsApp',
    message: "Bonjour, j'aimerais avoir mon CV-portfolio. Pouvez-vous me conseiller ?",
  },
})

/** Lien WhatsApp qui ouvre la conversation avec un message pré-rempli. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */
export const contact = typo({
  availability: 'Disponible pour une alternance',
  eyebrow: 'Écrivez-moi',
  send: 'Envoyer un e-mail',
  copy: "Copier l'adresse",
  copied: 'Adresse copiée',
  phoneEyebrow: 'Téléphone',
  call: 'Appeler',
  socialsEyebrow: 'Réseaux',
} as const)

/* ------------------------------------------------------------------ */
/* Typographie française automatique                                    */
/* ------------------------------------------------------------------ */
function fixFrench(s: string): string {
  // Leave URLs, paths, e-mail addresses and raw phone numbers untouched.
  if (s.includes('/') || s.includes('@') || /^\+?\d+$/.test(s)) return s
  const NBSP = ' '
  const NNBSP = ' '
  return s
    .replace(/ ([:»])/g, `${NBSP}$1`)
    .replace(/« /g, `«${NBSP}`)
    .replace(/ ([?!;])/g, `${NNBSP}$1`)
    .replace(/Licence (\d)/g, `Licence${NBSP}$1`)
    .replace(/(\d) ([%$])/g, `$1${NBSP}$2`) // « 50 % », « 10 $ »
    .replace(/ · /g, `${NBSP}· `) // never start a line with « · »
    .replace(/(\+\d{3}) (\d{3}) (\d{3}) (\d{3})/g, `$1${NBSP}$2${NBSP}$3${NBSP}$4`)
}

/** Applies French typography to every string of a data structure (icons and other values pass through). */
function typo<T>(value: T): T {
  if (typeof value === 'string') return fixFrench(value) as T
  if (Array.isArray(value)) return value.map((v) => typo(v)) as T
  if (
    value !== null &&
    typeof value === 'object' &&
    !('$$typeof' in value) && // React components (icons) pass through untouched
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typo(v)])) as T
  }
  return value
}
