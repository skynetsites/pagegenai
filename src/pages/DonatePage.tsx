import { useState } from "react";

// Aqui você cola os links "pag.ae" que você gerou no painel
const LINKS_PAGAMENTO: Record<number, string> = {
  10: "https://pag.ae/81y9fEdTQ",
  25: "https://pag.ae/link_de_25_reais",
  50: "https://pag.ae/link_de_50_reais",
  100: "https://pag.ae/link_de_100_reais",
};

// O link que você criou com a opção "Cliente define o valor"
const LINK_VALOR_ABERTO = "https://pag.ae/seu_link_valor_aberto";

export default function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const handleDonate = () => {
    // Se o usuário escreveu algo no campo "Outro valor", manda para o link aberto
    if (customAmount) {
      window.location.href = LINK_VALOR_ABERTO;
      return;
    }

    // Se ele clicou em um botão fixo, usa o link correspondente
    if (selectedAmount && LINKS_PAGAMENTO[selectedAmount]) {
      setTimeout(() => {
        window.location.href = LINKS_PAGAMENTO[selectedAmount];
      }, 100); // Pequeno delay para garantir que o estado seja atualizado
    } else {
      alert("Por favor, selecione um valor ou digite quanto deseja doar.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Contribuir ❤️</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[10, 25, 50, 100].map((value) => (
            <button
              key={value}
              onClick={() => { setSelectedAmount(value); setCustomAmount(""); }}
              className={`py-3 rounded-xl font-bold transition ${
                selectedAmount === value ? "bg-green-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              R$ {value}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Outro valor"
          value={customAmount}
          onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
          className="w-full border rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleDonate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black transition-transform active:scale-95"
        >
          DOAR AGORA
        </button>
        
        <p className="text-center text-[10px] text-gray-400 mt-4 uppercase">
          Pagamento 100% Seguro via PagBank
        </p>
      </div>
    </div>
  );
}