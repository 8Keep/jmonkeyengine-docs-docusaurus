import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'jMonkeyEngine Docs',
  tagline: 'Experimental Docusaurus migration of the jMonkeyEngine wiki',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://8keep.github.io',
  baseUrl: '/jmonkeyengine-docs-docusaurus/',
  organizationName: '8Keep',
  projectName: 'jmonkeyengine-docs-docusaurus',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/8Keep/jmonkeyengine-docs-docusaurus/tree/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'jMonkeyEngine Docs',
      logo: {
        alt: 'jMonkeyEngine',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/docs/documentation',
          label: 'Docs',
          position: 'left',
        },
        {
          to: '/docs/wiki/wiki_contributor',
          label: 'Contribute',
          position: 'left',
        },
        {
          href: 'https://javadoc.jmonkeyengine.org',
          label: 'JavaDoc',
          position: 'right',
        },
        {
          href: 'https://github.com/8Keep/jmonkeyengine-docs-docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/documentation',
            },
            {
              label: 'Contributing',
              to: '/docs/wiki/wiki_contributor',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://hub.jmonkeyengine.org',
            },
            {
              label: 'Store',
              href: 'https://store.jmonkeyengine.org',
            },
          ],
        },
        {
          title: 'Source',
          items: [
            {
              label: 'Migration Repo',
              href: 'https://github.com/8Keep/jmonkeyengine-docs-docusaurus',
            },
            {
              label: 'Original Wiki',
              href: 'https://github.com/jMonkeyEngine/wiki',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} jMonkeyEngine contributors. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['java', 'groovy', 'bash', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
