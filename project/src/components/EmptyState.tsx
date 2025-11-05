import { Briefcase } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

function EmptyState({
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Briefcase size={40} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
