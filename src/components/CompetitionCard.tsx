import { useState } from "react";
import {
  isScoredMatch,
  isTennisMatch,
  type Competition,
  type Match,
  type Team,
} from "../types";
import { useSports } from "../context";
import CompetitionTable from "./CompetitionTable";
import { getCardTheme } from "../utils/theme";
import AddTeamsAndScores from "./AddTeamsAndScores";
import RecentMatches from "./RecentMatches";
import { getValidationError } from "../utils/storage";
import { BasketballIcon, TennisIcon } from "../utils/svgs";

interface CompetitionCardProps {
  competition: Competition;
  matches: Match[];
  teams: Team[];
}

const CompetitionCard = ({
  competition,
  matches,
  teams,
}: CompetitionCardProps) => {
  const { actions } = useSports();
  const [teamName, setTeamName] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddTeam = async () => {
    const isPlayer = competition.type === "tennis";
    const validationError = getValidationError(
      teamName,
      teams,
      competition.id,
      isPlayer
    );

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await actions.addTeam(teamName.trim(), competition.id);
      setTeamName("");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  const handleAddScore = async (): Promise<boolean> => {
    const isTennisValid =
      competition.type === "tennis" && homeTeam && awayTeam && homeScore;
    const isScoredValid =
      competition.type !== "tennis" &&
      homeTeam &&
      awayTeam &&
      homeScore &&
      awayScore;

    if (isTennisValid || isScoredValid) {
      const existingMatch = matches.find((match) => {
        if (isScoredMatch(match)) {
          return (
            (match.team1 === homeTeam && match.team2 === awayTeam) ||
            (match.team1 === awayTeam && match.team2 === homeTeam)
          );
        } else if (isTennisMatch(match)) {
          return (
            (match.player1 === homeTeam && match.player2 === awayTeam) ||
            (match.player1 === awayTeam && match.player2 === homeTeam)
          );
        }
        return false;
      });

      if (existingMatch) {
        setErrorMessage(
          competition.type === "tennis"
            ? "Players already played against each other!"
            : "Teams already played against each other!"
        );
        return false;
      }

      try {
        if (competition.type === "tennis") {
          const winnerId = homeScore;
          await actions.addTennisMatch(
            competition.id,
            homeTeam,
            awayTeam,
            winnerId
          );
        } else {
          await actions.addScoredMatch(
            competition.id,
            homeTeam,
            awayTeam,
            parseInt(homeScore),
            parseInt(awayScore)
          );
        }
        setHomeTeam("");
        setAwayTeam("");
        setHomeScore("");
        setAwayScore("");
        setErrorMessage(null);
        return true;
      } catch (error) {
        console.error("Error adding score:", error);
        return false;
      }
    }
    return false;
  };

  return (
    <div
      className={`rounded-md w-full max-w-[450px] lg:flex-1 min-w-0`}
      style={{ fontFamily: getCardTheme(competition.type).fontFamily }}
    >
      <div
        className={`p-3 ${getCardTheme(competition.type).header} rounded-t-md`}
      >
        <h2
          className={`${
            getCardTheme(competition.type).headerText
          } text-lg flex items-center gap-2  ${
            competition.type === "basketball"
              ? "uppercase font-normal"
              : "font-bold"
          }`}
        >
          {competition.type !== "football" && (
            <div className="w-6 h-6">
              {competition.type === "basketball" && <BasketballIcon />}
              {competition.type === "tennis" && <TennisIcon />}
            </div>
          )}
          {competition.name}
        </h2>
      </div>
      <div
        className={`p-4 ${
          getCardTheme(competition.type).body
        }  space-y-4 rounded-b-md min-h-[400px] lg:min-h-[700px]`}
      >
        <AddTeamsAndScores
          competitionType={competition.type}
          competitionId={competition.id}
          teams={teams}
          handleAddTeam={handleAddTeam}
          handleAddScore={handleAddScore}
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          homeScore={homeScore}
          awayScore={awayScore}
          setHomeTeam={setHomeTeam}
          setAwayTeam={setAwayTeam}
          setHomeScore={setHomeScore}
          setAwayScore={setAwayScore}
          teamName={teamName}
          setTeamName={setTeamName}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        {competition.type === "basketball" && (
          <RecentMatches
            competitionId={competition.id}
            competitionType={competition.type}
            limit={5}
          />
        )}

        <CompetitionTable competitionId={competition.id} />
      </div>
    </div>
  );
};

export default CompetitionCard;
