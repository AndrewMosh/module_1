import { Layout } from "../../Components/Layout/Layout"
import { CardSelection } from "../../Components/CardSelection/CardSelection"
import Features from "@components/Features/Features"
import ExchangeRates from "@components/ExchangeRates/ExchangeRates"
import { Map } from "@components/Map/Map"
import { NewsLetter } from "@components/NewsLetter/NewsLetter"
export default function Home() {
	return (
		<Layout>
			<CardSelection />
			<Features />
			<ExchangeRates />
			<Map />
			<NewsLetter />
		</Layout>
	)
}