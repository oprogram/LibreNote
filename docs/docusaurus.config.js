const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
	title: 'LibreNote',
	url: 'https://librenote.org',
	baseUrl: '/',
	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'LibreNoteBot',
	projectName: 'LibreNote',

	presets: [
		[
			'@docusaurus/preset-classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					editUrl: 'https://github.com/librenotebot/librenote/edit/main/docs/',
					routeBasePath: '/',
				},
			}),
		],
	],

	themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
    	navbar: {
    	title: 'LibreNote',
    		logo: {
    			alt: 'LibreNote Logo',
    			src: 'img/lnlogo.png',
    		},
    		items: [
    			{
    				type: 'doc',
    				docId: 'readme',
    				position: 'left',
    				label: 'Documentation',
    			},
    		],
    	},
    	footer: {
    		style: 'dark',
    		links: [],
    		copyright: `Copyright © ${new Date().getFullYear()} Ulferno & the LibreNote team.`,
    	},
    	prism: {
    		theme: darkCodeTheme,
    	},
    }),
});
