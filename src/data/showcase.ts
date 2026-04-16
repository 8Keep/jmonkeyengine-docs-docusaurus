export type ShowcaseLink = {
  label: string;
  href: string;
};

export type ShowcaseEntry = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  body: string[];
  links: ShowcaseLink[];
  gallery: string[];
};

export const showcaseEntries: ShowcaseEntry[] = [
  {
    slug: 'collect-the-10s',
    title: 'Collect The 10s',
    tagline: 'A 3D card game focused on online play, rankings, and strong AI opponents.',
    cover: '/images/showcase/c10/0.webp',
    links: [
      {label: 'Official Site', href: 'https://collectthe10s.com/'},
      {label: 'Itch.io', href: 'https://collectthe10s.itch.io/collect-the-10s'},
      {label: 'Download', href: 'https://collectthe10s.com/download'},
      {label: 'Rankings', href: 'https://collectthe10s.com/rankings'},
    ],
    body: [
      'A playing card game inspired by the popular Indian game mendikot, mindi cot, and dehla pakad, brought to life in a 3D world.',
      'Players can enter a game room, walk around, sit at a table, and start playing with online rankings, ELO-style progression, and world and country leaderboards.',
      'Single-player modes are also available through ladder and round-robin tournaments, with higher difficulties driven by fine-tuned AI opponents.',
    ],
    gallery: [
      '/images/showcase/c10/1.webp',
      '/images/showcase/c10/2.webp',
      '/images/showcase/c10/3.webp',
      '/images/showcase/c10/4.webp',
      '/images/showcase/c10/5.webp',
      '/images/showcase/c10/6.webp',
      '/images/showcase/c10/7.webp',
      '/images/showcase/c10/8.webp',
      '/images/showcase/c10/9.webp',
      '/images/showcase/c10/10.webp',
      '/images/showcase/c10/11.webp',
      'youtube:c7B6r9fTa3M',
      'youtube:BU9sJGhm9lI',
      'youtube:H1Qqpr-txtc',
    ],
  },
  {
    slug: 'depthris',
    title: 'DEPTHRIS',
    tagline: 'A 3D puzzle game inspired by classic DOS-era falling-block design.',
    cover: '/images/showcase/depthris/1.webp',
    links: [{label: 'Itch.io', href: 'https://codewalker.itch.io/depthris'}],
    body: [
      'DEPTHRIS is a 3D puzzle game inspired by classic DOS titles.',
      'Players move and rotate pieces so they fit the open spaces and fill as many floors as possible.',
      'As each level progresses, the pieces fall faster and the tension ramps up.',
    ],
    gallery: [
      '/images/showcase/depthris/1.webp',
      '/images/showcase/depthris/2.webp',
      '/images/showcase/depthris/3.webp',
      '/images/showcase/depthris/4.webp',
      '/images/showcase/depthris/5.webp',
      '/images/showcase/depthris/6.webp',
    ],
  },
  {
    slug: 'lightspeed-frontier',
    title: 'Lightspeed Frontier',
    tagline: 'A sci-fi sandbox about modular starships, factions, and frontier-scale exploration.',
    cover: '/images/showcase/ls_frontier/5.jpg',
    links: [{label: 'Steam', href: 'https://store.steampowered.com/app/548650/Lightspeed_Frontier/'}],
    body: [
      'Lightspeed Frontier is a sci-fi sandbox adventure where players captain and customize modular ships on the edge of the galaxy.',
      'You can take on open-ended missions, invest in the galactic economy, fight pirates and corporations, and slowly upgrade your vessel from a tiny command pod to high-end late-game ship classes.',
      'Faction-driven parts, exploration, ship combat, and persistent consequences shape how you build your path through the frontier.',
    ],
    gallery: [
      '/images/showcase/ls_frontier/1.jpg',
      '/images/showcase/ls_frontier/2.jpg',
      '/images/showcase/ls_frontier/3.jpg',
      '/images/showcase/ls_frontier/4.jpg',
      '/images/showcase/ls_frontier/6.jpg',
      '/images/showcase/ls_frontier/7.jpg',
      '/images/showcase/ls_frontier/8.jpg',
      '/images/showcase/ls_frontier/9.jpg',
      '/images/showcase/ls_frontier/10.jpg',
      '/images/showcase/ls_frontier/11.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/256676876/movie_max.webm',
    ],
  },
  {
    slug: 'mythruna',
    title: 'Mythruna',
    tagline: 'A living sandbox RPG blending building, role-playing, and procedural worlds.',
    cover: '/images/showcase/mythruna/11.jpg',
    links: [{label: 'Official Site', href: 'http://mythruna.com/'}],
    body: [
      'Mythruna aims to combine serious role-playing elements with an endless, living, and completely modifiable sandbox world.',
      'Its focus is on long-term player creativity inside a procedural world that supports both exploration and deep building.',
      'The project highlights jMonkeyEngine’s flexibility for ambitious simulation-heavy world design.',
    ],
    gallery: [
      '/images/showcase/mythruna/1.jpg',
      '/images/showcase/mythruna/2.png',
      '/images/showcase/mythruna/3.png',
      '/images/showcase/mythruna/4.jpg',
      '/images/showcase/mythruna/5.jpg',
      '/images/showcase/mythruna/6.jpg',
      '/images/showcase/mythruna/7.jpg',
      '/images/showcase/mythruna/8.jpg',
      '/images/showcase/mythruna/9.jpg',
      '/images/showcase/mythruna/10.jpg',
      '/images/showcase/mythruna/12.jpg',
      '/images/showcase/mythruna/13.jpg',
      '/images/showcase/mythruna/14.jpg',
      '/images/showcase/mythruna/15.jpg',
      '/images/showcase/mythruna/16.jpg',
      '/images/showcase/mythruna/17.jpg',
      '/images/showcase/mythruna/18.png',
      '/images/showcase/mythruna/19.png',
      '/images/showcase/mythruna/20.png',
      'youtube:tp_g9dvqwY0',
    ],
  },
  {
    slug: 'skullstone',
    title: 'Skullstone',
    tagline: 'A retro-styled grid-based dungeon crawler RPG with tactical combat and party progression.',
    cover: '/images/showcase/skullstone/7.jpg',
    links: [{label: 'Official Site', href: 'http://skullstonegame.com/'}],
    body: [
      'Skullstone is a retro-inspired dungeon crawler in the tradition of Dungeon Master, Stonekeep, and Eye of the Beholder.',
      'Players lead a party of mercenaries through puzzle-filled and monster-packed dungeons, gathering gear, experience, and new abilities while uncovering the game’s story.',
      'Combat is a major focus, with enemies that can fight in melee, at range, and through area attacks while applying debuffs and battlefield pressure.',
    ],
    gallery: [
      '/images/showcase/skullstone/2.jpg',
      '/images/showcase/skullstone/1.jpg',
      '/images/showcase/skullstone/3.jpg',
      '/images/showcase/skullstone/4.jpg',
      '/images/showcase/skullstone/5.jpg',
      '/images/showcase/skullstone/6.jpg',
      '/images/showcase/skullstone/8.jpg',
      '/images/showcase/skullstone/9.jpg',
      '/images/showcase/skullstone/10.jpg',
      '/images/showcase/skullstone/11.jpg',
      '/images/showcase/skullstone/12.jpg',
      '/images/showcase/skullstone/13.jpg',
      '/images/showcase/skullstone/14.jpg',
      '/images/showcase/skullstone/15.jpg',
      '/images/showcase/skullstone/16.jpg',
      '/images/showcase/skullstone/17.jpg',
      '/images/showcase/skullstone/18.jpg',
      '/images/showcase/skullstone/19.jpg',
      'youtube:AnqzGANkPG8',
    ],
  },
  {
    slug: 'spoxel',
    title: 'Spoxel',
    tagline: 'A voxel adventure built around exploration, crafting, and custom spell systems.',
    cover: '/images/showcase/spoxel/7.jpg',
    links: [
      {label: 'Official Site', href: 'http://epagagames.com/spoxel/'},
      {label: 'Steam', href: 'https://store.steampowered.com/app/746880/Spoxel/'},
    ],
    body: [
      'Spoxel is an exploration and crafting game about fighting back against hostile forces while building up your own foothold in a vast world.',
      'It mixes infinite-world exploration, multidimensional progression, crafted gear, runes, and custom spell creation with base building and survival pressure.',
      'The project is a strong example of the engine supporting a distinct art direction alongside systemic gameplay.',
    ],
    gallery: [
      '/images/showcase/spoxel/1.jpg',
      '/images/showcase/spoxel/2.jpg',
      '/images/showcase/spoxel/3.jpg',
      '/images/showcase/spoxel/4.jpg',
      '/images/showcase/spoxel/5.jpg',
      '/images/showcase/spoxel/6.jpg',
      '/images/showcase/spoxel/8.jpg',
      'https://steamcdn-a.akamaihd.net/steam/apps/256746524/movie480.webm',
      'https://steamcdn-a.akamaihd.net/steam/apps/256746530/movie480.webm',
    ],
  },
];

export const showcaseBySlug = Object.fromEntries(showcaseEntries.map((entry) => [entry.slug, entry])) as Record<string, ShowcaseEntry>;
