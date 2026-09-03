import { Check, X } from "lucide-react";

type ToastProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

export default function Toast({ message, visible, onClose }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center space-x-3 border border-gray-700 animate-bounce">
      <div className="bg-emerald-500/20 p-1 rounded-full text-emerald-400">
        <Check className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white ml-2 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
