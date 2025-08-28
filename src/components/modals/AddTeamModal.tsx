import React from "react";
import type { CompetitionType } from "../../types";
import { Modal } from "../Modal";
import { getCardTheme } from "../../utils/theme";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  setTeamName: (name: string) => void;
  onAddTeam: () => void;
  competitionType: CompetitionType;
}

export const AddTeamModal: React.FC<AddTeamModalProps> = ({
  isOpen,
  onClose,
  teamName,
  setTeamName,
  onAddTeam,
  competitionType,
}) => {
  const isPlayer = competitionType === "tennis";
  const entity = isPlayer ? "Player" : "Team";

  const handleSubmit = () => {
    onAddTeam();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add ${entity}`}>
      <div className="space-y-4">
        <input
          type="text"
          placeholder={`${entity} Name`}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className={`w-full p-2 border border-gray-300 rounded-md`}
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={!teamName.trim()}
            className={`flex-1 ${
              getCardTheme(competitionType).button.primary
            } text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            Add {entity}
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
