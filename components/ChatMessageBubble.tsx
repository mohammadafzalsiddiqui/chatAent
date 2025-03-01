// import markdownToHtml from "@/utils/markdownToHtml"
// import type { Message } from "ai/react"
// import { useMemo } from "react"

// export function ChatMessageBubble(props: {
// 	message: Message
// 	aiEmoji?: string
// 	sources: any[]
// }) {
// 	const colorClassName = props.message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black"
// 	const alignmentClassName = props.message.role === "user" ? "ml-auto" : "mr-auto"
// 	const prefix = props.message.role === "user" ? "🧑" : props.aiEmoji

// 	const content = useMemo(() => {
// 		return markdownToHtml(props.message.content)
// 	}, [props.message.content])

// 	return (
// 		<div className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8 flex`}>
// 			<div className="mr-2">{prefix}</div>
// 			<div className="whitespace-pre-wrap flex flex-col">
// 				<div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }}></div>
// 				{props.sources && props.sources.length ? (
// 					<>
// 						<code className="mt-4 mr-auto bg-slate-600 px-2 py-1 rounded">
// 							<h2>🔍 Sources:</h2>
// 						</code>
// 						<code className="mt-1 mr-2 bg-slate-600 px-2 py-1 rounded text-xs">
// 							{props.sources?.map((source, i) => (
// 								<div className="mt-2" key={"source:" + i}>
// 									{i + 1}. &quot;{source.pageContent}&quot;
// 									{source.metadata?.loc?.lines !== undefined ? (
// 										<div>
// 											<br />
// 											Lines {source.metadata?.loc?.lines?.from} to {source.metadata?.loc?.lines?.to}
// 										</div>
// 									) : (
// 										""
// 									)}
// 								</div>
// 							))}
// 						</code>
// 					</>
// 				) : (
// 					""
// 				)}
// 			</div>
// 		</div>
// 	)
// }


// new Line from here
import markdownToHtml from "@/utils/markdownToHtml"
import type { Message } from "ai/react"
import { useMemo } from "react"

export function ChatMessageBubble(props: {
  message: Message
  aiEmoji?: string
  sources: any[]
}) {
  const isUser = props.message.role === "user";
  const colorClassName = isUser 
    ? "bg-blue-600 text-white" 
    : "bg-slate-700 text-white border border-slate-600";
    
  const alignmentClassName = isUser ? "ml-auto" : "mr-auto";
  const prefix = isUser ? "👤" : props.aiEmoji || "🤖";

  const content = useMemo(() => {
    return markdownToHtml(props.message.content)
  }, [props.message.content])

  return (
    <div 
      className={`${alignmentClassName} ${colorClassName} rounded-lg px-4 py-3 max-w-[80%] mb-6 flex shadow-md`}
      style={{
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <div className="mr-3 text-xl flex items-start pt-1">{prefix}</div>
      <div className="whitespace-pre-wrap flex flex-col">
        <div 
          className="prose prose-invert max-w-none text-sm sm:text-base" 
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        
        {props.sources && props.sources.length ? (
          <div className="mt-3 border-t border-slate-600 pt-2">
            <div className="flex items-center">
              <span className="text-blue-300 font-medium text-sm">🔍 Sources:</span>
            </div>
            <div className="mt-1 text-xs text-gray-300 bg-slate-800 p-2 rounded">
              {props.sources?.map((source, i) => (
                <div className="mt-2" key={"source:" + i}>
                  <span className="text-blue-400">{i + 1}.</span> &quot;{source.pageContent}&quot;
                  {source.metadata?.loc?.lines !== undefined ? (
                    <div className="mt-1 text-gray-400">
                      Lines {source.metadata?.loc?.lines?.from} to {source.metadata?.loc?.lines?.to}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

// Add this to your global CSS file:
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/