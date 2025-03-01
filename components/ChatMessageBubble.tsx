import markdownToHtml from "@/utils/markdownToHtml"
import type { Message } from "ai/react"
import { useMemo } from "react"

export function ChatMessageBubble(props: {
	message: Message
	aiEmoji?: string
	sources: any[]
}) {
	const colorClassName = props.message.role === "user" 
		? "bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md" 
		: "bg-gradient-to-r from-slate-100 to-slate-200 text-black shadow-md";
	const alignmentClassName = props.message.role === "user" ? "ml-auto" : "mr-auto"
	const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji

	const content = useMemo(() => {
		return markdownToHtml(props.message.content)
	}, [props.message.content])

	return (
		<div className={`${alignmentClassName} ${colorClassName} rounded-xl px-5 py-3 max-w-[80%] mb-6 flex`}>
			<div className="mr-3 text-xl">{prefix}</div>
			<div className="whitespace-pre-wrap flex flex-col">
				<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
				{props.sources && props.sources.length ? (
					<>
						<code className="mt-4 mr-auto bg-slate-700 px-3 py-1 rounded-lg text-white">
							<h2 className="text-sm font-bold m-0">🔍 Sources:</h2>
						</code>
						<code className="mt-2 mr-2 bg-slate-700 px-3 py-2 rounded-lg text-xs text-white">
							{props.sources?.map((source, i) => (
								<div className="mt-2" key={"source:" + i}>
									{i + 1}. &quot;{source.pageContent}&quot;
									{source.metadata?.loc?.lines !== undefined ? (
										<div className="mt-1 text-gray-300">
											Lines {source.metadata?.loc?.lines?.from} to {source.metadata?.loc?.lines?.to}
										</div>
									) : (
										""
									)}
								</div>
							))}
						</code>
					</>
				) : (
					""
				)}
			</div>
		</div>
	)
}