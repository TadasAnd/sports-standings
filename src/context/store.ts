import type { LeagueData } from "../types";

export const initialState: LeagueData = {
  competitions: [
    {
      id: "c_1",
      name: "Premier League",
      type: "football",
      teams: [""],
      matches: [""],
    },
    {
      id: "c_2",
      name: "Eurobasket",
      type: "basketball",
      teams: [],
      matches: [],
    },
    {
      id: "c_3",
      name: "Wimbledon",
      type: "tennis",
      teams: [],
      matches: [],
    },
  ],
  teams: [],
  matches: [],
};
