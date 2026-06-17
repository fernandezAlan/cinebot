import { commandNames } from "../constants/constanst.js";

type SearchSession = {
  command: commandNames;
  results: any[];
  currentPage: number;
};

export const searchSessions = new Map<string, SearchSession>();
