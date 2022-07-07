import { Components } from "@/components";
import { Layout } from "@/layouts";
import React from "react";

export default function Home() {
	return (
		<Layout.Default title="Hello">
			<div className="tw-flex tw-flex-col tw-gap-y-8">
				<div className="tw-flex tw-flex-col tw-gap-y-4">
					<p>
						I&apos;m <span className="tw-font-semibold">Lazuee</span> a code-enthusiast.
					</p>
					<h3>Bio</h3>
					<ul className="tw-font-semibold">
						<li>👨‍🎓 Student from Philippines</li>
						<li>💻 MERN Stack Developer</li>
						<li>🐱‍👤 I love reading Manga</li>
					</ul>
					<h3>Languages and Tools</h3>
					<ul className="tw-font-semibold">
						<li>💻 Javascript</li>
						<li>💻 TypeScript</li>
						<li>💻 React</li>
						<li>💻 Next.js</li>
						<li>💻 Node.js</li>
						<li>💻 MongoDB</li>
					</ul>
					<h3>Contact</h3>
					<ul className="tw-font-semibold">
						<li>
							<Components.Link href="mailto:lazuee.dev@gmail.com"> Email</Components.Link>
						</li>
						<li>
							<Components.Link href="https://github.com/lazuee"> Github</Components.Link>
						</li>
						<li>
							<Components.Link href="https://facebook.com/lazuee"> Facebook</Components.Link>
						</li>
						<li>
							<Components.Link href="https://twitter.com/lazuee"> Twitter</Components.Link>
						</li>
					</ul>
				</div>
			</div>
		</Layout.Default>
	);
}
