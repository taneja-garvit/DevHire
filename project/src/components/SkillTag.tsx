import { X } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  onRemove?: () => void;
  clickable?: boolean;
}

function SkillTag({ skill, onRemove, clickable = false }: SkillTagProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
      <span>{skill}</span>
      {onRemove && clickable && (
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export default SkillTag;
