import type { CompetitionType } from "../types";

export const getCardTheme = (type: CompetitionType) => {
  const themes = {
    football: {
      header: "bg-[#37003c]",
      body: "bg-white",
      text: "text-black",
      fontFamily: "Poppins, sans-serif",
      button: {
        primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
        secondary: "bg-blue-200 hover:bg-blue-300 active:bg-blue-400",
      },
      table: {
        header: "bg-zinc-200",
        body: "bg-white",
        text: "text-black",
        border: "border-zinc-200",
      },
      border: "border-gray-200",
      headerText: "text-white font-bold",
    },
    basketball: {
      header: "bg-[#003c37]",
      body: "bg-[#003c37]",
      text: "text-white",
      fontFamily: "Bebas Neue, sans-serif",
      button: {
        primary: "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
        secondary: "bg-orange-200 hover:bg-orange-300 active:bg-orange-400",
      },
      table: {
        header: "bg-[#003c37]",
        body: "bg-[#00211b]",
        text: "text-white",
        border: "",
      },
      border: "border-[#00211b]",
      headerText: "text-white font-extrabold",
    },
    tennis: {
      header: "bg-[#1a5f1a]",
      body: "bg-white",
      text: "text-white",
      fontFamily: "Space Mono, monospace",
      button: {
        primary: "bg-[#1a5f1a] hover:bg-[#1a5f1a]/80 active:bg-[#1a5f1a]/90",
        secondary: "bg-[#37003c] hover:bg-[#37003c]/80 active:bg-[#37003c]/90",
      },
      table: {
        header: "bg-zinc-200",
        body: "bg-white",
        text: "text-black",
        border: "border-zinc-200",
      },
      border: "border-green-200",
      headerText: "text-white font-semibold",
    },
  };

  return themes[type];
};
