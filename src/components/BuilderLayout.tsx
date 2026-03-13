import PreviewFrame from "../components/PreviewFrame";
import PromptBar from "../components/PromptBar";
import { DynamicIcon } from "lucide-react/dynamic";
import { Message, ViewMode } from "../types";

interface BuilderLayoutProps {
  onBack: () => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  showCodeView: boolean;
  onToggleCode: () => void;
  onDownload: () => void;
  onOpenPreview: () => void;
  isLoading: boolean;
  generatedCode: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  handleCopy: () => void;
  copied: boolean;
}

const BuilderLayout = (props: BuilderLayoutProps) => {
  const {
    viewMode,
    showCodeView,
    isLoading,
    generatedCode,
    messages,
    onSendMessage,
    handleCopy,
    copied
  } = props;

  return (
    <>
      <main className="relative z-10 flex-1 overflow-hidden">
        {showCodeView ? (
          <div className="w-full h-full pt-20 pb-28 px-4 md:px-8 overflow-auto bg-gray-50 dark:bg-[#0a0a0f] transition-colors duration-300">
            <div className="max-w-5xl mx-auto bg-white dark:bg-[#1a1a24] rounded-lg border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-black/20 border-b border-gray-200 dark:border-white/5">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                  index.html
                </span>
                <button
                  onClick={handleCopy}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 cursor-pointer transition-colors"
                >
                  {copied 
                    ? "Código copiado!" 
                    : <>Copiar código <DynamicIcon name='copy' size={16} className='inline ml-1' /></>
              }
                </button>
              </div>
              <pre className="p-6 text-sm font-mono text-gray-800 dark:text-gray-300 overflow-x-auto">
                <code>
                  {generatedCode || "<!-- O código aparecerá aqui -->"}
                </code>
              </pre>
            </div>
          </div>
        ) : (
          <>
            <PreviewFrame
              code={generatedCode}
              viewMode={viewMode}
              isLoading={isLoading}
            />
            <PromptBar onSendMessage={onSendMessage} isLoading={isLoading} />
            <div 
	            className="fixed bottom-16 right-4 z-50 w-[16rem] 
             bg-white dark:bg-[#13131f] rounded-xl p-2 border 
             border-gray-200 dark:border-white/10 shadow-2xl 
              not-prose overflow-auto outline outline-white/5 
              transition-colors duration-300 hidden md:block">
	            <div className="flex flex-col gap-1 h-48 mt-7 pr-2.5 overflow-auto overscroll-auto overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-md text-xs ${msg.sender === "USER" ? "bg-indigo-100 dark:bg-indigo-900 text-gray-900 dark:text-white self-end" : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 self-start"}`}
                >
                  <DynamicIcon
                    name={msg.sender === "USER" ? "user" : "bot"}
                    size={18}
                    className="inline mr-1"
                  />
                  <span>{msg.text}</span>
                </div>
              ))}
              </div>
              <div className="absolute top-2 left-2 text-yellow-500 text-xs font-medium flex items-center gap-1">
                <DynamicIcon name="sparkles" size={16} />
                <span>Interações recentes</span>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default BuilderLayout;
