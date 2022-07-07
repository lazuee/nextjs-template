import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

import { useSettings } from "@/hooks/use-settings";
import { Components } from "@/components";

const getNodeText = (node: ReactNode): string => {
	if (typeof node === "number" || typeof node === "boolean") {
		return node.toString();
	}
	if (typeof node === "string") return node;
	if (node instanceof Array) return node.map(getNodeText).join("");
	if (node && typeof node === "object") {
		return getNodeText((node as any).props.children);
	}
	return "";
};

function NavItem({ currentPath, href, content }: { currentPath: string; href: string; content: ReactNode | string }) {
	if (currentPath.startsWith(href)) {
		return (
			<Components.Link href={href} className="tw-flex tw-items-center tw-justify-center">
				<div
					aria-label={typeof content === "string" ? content : ""}
					className="tw-flex tw-items-center tw-justify-center tw-h-10 tw-font-semibold tw-text-black tw-text-md dark:tw-text-white">
					{content}
				</div>
			</Components.Link>
		);
	}

	return (
		<Components.Link href={href} className="tw-flex tw-items-center tw-justify-center">
			<div
				aria-label={typeof content === "string" ? content : ""}
				className="tw-flex tw-items-center tw-justify-center tw-h-10 tw-font-semibold tw-text-gray-600 tw-text-md dark:tw-text-gray-500 hover:tw-text-black dark:hover:tw-text-white">
				{content}
			</div>
		</Components.Link>
	);
}

export function Default({
	children,
	title,
	heading,
	description,
	type,
	image,
	date,
}: {
	children?: ReactNode;
	title?: string;
	heading?: ReactNode;
	description?: string;
	type?: string;
	image?: string;
	date?: string;
}) {
	const { maxWidth } = useSettings();

	const router = useRouter();
	const variants = {
		hidden: { opacity: 0, x: 0, y: 20 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: 20 },
	};

	// After mounting, we have access to the theme
	useEffect(() => {
		return function cleanup() {
			document.body.style.overflow = "";
		};
	}, []);

	const meta = {
		title: (title && `${title} • Lazuee Dev`) ?? (getNodeText(heading) && `${getNodeText(heading)} • Lazuee Dev`) ?? "Lazuee Dev",
		description: description ?? "The best way to learn web development",
		type: type ?? "website",
		image,
		date,
	};

	return (
		<div>
			<div>
				<Head>
					<title>{meta.title}</title>
					<meta name="robots" content="follow, index" />
					<meta content={meta.description} name="description" />
					<meta property="og:url" content={`https://lazuee.ga${router.asPath}`} />
					<link rel="canonical" href={`https://lazuee.ga${router.asPath}`} />
					<meta property="og:type" content={meta.type} />
					<meta property="og:site_name" content="Lazuee Dev" />
					<meta property="og:description" content={meta.description} />
					<meta property="og:title" content={meta.title} />
					<meta property="og:image" content={meta.image} />
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@lazuee" />
					<meta name="twitter:title" content={meta.title} />
					<meta name="twitter:description" content={meta.description} />
					<meta name="twitter:image" content={meta.image} />
					{meta.date && <meta property="article:published_time" content={meta.date} />}
				</Head>

				<nav className={classNames("tw-bg-bg dark:tw-bg-dark-bg tw-flex tw-flex-col tw-justify-center tw-px-4 sm:tw-px-8 tw-top-0 tw-z-50")}>
					<div
						className="tw-relative tw-flex tw-items-center tw-justify-between tw-w-full tw-py-4 tw-mx-auto"
						style={{
							maxWidth,
						}}>
						<div className="tw-grid tw-grid-flow-col tw-gap-x-4">
							<NavItem currentPath={router.asPath} href="/blog" content="Blog" />
							<NavItem currentPath={router.asPath} href="https://read.cv/lazuee" content="Resume" />
						</div>
					</div>
				</nav>

				<motion.main
					initial="hidden"
					animate="enter"
					exit="exit"
					variants={variants}
					transition={{ duration: 0.3, type: "easeInOut" }}
					className="tw-flex tw-flex-col tw-w-full tw-min-h-screen tw-px-4 tw-border-b-2 sm:tw-px-8">
					<article
						className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-mx-auto tw-mb-16"
						style={{
							maxWidth,
						}}>
						<div className="tw-font-extrabold tw-text-[2.5rem] sm:tw-text-[2.8rem] tw-tracking-tight tw-text-black dark:tw-text-white tw-mb-8">
							{heading ?? title ?? ""}
						</div>
						{children}
					</article>
				</motion.main>
			</div>

			<div className="tw-fixed tw-z-50 tw-right-4 tw-bottom-4 sm:tw-right-8 sm:tw-bottom-auto sm:tw-top-28">
				<Components.Toolbar />
			</div>
		</div>
	);
}
