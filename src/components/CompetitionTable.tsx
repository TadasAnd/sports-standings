import { useSports } from "../context";
import { type CompetitionType } from "../types";
import { getCardTheme } from "../utils/theme";
import { StandingsRow } from "./StandingsRow";

interface CompetitionTableProps {
  competitionId: string;
}

const CompetitionTable = ({ competitionId }: CompetitionTableProps) => {
  const { selectors } = useSports();
  const standings = selectors.getStandings(competitionId);
  const competition = selectors.getCompetitionById(competitionId);

  const getTeamName = (teamId: string) => {
    const team = selectors.getTeamById(teamId);
    return team?.name;
  };

  const getPlayerName = (playerId: string) => {
    const player = selectors.getPlayerById(playerId);
    return player?.name;
  };

  if (!competition) return null;
  console.log("competition", competition);

  const getColumns = (type: CompetitionType) => {
    switch (type) {
      case "tennis":
        return ["Player", "M", "W", "L", "Pts"];
      case "football":
        return ["Team", "P", "W", "D", "L", "Pts"];
      case "basketball":
        return ["Team", "W", "D", "L", "Pts"];
    }
  };

  const getColumnClass = (column: string, competitionType: CompetitionType) => {
    if (competitionType === "tennis" && column === "Player") {
      return "col-span-6";
    }
    if (competitionType === "tennis" && (column === "W" || column === "L")) {
      return "col-span-2 text-center";
    } else if (competitionType === "football" && column === "Team") {
      return "col-span-7";
    } else if (competitionType === "basketball" && column === "Team") {
      return "col-span-8";
    } else {
      return "col-span-1 text-center";
    }
  };

  return (
    <div>
      {competition.type === "basketball" && (
        <div
          className={`${
            getCardTheme(competition.type).table.text
          } font-bold pb-3`}
        >
          Score Table:
        </div>
      )}
      <div
        className={`grid grid-cols-12 py-2 px-3 font-bold ${
          getCardTheme(competition.type).table.header +
          " " +
          getCardTheme(competition.type).table.text
        }`}
      >
        {getColumns(competition.type).map((column) => (
          <div
            className={getColumnClass(column, competition.type)}
            key={column}
          >
            {column}
          </div>
        ))}
      </div>
      <div
        className={`${getCardTheme(competition.type).height} ${
          getCardTheme(competition.type).table.text
        }`}
      >
        {standings.length === 0 && (
          <div className="text-center py-4">
            No standings available <br /> Add{" "}
            {competition.type === "tennis" ? "players " : "teams "} first
          </div>
        )}
        {standings.map((row, index) => (
          <StandingsRow
            key={`${
              "teamId" in row
                ? row.teamId
                : "playerId" in row
                ? row.playerId
                : "unknown"
            }-${competition.type}-${index}`}
            row={row}
            competitionType={competition.type}
            getTeamName={getTeamName}
            getPlayerName={getPlayerName}
          />
        ))}
      </div>
    </div>
  );
};

export default CompetitionTable;
