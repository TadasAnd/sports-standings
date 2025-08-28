export type CompetitionType = "football" | "basketball" | "tennis";

export interface Competition {
  id: string;
  name: string;
  type: CompetitionType;
  teams: string[];
  matches: string[];
}

export interface Team {
  id: string;
  name: string;
  competitionId: string;
  //   flag: string;
}

export type Player = Team;

interface BaseMatch {
  id: string;
  competitionId: string;
  timestamp: number;
}

export interface ScoredMatch extends BaseMatch {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
}

export interface TennisMatch extends BaseMatch {
  player1: string;
  player2: string;
  winner: string;
}

export type Match = ScoredMatch | TennisMatch;

export function isScoredMatch(match: Match): match is ScoredMatch {
  return "score1" in match && "score2" in match;
}

export function isTennisMatch(match: Match): match is TennisMatch {
  return "winner" in match;
}

export interface TennisStandingsRow {
  playerId: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
}

export type StandingsRow =
  | FootballStandingsRow
  | BasketballStandingsRow
  | TennisStandingsRow;

export interface ScoredStandingsRow {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
}

export type FootballStandingsRow = ScoredStandingsRow;
export type BasketballStandingsRow = ScoredStandingsRow;

export function isScoredStandings(
  row: StandingsRow
): row is ScoredStandingsRow {
  return "draws" in row && "teamId" in row;
}

export function isTennisStandings(
  row: StandingsRow
): row is TennisStandingsRow {
  return "playerId" in row && !("draws" in row);
}

export interface LeagueData {
  competitions: Competition[];
  teams: Team[];
  matches: Match[];
}

export const SCORING_RULES = {
  WIN: 3,
  DRAW: 1,
  LOSS: 0,
} as const;

export type TeamId = string;
export type MatchId = string;
export type CompetitionId = string;
