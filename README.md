# Portfolio · Kevin Lebughe Yoka

Portfolio personnel : développeur passionné d'intelligence artificielle, Licence 3 en Informatique de Gestion terminée (EIF, Kinshasa).

Construit avec **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4** et **Framer Motion**. Thème clair et sombre, animations fluides qui respectent le réglage « réduire les animations » du système, mise en page adaptée du téléphone (320 px) au grand écran.

## Lancer le site sur ton ordinateur

Il faut [Node.js](https://nodejs.org) (version 20 ou plus récente).

```bash
npm install      # une seule fois : installe les dépendances
npm run dev      # lance le site sur http://localhost:5173
```

Le site se recharge tout seul à chaque modification d'un fichier.

## Modifier le contenu

Tous les textes sont dans **`src/data/profile.ts`** : identité, accroche, compétences, projets, parcours, contact.
Écris normalement : les espaces insécables du français (avant `:` `?` `!`, dans « Licence 3 », dans les numéros) sont ajoutées automatiquement.

| Je veux changer… | Où |
|---|---|
| Un texte, une compétence, un projet | `src/data/profile.ts` |
| Ajouter GitHub ou LinkedIn | `socials` dans `src/data/profile.ts`, par exemple `{ label: 'GitHub', href: 'https://github.com/ton-pseudo' }` |
| Le CV téléchargeable | remplace `public/cv/CV-Kevin-Lebughe-Yoka.pdf` (garde le même nom) |
| Les photos | `src/assets/photos/` (formats AVIF et WebP, voir `index.ts`) |
| Les couleurs | les variables en haut de `src/index.css` (thème clair puis thème sombre) |

## À vérifier avant de publier

- **Le CV PDF** indique encore « Licence 2 ». Mets-le à jour pour qu'il corresponde au site.
- **Les compétences techniques** (Python, JavaScript, Git, Merise, UML, SQL…) ont été ajoutées à partir de ta passion pour le développement et l'IA : garde seulement celles que tu maîtrises.
- **Les projets** sont formulés honnêtement (ce portfolio, la conception de systèmes d'information, tes explorations en IA). Remplace-les ou complète-les par tes vrais projets dès que possible, avec leurs liens.
- **Les réseaux** : ajoute tes liens GitHub et LinkedIn s'ils existent.

## Mettre le site en ligne (gratuit)

1. Construis la version finale :
   ```bash
   npm run build     # crée le dossier dist/
   npm run preview   # vérifie la version finale sur http://localhost:4173
   ```
2. Dans `index.html`, remplace `/og-image.png` par l'adresse complète de ton site (par exemple `https://ton-site.vercel.app/og-image.png`). C'est l'image qui s'affiche quand tu partages le lien sur WhatsApp ou LinkedIn.
3. Publie le dossier `dist/` sur l'un de ces services :
   - **Vercel** ou **Netlify** : crée un compte, importe le projet (depuis GitHub ou par glisser-déposer du dossier `dist/`). Les réglages Vite sont détectés automatiquement.
   - **GitHub Pages** : possible aussi, avec l'option `base` de Vite si le site n'est pas à la racine du domaine.

## Structure

```
src/
  data/profile.ts        tout le contenu du site
  sections/              Hero, À propos, Compétences, Projets, Parcours, Services, Contact
  components/layout/     barre de navigation, menu mobile, pied de page
  components/ui/         boutons, tuiles, pastilles, en-têtes de section, photos
  lib/motion.ts          réglages des animations (durées, courbes, ressorts)
  index.css              couleurs, typographie, grille
public/cv/               le CV téléchargeable
```

## Commandes utiles

| Commande | Rôle |
|---|---|
| `npm run dev` | site en développement |
| `npm run build` | vérification TypeScript puis version finale dans `dist/` |
| `npm run preview` | aperçu de la version finale |
| `npm run lint` | analyse du code |
