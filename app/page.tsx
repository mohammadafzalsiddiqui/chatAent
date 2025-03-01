import { ChatWindow } from "@/components/ChatWindow"

export default function Home() {
	const InfoCard = (
	<div>
			<h1 className="text-5xl md:text-7xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">Chat Agent</h1>

			<p></p>
			</div>
	)
	return (
		<ChatWindow
			endpoint="api/hello"
			emoji="🤖"
			titleText="Aptos agent"
			placeholder="I'm your friendly Aptos agent! Ask me anything..."
			emptyStateComponent={InfoCard}
		></ChatWindow>
	)
}