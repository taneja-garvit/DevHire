import { MapPin, Briefcase, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SkillTag from './SkillTag';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  experienceLevel: string;
  skills: string[];
  salaryRange?: string;
  createdAt: string;
  postedByCurrentUser?: boolean;
  onApply?: () => void;
  showApplyButton?: boolean;
}

function JobCard({
  id,
  title,
  company,
  location,
  experienceLevel,
  skills,
  salaryRange,
  createdAt,
  postedByCurrentUser = false,
  onApply,
  showApplyButton = false,
}: JobCardProps) {
  const navigate = useNavigate();

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'Fresher':
        return 'bg-blue-100 text-blue-700';
      case 'Junior':
        return 'bg-green-100 text-green-700';
      case 'Mid':
        return 'bg-yellow-100 text-yellow-700';
      case 'Senior':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return `${Math.floor(seconds / 604800)}w ago`;
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${id}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 p-6 cursor-pointer transform hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-yellow-500 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 font-medium">{company}</p>
        </div>
        {postedByCurrentUser && (
          <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
            Posted by you
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceBadgeColor(experienceLevel)}`}>
          {experienceLevel}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <SkillTag key={skill} skill={skill} />
          ))}
          {skills.length > 3 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div>
          {salaryRange && (
            <p className="text-sm font-semibold text-gray-900">{salaryRange}</p>
          )}
          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
            <Calendar size={14} />
            <span>Posted {getRelativeTime(createdAt)}</span>
          </div>
        </div>
        {showApplyButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply?.();
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
