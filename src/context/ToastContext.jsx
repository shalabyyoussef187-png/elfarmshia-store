import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Info, AlertCircle, X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    ({ message, type = "info", duration = 3000 }) => {
      const id = Date.now() + Math.random();

      setToasts((prev) => [...prev, { id, message, type }]);

      if (duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);
      }

      return id;
    },
    [],
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message, duration) => {
      return showToast({ message, type: "success", duration });
    },
    [showToast],
  );

  const error = useCallback(
    (message, duration) => {
      return showToast({ message, type: "error", duration });
    },
    [showToast],
  );

  const info = useCallback(
    (message, duration) => {
      return showToast({ message, type: "info", duration });
    },
    [showToast],
  );

  const warning = useCallback(
    (message, duration) => {
      return showToast({ message, type: "warning", duration });
    },
    [showToast],
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        removeToast,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  const iconColors = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  };

  const Icon = icons[toast.type];

  return (
    <div
      className={`
        ${colors[toast.type]}
        pointer-events-auto
        flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg
        animate-in slide-in-from-right duration-300
        max-w-md min-w-[300px]
      `}
    >
      <Icon
        className={`${iconColors[toast.type]} shrink-0`}
        size={20}
        strokeWidth={2}
      />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={onClose}
        className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
};
