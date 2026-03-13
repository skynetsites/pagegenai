import { PromptInput } from "../components/PromptInput";
import { DynamicIcon } from "lucide-react/dynamic";

interface PromptBarProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const PromptBar = (props: PromptBarProps) => {
  const { onSendMessage, isLoading } = props;

  const quickActions = [
    {
      label: "+ Navbar Responsiva",
      prompt: "Crie uma barra de navegação responsiva com logo e menu hamburger",
    },
    {
      label: "+ Tabela de Preços",
      prompt: "Adicione uma tabela de preços moderna com 3 planos",
    },
    {
      label: "+ Seção de Depoimentos",
      prompt: "Adicione uma seção de depoimentos de clientes com fotos e citações",
    },
    {
      label: "+ Formulário de Contato",
      prompt: "Adicione uma seção de contato com formulário e mapa",
    },
    //{
      //label: "+ Rodapé",
      //prompt: "Adicione um rodapé completo com links e newsletter",
    //},
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col items-center justify-end z-40 pointer-events-none">
      <div className="w-full max-w-3xl pointer-events-auto flex flex-col gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mask-linear">
          <span className="text-xs text-yellow-600 dark:text-yellow-500 font-medium flex items-center gap-1 bg-yellow-100 dark:bg-yellow-500/10 px-2 py-1 rounded shadow-sm border border-yellow-200 dark:border-transparent">
            <DynamicIcon name="sparkles" size={10} /> Sugestões:
          </span>
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(action.prompt)}
              disabled={isLoading}
              className="px-3 py-1.5 cursor-pointer bg-white/90 dark:bg-[#1a1a24]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500/50 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md"
            >
              {action.label}
            </button>
          ))}
        </div>

        <PromptInput
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          submitIcon={<DynamicIcon name="zap" size={20} fill="currentColor" />}
          placeholder={
            isLoading
              ? "A IA está criando..."
              : "O que você gostaria de mudar? (ex: Adicione um rodapé completo com links e newsletter)"
          }
          inputPrefix=""
        />
        <p className="text-center text-[0.85rem] text-gray-500 dark:text-gray-600 mt-2 font-medium">
          A IA pode cometer erros. Revise o código gerado antes de usar em produção.
        </p>
      </div>
    </div>
  );
};

export default PromptBar;
