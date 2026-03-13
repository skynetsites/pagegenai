const Footer = () => {
  return (
    <footer className="relative z-10 mt-14 md:mt-20 pb-10 items-center text-center">
      <div className="text-gray-500 dark:text-gray-600 text-sm">
        © 2026 PageGen AI. Todos os direitos reservados • Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/skynetsites/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-gray-500
          hover:text-indigo-600 dark:hover:text-indigo-400
            hover:underline decoration-solid font-semibold
            transition-colors duration-300 ease-in-out"
        >
          Isaias Oliveira
        </a>.
      </div>
    </footer>
  );
};

export default Footer;
