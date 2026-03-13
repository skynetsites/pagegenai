const BackgroundGradients = () => {
  return (
    <>
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-purple-400/40 dark:bg-purple-900/40 rounded-full blur-[120px] pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-indigo-400/40 dark:bg-indigo-900/40 rounded-full blur-[120px] pointer-events-none transition-colors duration-300" />
    </>
  );
};

export default BackgroundGradients;
