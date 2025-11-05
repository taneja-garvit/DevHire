import { useEffect } from 'react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: string[];
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  disabled?: boolean;
}

function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedOption,
  onSelectOption,
  disabled = false,
}: QuestionCardProps) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (disabled) return;
      const key = parseInt(e.key);
      if (key >= 1 && key <= 4) {
        onSelectOption(key - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onSelectOption, disabled]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500 mb-2">
          Question {questionNumber} of {totalQuestions}
        </p>
        <h2 className="text-2xl font-bold text-gray-900">{questionText}</h2>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !disabled && onSelectOption(index)}
            disabled={disabled}
            className={`w-full flex items-start gap-4 p-4 border-2 rounded-lg transition-all text-left ${
              selectedOption === index
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                selectedOption === index
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {optionLabels[index]}
            </div>
            <span className="pt-1 text-gray-700 leading-relaxed">{option}</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Press keys 1, 2, 3, or 4 to quickly select options
      </p>
    </div>
  );
}

export default QuestionCard;
