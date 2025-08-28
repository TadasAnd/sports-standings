import React from "react";
import type {
  FootballStandingsRow,
  BasketballStandingsRow,
  TennisStandingsRow,
  CompetitionType,
} from "../types";
import { getCardTheme } from "../utils/theme";
import { getFlag } from "../utils";

interface StandingsRowProps {
  row: FootballStandingsRow | BasketballStandingsRow | TennisStandingsRow;
  competitionType: CompetitionType;
  getTeamName: (teamId: string) => string | undefined;
  getPlayerName?: (playerId: string) => string | undefined;
}

export const StandingsRow: React.FC<StandingsRowProps> = ({
  row,
  competitionType,
  getTeamName,
  getPlayerName,
}) => {
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
          {getPlayerName?.(tennisRow.playerId) || "Unknown Player"}
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
  }

  if (competitionType === "football") {
    const teamRow = row as FootballStandingsRow;
    return (
      <div
        className={`grid grid-cols-12 py-2 border-b border-zinc-200 px-3 font-semibold`}
      >
        <div className="col-span-7 capitalize">
          {getTeamName(teamRow.teamId) || "Unknown Team"}
        </div>
        <div className="text-center">{teamRow.played}</div>
        <div className="text-center">{teamRow.wins}</div>
        <div className="text-center">{teamRow.draws}</div>
        <div className="text-center">{teamRow.losses}</div>
        <div className="text-center">{teamRow.points}</div>
      </div>
    );
  }

  if (competitionType === "basketball") {
    const teamRow = row as BasketballStandingsRow;
    return (
      <div
        className={`grid grid-cols-12 py-2 px-3 ${
          getCardTheme(competitionType).table.body
        }`}
      >
        <div className="col-span-8 capitalize">
          {getFlag(getTeamName(teamRow.teamId) || "Unknown Team")}{" "}
          {getTeamName(teamRow.teamId) || "Unknown Team"}
        </div>
        <div className="text-center">{teamRow.wins}</div>
        <div className="text-center">{teamRow.draws}</div>
        <div className="text-center">{teamRow.losses}</div>
        <div className="text-center">{teamRow.points}</div>
      </div>
    );
  }

  return null;
};
