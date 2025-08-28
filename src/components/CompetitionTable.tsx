import { useSports } from "../context";
import {
  type BasketballStandingsRow,
  type CompetitionType,
  type FootballStandingsRow,
  type TennisStandingsRow,
} from "../types";
import { getFlag } from "../utils";
import { getCardTheme } from "../utils/theme";

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

  const renderRow = (
    row: FootballStandingsRow | BasketballStandingsRow | TennisStandingsRow,
    competitionType: CompetitionType
  ) => {
    if (competitionType === "tennis") {
      const tennisRow = row as TennisStandingsRow;
      return (
        <div
          className={`grid grid-cols-12 py-2 border-b px-3 ${
            getCardTheme(competitionType).table.body +
            " " +
            getCardTheme(competitionType).table.border
          }`}
        >
          <div className="col-span-6 capitalize">
            {getPlayerName(tennisRow.playerId)}
          </div>
          <div className="text-center">{tennisRow.matches}</div>
          <div className="text-center col-span-2 flex items-center justify-center">
            {tennisRow.wins}
            <span className="ml-1 text-green-500">✓</span>
          </div>
          <div className="text-center col-span-2 flex items-center justify-center">
            {tennisRow.losses}
            <span className="ml-1 text-red-500">✗</span>
          </div>
          <div className="text-center">{tennisRow.points}</div>
        </div>
      );
    } else if (competitionType === "football") {
      const teamRow = row as FootballStandingsRow;
      return (
        <div
          className={`grid grid-cols-12 py-2 border-b border-zinc-200 px-3 font-bold`}
        >
          <div className="col-span-7 capitalize">
            {getTeamName(teamRow.teamId)}
          </div>
          <div className="text-center">{teamRow.played}</div>
          <div className="text-center">{teamRow.wins}</div>
          <div className="text-center">{teamRow.draws}</div>
          <div className="text-center">{teamRow.losses}</div>
          <div className="text-center">{teamRow.points}</div>
        </div>
      );
    } else if (competitionType === "basketball") {
      const teamRow = row as BasketballStandingsRow;
      return (
        <div
          className={`grid grid-cols-12 py-2 px-3 ${
            getCardTheme(competitionType).table.body
          }`}
        >
          <div className="col-span-8 capitalize">
            {getFlag(getTeamName(teamRow.teamId) || "")}{" "}
            {getTeamName(teamRow.teamId) || ""}
          </div>
          <div className="text-center">{teamRow.wins}</div>
          <div className="text-center">{teamRow.draws}</div>
          <div className="text-center">{teamRow.losses}</div>
          <div className="text-center">{teamRow.points}</div>
        </div>
      );
    } else {
      return null;
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
        className={`max-h-[300px] lg:max-h-[300px] overflow-y-auto ${
          getCardTheme(competition.type).table.text
        }`}
      >
        {standings.map((row) => renderRow(row, competition.type))}
      </div>
    </div>
  );
};

export default CompetitionTable;
