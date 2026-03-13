import { useState, useRef, useEffect } from "react";
import Modal from "../components/ui/Modal";
import { DynamicIcon } from "lucide-react/dynamic";
import { ViewMode } from "../types";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onBack: () => void;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  showCode: boolean;
  onToggleCode: () => void;
  onDownload: () => void;
  onOpenPreview: () => void;
  isGenerating: boolean;
  onStarted: boolean;
}

const Header = (props: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [modalType, setModalType] = useState<"donation" | "qr" | null>(null);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const {
    onBack,
    onViewChange,
    isGenerating,
    onToggleCode,
    showCode,
    viewMode,
    onOpenPreview,
    onDownload,
    onStarted = false,
  } = props;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const handleCopy = async (pixCode: string) => {
    if (!pixCode) return;

    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao copiar:", error);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const pixPayload =
    "00020126580014BR.GOV.BCB.PIX013605ed170a-9ddf-4526-94ac-d17affc230bc5204000053039865802BR5925Francisco Isaias Oliveira6009SAO PAULO62140510dvfzXaciz76304B02E";

  const pixKey = "05ed170a-9ddf-4526-94ac-d17affc230bc";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    pixPayload
  )}`;

  //console.log(qrUrl);

  return (
    <header
  className={`${
    isSticky ? "bg-white/80 dark:bg-indigo-900/50" : ""
  } fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}
>
  <div className="h-16 md:max-w-8xl mx-auto flex items-center justify-between px-4">
      <div className="md:w-1/3 flex items-center gap-3">
        {onStarted ? (
          <button
              onClick={onBack}
              className="flex cursor-pointer items-center gap-2 md:p-2 py-2 md:px-4 md:pl-2 md:bg-indigo-600 md:hover:bg-indigo-700 text-indigo-800 md:text-white dark:text-indigo-100 rounded-lg text-sm font-medium transition-all active:scale-95"
            >
              <DynamicIcon name="circle-chevron-left" size={22} />
              <span>Voltar</span>
            </button>
        ) : (
        
        <div className="flex items-center gap-2">
          <img src="/icon.svg" alt="Logo" className="w-8 md:w-10 h-8 md:h-10 rounded-lg" />
          <span className="font-display
                  text-xl md:text-3xl
                  font-extrabold
                  tracking-tight
                  text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600
                dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400
                  drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
          >PageGen <span className="bg-clip-text text-transparent
                            bg-linear-to-r
                          from-gray-900 via-gray-800 to-gray-700
                          dark:from-cyan-200 dark:via-cyan-400 dark:to-cyan-600">AI</span>
          </span>
        </div>
        )}
      </div>
      
      {onStarted ? (
        <div className="md:w-1/3 hidden md:flex justify-center items-center">
        <div className="hidden md:flex justify-center items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg border border-gray-200 dark:border-white/10">
          {[ViewMode.DESKTOP, ViewMode.TABLET, ViewMode.MOBILE].map((mode) => (
            <button
              key={mode}
              onClick={() => onViewChange(mode)}
              className={`p-1.5 rounded transition-all cursor-pointer ${
                viewMode === mode
                  ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {mode === ViewMode.DESKTOP && <DynamicIcon name="laptop" size={16} />}
              {mode === ViewMode.TABLET && <DynamicIcon name="tablet" size={16} />}
              {mode === ViewMode.MOBILE && <DynamicIcon name="smartphone" size={16} />}
            </button>
          ))}
        </div>
        </div>
      ):
      (
        <div className="hidden">
          <button onClick={() => { navigate("/about"); }}>Sobre</button>
          <button onClick={() => { navigate("/donate"); }}>Doar</button>
        </div>
      )}

      <div className="md:w-1/3 flex justify-end items-center gap-2 md:gap-4">
        {onStarted && isGenerating && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-xs font-medium animate-pulse">
            Gerando...
          </div>
        )}

        <ThemeToggle />

        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden md:block"></div>

        {onStarted ? (
          <>
            <button
              onClick={onToggleCode}
              className="hidden cursor-pointer md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white text-sm font-medium transition-colors"
            >
              {showCode ? <DynamicIcon name="eye" size={16} /> : <DynamicIcon name="code" size={16} />}
              <span className="hidden lg:inline">
                {showCode ? "Ver Preview" : "Ver Código"}
              </span>
            </button>

            <button
              onClick={onOpenPreview}
              className="hidden cursor-pointer md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white"
            >
              <DynamicIcon name="external-link" size={16} />
            </button>

            <button
              onClick={onDownload}
              className="flex cursor-pointer items-center gap-2 md:p-2 py-2 md:px-4 md:bg-indigo-600 md:hover:bg-indigo-700 text-indigo-800 md:text-white dark:text-indigo-100 rounded-lg text-sm font-medium transition-all active:scale-95"
            >
              <DynamicIcon name="download" size={22} />
              <span className="hidden md:inline">Baixar</span>
            </button>
            
        <div className="relative md:hidden" ref={menuRef}>
        <button className="py-2 rounded-lg" onClick={() => setOpen(!open)}>
          <DynamicIcon name="more-vertical" size={22} className="text-indigo-800 dark:text-indigo-100" />
        </button>

        <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
        <div className={`absolute right-0 mt-2 p-3 w-full min-w-40 flex flex-col gap-2 rounded-lg bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md
                        translate-y-2 transition-all duration-200 ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                        >
          
          <span 
              onClick={onToggleCode}
              className="cursor-pointer flex items-center gap-2 text-indigo-800 dark:text-indigo-100 text-sm transition-colors"
            >
              {showCode ? <DynamicIcon name="eye" size={16} /> : <DynamicIcon name="code" size={16} />}
              <span>
                {showCode ? "Ver Preview" : "Ver Código"}
              </span>
          </span>
          <span 
              onClick={onOpenPreview}
              className="cursor-pointer flex items-center gap-2 text-indigo-800 dark:text-indigo-100 text-sm transition-colors"
            >
            <DynamicIcon name="external-link" size={16} />
            <span>Abrir Preview</span>
          </span>
        </div>
      </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setModalType("donation")}
              className="px-3 py-1 cursor-pointer bg-white/90 dark:bg-[#1a1a24]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500/50 text-sm font-medium text-indigo-600 dark:text-indigo-300  flex items-center gap-2 rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md"
            >
              <DynamicIcon name="heart-handshake" size={20} />
              <span className="md:hidden">Apoie-nos!</span>
              <span className="hidden md:inline">Ajude a manter esse projeto!</span>
            </button>
            <Modal
              isOpen={modalType !== null}
              onClose={() => setModalType(null)}
              size={modalType === "qr" ? "md" : "x2"}
              title={
                modalType === "donation" ? (
                  <>
                    <DynamicIcon name="heart-handshake" size={30} className="inline-block" />
                    <span className="ml-2">Ajude a manter esse projeto!</span>
                  </>
                ) : (
                  ""
                )
              }
            >
              {modalType === "donation" && (
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-muted-foreground text-sm/6 font-body">
                      Este é um projeto gratuito e independente. Sua doação via PIX ajuda a manter a plataforma e a IA, para continuarmos oferecendo este serviço.
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => handleCopy(pixKey)}
                      className="inline-flex items-center justify-center gap-2
                        whitespace-nowrap rounded-md
                        border border-neon-cyan/50 bg-background
                        h-10 px-4 py-2 text-sm font-medium
                        transition-colors duration-200 ease-in-out
                        hover:bg-neon-cyan/10 hover:border-neon-cyan hover:text-accent-foreground
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
                        disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
                    >
                      {copied ? (
                        "Chave PIX copiada!"
                      ) : (
                        <>
                          <DynamicIcon name="copy" size={16} /> Copiar PIX
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setModalType("qr")}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:text-accent-foreground h-10 px-4 py-2 border-neon-cyan/50 hover:bg-neon-cyan/10 hover:border-neon-cyan cursor-pointer"
                      type="button"
                    >
                      <DynamicIcon name="qr-code" size={16} />
                      QR Code
                    </button>
                  </div>
                </div>
              )}

              {modalType === "qr" && (
                <>
                  <button
                    onClick={() => setModalType("donation")}
                    className="absolute left-4 top-4 p-1 rounded-lg text-indigo-800 dark:text-indigo-200 hover:text-indigo-700 dark:hover:text-indigo-100 transition cursor-pointer"
                  >
                    <DynamicIcon name="circle-chevron-left" size={20} />
                  </button>
                  <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                    <h2 className="text-lg font-semibold leading-none tracking-tight text-center font-heading mb-6">
                      PIX - QR Code
                    </h2>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-xl">
                      <img
                        src={qrUrl}
                        alt="QR Code PIX"
                        className="w-48 h-48"
                      />
                    </div>
                    <div className="flex flex-col items-center text-center space-y-2">
                      <p className="text-sm text-muted-foreground ">
                        Ou copie a chave PIX (aleatória):
                      </p>

                      <button
                        onClick={() => handleCopy(pixKey)}
                        className="flex justify-between items-center gap-2 bg-white/50 dark:bg-white/5 rounded-lg px-3 py-2 cursor-pointer"
                      >
                        {copied ? (
                          "Chave PIX copiada!"
                        ) : (
                          <>
                            <code className="text-sm font-mono text-foreground break-all">
                              {pixKey}
                            </code>{" "}
                            <DynamicIcon name="copy" size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Modal>
          </>
        )}
      </div>
    </div>
</header>
  );
};

export default Header;
