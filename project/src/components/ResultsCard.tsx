import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
}

function ResultsCard({ score, totalQuestions }: ResultsCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isGreat = percentage >= 70;
  const isGood = percentage >= 50;

  const getHeader = () => {
    if (isPerfect) return { title: 'Perfect Score!', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' };
    if (isGreat) return { title: 'Great Job!', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' };
    if (isGood) return { title: 'Good Effort!', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { title: 'Keep Learning!', icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const header = getHeader();
  const Icon = header.icon;

  return (
    <div className={`${header.bg} rounded-xl p-8 mb-8`}>
      <div className="flex items-center gap-3 mb-6">
        <Icon size={40} className={header.color} />
        <h2 className={`text-3xl font-bold ${header.color}`}>{header.title}</h2>
      </div>

      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-gray-900 mb-2">
          {score}/{totalQuestions}
        </div>
        <div className="text-2xl font-semibold text-gray-700">
          {percentage}%
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} className="text-green-600" />
          <span className="text-gray-700">
            <strong>{score}</strong> correct answers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle size={20} className="text-red-600" />
          <span className="text-gray-700">
            <strong>{totalQuestions - score}</strong> incorrect answers
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResultsCard;
