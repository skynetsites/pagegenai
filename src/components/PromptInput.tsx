import { useState } from "react";
import { DynamicIcon } from 'lucide-react/dynamic';

interface PromptInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  inputPrefix?: React.ReactNode;
  submitIcon?: React.ReactNode;
}

export const PromptInput = (props: PromptInputProps) => {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const { onSendMessage, inputPrefix, submitIcon, isLoading = false, placeholder = "" } = props;

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  const prefix = inputPrefix || <DynamicIcon name="sparkles" size={20} className={isLoading ? "animate-pulse" : ""} />;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-white dark:bg-[#13131f] rounded-xl p-2 border border-gray-200 dark:border-white/10 shadow-2xl transition-colors duration-300"
    >
      {prefix && <span className="pl-3 md:pl-4 text-indigo-500 font-semibold text-lg">{prefix}</span>}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pr-0 px-3 md:px4 py-3 focus:outline-none text-sm transition-all"
        autoFocus
      />
      <button
        type="button"
        onClick={startListening}
        disabled={isLoading}
        className="px-3 p-4 md:px-4 bg-transparent border-none outline-none shadow-none focus:outline-none cursor-pointer"
      >
        {isLoading ? <DynamicIcon name="mic-off" size={20} className="text-gray-400" /> : <DynamicIcon name="mic" size={20} className={isListening ? "text-red-500" : "text-gray-500 dark:text-gray-400"} />}
      </button>
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center shadow-lg shadow-indigo-500/20"
      >
        {isLoading ? <DynamicIcon name="loader-circle" size={20} className="text-gray-400 animate-spin" /> : submitIcon}
      </button>
    </form>
  );
};