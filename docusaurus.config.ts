import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'jMonkeyEngine',
  tagline: 'Website and documentation migration in Docusaurus',
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
        blog: {
          showReadingTime: true,
          blogTitle: 'News',
          blogDescription: 'Development updates, releases, and community news',
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 10,
          onUntruncatedBlogPosts: 'ignore',
          editUrl: 'https://github.com/8Keep/jmonkeyengine-docs-docusaurus/tree/master/',
        },
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
      title: 'jMonkeyEngine',
      logo: {
        alt: 'jMonkeyEngine',
        src: 'images/jme-logo.png',
      },
      items: [
        {
          to: '/',
          label: 'Home',
          position: 'left',
        },
        {
          to: '/showcase',
          label: 'Showcase',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'News',
          position: 'left',
        },
        {
          to: '/docs/documentation',
          label: 'Docs',
          position: 'left',
        },
        {
          to: '/license',
          label: 'License',
          position: 'left',
        },
        {
          href: 'https://hub.jmonkeyengine.org',
          label: 'Discussions',
          position: 'right',
        },
        {
          href: 'https://library.jmonkeyengine.org',
          label: 'Library',
          position: 'right',
        },
        {
          href: 'https://javadoc.jmonkeyengine.org',
          label: 'JavaDoc',
          position: 'right',
        },
        {
          href: 'https://github.com/jMonkeyEngine/jmonkeyengine',
          label: 'Engine',
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
          title: 'Site',
          items: [
            {
              label: 'Quick Start',
              to: '/start',
            },
            {
              label: 'Features',
              to: '/features',
            },
            {
              label: 'Donate',
              to: '/donate',
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
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/documentation',
            },
            {
              label: 'Contributing',
              to: '/contribute',
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
