export const RESULTS_PAGE_SIZE = 10;
export var commandNames;
(function (commandNames) {
    commandNames["PING"] = "!ping";
    commandNames["RECOMMEND"] = "!recomend";
    commandNames["ACTOR"] = "!actor";
    commandNames["DIRECTOR"] = "!director";
    commandNames["NOW_PLAYING"] = "!cartelera";
    commandNames["NEXT"] = "!sig";
    commandNames["SELECT_OPTION"] = "!opcion";
    commandNames["GAME"] = "!juego";
})(commandNames || (commandNames = {}));
