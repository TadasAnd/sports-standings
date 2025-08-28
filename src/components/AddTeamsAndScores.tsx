import { useState } from "react";
import type { CompetitionType, Team } from "../types";
import { getCardTheme } from "../utils/theme";
import { AddTeamModal } from "./modals/AddTeamModal";
import { AddScoreModal } from "./modals/AddScoreModal";
import { AddTennisWinnerModal } from "./modals/AddTennisWinnerModal";

interface AddTeamsAndScoresProps {
  competitionType: CompetitionType;
  competitionId: string;
  teams: Team[];
  handleAddTeam: () => void;
  handleAddScore: () => Promise<boolean>;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  setHomeTeam: (homeTeam: string) => void;
  setAwayTeam: (awayTeam: string) => void;
  setHomeScore: (homeScore: string) => void;
  setAwayScore: (awayScore: string) => void;
  teamName: string;
  setTeamName: (teamName: string) => void;
  errorMessage: string | null;
  setErrorMessage: (errorMessage: string | null) => void;
}

const AddTeamsAndScores = ({
  competitionType,
  competitionId,
  teams,
  handleAddTeam,
  handleAddScore,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  setHomeTeam,
  setAwayTeam,
  setHomeScore,
  setAwayScore,
  teamName,
  setTeamName,
  errorMessage,
  setErrorMessage,
}: AddTeamsAndScoresProps) => {
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  switch (competitionType) {
    case "football":
      return (
        <>
          <div className="bg-zinc-100 rounded-md p-3 flex flex-col gap-2">
            <div className="text-sm font-bold">Add Team</div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => {
                  setErrorMessage(null);
                  setTeamName(e.target.value);
                }}
                className="flex-1 bg-white rounded-md p-2 border border-zinc-300"
              />
              <button
                onClick={handleAddTeam}
                disabled={!teamName.trim()}
                className={`${
                  getCardTheme(competitionType).button.primary
                } text-white px-3 py-1 rounded-md cursor-pointer  disabled:bg-gray-300 disabled:cursor-not-allowed`}
              >
                Add
              </button>
            </div>
            <div className="text-red-500 text-sm text-end h-5">
              {errorMessage}
            </div>
          </div>
          <div className="bg-zinc-100 rounded-md p-3 flex flex-col gap-2">
            <div className="text-sm font-bold">Add Score</div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={homeTeam}
                onChange={(e) => setHomeTeam(e.target.value)}
                className="bg-white rounded-md px-3 py-1 border capitalize border-zinc-300 text-gray-700 cursor-pointer font-bold"
              >
                <option value="">Home Team</option>
                {teams
                  .filter((team) => team.id !== awayTeam)
                  .map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>

              <select
                value={awayTeam}
                onChange={(e) => setAwayTeam(e.target.value)}
                className="bg-white rounded-md px-3 py-1 border capitalize border-zinc-300 text-gray-700 cursor-pointer font-bold"
              >
                <option value="">Away Team</option>
                {teams
                  .filter((team) => team.id !== homeTeam)
                  .map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Home Score"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="bg-white rounded-md px-3 py-1 border border-zinc-300"
                min="0"
              />

              <input
                type="number"
                placeholder="Away Score"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="bg-white rounded-md px-3 py-1 border border-zinc-300"
                min="0"
              />
            </div>

            <button
              onClick={handleAddScore}
              disabled={!homeTeam || !awayTeam || !homeScore || !awayScore}
              className={`${
                getCardTheme(competitionType).button.primary
              } text-white px-3 py-1 rounded-md font-medium cursor-pointer  disabled:bg-gray-300 disabled:cursor-not-allowed`}
            >
              Add Score
            </button>
          </div>
        </>
      );
    case "basketball":
      return (
        <>
          <div className="flex justify-between pb-3">
            <button
              className={`${
                getCardTheme(competitionType).button.primary
              } text-white px-3 py-1 rounded-md font-medium cursor-pointer`}
              onClick={() => setShowTeamModal(true)}
            >
              + Add Team
            </button>
            <button
              className={`${
                getCardTheme(competitionType).button.primary
              } text-white px-3 py-1 rounded-md font-medium cursor-pointer`}
              onClick={() => setShowScoreModal(true)}
            >
              + Add Score
            </button>
          </div>

          <AddTeamModal
            isOpen={showTeamModal}
            onClose={() => setShowTeamModal(false)}
            teamName={teamName}
            setTeamName={setTeamName}
            onAddTeam={handleAddTeam}
            competitionType={competitionType}
            competitionId={competitionId}
            teams={teams}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          <AddScoreModal
            isOpen={showScoreModal}
            onClose={() => setShowScoreModal(false)}
            teams={teams}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeScore={homeScore}
            awayScore={awayScore}
            setHomeTeam={setHomeTeam}
            setAwayTeam={setAwayTeam}
            setHomeScore={setHomeScore}
            setAwayScore={setAwayScore}
            onAddScore={handleAddScore}
            competitionType={competitionType}
          />
        </>
      );
    case "tennis":
      return (
        <>
          <div className="flex justify-between">
            <button
              className={`${
                getCardTheme(competitionType).button.primary
              } text-white px-3 py-1 rounded-md font-medium cursor-pointer`}
              onClick={() => setShowTeamModal(true)}
            >
              + Add Player
            </button>
            <button
              className={`${
                getCardTheme(competitionType).button.secondary
              } text-white px-3 py-1 rounded-md font-medium cursor-pointer`}
              onClick={() => setShowScoreModal(true)}
            >
              + Add Score
            </button>
          </div>

          <AddTeamModal
            isOpen={showTeamModal}
            onClose={() => setShowTeamModal(false)}
            teamName={teamName}
            setTeamName={setTeamName}
            onAddTeam={handleAddTeam}
            competitionType={competitionType}
            competitionId={competitionId}
            teams={teams}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          <AddTennisWinnerModal
            isOpen={showScoreModal}
            onClose={() => setShowScoreModal(false)}
            teams={teams}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeScore={homeScore}
            setHomeTeam={setHomeTeam}
            setAwayTeam={setAwayTeam}
            setHomeScore={setHomeScore}
            onAddScore={handleAddScore}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      );
  }
};

export default AddTeamsAndScores;
