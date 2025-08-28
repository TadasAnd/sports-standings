import type { LeagueData } from "../types";
import type { SportsAction } from "./actions";
import { initialState } from "./store";
import { saveDataToStorage } from "../utils/storage";

export const sportsReducer = (
  state: LeagueData,
  action: SportsAction
): LeagueData => {
  switch (action.type) {
    case "LOAD_DATA":
      return action.payload;

    case "SAVE_TO_STORAGE":
      saveDataToStorage(state);
      return state;

    case "CLEAR_DATA": {
      const newState = initialState;
      saveDataToStorage(newState);
      return newState;
    }

    case "ADD_TEAM": {
      const competition = state.competitions.find(
        (comp) => comp.id === action.payload.competitionId
      );
      if (!competition) return state;

      const newState = {
        ...state,
        teams: [...state.teams, action.payload],
        competitions: state.competitions.map((comp) =>
          comp.id === action.payload.competitionId
            ? { ...comp, teams: [...comp.teams, action.payload.id] }
            : comp
        ),
      };
      saveDataToStorage(newState);
      return newState;
    }

    case "ADD_MATCH": {
      const competition = state.competitions.find(
        (comp) => comp.id === action.payload.competitionId
      );
      if (!competition) return state;

      const newState = {
        ...state,
        matches: [...state.matches, action.payload],
        competitions: state.competitions.map((comp) =>
          comp.id === action.payload.competitionId
            ? { ...comp, matches: [...comp.matches, action.payload.id] }
            : comp
        ),
      };
      saveDataToStorage(newState);
      return newState;
    }

    default:
      return state;
  }
};
