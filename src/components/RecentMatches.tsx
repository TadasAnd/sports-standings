import type { CompetitionType } from "../types";
import { isScoredMatch } from "../types";
import { useSports } from "../context";
import { getFlag } from "../utils";
import { getCardTheme } from "../utils/theme";

interface RecentMatchesProps {
  competitionId: string;
  competitionType: CompetitionType;
  limit?: number;
}

const RecentMatches: React.FC<RecentMatchesProps> = ({
  competitionId,
  competitionType,
  limit = 5,
}) => {
  const { selectors } = useSports();
  const matches = selectors.getMatchesByCompetition(competitionId);
  const teams = selectors.getTeamsByCompetition(competitionId);

  const recentMatches = matches
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);

  const getTeamName = (teamId: string): string => {
    const team = teams.find((t) => t.id === teamId);
    return team?.name || "Unknown";
  };

  if (recentMatches.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {recentMatches.map((match) => {
        if (!isScoredMatch(match)) return null;
        const team1Name = getTeamName(match.team1);
        const team2Name = getTeamName(match.team2);
        const team1Flag = getFlag(team1Name);
        const team2Flag = getFlag(team2Name);

        return (
          <div
            key={match.id}
            className={`flex items-center justify-between text-white border-b ${
              getCardTheme(competitionType).border
            }`}
          >
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-lg">{team1Flag}</span>
              <span className="font-medium capitalize">{team1Name}</span>
            </div>

            <div className="px-3 text-gray-300 text-sm">vs</div>

            <div className="flex items-center space-x-2 flex-1">
              <span className="text-lg">{team2Flag}</span>
              <span className="font-medium capitalize">{team2Name}</span>
            </div>

            <div className="text-right text-lg min-w-[60px]">
              {match.score1}-{match.score2}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentMatches;
