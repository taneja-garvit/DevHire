import { Search } from 'lucide-react';

interface FilterBarProps {
  skillSearch: string;
  onSkillSearchChange: (value: string) => void;
  locationFilter: string;
  onLocationFilterChange: (value: string) => void;
  experienceLevelFilter: string;
  onExperienceLevelFilterChange: (value: string) => void;
  onApplyFilters: () => void;
  onReset: () => void;
}

function FilterBar({
  skillSearch,
  onSkillSearchChange,
  locationFilter,
  onLocationFilterChange,
  experienceLevelFilter,
  onExperienceLevelFilterChange,
  onApplyFilters,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Jobs</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Skill
          </label>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => onSkillSearchChange(e.target.value)}
              placeholder="e.g., React, Python..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => onLocationFilterChange(e.target.value)}
            placeholder="e.g., New York, Remote..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={experienceLevelFilter}
            onChange={(e) => onExperienceLevelFilterChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all bg-white"
          >
            <option value="">All Levels</option>
            <option value="Fresher">Fresher</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onApplyFilters}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
