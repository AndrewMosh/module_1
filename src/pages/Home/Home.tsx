import { Layout } from "../../Components/Layout/Layout"
import { CardSelection } from "../../Components/CardSelection/CardSelection"
import Features from "@components/Features/Features"
export default function Home() {
	return (
		<Layout>
			<CardSelection />
			<Features />
		</Layout>
	)
}