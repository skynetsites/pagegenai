import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BuilderLayout from "./components/BuilderLayout";
import BackgroundGradients from "./components/BackgroundGradients";
import { sendMessageToGemini } from "./services/geminiService";
import { Message, Sender, ViewMode } from "./types";
import MouseGridLayout from "./components/MouseGridLayout";
import AboutPage from "./pages/AboutPage";
import DonatePage from "./pages/DonatePage";

const generateId = () => Math.random().toString(36).substring(2, 15);

const App = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DESKTOP);
  const [showCodeView, setShowCodeView] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStart = (prompt: string) => {
    setHasStarted(true);
    handleSendMessage(prompt);
  };

  const handleSendMessage = useCallback(
    async (text: string) => {
      const userMsg: Message = {
        id: generateId(),
        text,
        sender: Sender.USER,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        let fullPrompt = text;
        if (generatedCode) {
          fullPrompt = `Código atual:\n${generatedCode}\n\nSolicitação de alteração: ${text}`;
        }

        const code = await sendMessageToGemini(fullPrompt);

        setGeneratedCode(code);

        const aiMsg: Message = {
          id: generateId(),
          text: "Código gerado com sucesso!",
          sender: Sender.AI,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (error) {
        const errorMsg: Message = {
          id: generateId(),
          text: "Erro ao gerar código.",
          sender: Sender.AI,
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [generatedCode],
  );

  const handleDownload = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-page.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenPreview = () => {
    if (!generatedCode) return;
    const blob = new Blob([generatedCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleCopy = async () => {
    if (!generatedCode) return;

    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
  <BrowserRouter>
    <MouseGridLayout 
        onStarted={hasStarted}
    >
      <BackgroundGradients />

      <Header
        onBack={() => setHasStarted(false)}
        onStarted={hasStarted}
        viewMode={viewMode}
        onViewChange={setViewMode}
        showCode={showCodeView}
        onToggleCode={() => setShowCodeView(!showCodeView)}
        onDownload={handleDownload}
        onOpenPreview={handleOpenPreview}
        isGenerating={isLoading}
      />

      <Routes>
        <Route
          path="/"
          element={
            hasStarted ? (
              <BuilderLayout
                onBack={() => setHasStarted(false)}
                viewMode={viewMode}
                onViewChange={setViewMode}
                showCodeView={showCodeView}
                onToggleCode={() => setShowCodeView(!showCodeView)}
                onDownload={handleDownload}
                onOpenPreview={handleOpenPreview}
                isLoading={isLoading}
                generatedCode={generatedCode}
                messages={messages}
                onSendMessage={handleSendMessage}
                handleCopy={handleCopy}
                copied={copied}
              />
            ) : (
              <>
                <Hero onStart={handleStart} />
              </>
            )
          }
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/donate"
          element={<DonatePage />}
        />
      </Routes>
    </MouseGridLayout>
  </BrowserRouter>
);
};

export default App;
