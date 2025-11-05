import { X } from 'lucide-react';
import Button from './Button';

interface ConfirmModalProps {
  title: string;
  message: string;
  details?: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  variant?: 'default' | 'warning';
}

function ConfirmModal({
  title,
  message,
  details,
  confirmText,
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'default',
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 animate-in">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-700 mb-2">{message}</p>

        {details && (
          <div className={`p-4 rounded-lg mb-6 ${
            variant === 'warning'
              ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
              : 'bg-gray-50 border border-gray-200 text-gray-700'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{details}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <div className="flex-1">
            <Button
              onClick={onConfirm}
              loading={loading}
              fullWidth
              variant="primary"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
