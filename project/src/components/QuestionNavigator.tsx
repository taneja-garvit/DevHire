interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  markedQuestions: Set<number>;
  onQuestionClick: (index: number) => void;
}

function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  markedQuestions,
  onQuestionClick,
}: QuestionNavigatorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p className="text-sm font-medium text-gray-700 mb-4">
        Question Navigator
      </p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const isAnswered = answeredQuestions.has(index);
          const isMarked = markedQuestions.has(index);
          const isCurrent = index === currentQuestion;

          return (
            <button
              key={index}
              onClick={() => onQuestionClick(index)}
              className={`w-10 h-10 rounded-full font-semibold transition-all text-sm flex items-center justify-center ${
                isCurrent
                  ? 'bg-yellow-400 text-black ring-2 ring-yellow-500'
                  : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isMarked
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={`Question ${index + 1}${isAnswered ? ' (answered)' : ''}${isMarked ? ' (marked)' : ''}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionNavigator;
