import type { Team, Match, LeagueData } from "../types";

export type SportsAction =
  | { type: "LOAD_DATA"; payload: LeagueData }
  | { type: "SAVE_TO_STORAGE" }
  | { type: "CLEAR_DATA" }
  | { type: "ADD_TEAM"; payload: Team }
  | { type: "ADD_MATCH"; payload: Match };

export const sportsActions = {
  loadData: (data: LeagueData): SportsAction => ({
    type: "LOAD_DATA",
    payload: data,
  }),

  saveToStorage: (): SportsAction => ({
    type: "SAVE_TO_STORAGE",
  }),

  clearData: (): SportsAction => ({
    type: "CLEAR_DATA",
  }),

  addTeam: (team: Team): SportsAction => ({
    type: "ADD_TEAM",
    payload: team,
  }),

  addMatch: (match: Match): SportsAction => ({
    type: "ADD_MATCH",
    payload: match,
  }),
};
