import { Components } from "@/components";
import { Layout } from "@/layouts";

export default function NotFound() {
	return (
		<Layout.Default title="404">
			<div className="tw-flex tw-flex-col">
				<p className="tw-mb-8">I cannot find the page..</p>
				<div className="tw-flex tw-justify-start">
					<Components.Button.Default>
						<Components.Link href="/">back to home</Components.Link>
					</Components.Button.Default>
				</div>
			</div>
		</Layout.Default>
	);
}
