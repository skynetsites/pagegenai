import {
  ReactNode,
  useState,
  useEffect,
  MouseEvent,
} from "react";
import Footer from "./Footer";

interface MouseGridProps {
  children: ReactNode;
  onStarted: boolean;
}

const MouseGridLayout = (props: MouseGridProps) => {

  const {children, onStarted} = props;
  const CELL_SIZE = 40;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const cols = Math.ceil(dimensions.width / CELL_SIZE);
  const rows = Math.ceil(dimensions.height / CELL_SIZE);

  const col = Math.floor(
    (mousePos.x + window.scrollX) / CELL_SIZE
  );
  const row = Math.floor(
    (mousePos.y + window.scrollY) / CELL_SIZE
  );

  const activeIndex = row * cols + col;

  return (
    <div
      className="w-full min-h-screen relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-white transition-colors duration-300 scroll-smooth"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div
        className="absolute top-0 left-0 grid z-0 pointer-events-none"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridAutoRows: `${CELL_SIZE}px`,
        }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div
            key={i}
            className={`
              border border-purple-600/10 dark:border-purple-600/10 
              transition-all duration-150 ease-in-out rounded
              ${
                i === activeIndex
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-30 dark:opacity-50 blur transition duration-500 ease-in-out"
                  : ""
              }
            `}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">{children}</div>
      {!onStarted && <Footer />}
    </div>
  );
}

export default MouseGridLayout;