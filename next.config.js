const MangleCSSPlugin = require("mangle-css-class-webpack-plugin");
const withPlugins = require("next-compose-plugins");
const incstr = require("incstr");
const classNames = {};

function MangleCSS() {
	const generateClassName = incstr.idGenerator({
		alphabet: "abcdefghijklmnopqrstuvwxyz",
	});

	return new MangleCSSPlugin({
		classNameRegExp: "(([a-zA-Z-:]*)[\\\\\\\\]*:)*([\\\\\\\\]*!)?tw-[a-zA-Z-]([a-zA-Z0-9-]*([\\\\\\\\]*(\\%|\\#|\\.|\\[|\\]))*)*",
		classGenerator: (original, opts, context) => {
			if (classNames[original]) return classNames[original];
			let nextId;

			do {
				// Class name cannot start with a number.
				nextId = generateClassName();
			} while (/^[0-9_-]/.test(nextId));

			return (classNames[original] = nextId);
		},
	});
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com cdn.jsdelivr.net;
  child-src 'self' *.youtube.com *.google.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com cdn.jsdelivr.net;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self' fonts.gstatic.com;
  worker-src 'self' blob:;
`;

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\n/g, ""),
	},
	{
		key: "Referrer-Policy",
		value: "origin-when-cross-origin",
	},
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains; preload",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx"],
	images: {
		domains: ["img.shields.io"],
		formats: ["image/avif", "image/webp"],
	},

	webpack: (config, { dev, isServer }) => {
		config.module.rules.push({
			test: /\.(png|jpe?g|gif|mp4)$/i,
			use: [
				{
					loader: "file-loader",
					options: {
						publicPath: "/_next",
						name: "static/media/[name].[hash].[ext]",
					},
				},
			],
		});

		config.plugins.push(MangleCSS());

		if (!dev && !isServer) {
			// Replace React with Preact only in client production build
			Object.assign(config.resolve.alias, {
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat",
			});
		}
		return config;
	},
	async headers() {
		return [
			{
				source: "/",
				headers: securityHeaders,
			},
			{
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
};

module.exports = withPlugins([
	[
		[withBundleAnalyzer],
		[
			withPWA,
			{
				pwa: {
					dest: "public",
					disable: process.env.NODE_ENV === "development",
				},
			},
		],
	],
	nextConfig,
]);
