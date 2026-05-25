/**
 * Portfolio data — voeg hier elke nieuwe klus toe.
 *
 * Schrijfstijl voor 'description':
 *   1. Wat & Waar  — "Op een [woningtype] in [plaats] is [type werk] uitgevoerd."
 *   2. Aanpak      — Feitelijk: materialen, methode, omvang.
 *   3. Resultaat   — Wat is het eindresultaat / wat is bereikt.
 *
 * Geen emoji, geen uitroeptekens, geen hashtags — informatief en neutraal.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  /** Eerste afbeelding is de hoofd-foto. Daarna max. 3 extra thumbnails. */
  images: string[];
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'dakrenovatie-zevenhuizen-2024',
    title: 'Volledige dakrenovatie woonhuis',
    category: 'Dakrenovatie',
    location: 'Zevenhuizen',
    date: 'Maart 2024',
    images: [
      '/room-interior-renovation-indoor-paint.jpg',
      '/construction-hammer-indoors-still-life.jpg',
    ],
    description:
      'Op een vrijstaande woning in Zevenhuizen is het volledige dak gerenoveerd. De bestaande dakbedekking is verwijderd en vervangen door een EPDM-systeem met bijbehorende isolatielaag. Tevens zijn de dakgoten en hemelwaterafvoeren vernieuwd. Het werk is uitgevoerd conform de geldende normen voor woongebouwen en opgeleverd binnen de afgesproken termijn.',
    tags: ['EPDM', 'Isolatie', 'Dakgoten', 'Renovatie'],
  },
  {
    id: 'aanbouw-groningen-2024',
    title: 'Realisatie woonkamer aanbouw',
    category: 'Aanbouw',
    location: 'Groningen',
    date: 'Juni 2024',
    images: [
      '/man-working-factory.jpg',
      '/worker-is-cutting-wires-with-lineman-s-pliers.jpg',
    ],
    description:
      'Aan een tussenwoning in Groningen is een aanbouw van 18 m² gerealiseerd. De constructie bestaat uit een betonnen fundering, gemetselde buitenmuren en een plat dak. Kozijnen en deuren zijn voorzien van hoogwaardig isolerende kunststof profielen. De aanbouw is volledig geïsoleerd en aangesloten op de bestaande verwarming.',
    tags: ['Fundering', 'Metselwerk', 'Kunststofkozijnen', 'Aanbouw'],
  },
  {
    id: 'gevelrenovatie-leek-2025',
    title: 'Gevelrenovatie en schilderwerk',
    category: 'Gevel & Schilderwerk',
    location: 'Leek',
    date: 'Februari 2025',
    images: [
      '/silhouette-man-wearing-white-hard-hat-is-just-slightly-visible-due-dark-shadows.jpg',
      '/silhouette-person-city.jpg',
    ],
    description:
      'Op een jaren-70 woning in Leek zijn de buitengevel en gevelelementen volledig gerenoveerd. Beschadigde voegen zijn hersteld en de gevelsteen is gereinigd. Alle houten kozijnen, daklijsten en boeiboorden zijn ontlakt, voorbehandeld en voorzien van een duurzame buitenverf. De kleurstelling is in overleg met de opdrachtgever bepaald.',
    tags: ['Gevelreiniging', 'Voegwerk', 'Schilderwerk', 'Kozijnen'],
  },
];
