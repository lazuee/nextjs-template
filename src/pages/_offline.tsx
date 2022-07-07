import { Components } from "@/components";
import { Layout } from "@/layouts";

export default function Offline() {
	return (
		<Layout.Default title="Offline">
			<div>
				<p className="tw-mb-8">Beep. Beep Big. It seems to be offline. Can you connect to the internet and click the button below again to connect?</p>
				<div className="tw-flex tw-flex-row tw-justify-start">
					<Components.Button.Default>
						<Components.Link href="/">reconnect</Components.Link>
					</Components.Button.Default>
				</div>
			</div>
		</Layout.Default>
	);
}
