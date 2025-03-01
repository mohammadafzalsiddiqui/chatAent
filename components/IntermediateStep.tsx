// import type { Message } from "ai/react"
// import { useState } from "react"

// export function IntermediateStep(props: { message: Message }) {
// 	const parsedInput = JSON.parse(props.message.content)
// 	const action = parsedInput.action
// 	const observation = parsedInput.observation
// 	const [expanded, setExpanded] = useState(false)
// 	return (
// 		<div
// 			className={`ml-auto bg-green-600 rounded px-4 py-2 max-w-[80%] mb-8 whitespace-pre-wrap flex flex-col cursor-pointer`}
// 		>
// 			<div className={`text-right ${expanded ? "w-full" : ""}`} onClick={(e) => setExpanded(!expanded)}>
// 				<code className="mr-2 bg-slate-600 px-2 py-1 rounded hover:text-blue-600">
// 					🛠 <b>{action.name}</b>
// 				</code>
// 				<span className={expanded ? "hidden" : ""}>🔽</span>
// 				<span className={expanded ? "" : "hidden"}>🔼</span>
// 			</div>
// 			<div
// 				className={`overflow-hidden max-h-[0px] transition-[max-height] ease-in-out ${expanded ? "max-h-[360px]" : ""}`}
// 			>
// 				<div
// 					className={`bg-slate-600 rounded p-4 mt-1 max-w-0 ${expanded ? "max-w-full" : "transition-[max-width] delay-100"}`}
// 				>
// 					<code
// 						className={`opacity-0 max-h-[100px] overflow-auto transition ease-in-out delay-150 ${expanded ? "opacity-100" : ""}`}
// 					>
// 						Tool Input:
// 						<br></br>
// 						<br></br>
// 						{JSON.stringify(action.args)}
// 					</code>
// 				</div>
// 				<div
// 					className={`bg-slate-600 rounded p-4 mt-1 max-w-0 ${expanded ? "max-w-full" : "transition-[max-width] delay-100"}`}
// 				>
// 					<code
// 						className={`opacity-0 max-h-[260px] overflow-auto transition ease-in-out delay-150 ${expanded ? "opacity-100" : ""}`}
// 					>
// 						{observation}
// 					</code>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

//new line from here
import type { Message } from "ai/react"
import { useState } from "react"

export function IntermediateStep(props: { message: Message }) {
  const parsedInput = JSON.parse(props.message.content)
  const action = parsedInput.action
  const observation = parsedInput.observation
  const [expanded, setExpanded] = useState(false)
  
  // Format JSON for better readability
  const formatJSON = (jsonString: string) => {
    try {
      const obj = JSON.parse(jsonString);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return jsonString;
    }
  };
  
  const formattedArgs = typeof action.args === 'string' 
    ? formatJSON(action.args) 
    : JSON.stringify(action.args, null, 2);
    
  return (
    <div
      className={`mx-auto bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full mb-4 flex flex-col transition-all duration-300 ease-in-out`}
      style={{
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div 
        className={`flex items-center justify-between cursor-pointer ${expanded ? "mb-2" : ""}`} 
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <span className="mr-2 text-lg">🛠️</span>
          <code className="bg-slate-700 px-3 py-1 rounded text-blue-300 font-mono text-sm">
            {action.name}
          </code>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          {expanded ? "▲" : "▼"}
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="mt-3 space-y-3">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <div className="text-xs text-blue-300 mb-1 font-medium">Tool Input:</div>
            <pre className="text-xs text-white overflow-auto max-h-[200px] font-mono">
              {formattedArgs}
            </pre>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <div className="text-xs text-blue-300 mb-1 font-medium">Tool Output:</div>
            <pre className="text-xs text-white overflow-auto max-h-[300px] font-mono whitespace-pre-wrap">
              {observation}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}