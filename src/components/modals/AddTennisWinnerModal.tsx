import React from "react";
import type { Team } from "../../types";
import { Modal } from "../Modal";

interface AddTennisWinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: Team[];
  homeTeam: string;
  awayTeam: string;
  homeScore: string; // Used to store winner ID
  setHomeTeam: (team: string) => void;
  setAwayTeam: (team: string) => void;
  setHomeScore: (winner: string) => void;
  onAddScore: () => void;
}

export const AddTennisWinnerModal: React.FC<AddTennisWinnerModalProps> = ({
  isOpen,
  onClose,
  teams,
  homeTeam,
  awayTeam,
  homeScore,
  setHomeTeam,
  setAwayTeam,
  setHomeScore,
  onAddScore,
}) => {
  const handleSubmit = () => {
    onAddScore();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Match Winner">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player 1
            </label>
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Player</option>
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
              Player 2
            </label>
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Player</option>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Winner
          </label>
          <div className="space-y-2">
            <div
              className={`flex items-center justify-between p-3 border-2 rounded-md cursor-pointer transition-colors ${
                homeTeam && homeScore === homeTeam
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => homeTeam && setHomeScore(homeTeam)}
            >
              <span
                className={`font-medium ${
                  homeTeam ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {homeTeam
                  ? teams.find((t) => t.id === homeTeam)?.name
                  : "Select Player 1 first"}
              </span>
              {homeTeam && homeScore === homeTeam && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div
              className={`flex items-center justify-between p-3 border-2 rounded-md cursor-pointer transition-colors ${
                awayTeam && homeScore === awayTeam
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => awayTeam && setHomeScore(awayTeam)}
            >
              <span
                className={`font-medium ${
                  awayTeam ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {awayTeam
                  ? teams.find((t) => t.id === awayTeam)?.name
                  : "Select Player 2 first"}
              </span>
              {awayTeam && homeScore === awayTeam && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={!homeTeam || !awayTeam || !homeScore}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add Result
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
