import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  LeagueData,
  Team,
  Match,
  StandingsRow,
  Competition,
  Player,
} from "../types";
import type { SportsAction } from "./actions";
import { sportsActions } from "./actions";
import { sportsReducer } from "./reducer";
import { initialState } from "./store";
import {
  calculateStandings,
  generateId,
  loadDataFromStorage,
  saveDataToStorage,
} from "../utils/storage";

export interface SportsContextValue {
  state: LeagueData;
  selectors: {
    getStandings: (competitionId: string) => StandingsRow[];
    getTeamsByCompetition: (competitionId: string) => Team[];
    getMatchesByCompetition: (competitionId: string) => Match[];
    getTeamById: (id: string) => Team | null;
    getMatchById: (id: string) => Match | null;
    getCompetitionById: (id: string) => Competition | null;
    getPlayerById: (id: string) => Player | null;
  };
  dispatch: (action: SportsAction) => void;

  actions: {
    addTeam: (name: string, competitionId: string) => Promise<Team>;

    addScoredMatch: (
      competitionId: string,
      team1Id: string,
      team2Id: string,
      score1: number,
      score2: number
    ) => Promise<Match>;
    addTennisMatch: (
      competitionId: string,
      player1Id: string,
      player2Id: string,
      winnerId: string
    ) => Promise<Match>;

    clearAllData: () => void;
    saveToStorage: () => void;
    loadFromStorage: () => void;
  };
}

export const SportsContext = createContext<SportsContextValue | null>(null);

export interface SportsProviderProps {
  children: ReactNode;
}

export function SportsProvider({ children }: SportsProviderProps) {
  const [state, dispatch] = useReducer(sportsReducer, initialState);

  useEffect(() => {
    const savedData = loadDataFromStorage();

    if (
      savedData &&
      (savedData.teams.length > 0 || savedData.matches.length > 0)
    ) {
      const mergedData = {
        competitions: initialState.competitions,
        teams: savedData.teams || [],
        matches: savedData.matches || [],
      };
      dispatch(sportsActions.loadData(mergedData));
    } else {
      saveDataToStorage(initialState);
    }
  }, []);

  const actions = {
    addTeam: async (name: string, competitionId: string): Promise<Team> => {
      const action: Team = {
        id: generateId("t"),
        name,
        competitionId,
      };

      dispatch(sportsActions.addTeam(action));

      return action;
    },

    addScoredMatch: async (
      competitionId: string,
      team1Id: string,
      team2Id: string,
      score1: number,
      score2: number
    ): Promise<Match> => {
      const action: Match = {
        id: generateId("m"),
        competitionId,
        team1: team1Id,
        team2: team2Id,
        score1,
        score2,
        timestamp: new Date().getTime(),
      };

      dispatch(sportsActions.addMatch(action));

      return action;
    },

    addTennisMatch: async (
      competitionId: string,
      player1Id: string,
      player2Id: string,
      winnerId: string
    ): Promise<Match> => {
      const action: Match = {
        id: generateId("m"),
        competitionId,
        player1: player1Id,
        player2: player2Id,
        winner: winnerId,
        timestamp: new Date().getTime(),
      };

      dispatch(sportsActions.addMatch(action));

      return action;
    },

    clearAllData: () => {
      dispatch(sportsActions.clearData());
    },

    saveToStorage: () => {
      dispatch(sportsActions.saveToStorage());
    },

    loadFromStorage: () => {
      const savedData = loadDataFromStorage();
      dispatch(sportsActions.loadData(savedData));
    },
  };

  const selectors = {
    getCompetitionById: (id: string) =>
      state.competitions.find((c) => c.id === id) || null,
    getTeamsByCompetition: (competitionId: string) =>
      state.teams.filter((team) => team.competitionId === competitionId),
    getMatchesByCompetition: (competitionId: string) =>
      state.matches.filter((match) => match.competitionId === competitionId),
    getTeamById: (id: string) =>
      state.teams.find((team) => team.id === id) || null,
    getMatchById: (id: string) =>
      state.matches.find((match) => match.id === id) || null,
    getStandings: (competitionId: string) =>
      calculateStandings(state, competitionId),
    getPlayerById: (id: string) =>
      state.teams.find((team) => team.id === id) || null,
  };

  const contextValue: SportsContextValue = {
    state,
    dispatch,
    actions,
    selectors,
  };

  return React.createElement(
    SportsContext.Provider,
    { value: contextValue },
    children
  );
}

export function useSports(): SportsContextValue {
  const context = useContext(SportsContext);

  if (!context) {
    throw new Error("useSports must be used within a SportsProvider");
  }

  return context;
}
