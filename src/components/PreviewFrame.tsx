import { useEffect, useRef } from "react";
import { ViewMode } from "../types";
import { DynamicIcon } from "lucide-react/dynamic";

interface PreviewFrameProps {
  code: string;
  viewMode: ViewMode;
  isLoading: boolean;
}

const PreviewFrame = (props: PreviewFrameProps) => {
  const iframeRef = useRef(null);

  const { code, viewMode, isLoading } = props;

  const getWidth = () => {
    switch (viewMode) {
      case ViewMode.MOBILE:
        return "375px";
      case ViewMode.TABLET:
        return "768px";
      case ViewMode.DESKTOP:
        return "100%";
      default:
        return "100%";
    }
  };

  useEffect(() => {
    if (iframeRef.current && code) {
      const doc = (iframeRef.current as HTMLIFrameElement | null)?.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative overflow-hidden pt-18 md:pt-20 pb-24 md:pb-28 px-4 transition-colors duration-300">
      <div
        className="relative transition-all duration-500 ease-in-out bg-white shadow-2xl overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 w-full h-full"
        style={{ maxWidth: getWidth() }}>
        <div className="bg-gray-100 dark:bg-[#1a1a24] h-8 w-full flex items-center px-3 space-x-2 border-b border-gray-200 dark:border-white/5 transition-colors">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-200 dark:bg-black/20 w-1/2 h-4 rounded text-[10px] text-gray-500 flex items-center justify-center font-mono">
              preview://pagegenai.com.br
            </div>
          </div>
        </div>

        <div className="relative w-full h-[calc(100vh-30vh)] md:h-[calc(100vh-35vh)] bg-white">
          {!code && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white text-gray-400">
              <p>Aguardando geração...</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full h-full"
            sandbox="allow-scripts allow-same-origin"
          />

          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-opacity duration-300">
              <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <DynamicIcon name="loader-2" className="w-10 h-10 text-indigo-600 dark:text-indigo-500 animate-spin mb-3" />
                <p className="text-gray-900 dark:text-white font-medium">
                  Criando sua página...
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  Escrevendo HTML & Tailwind CSS
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewFrame;
