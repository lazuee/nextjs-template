import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import NextNprogress from "nextjs-progressbar";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" value={{ dark: "tw-dark", light: "tw-light" }}>
			<NextNprogress color="#F96F6F" startPosition={0.3} stopDelayMs={80} height={3} showOnShallow={true} />
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
			</Head>
			<Component {...pageProps} />
		</ThemeProvider>
	);
};

export default App;
