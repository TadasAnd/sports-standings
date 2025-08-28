import type { CompetitionType, Team } from "../../types";
import { getCardTheme } from "../../utils/theme";
import { Modal } from "../Modal";

interface AddScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  setHomeTeam: (team: string) => void;
  setAwayTeam: (team: string) => void;
  setHomeScore: (score: string) => void;
  setAwayScore: (score: string) => void;
  onAddScore: () => void;
  competitionType: CompetitionType;
}

export const AddScoreModal: React.FC<AddScoreModalProps> = ({
  isOpen,
  onClose,
  teams,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  setHomeTeam,
  setAwayTeam,
  setHomeScore,
  setAwayScore,
  onAddScore,
  competitionType,
}) => {
  const handleSubmit = () => {
    onAddScore();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Score">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Team
            </label>
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md capitalize focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select Team</option>
              {teams
                .filter((team) => team.id !== awayTeam)
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Away Team
            </label>
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md capitalize focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select Team</option>
              {teams
                .filter((team) => team.id !== homeTeam)
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Score
            </label>
            <input
              type="number"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Away Score
            </label>
            <input
              type="number"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={!homeTeam || !awayTeam || !homeScore || !awayScore}
            className={`flex-1 ${
              getCardTheme(competitionType).button.primary
            } text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            Add Score
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
