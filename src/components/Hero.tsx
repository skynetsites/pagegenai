import { PromptInput } from "../components/PromptInput";
import { DynamicIcon } from "lucide-react/dynamic";

interface HeroProps {
  onStart: (prompt: string) => void;
}

const Hero = (props: HeroProps) => {
  const { onStart } = props;

  const suggestions = [
    "Landing Page",
    "Portfólio Pessoal",
    "Loja de Roupas",
    "Página de Captura",
    "Blog Corporativo",
    "Link na Bio",
  ];

  const features = [
    {
      icon: "zap" as const,
      iconBg: "bg-yellow-100 dark:bg-yellow-500/10",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      title: "Geração Instantânea",
      description:
        "Transforme prompts em código rapidamente em segundos com a velocidade do Gemini garantida.",
    },
    {
      icon: "smartphone" as const,
      iconBg: "bg-blue-100 dark:bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
      title: "Design Responsivo",
      description:
        "Abordagem mobile-first garantindo que seu site fique ótimo e funcional em todos os dispositivos.",
    },
    {
      icon: "shield-check" as const,
      iconBg: "bg-green-100 dark:bg-green-500/10",
      iconColor: "text-green-600 dark:text-green-400",
      title: "Pronto para Produção",
      description:
        "Código HTML e Tailwind CSS limpo para baixar, testar e implementar imediatamente de forma segura.",
    },
  ];

  return (
    <>
      <main className="relative z-10 container mx-auto pt-24 md:pt-30 px-4 flex flex-col items-center text-center max-w-5xl">
        <h1 className="md:max-w-4xl text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-gray-900 dark:text-white">
          Crie landing pages{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-white dark:via-indigo-100 dark:to-indigo-200">
            {" "}
            incríveis{" "}
          </span>{" "}
          apenas com palavras
        </h1>

        <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-10 md:max-w-3xl font-light">
          Gere landing pages e componentes Tailwind CSS totalmente responsivos e
          prontos para produção em segundos.
        </p>

        <div className="w-full max-w-4xl relative group">
          <div className="absolute -inset-0.5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-75 transition duration-500 blur"></div>
          <PromptInput
            onSendMessage={onStart}
            placeholder="Descreva ou diga o que você quer criar... (Ex: Crie uma página moderna para um escritório de advocacia)"
            inputPrefix="#"
            submitIcon={
              <DynamicIcon name="zap" size={20} fill="currentColor" />
            }
          />
        </div>

        <div className="w-full mt-6">
          <div
            className="flex justify-start md:justify-center whitespace-nowrap
                items-center gap-2 overflow-x-auto scrollbar-none mask-linear
                pb-2 max-w-5xl"
          >
            <span className="text-xs md:text-sm text-gray-500 shrink-0">Ideias:</span>

            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onStart(suggestion)}
                className="text-xs md:text-sm px-3 py-1.5 cursor-pointer bg-white/90 dark:bg-[#1a1a24]/90 backdrop-blur-md border border-gray-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500/50 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-full whitespace-nowrap transition-all shadow-sm hover:shadow-md"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-18 w-full text-left">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md"
            >
              <div
                className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center mb-4`}
              >
                <DynamicIcon
                  name={feature.icon || ""}
                  size={20}
                  className={feature.iconColor}
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Hero;
