import { ReactNode, useEffect } from "react";
import { ModalSize } from "../../types";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  zIndex?: number;
  size?: ModalSize;
}

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, title, children, zIndex = 50, size = "x2" } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    x2: "max-w-2xl",
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[${zIndex}] px-4`}
    >
      <div
        className="absolute right inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className={`relative z-10 w-full p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-md ${sizeClasses[size ?? "md"]}`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-indigo-800 dark:text-indigo-200 hover:text-indigo-700 dark:hover:text-indigo-100 transition cursor-pointer"
          aria-label="Fechar modal"
        >
          <X size={18} />
        </button>
        {title && (
          <div
            className={`flex items-center justify-between pb-3 ${title ? "border-b border-gray-200 dark:border-white/10" : ""}`}
          >
            <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
              {title}
            </h2>
          </div>
        )}

        <div className="pt-5 text-sm font-medium text-indigo-800 dark:text-indigo-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
