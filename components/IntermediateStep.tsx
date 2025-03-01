import type { Message } from "ai/react"
import { useState } from "react"

export function IntermediateStep(props: { message: Message }) {
	const parsedInput = JSON.parse(props.message.content)
	const action = parsedInput.action
	const observation = parsedInput.observation
	const [expanded, setExpanded] = useState(false)
	return (
		<div
			className={`ml-auto bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl px-4 py-3 max-w-[80%] mb-6 whitespace-pre-wrap flex flex-col shadow-md`}
		>
			<div className={`text-right ${expanded ? "w-full" : ""}`} onClick={(e) => setExpanded(!expanded)}>
				<code className="mr-2 bg-slate-700 px-3 py-1 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">
					🛠 <b>{action.name}</b>
				</code>
				<span className={`${expanded ? "hidden" : ""} text-lg ml-1`}>🔽</span>
				<span className={`${expanded ? "" : "hidden"} text-lg ml-1`}>🔼</span>
			</div>
			<div
				className={`overflow-hidden max-h-[0px] transition-[max-height] duration-500 ease-in-out ${expanded ? "max-h-[360px]" : ""}`}
			>
				<div
					className={`bg-slate-700 rounded-lg p-4 mt-2 max-w-0 ${expanded ? "max-w-full" : "transition-[max-width] delay-100"}`}
				>
					<code
						className={`opacity-0 max-h-[100px] overflow-auto transition ease-in-out delay-150 ${expanded ? "opacity-100" : ""}`}
					>
						<div className="text-sm font-bold mb-2">Tool Input:</div>
						{JSON.stringify(action.args)}
					</code>
				</div>
				<div
					className={`bg-slate-700 rounded-lg p-4 mt-2 max-w-0 ${expanded ? "max-w-full" : "transition-[max-width] delay-100"}`}
				>
					<code
						className={`opacity-0 max-h-[260px] overflow-auto transition ease-in-out delay-150 ${expanded ? "opacity-100" : ""}`}
					>
						{observation}
					</code>
				</div>
			</div>
		</div>
	)
}