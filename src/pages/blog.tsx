import { Components } from "@/components";
import { Layout } from "@/layouts";

export default function Blog() {
	return (
		<Layout.Default title="Blog">
			<div className="tw-flex tw-flex-col">
				<p className="tw-mb-8">This page still under construction..</p>
				<div className="tw-flex tw-justify-start">
					<Components.Button.Default>
						<Components.Link href="/">back to home</Components.Link>
					</Components.Button.Default>
				</div>
			</div>
		</Layout.Default>
	);
}
