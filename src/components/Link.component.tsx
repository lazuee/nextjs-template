import NextLink from "next/link";

enum LinkType {
	Internal = 0,
	External = 1,
}

const getLinkType = (href: string): LinkType => {
	if (/^[a-z]+\:\/\/.+$/.test(href)) return LinkType.External;
	return LinkType.Internal;
};

export function Link(props: any) {
	const { href, children, className = "" } = props;

	switch (getLinkType(href)) {
		case LinkType.Internal: {
			return (
				<NextLink href={href}>
					<a {...props} className={className}>
						{children}
					</a>
				</NextLink>
			);
		}

		case LinkType.External: {
			return (
				<a href={href} target="_blank" rel="noopener noreferrer" {...props} className={className}>
					{children}
				</a>
			);
		}
	}
}
