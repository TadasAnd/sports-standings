import { initialState } from "../context/store";
import {
  type LeagueData,
  type Competition,
  type Team,
  type Match,
  type StandingsRow,
  type TennisStandingsRow,
  type FootballStandingsRow,
  type BasketballStandingsRow,
  type ScoredMatch,
  type TennisMatch,
  SCORING_RULES,
} from "../types";

export const saveDataToStorage = (data: LeagueData) => {
  localStorage.setItem("leagueData", JSON.stringify(data));
};

export const loadDataFromStorage = (): LeagueData => {
  const data = localStorage.getItem("leagueData");
  return data ? JSON.parse(data) : initialState;
};

export const clearDataFromStorage = () => {
  localStorage.removeItem("leagueData");
};

export const selectCompetitionById = (
  state: LeagueData,
  id: string
): Competition | null => {
  return state.competitions.find((comp) => comp.id === id) || null;
};

export const selectTeamsByCompetition = (
  state: LeagueData,
  competitionId: string
): Team[] => {
  return state.teams.filter((team) => team.competitionId === competitionId);
};

export const selectMatchesByCompetition = (
  state: LeagueData,
  competitionId: string
): Match[] => {
  return state.matches.filter((match) => match.competitionId === competitionId);
};

export const calculateStandings = (
  state: LeagueData,
  competitionId: string
): StandingsRow[] => {
  const competition = selectCompetitionById(state, competitionId);
  if (!competition) {
    throw new Error(`Competition with id "${competitionId}" not found`);
  }

  const teams = selectTeamsByCompetition(state, competitionId);
  const matches = selectMatchesByCompetition(state, competitionId);

  if (competition.type === "tennis") {
    return calculateTennisStandings(teams, matches as TennisMatch[]);
  } else {
    return calculateScoredStandings(teams, matches as ScoredMatch[]);
  }
};

export const calculateTennisStandings = (
  teams: Team[],
  matches: TennisMatch[]
): TennisStandingsRow[] => {
  return teams
    .map((team) => {
      const playerMatches = matches.filter(
        (match) => match.player1 === team.id || match.player2 === team.id
      );

      const wins = playerMatches.filter(
        (match) => match.winner === team.id
      ).length;
      const losses = playerMatches.length - wins;
      const points = wins * SCORING_RULES.WIN;

      return {
        playerId: team.id,
        matches: playerMatches.length,
        wins,
        losses,
        points,
      };
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });
};

export const calculateScoredStandings = (
  teams: Team[],
  matches: ScoredMatch[]
): (FootballStandingsRow | BasketballStandingsRow)[] => {
  return teams
    .map((team) => {
      const teamMatches = matches.filter(
        (match) => match.team1 === team.id || match.team2 === team.id
      );

      let wins = 0;
      let draws = 0;
      let losses = 0;
      let points = 0;

      teamMatches.forEach((match) => {
        const isTeam1 = match.team1 === team.id;
        const teamScore = isTeam1 ? match.score1 : match.score2;
        const opponentScore = isTeam1 ? match.score2 : match.score1;

        if (teamScore > opponentScore) {
          wins++;
          points += SCORING_RULES.WIN;
        } else if (teamScore === opponentScore) {
          draws++;
          points += SCORING_RULES.DRAW;
        } else {
          losses++;
          points += SCORING_RULES.LOSS;
        }
      });

      const standingsRow = {
        teamId: team.id,
        played: teamMatches.length,
        wins,
        draws,
        losses,
        points,
      };

      return standingsRow as FootballStandingsRow | BasketballStandingsRow;
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });
};

export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 11)}`;
};

export const validateUniqueTeamName = (
  teamName: string,
  teams: Team[],
  competitionId: string
): boolean => {
  const teamsInCompetition = teams.filter(
    (team) => team.competitionId === competitionId
  );
  return !teamsInCompetition.some(
    (team) => team.name.toLowerCase() === teamName.toLowerCase()
  );
};

export const getValidationError = (
  teamName: string,
  teams: Team[],
  competitionId: string,
  isPlayer: boolean = false
): string | null => {
  if (!validateUniqueTeamName(teamName.trim(), teams, competitionId)) {
    return `${
      isPlayer ? "Player" : "Team"
    } "${teamName.trim()}" already exists`;
  }

  return null;
};
