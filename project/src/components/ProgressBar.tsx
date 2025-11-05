interface ProgressBarProps {
  answered: number;
  total: number;
}

function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = (answered / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">Progress</p>
        <p className="text-sm font-semibold text-gray-900">
          {answered} of {total} answered
        </p>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
